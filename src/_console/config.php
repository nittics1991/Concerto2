<?php

/**
*   config
*
*   @version 190709
*/
// namespace _router;

use Concerto\conf\Config;
use Concerto\conf\ConfigReaderArray;

if (!mb_ereg_match('\Aitc_work[1-6]\z', $argv[2])) {
        throw new \RuntimeException(
            "invalid section:{$argv[2]}"
        );
}

$input_section = $argv[2];

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
