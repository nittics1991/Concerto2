<?php

/**
*   router(api用)
*
*   @version 190924
*/
// namespace _router;

use Bramus\Router\Router;

$router->all('/(.+_chart_main.php)', function ($name) {
    $exploded = explode('/', $name);
    array_shift($exploded);
    $dianame = implode('/', $exploded);
    $path = realpath(__DIR__ . "/../{$dianame}");
    
    if (!realpath($path)) {
        header('HTTP/1.1 404 Not Found');
        throw new \RuntimeException(
            "not found URL:{$name}"
        );
    }
    
    $adr = $_SERVER['REMOTE_ADDR'] ?? '';
    
    if ($adr == '::1' || $adr == '127.0.0.1' || $adr == '10.23.50.104') {
        //config読み込み
        require_once(realpath(__DIR__ . '/config.php'));
        //実行
        chdir(dirname($path));
        require_once($path);
        die;
    }
    
    //config読み込み
    require_once(realpath(__DIR__ . '/config.php'));
    //認証
    (new AuthService(new AuthFactory(_getDBConSingleton($configSystem))))();
    //実行
    chdir(dirname($path));
    require_once($path);
    die;
});
