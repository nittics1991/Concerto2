<?php

/**
*   ConcertoAuthDbRepositoryFactory
*
*   @ver 190604
*/
namespace _auth;

use \PDO;
use Concerto\auth\authentication\AuthUserInterface;
use Concerto\database\MstTanto;
use Concerto\database\MstTantoData;
use Concerto\hashing\HasherInterface;
use Concerto\hashing\StandardHasher;
use Concerto\standard\DataMapperInterface;
use Concerto\standard\DataModelInterface;
use _auth\ConcertoAuthUser;

class ConcertoAuthDbRepositoryFactory
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
    *   getHasher
    *
    *   @return HasherInterface
    **/
    public function getHasher(): HasherInterface
    {
        return new StandardHasher();
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
}
