<?php

/**
*   ConcertoAuthUser
*
*   @ver 190606
*/
namespace _auth;

use Concerto\auth\authentication\AuthUser;

class ConcertoAuthUser extends AuthUser
{
    /**
    *   {necessary}
    *
    **/
    protected $propertyDefinitions = [
        'id', 'password',
        'unifiedUserId', 'name',
        'section',
        'kengenDb', 'kengenMac', 'kengenGpm',
    ];
}
