<?php

/**
*   ConfigServiceProvider
*
*   @version 190716
**/
namespace _config;

use \RuntimeException;
use Concerto\container\provider\AbstractServiceProvider;
use Concerto\conf\Config;
use Concerto\conf\ConfigReaderArray;

class ConfigServiceProvider extends AbstractServiceProvider
{
    protected $provides = [
        'configSystemPath',
        'configSystem',
    ];

    public function register()
    {
        $section = $this->resolveSection();
        
        $this->share(
            'configSystemPath',
            realpath(__DIR__ . "/{$section}/system.php")
        );
        
        $this->share('configSystem', function ($container) {
            return new Config(new ConfigReaderArray($container->get('configSystemPath')));
        });
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
