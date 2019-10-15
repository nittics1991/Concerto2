設備マスタからのメールです。
メール配信を停止する為、設備マスタ画面で通知日を削除してください。

●リンク：<?= MAIN_URL; ?>/setubi_inf2/index.php

●設備
<?php foreach ($individual_list as $list) : ?>
    ID:<?= $list['cd_setubi']; ?> 
    管理番号:<?= $list['no_seizo']; ?> 
    型式:<?= $list['no_model']; ?> 
    保管場所:<?= $list['ho_basyo']; ?> 
    備考:<?= $list['nm_biko']; ?> 
    メッセージ:<?= $list['nm_message']; ?> 

<?php endforeach; ?>
