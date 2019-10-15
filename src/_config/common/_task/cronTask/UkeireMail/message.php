注文品を受入れました。

●リンク：<?= MAIN_URL; ?>/tyotatu_inf/index.php

●注文
<?php foreach ($individual_list as $list) : ?>
    <?= $list['dt_sinsei']; ?> <?= $list['nm_to']; ?> <?= $list['no_cyumon']; ?> <?= $list['tori_name']; ?> <?= $list['h_hinmei']; ?> <?= $list['no_cyu']; ?> <?= $list['no_ko']; ?> <?= $list['nm_syohin']; ?> <?= $list['no_setti']; ?> 
<?php endforeach; ?>
