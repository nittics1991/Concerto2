<?php

/**
*   ConcertoAuthLdapRepositoryImpl
*
*   @ver 190828
*/
namespace _auth;

use \Exception;
use Concerto\auth\authentication\AuthUserInterface;
use Concerto\auth\authentication\AuthUserRepositoryImpl;

class ConcertoAuthLdapRepositoryImpl extends AuthUserRepositoryImpl
{
    /**
    *   {inherit}
    *
    **/
    public function findByUserId(string $userId): ?AuthUserInterface
    {
        $dataModel = $this->factory->getDataModel();
        $dataModel->username = $userId;
        $dataModel->kengen_login = '1';
        $dataMapper = $this->factory->getDataMapper();
        
        $result = $dataMapper->select($dataModel);
        if (count($result) !== 1) {
            return null;
        }
        
        $user = [
            'id' => $result[0]['tanto_code'],
            'password' => $result[0]['cd_hash'],
            'unifiedUserId' => $result[0]['username'],
            'name' => $result[0]['tanto_name'],
            'section' => $result[0]['kb_group'],
            'kengenDb' => $result[0]['kengen_db'],
            'kengenMac' => $result[0]['kengen_sm'],
            'kengenGpm' => $result[0]['kengen'],
        ];
        return $this->factory->createAuthUser($user);
    }
    
    /**
    *   {inherit}
    *
    **/
    public function validatePassword(
        AuthUserInterface $user,
        string $password
    ): bool {
        $ldap = $this->factory->getLdapConnection();
        
        if (empty($user) || empty($password)) {
            return false;
        }
        $userId = $user->unifiedUserId ?? '';
        
        try {
            $ldap->bind("{$userId}@toshiba.local", $password);
            return true;
        } catch (Exception $e) {
            return false;
        }
    }
}
