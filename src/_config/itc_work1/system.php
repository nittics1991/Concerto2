<?php
return [
    'system' => [
        'systemName' => 'itc_work1',
    ],
    'database' => [
         'default' => [
            'dns' => 'pgsql:host=localhost; port=5432; dbname=itc_work1;',
            'user' => 'concerto',
            'password' => 'manager'
         ],
         'Symphony' => [
            'dns' => 'oci:dbname=ITCA;',
            'user' => 'ITC_USER',
            'password' => 'ITC_201304'
         ],
    ],
    'log' => [
        'default' => [
            'stream' => 'err.log',
            'format' => '%s:%s' . PHP_EOL
        ],
    ],
    'cookie' => [
        'default' => [
            'expire' => time() + 60 * 60 * 24 * 365 * 10
        ],
    ],
    'smtp' => [
        /*
        'default' => [
            'host' => 'localhost',
            'port' => 25,
            'user' => null,
            'password' => null
        ],
        */
        
        'default' => [
            'host' => '133.199.206.60',
            'port' => 25,
            'user' => null,
            'password' => null,
        ],
        
        'secondary' => [
            'host' => '133.199.122.195',
            'port' => 25,
            'user' => null,
            'password' => null,
        ],

    ],
    
    'auth' => [
        'strength' => 8,
        'expire' => 180
    ],
    'buKbn' => [
        'itc_work1',
    ],
    
];
