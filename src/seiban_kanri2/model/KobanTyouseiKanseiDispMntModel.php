<?php

/**
*   KobanTyouseiKanseiDispMntModel
*
*   @version 190919
*/
namespace seiban_kanri2\model;

use Concerto\database\KobanTyousei;
use Concerto\database\KobanTyouseiData;
use seiban_kanri2\model\PostKobanTyouseiKanseiDisp;

class KobanTyouseiKanseiDispMntModel
{
    /**
    *   object
    *
    *   @val object
    */
    private $kobanTyousei;
    private $kobanTyouseiData;
    
    /**
    *   __construct
    *
    *   @param KobanTyousei $kobanTyousei
    *   @param KobanTyouseiData $kobanTyouseiData
    */
    public function __construct(
        KobanTyousei $kobanTyousei,
        KobanTyouseiData $kobanTyouseiData
    ) {
        $this->kobanTyousei = $kobanTyousei;
        $this->kobanTyouseiData = $kobanTyouseiData;
    }
    
    /**
    *   申請状態更新
    *
    *   @param PostKobanTyouseiKanseiDisp $post
    */
    public function setKansei(PostKobanTyouseiKanseiDisp $post)
    {
        $data = clone $this->kobanTyouseiData;
        
        if ($this->isApplied($post)) {
            $data->cd_kansei = '0';
        } else {
            $data->cd_kansei = '1';
        }
        
        if ($this->hasTyouseiData($post)) {
            $where = $this->buildWhere($post);
            $this->kobanTyousei->update([[$data, $where]]);
            return;
        }
        
        $data->no_cyu = $post->no_cyu;
        $data->no_ko = $post->no_ko;
        $this->kobanTyousei->insert([$data]);
    }
    
    /**
    *   申請済判定
    *
    *   @param PostKobanTyouseiKanseiDisp $post
    *   @return bool
    */
    private function isApplied(PostKobanTyouseiKanseiDisp $post)
    {
        $where = $this->buildWhere($post);
        $result = $this->kobanTyousei->select($where);
        
        return isset($result[0]) && $result[0]['cd_kansei'] === '1';
    }
    
    /**
    *   調整値データ有無判定
    *
    *   @param PostKobanTyouseiKanseiDisp $post
    *   @return bool
    */
    private function hasTyouseiData(PostKobanTyouseiKanseiDisp $post)
    {
        $where = $this->buildWhere($post);
        $result = $this->kobanTyousei->select($where);
        
        return isset($result[0]);
    }
    
    /**
    *   where条件
    *
    *   @param PostKobanTyouseiKanseiDisp $post
    *   @return kobanTyouseiData
    */
    private function buildWhere(PostKobanTyouseiKanseiDisp $post)
    {
        $where = clone $this->kobanTyouseiData;
        $where->no_cyu = $post->no_cyu;
        $where->no_ko = $post->no_ko;
        return $where;
    }
}
