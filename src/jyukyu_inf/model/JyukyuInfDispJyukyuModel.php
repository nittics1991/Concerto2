<?php

/**
*   JyukyuInfDispJyukyuModel
*
*   @version 190611
*/
namespace jyukyu_inf\model;

use \Exception;
use \PDO;
use Concerto\auth\authentication\AuthUserInterface;
use Concerto\database\JyukyuInf;
use Concerto\database\JyukyuInfData;
use jyukyu_inf\model\PostJyukyuInfDispJyukyu;

class JyukyuInfDispJyukyuModel
{
    /**
    *   object
    *
    *   @var object
    **/
    private $pdo;
    private $jyukyuInf;
    private $jyukyuInfData;
    private $authUser;
    
    /**
    *   __construct
    *
    *   @param PDO $pdo
    *   @param JyukyuInf $jyukyuInf
    *   @param JyukyuInfData $jyukyuInfData
    *   @param AuthUserInterface $authUser
    **/
    public function __construct(
        PDO $pdo,
        JyukyuInf $jyukyuInf,
        JyukyuInfData $jyukyuInfData,
        AuthUserInterface $authUser
    ) {
        $this->pdo = $pdo;
        $this->jyukyuInf = $jyukyuInf;
        $this->jyukyuInfData = $jyukyuInfData;
        $this->authUser = $authUser;
    }
    
    /**
    *   保存
    *
    *   @param PostJyukyuInfDispJyukyu $post
    */
    public function setData(PostJyukyuInfDispJyukyu $post)
    {
        try {
            $this->pdo->beginTransaction();
            
            switch ($post->act) {
                case 'insert':
                    $this->insert($post);
                    break;
                case 'update':
                    $this->update($post);
                    break;
                case 'delete':
                    $this->delete($post);
                    break;
            }
            $this->pdo->commit();
        } catch (Exception $e) {
            $this->pdo->rollback();
            throw $e;
        }
    }
    
    /**
    *   insert
    *
    *   @param PostJyukyuInfDispJyukyu $post
    **/
    private function insert(PostJyukyuInfDispJyukyu $post)
    {
        $obj = $this->buildData($post);
        $obj->no_cyu = $post->no_cyu;
        $obj->no_jyukyu = $this->generateNo($obj->no_cyu);
        $this->jyukyuInf->insert([$obj]);
    }
    
    /**
    *   データ作成
    *
    *   @param PostJyukyuInfDispJyukyu $post
    *   @return jyukyuInfData
    **/
    private function buildData(PostJyukyuInfDispJyukyu $post)
    {
        $data = clone $this->jyukyuInfData;
        $data->update = date('Ymd His');
        $data->editor = $this->authUser->id;
        $data->nm_syohin = $post->nm_syohin;
        $data->nm_model = $post->nm_model;
        $data->dt_pjyukyu = $post->dt_pjyukyu;
        $data->no_psuryo = (int)$post->no_psuryo;
        $data->nm_biko = $post->nm_biko;
        return $data;
    }
    
    /**
    *   採番
    *
    *   @param string $no_cyu
    *   @return string
    **/
    private function generateNo($no_cyu)
    {
        return $this->jyukyuInf->generateNo($no_cyu);
    }
    
    /**
    *   update
    *
    *   @param PostJyukyuInfDispJyukyu $post
    **/
    private function update(PostJyukyuInfDispJyukyu $post)
    {
        $data = $this->buildData($post);
        $where = $this->buildWhere($post);
        $this->jyukyuInf->update([[$data, $where]]);
    }
    
    /**
    *   where作成
    *
    *   @param PostJyukyuInfDispJyukyu $post
    *   @return jyukyuInfData
    **/
    private function buildWhere(PostJyukyuInfDispJyukyu $post)
    {
        $where = clone $this->jyukyuInfData;
        $where->no_jyukyu = $post->no_jyukyu;
        return $where;
    }
    
    /**
    *   delete
    *
    *   @param PostJyukyuInfDispJyukyu $post
    **/
    private function delete(PostJyukyuInfDispJyukyu $post)
    {
        $where = $this->buildWhere($post);
        $this->jyukyuInf->delete([$where]);
    }
}
