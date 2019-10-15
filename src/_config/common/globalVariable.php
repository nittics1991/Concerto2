<?php

////////////////////////////////////////////////////////////////////////////////////////////////////
//  DBコネクション(Concerto)
////////////////////////////////////////////////////////////////////////////////////////////////////
global $pg_con;

$db_port  = PG_PORT;
$hostname = "localhost";
$db_name  = PG_NAME;
$db_user  = "concerto";
$db_pass  = "manager";
$str_connection = "host=$hostname port=$db_port dbname=$db_name user=$db_user password=$db_pass";

if (empty($pg_con)) {
    if (!$pg_con = pg_connect($str_connection)) {
        print "ERROR : faild to connect to ${hostname}<br>";
        exit;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
//  DB設定(Symphony)
////////////////////////////////////////////////////////////////////////////////////////////////////
//ORACLE
global $ora_dns;
global $ora_user;
global $ora_pass;

// $ora_dns = "DRIVER={Microsoft ODBC for Oracle};  CONNECTSTRING=SYMPHONY;";
$ora_dns = "DRIVER={Oracle in 18.5};  Data Source=SYMPHONY;";

$ora_user = "ITC_USER";
$ora_pass = "ITC_201304";
