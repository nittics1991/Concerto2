<?php

/**
*   router
*
*   @version 190821
*/
// namespace _router;

// use \RuntimeException;
use Bramus\Router\Router;

$router = new Router();

foreach (glob(__DIR__ . '/route_*.php') as $file) {
    require_once($file);
}

$router->all('/(.*)', function ($name) {
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
    
    //php以外のファイル
    if (mb_strtolower(pathinfo($path, PATHINFO_EXTENSION)) !== 'php') {
        readfile($path);
        die;
    }
    
    //config読み込み
    require_once(realpath(__DIR__ . '/config.php'));
    //認証
    require_once(realpath(__DIR__ . '/auth.php'));
    //実行
    chdir(dirname($path));
    require_once($path);
    die;
});

$router->run();
