<?php

/**
*   app
*
*   @version 190426
*/

// use Throwable;

register_shutdown_function(
    '_registerShutdownErrorLog',
    realpath(__DIR__ . '/../../log/') .
        DIRECTORY_SEPARATOR .
        'shutdown_' . date('Ymd') . '.log'
);
set_error_handler("_registerErrorException");

try {
    if (PHP_SAPI === 'cli') {
        require_once(realpath(__DIR__ . '/../_console/console.php'));
    } else {
        require_once(realpath(__DIR__ . '/../_router/route.php'));
    }
} catch (\Throwable $e) {
    error_log(
        date('Ymd His') . "\n" . _expansionException($e) . "\n",
        3,
        realpath(__DIR__ . '/../../log') .
        DIRECTORY_SEPARATOR .
        'err.log'
    );
}
