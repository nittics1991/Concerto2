<?php

/**
*   PostLogin
*
*   @version 190604
*/
namespace _auth;

use Concerto\auth\Csrf;
use Concerto\standard\Post;
use Concerto\Validate;

class PostLogin extends Post
{
    /**
    *   {inherit}
    *
    */
    protected static $schema = [
        'token', 'user', 'password', 'hidden_string'
    ];
    
    public function isValidToken($val)
    {
        return Csrf::isValid($val, false);
    }
    
    public function isValidUser($val)
    {
        return Validate::isAscii($val, 8);
    }
    
    public function isValidPassword($val)
    {
        return Validate::isAscii($val, 1, 20);
    }
    
    public function isValidHidden_string($val)
    {
        return $val == 'login_disp';
    }
}
