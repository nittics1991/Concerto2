<?php
/**
*   boot
*
*   @version 190709
*/

if (isset($_ENV['DEBUG']) && $_ENV['DEBUG']) {
    ini_set('display_errors', '1');
} else {
    ini_set('display_errors', '0');
}

error_reporting(E_ALL);

//ITC Concerto
require_once realpath(__DIR__ . '/../_config/common/globalVariableDefinition.php');

call_user_func(function () {
    $bootFiles = [
        __DIR__ . '/paths.php',
        __DIR__ . '/autoload.php',
        __DIR__ . '/iniset.php',
        // __DIR__ . '/container.php',
        //__DIR__ . '/start.php',
        
        //ITC Concerto
        __DIR__ . '/functions.php',
        // __DIR__ . '/app.php',
    ];

    foreach ($bootFiles as $path) {
        require_once realpath($path);
    }
});
        
//ITC Concerto
require_once realpath(__DIR__ . '/app.php');
