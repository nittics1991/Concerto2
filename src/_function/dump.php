<?php
/**
*   dump
*
*   @version 190820
*/
// namespace _function;

/**
*   ファイルダンプ
*
*   @param array 出力値
*   @param string ファイル名
*   @return int or null 出力バイト数
*/
function fvar_dump($val, $file = null)
{
    if (is_null($file) || !file_exists(dirname($file))) {
        if (php_sapi_name() == 'cli') {
            $dir = getcwd();
        } else {
            $exploded = explode('/', $_SERVER['REQUEST_URI']);
            array_pop($exploded);
            $dir = implode('/', $exploded);
            $dir = realpath(__DIR__ . '/../' . $dir);
            $dir = file_exists($dir) ? $dir : getcwd();
        }
        $file = $dir . DIRECTORY_SEPARATOR . 'app.log';
    }
    
    $xdebug = @ini_get('xdebug.overload_var_dump');
    @ini_set('xdebug.overload_var_dump', 0);
    
    ob_start();
    var_dump($val);
    $result = ob_get_contents() . "\r\n";
    ob_end_clean();
    
    @ini_set('xdebug.overload_var_dump', $xdebug);
    
    return file_put_contents($file, $result, LOCK_EX | FILE_APPEND);
}

/**
*   テキストダンプ
*
*   @param mixed
*   @return string
*/
function svar_dump(...$args)
{
    ob_start();
    call_user_func_array('var_dump', $args);
    $content = ob_get_contents();
    ob_end_clean();
    return $content;
}

/**
*   ネストException整形出力
*
*   @param object Exception
*   @return string
*/
function _expansionException($e)
{
    ob_start();
    print_r($e);
    $buffer = strip_tags(ob_get_contents() . PHP_EOL);
    ob_end_clean();
    
    if (!is_null($e->getPrevious())) {
        $buffer .= _expansionException($e->getPrevious());
    }
    return $buffer;
}
