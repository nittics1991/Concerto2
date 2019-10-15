<?php

/**
*   logger
*
*   @version 190426
*/
// namespace _function;

use Concerto\log\Log;
use Concerto\log\LogWriterErrorLog;

/**
*   ログ取得
*
*   @param array 設定ファイル
*   @param string 空間名
*   @return object ログ
*/
function _getLogSingleton($config, $name = 'default')
{
    /**
    *   ログ
    *
    *   @val object
    */
    static $log = null;
    
    if (is_null($log)) {
        $log = new Log(new LogWriterErrorLog($config));
    }
    return $log;
}
