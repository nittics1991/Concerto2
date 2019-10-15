<?php

/**
*   console
*
*   @version 190710
*
*   Usage
*       index.php PROJECT SECTION [argv[n]...]
*   example
*       index.php mst_tanto\mst_tando_disp.php itc_work3
*
*/

// namespace _console;

// use \RuntimeException;

call_user_func(function () {
    global $argv;
    
    //argv[0]:自script argv[1]:実行スクリプトPATH argv[2]:セクション argv[n]:引数
    if (!isset($argv[1]) || !isset($argv[2])) {
        throw new \RuntimeException(
            "not found argv: Usage SCRIPT PROJECT SECTION ARGn ..."
        );
    }
    
    $path = realpath(__DIR__ . "/../{$argv[1]}");
    
    if (!file_exists($path)) {
        throw new \RuntimeException(
            "not found path:{$argv[1]}"
        );
    }
    
    //config読み込み
    require_once(realpath(__DIR__ . '/config.php'));
    
    //実行
    chdir(dirname($path));
    require_once($path);
    die;
})();
