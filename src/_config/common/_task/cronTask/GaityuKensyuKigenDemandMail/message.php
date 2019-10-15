外注の検収期限日が経過しています。

●リンク：<?= MAIN_URL; ?>/tyotatu_inf/index.php

●注文情報
<?php foreach ($individual_list as $list) : ?>
    <?= $list['noki_day']; ?> <?= $list['chuban']; ?> <?= $list['koban']; ?> <?= $list['nm_setti']; ?> <?= $list['nm_syohin']; ?> <?= $list['irai_no']; ?> <?= $list['tori_name']; ?> <?= $list['h_hinmei']; ?> 
<?php endforeach; ?>
