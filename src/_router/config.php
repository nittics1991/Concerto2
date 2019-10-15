<?php

/**
*   config
*
*   @version 190426
*/
// namespace _router;

// use \RuntimeException;
use Concerto\conf\Config;
use Concerto\conf\ConfigReaderArray;

//URLにて切り替え
$input_section = call_user_func(function () {
    $exploded = explode('/', $_SERVER['REQUEST_URI']);
    
    if (!mb_ereg_match('\Aitc_work', $exploded[1])) {
        header('HTTP/1.1 404 Not Found');
        die;
    }
    return $exploded[1];
});

require_once(
    realpath(__DIR__ . '/../_config/' . $input_section . '/consts.php')
);

$configSystem = new Config(
    new ConfigReaderArray(
        realpath(__DIR__ . '/../_config/' . $input_section . '/system.php')
    )
);

require_once(
    realpath(__DIR__ . '/../_config/common/globalVariable.php')
);
