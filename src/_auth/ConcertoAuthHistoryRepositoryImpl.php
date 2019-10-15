<?php

/**
*   ConcertoAuthHistoryRepositoryImpl
*
*   @ver 190904_pcbf
*/
namespace _auth;

use \DateTimeImmutable;
use \Exception;
use \PDO;
use Concerto\auth\authentication\AuthHistoryRepositoryInterface;
use Concerto\auth\authentication\AuthUserInterface;
use _auth\ConcertoAuthHistoryRepositoryFactory;

class ConcertoAuthHistoryRepositoryImpl implements
    AuthHistoryRepositoryInterface
{
    /**
    *   factory
    *
    *   @var ConcertoAuthHistoryRepositoryFactory
    **/
    protected $factory;
    
    /**
    *   __construct
    *
    *   @param ConcertoAuthHistoryRepositoryFactory $factory
    **/
    public function __construct(ConcertoAuthHistoryRepositoryFactory $factory)
    {
        $this->factory = $factory;
    }
    
    /**
    *   {inherit}
    *
    *   @return $this
    **/
    public function record(AuthUserInterface $authUser, array $contents = [])
    {
        $loginInfData = $this->factory->getDataModel();
        $loginInfData->cd_tanto = $authUser->getId();
        $loginInfData->ins_date = (new DateTimeImmutable())
            ->format('Ymd His');
        $loginInfData->nm_tanto = $authUser->name;
        $loginInfData->remote_addr = $_SERVER['REMOTE_ADDR'] ?? '';
        
        $loginInf = $this->factory->getDataMapper();
        $pdo = $this->factory->getPdo();
        
        try {
            $pdo->beginTransaction();
            $loginInf->insert([$loginInfData]);
        } catch (Exception $e) {
            $pdo->Rollback();
            throw $e;
        }
        $pdo->commit();
        return $this;
    }
    
    /**
    *   過去データのリフレッシュ
    *
    *   @param int $expireDay 期限日数
    *   @return $this
    **/
    public function reflash(int $expireDay = 30)
    {
        $sql = "
            DELETE FROM public.login_inf
            WHERE ins_date < :date
        ";
        
        $pdo = $this->factory->getPdo();
        $stmt = $pdo->prepare($sql);
        
        $date = (new DateTimeImmutable())
            ->modify("-{$expireDay} day")
            ->format('Ymd His');
        $stmt->bindValue(':date', $date, PDO::PARAM_STR);
        $stmt->execute();
        
        return $this;
    }
}
