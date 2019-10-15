<?php

/**
*   auth
*
*   @version 190821
*/
// namespace _router;

use _auth\AuthService;
use _auth\AuthFactory;

(new AuthService(new AuthFactory(_getDBConSingleton($configSystem))))();
