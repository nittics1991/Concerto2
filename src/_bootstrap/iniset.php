<?php

/**
*   iniset
*
*   @version 190905
*/

ini_set('memory_limit', '256M');
ini_set('max_execution_time', '120');

ini_set('log_errors', 1);
ini_set('log_errors_max_len', 0);
ini_set('error_log', 'E:\\www\\Concerto\\log\\phperr.log');

ini_set('date.timezone', 'Asia/Tokyo');

ini_set('opcache.revalidate_freq', 60);

mb_detect_order('UTF-8,SJIS,EUC-JP,JIS,ASCII');
mb_internal_encoding('UTF-8');
mb_regex_encoding('UTF-8');
setlocale(LC_ALL, 'jpn_jpn');
