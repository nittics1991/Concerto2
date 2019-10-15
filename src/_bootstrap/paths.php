<?php

/**
*   paths
*
*   @version 190426
*/

//basepath
call_user_func(function () {
    $basePath = realpath(__DIR__ . '/..');
    set_include_path(get_include_path() . ';' . $basePath);
});


//path
call_user_func(function () {
    $paths = [
        __DIR__ . '/../../vendor',
        __DIR__ . '/../_mvc',
    ];

    foreach ($paths as $path) {
        set_include_path(get_include_path() . ';' . realpath($path));
    }
});
