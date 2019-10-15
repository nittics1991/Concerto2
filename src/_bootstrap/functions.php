<?php
/**
*   functions
*
*   @version 190426
*/

foreach (glob(realpath(__DIR__ . '/../_function') . '/*.php') as $path) {
    include($path);
}
