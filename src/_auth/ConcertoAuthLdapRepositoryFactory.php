<?php

/**
*   ConcertoAuthLdapRepositoryFactory
*
*   @ver 190604
*/
namespace _auth;

use \PDO;
use Concerto\auth\authentication\AuthUserInterface;
use Concerto\database\MstTanto;
use Concerto\database\MstTantoData;
use Concerto\ldap\LdapConnection;
use Concerto\standard\DataMapperInterface;
use Concerto\standard\DataModelInterface;
use _auth\ConcertoAuthUser;

class ConcertoAuthLdapRepositoryFactory
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
    
    /**
    *   createAuthUser
    *
    *   @param array $dataset
    *   @return AuthUserInterface
    **/
    public function createAuthUser(array $dataset): AuthUserInterface
    {
        return new ConcertoAuthUser($dataset);
    }
    
    /**
    *   getDataModel
    *
    *   @return DataModelInterface
    **/
    public function getDataModel(): DataModelInterface
    {
        return new MstTantoData();
    }
    
    /**
    *   getDataMapper
    *
    *   @return DataMapperInterface
    **/
    public function getDataMapper(): DataMapperInterface
    {
        return new MstTanto($this->pdo);
    }
    
    /**
    *   getLdapConnection
    *
    *   @return LdapConnection
    **/
    public function getLdapConnection(): LdapConnection
    {
        return new LdapConnection(
            'ldap://tsb-sv203.toshiba.local',
            [
                LDAP_OPT_PROTOCOL_VERSION => 3,
                LDAP_OPT_REFERRALS => 0,
            ]
        );
    }
}
