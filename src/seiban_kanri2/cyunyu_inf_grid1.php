<?php

use Concerto\standard\StringUtil;
use seiban_kanri2\model\CyunyuInfDispControllerModel;
use seiban_kanri2\model\CyunyuInfDispFactory;

require_once('login.php');

$pdo = _getDBConSingleton($configSystem);
$model = new CyunyuInfDispControllerModel(new CyunyuInfDispFactory($pdo));

$dataset = $model->buildGridPlanData();

require_once('../_template/header_header.php');
print(StringUtil::jsonEncode($dataset));
