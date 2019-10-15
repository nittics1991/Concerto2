<?php

/**
*   Controller Model
*
*   @version 190919
*/
namespace seiban_kanri2\model;

use Concerto\standard\ControllerModel;
use seiban_kanri2\model\KobanTyouseiDispFactory;

class KobanTyouseiDispControllerModel extends ControllerModel
{
    /**
    *   名前空間
    *
    *   @val string
    */
    protected $namespace = 'seiban_kanri';
    
    /**
    *   コンストラクタ
    *
    *   @param KobanTyouseiDispFactory $factory
    */
    public function __construct(KobanTyouseiDispFactory $factory)
    {
        parent::__construct($factory);
    }
    
    /**
    *   query処理
    *
    */
    public function setQuery()
    {
        $query = $this->factory->getQuery();
        
        if ($query->isValid()) {
            $this->session->no_cyu  = $query->no_cyu ??
                $this->session->no_cyu;
        }
    }
    
    /**
    *   post処理
    *
    */
    public function isValidPost()
    {
        $post = $this->factory->getPost();
        $this->act = $post->act;
        $ans = $post->isValid();
        $this->validError[] = $post->getValidError();
        return $ans;
    }
    
    /**
    *   データ保存
    *
    */
    public function setTyouseiData()
    {
        $post = $this->factory->getPost();
        $model = $this->factory->getKobanTyouseiDispMntModel();
        $model->setTyouseiData($post);
    }
    
    /**
    *   データ作成
    *
    */
    public function buildData()
    {
        $model = $this->factory->getModel();
        $this->no_cyu = $this->session->no_cyu;
        $tyousei_list = $model->getTyouseiList($this->no_cyu);
        $result = [];
        $i = 0;
        
        foreach ($tyousei_list as $list) {
            $list['no'] = $i;
            $list['nm_kansei'] = $list['cd_kansei'] == '1' ?
                '完成取消' : '完成申請';
            $result[] = $list;
            $i++;
        }
        $this->tyousei_list = $result;
    }
    
    /**
    *   完成申請
    *
    */
    public function setKansei()
    {
        $post = $this->factory->getPostKansei();
        $model = $this->factory->getKobanTyouseiKanseiDispMntModel();
        $model->setKansei($post);
    }
}
