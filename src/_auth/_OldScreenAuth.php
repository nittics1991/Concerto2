<?php

/**
*   旧画面用処理
*
*   @ver 190612
*/
namespace _auth;

use \RuntimeException;
use Concerto\auth\authentication\AuthUserInterface;
use Concerto\standard\Invokable;

class _OldScreenAuth implements Invokable
{
    /**
    *   __invoke
    *
    **/
    public function __invoke(...$args)
    {
        $this->doService($args[0]);
    }
    
    /**
    *   doService
    *
    *   @param AuthUserInterface $authUser
    **/
    private function doService(AuthUserInterface $authUser)
    {
        if (session_status() !== PHP_SESSION_ACTIVE) {
            session_start();
        }
        
        $_SESSION['input_code'] = $authUser->id;
        $_SESSION['input_name'] = $authUser->name;
        $_SESSION['input_group'] = $authUser->section;
        $_SESSION['kengen'] = $authUser->kengenGpm;
        $_SESSION['kengen_sm'] = $authUser->kengenMac;
        $_SESSION['kengen_db'] = $authUser->kengenDb;
        $_SESSION['input_pass'] = 'INPUT_PASS';
        
        session_write_close();
    }
}
