<?php

/**
*   AuthService
*
*   @ver 190612
*/
namespace _auth;

use \RuntimeException;
use Concerto\auth\authentication\AuthUserInterface;
use Concerto\auth\Csrf;
use Concerto\standard\Invokable;
use _auth\AuthFactory;
use _auth\ConcertoAuthenticationGate;
use _auth\PostLogin;
//旧画面用
use _auth\_OldScreenAuth;

class AuthService implements Invokable
{
    /**
    *   factory
    *
    *   @var AuthFactory
    **/
    private $factory;
    
    /**
    *   __construct
    *
    *   @param AuthFactory $factory
    **/
    public function __construct(AuthFactory $factory)
    {
        $this->factory = $factory;
    }
    
    /**
    *   __invoke
    *
    **/
    public function __invoke(...$args)
    {
        $this->doService();
    }
    
    /**
    *   doService
    *
    **/
    private function doService()
    {
        $illigalUserCache = $this->factory->getIlligalUserCache();
        if ($illigalUserCache->has()) {
            header('HTTP/1.1 403 Forbidden');
            die;
        }
        
        if ($this->checkAuthSession()) {
            return;
        }
        
        $post = $this->factory->getPost();
        if (!$post->isValid()) {
            $this->authCounterUp();
            $this->displayLoginView();
            die;
        }
        
        $authGate = $this->factory->getAuthGate($post->user);
        if (!$authGate->login($post->user, $post->password)) {
            $this->authCounterUp();
            $this->displayLoginView();
            die;
        }
        
        $authUser = $this->getAuthUser($authGate, $post);
        $this->saveSession($authUser);
        $this->recordLoginHistory($authUser);
        
        
        //旧画面用処理
        (new _OldScreenAuth())($authUser);
        
        
        $authCounter = $this->factory->getAuthCounter();
        $authCounter->clear();
        
        return;
    }
    
    /**
    *   checkAuthSession
    *
    *   @return bool
    **/
    private function checkAuthSession(): bool
    {
        $authSession = $this->factory->getAuthSession();
        
        if ($authSession->logined()) {
            if ($authSession->isLoginedSection()) {
                return true;
            }
            
            $authUserRepository = $this->factory->getAuthDbRepository();
            $authUser = $authSession->get();
            
            if ($authUserRepository->exists($authUser->getId())) {
                $authSession->addCurrentSection();
                return true;
            }
        }
        return false;
    }
    
    /**
    *   authCounterUp
    *
    **/
    private function authCounterUp()
    {
        $authCounter = $this->factory->getAuthCounter();
        $authCounter->increment();
        if ($authCounter->reached()) {
            $illigalUserCache = $this->factory->getIlligalUserCache();
            $illigalUserCache->set();
        }
    }
    
    /**
    *   displayLoginView
    *
    **/
    private function displayLoginView()
    {
        $csrf = htmlspecialchars(Csrf::generate(), ENT_QUOTES);
        require_once(realpath(__DIR__ . '/login_disp.php'));
    }
    
    /**
    *   getAuthUser
    *
    *   @param ConcertoAuthenticationGate $authGate
    *   @param PostLogin $post
    *   @return AuthUserInterface
    **/
    private function getAuthUser(
        ConcertoAuthenticationGate $authGate,
        PostLogin $post
    ): AuthUserInterface {
        $authUser = $authGate->getUserId($post->user);
        
        if (empty($authUser)) {
            throw new RuntimeException(
                "failed to get authentication user:{$post->user}"
            );
        }
        return $authUser;
    }
    
    /**
    *   saveSession
    *
    *   @param AuthUserInterface $authUser
    **/
    private function saveSession(AuthUserInterface $authUser)
    {
        $authSession = $this->factory->getAuthSession();
        $authSession->save($authUser);
        $authSession->addCurrentSection();
    }
    
    /**
    *   recordLoginHistory
    *
    *   @param AuthUserInterface $authUser
    **/
    private function recordLoginHistory(AuthUserInterface $authUser)
    {
        $authHistoryRepository = $this->factory->getAuthHistoryRepository();
        $authHistoryRepository->record($authUser);
        $authHistoryRepository->reflash(30 * 6);
    }
}
