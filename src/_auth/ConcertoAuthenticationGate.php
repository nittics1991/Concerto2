<?php

/**
*   ConcertoAuthenticationGate
*
*   @ver 190604
*/
namespace _auth;

use Concerto\auth\authentication\AuthenticationGate;
use Concerto\auth\authentication\AuthUserInterface;

class ConcertoAuthenticationGate extends AuthenticationGate
{
    /**
    *   getUserId
    *
    *   @param string $user
    *   @return ?AuthUserInterface
    **/
    public function getUserId(string $user): ?AuthUserInterface
    {
        return $this->authUserRepository->findByUserId($user);
    }
}
