<?php

/**
*   ConcertoSectionableConfig
*
*   @version 190717
*/
namespace _config;

use Concerto\conf\Config;
use Concerto\conf\ConfigReaderArray;

class ConcertoSectionableConfig extends Config
{
     /**
    *   セクション用configファイル設定
    *
    *   @param string $path
    *   @return $this
    */
    public function setSectionPath($path)
    {
        $section = $this->resolveSection();
        $path = mb_ereg_replace('\\\\', '/', $path);
        $path = mb_ereg_replace('/common/', "/{$section}/", $path);
        
        if (file_exists($path)) {
            $this->replace(new ConfigReaderArray($path));
        }
        return $this;
    }
    
    /**
    *   セクション抽出
    *
    *   ＠return string
    */
    protected function resolveSection()
    {
        global $argv;
        
        if (PHP_SAPI === 'cli') {
            if (!mb_ereg_match('\Aitc_work[1-6]\z', $argv[2])) {
                throw new \RuntimeException(
                    "invalid section:{$argv[2]}"
                );
            }
            return $argv[2];
        }
        
        $exploded = explode('/', $_SERVER['REQUEST_URI']);
        
        if (!mb_ereg_match('\Aitc_work', $exploded[1])) {
            throw new \RuntimeException(
                "invalid section:{$_SERVER['REQUEST_URI']}"
            );
        }
        return $exploded[1];
    }
}
