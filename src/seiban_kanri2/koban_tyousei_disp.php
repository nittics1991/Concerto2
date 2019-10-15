<?php

use seiban_kanri2\model\KobanTyouseiDispControllerModel;
use seiban_kanri2\model\KobanTyouseiDispFactory;
use seiban_kanri2\view\KobanTyouseiDispView;

require_once('login.php');

$pdo = _getDBConSingleton($configSystem);
$model = new KobanTyouseiDispControllerModel(new KobanTyouseiDispFactory($pdo));

$model->setQuery();

if ($model->isValidPost()) {
    try {
        switch ($model->act) {
            case 'update':
                $model->setTyouseiData();
                break;
            case 'kansei':
                $model->setKansei();
                break;
        }
    } catch (Exception $e) {
        $log = _getLogSingleton($configSystem);
        $log->write(array(date('Ymd His'), _expansionException($e)));
    }
}

$model->buildData();
$view = new KobanTyouseiDispView($model->toArray());
