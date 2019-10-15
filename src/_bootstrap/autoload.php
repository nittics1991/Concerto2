<?php

/**
*   autoload
*
*   @version 190426
*/

spl_autoload_extensions(spl_autoload_extensions() . ',.class.php');
spl_autoload_register('spl_autoload');
require_once realpath(__DIR__ . '/../../vendor/autoload.php');
