<?php

/**
*   POST
*
*   @version 190919
*/
namespace seiban_kanri2\model;

use Concerto\auth\Csrf;
use Concerto\standard\Post;
use Concerto\Validate;

class PostKobanTyouseiKanseiDisp extends Post
{
    /**
    *   Columns
    *
    *   @val array
    */
    protected static $schema = [
        'token', 'act',
        'no_cyu',
        'no_ko',
    ];
    
    public function isValidToken($val)
    {
        return Csrf::isValid($val, false);
    }
    
    //act
    
    public function isValidNo_cyu($val)
    {
        return Validate::isCyuban($v);
    }
    
    public function isValidNo_ko($val)
    {
        return Validate::isKoban($v);
    }
}
