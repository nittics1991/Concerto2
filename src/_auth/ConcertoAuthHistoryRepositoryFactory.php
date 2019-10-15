<?php

/**
*   AuthHistoryRepositoryFactory
*
*   @ver 190604
*/
namespace _auth;

use Concerto\auth\authentication\AuthHistoryRepositoryFactory;
use Concerto\database\LoginInf;
use Concerto\database\LoginInfData;
use Concerto\standard\DataMapperInterface;
use Concerto\standard\DataModelInterface;

class ConcertoAuthHistoryRepositoryFactory extends AuthHistoryRepositoryFactory
{
    /**
    *   getDataModel
    *
    *   @return DataModelInterface
    **/
    public function getDataModel(): DataModelInterface
    {
        return new LoginInfData();
    }
    
    /**
    *   getDataMapper
    *
    *   @return DataMapperInterface
    **/
    public function getDataMapper(): DataMapperInterface
    {
        return new LoginInf($this->pdo);
    }
}
