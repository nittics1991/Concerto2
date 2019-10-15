<?php

/**
*   ConcertoAuthSession
*
*   @ver 190605
*/
namespace _auth;

use \RuntimeException;
use Concerto\auth\authentication\AuthSession;
use Concerto\standard\Server;

class ConcertoAuthSession extends AuthSession
{
    /**
    *   sectionName
    *
    *   @var string
    **/
    protected $sectionName = 'loginedSection';
    
    /**
    *   ログイン済みセクション判定
    *
    *   @return bool
    **/
    public function isLoginedSection(): bool
    {
        return in_array(
            $this->parseSectionFromUrl(),
            $this->session->has($this->sectionName) ?
                $this->session->get($this->sectionName) : []
        );
    }
    
    /**
    *   現在のセクションを追加
    *
    *   @return $this
    **/
    public function addCurrentSection()
    {
        if ($this->isLoginedSection()) {
            return $this;
        }
        
        $loginedSection = $this->session->has($this->sectionName) ?
            $this->session->get($this->sectionName) : [];
        
        $loginedSection[] = $this->parseSectionFromUrl();
        $this->session->set($this->sectionName, $loginedSection);
        return $this;
    }
    
    /**
    *   URLからセクション取得
    *
    *   @return string
    **/
    public function parseSectionFromUrl(): string
    {
        $url = Server::get('request_uri');
        $splited = mb_split('/', $url);
        
        if (!mb_ereg_match('^itc_work[1-6]{0,1}$', $splited[1])) {
            throw new RuntimeException(
                "failed to get URL:{$url}"
            );
        }
        return $splited[1];
    }
}
