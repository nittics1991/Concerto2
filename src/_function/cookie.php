<?php

/**
*   cookie
*
*   @version 190426
*/
// namespace _function;

use Concerto\standard\Cookie;
use Concerto\standard\Session;

/**
*   SESSION情報 COOKIE登録
*
*   @param string SESSION名前空間
*   @param array cookie設定
*   @param object
*/
function _setEnv($namespace, $config = [], $session = null)
{
    $cookie = new Cookie($config);
    
    if (is_object($session)) {
        $data = json_encode($session);
    } else {
        $session = new Session($namespace);
        $data = json_encode($session->toArray());
    }
    
    $cookie->$namespace = $data;
}

/**
*   SESSION情報 COOKIE削除
*
*   @param string SESSION名前空間
*   @param array cookie設定
*/
function _resetEnv($namespace, $config = [])
{
    $cookie = new Cookie($config);
    unset($cookie->$namespace);
}

/**
*   SESSION情報 取得
*
*   @param string SESSION名前空間
*   @param array 設定
*/
function _getEnv($namespace, $config = [])
{
    $cookie = new Cookie($config);
    
    try {
        return (array)json_decode($cookie->$namespace);
    } catch (Exception $e) {
        return [];
    }
}
