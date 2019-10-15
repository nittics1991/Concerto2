<?php

/**
*   router(chart_main用)
*
*   @version 190904
*/
// namespace _router;

use Bramus\Router\Router;

$router->all('/(.+_chart_main.php)', function ($name) {
    $adr = $_SERVER['REMOTE_ADDR'] ?? '';
    
    if ($adr != '::1' && $adr != '127.0.0.1' && $adr != '10.23.50.104') {
        header('HTTP/1.1 403 Forbidden');
        throw new \RuntimeException(
            "allow only me. request address:{$adr}"
        );
    }
    
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
    
    //config読み込み
    require_once(realpath(__DIR__ . '/config.php'));
    //認証
    // (new AuthService(new AuthFactory(_getDBConSingleton($configSystem))))();
    //実行
    chdir(dirname($path));
    require_once($path);
    die;
});
