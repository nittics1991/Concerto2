<?php
/**
*   dbConnection
*
*   @version 190426
*/
// namespace _function;

// use \PDO;
// use \InvalidArgumentException;

/**
*   データベースコネクション取得
*
*   @param array 設定ファイル
*   @param string 空間名
*   @return resource データベースコネクション or false
*/
function _getDBConSingleton($config, $name = 'default')
{
    /**
    *   データベースコネクション
    *
    *   @val resorce
    */
    static $conncect = [];
    
    if (isset($conncect[$name])) {
        return $conncect[$name];
    }
    
    if (!isset($config['database'][$name])) {
        throw new \InvalidArgumentException("not define db connection");
    }
    
    $pdo = new \PDO(
        $config['database'][$name]['dns'],
        $config['database'][$name]['user'],
        $config['database'][$name]['password']
    );
    $pdo->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(\PDO::ATTR_EMULATE_PREPARES, false);
    $pdo->setAttribute(\PDO::ATTR_DEFAULT_FETCH_MODE, \PDO::FETCH_ASSOC);
    
    return ($conncect[$name] = $pdo);
}
