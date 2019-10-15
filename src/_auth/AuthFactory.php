<?php

/**
*   AuthFactory
*
*   @ver 190604
*/
namespace _auth;

use \PDO;
use Concerto\auth\authcounter\AuthCounter;
use Concerto\auth\authcounter\IllegalUserCache;
use Concerto\cache\MemcacheCache;
use Concerto\cache\SessionCache;
use _auth\ConcertoAuthenticationGate;
use _auth\ConcertoAuthDbRepositoryFactory;
use _auth\ConcertoAuthDbRepositoryImpl;
use _auth\ConcertoAuthHistoryRepositoryFactory;
use _auth\ConcertoAuthHistoryRepositoryImpl;
use _auth\ConcertoAuthLdapRepositoryFactory;
use _auth\ConcertoAuthLdapRepositoryImpl;
use _auth\ConcertoAuthSession;
use _auth\PostLogin;

class AuthFactory
{
    /**
    *   pdo
    *
    *   @var PDO
    **/
    protected $pdo;
    
    /**
    *   __construct
    *
    *   @param PDO $pdo
    **/
    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }
    
    public function getIlligalUserCache()
    {
        return new IllegalUserCache(
            new MemcacheCache('auth')
        );
    }
    
    public function getAuthSession()
    {
        return new ConcertoAuthSession('auth');
    }
    
    public function getAuthDbRepository()
    {
        return new ConcertoAuthDbRepositoryImpl(
            new ConcertoAuthDbRepositoryFactory($this->pdo)
        );
    }
    
    public function getAuthLdapRepository()
    {
        return new ConcertoAuthLdapRepositoryImpl(
            new ConcertoAuthLdapRepositoryFactory($this->pdo)
        );
    }
    
    public function getPost()
    {
        return new PostLogin();
    }
    
    public function getAuthCounter()
    {
        return new AuthCounter(
            new SessionCache('auth')
        );
    }
    
    public function getAuthGate($user)
    {
        return new ConcertoAuthenticationGate(
            preg_match('/^\d{5}ITC$/', $user) ?
                $this->getAuthDbRepository() :
                $this->getAuthLdapRepository()
        );
    }
    
    public function getAuthHistoryRepository()
    {
        return new ConcertoAuthHistoryRepositoryImpl(
            new ConcertoAuthHistoryRepositoryFactory($this->pdo)
        );
    }
}
