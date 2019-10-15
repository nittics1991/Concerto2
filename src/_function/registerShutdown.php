<?php
/**
*   registerShutdown
*
*   @version 190619
*/
// namespace _function;

/**
*   最終エラーログ出力
*
*   @param string $fileName
*/
function _registerShutdownErrorLog($fileName)
{
    $errors = error_get_last();
    $white_list = ['8'];
    
    if (!empty($errors)) {
        if (!in_array($errors['type'], $white_list)) {
            $messages = "\r\n" . date('Ymd His') . "\r\n";
            
            if (php_sapi_name() != 'cli') {
                $messages .= "request_uri==>{$_SERVER['REQUEST_URI']}\r\n";
                $messages .= "script_name==>{$_SERVER['SCRIPT_NAME']}\r\n";
            }
            
            foreach ((array)$errors as $key => $val) {
                $messages .= "{$key}==>{$val}\r\n";
            }
            error_log("{$messages}\r\n", 3, $fileName);
        }
    }
}

/**
*   ErrorException
*
*/
function _registerErrorException($no, $message, $file, $line)
{
    if (!(error_reporting() & $no)) {
        return;
    }

    //ライブラリは無視
    if (mb_ereg_match('.*\\\\vendor\\\\', $file)) {
        return;
    }
    
    throw new ErrorException($message, 0, $no, $file, $line);
}
