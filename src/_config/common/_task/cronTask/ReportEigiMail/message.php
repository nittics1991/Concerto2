<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"> 
<html lang="ja"> 
<head> 
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"> 
</head> 
<body> 
<div style="font-family:Meiryo UI; font-size:13.33px;"> 
<div>【１．受注（内示）情報】</div> 
<div>【２．受注活動状況】</div> 

<?php foreach ($individual_list as $list) : ?>
    <div>■<?= $list['nm_setti']; ?>/<?= $list['nm_syohin']; ?> (<?= $list['to_first_name']; ?>) <?= $list['is_new']; ?></div> 
    <div>概要：</div> 
    <div>計数：SP：<?= $list['yn_sp']; ?>M\ TOV：<?= $list['yn_tov']; ?>M\ M：<?= $list['yn_soneki']; ?>M\</div> 
    <div>納期：<?= $list['dt_puriage']; ?></div> 
    <div>&nbsp;</div> 
<?php endforeach; ?>

<div>【３．ＪＯＢ進捗状況（トピックス）】</div> 
<div>【４．トラブル】</div> 
<div>【５．ＣＤ活動・品質活動・技術活動進捗状況】</div> 
<div>【６．その他】</div> 
</div> 
</body> 
</html> 
