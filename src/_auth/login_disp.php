<?php
header("Content-type:text/html; charset=UTF-8");

?>
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<title>ログイン画面</title>
<style>
body {
    background-color:#c0c0c0;
}

.center {
    margin-left:auto;
    margin-right:auto;
    text-align:center;
}

.td-data {
    width:100px;
}

.td-input {
    width:100%;
}

#image {
    width:400px;
    height:50px;
}

#inputbox {
    margin-top:20px;
}

</style>
</head>
<body>
<form name="form1" method="POST">
<input type="hidden" name="token" value="<?= $csrf; ?>">
<input type="hidden" name="hidden_string" value="login_disp">
<div class="center">
<img id="image" src="/_images/button.files/<?= MENU_TITLE; ?>">
</div>

<table id="inputbox" class="center">

<tr>
<td class="td-title">ユーザID</td>
<td class="td-data"><input type="text" class="td-input" name="user" size="20" maxlength="20"></td>
</tr>

<tr>
<td class="td-title">パスワード</td>
<td class="td-data"><input type="password" class="td-input" name="password" size="20" maxlength="20"></td>
</tr>

<tr>
<td class="td-title"></td>
<td class="td-data"><button type="submit" class="center">実行</button></td>
</tr>

</table>
</form>
</body>

<script>
document.form1.user.focus();

</script>
</html>
