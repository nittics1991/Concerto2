<?php
/**
*   deprecate
*
*   @version 190426
*/
// namespace _function;

////////////////////////////////////////////////////////////////////////////////////////////////////
//  tqm, ComFunc
////////////////////////////////////////////////////////////////////////////////////////////////////
/**
*   年度内月配列(上期)
*
*   @param integer 番号0-6
*   @return string 指定された番号の月 or null
*   @return array 年度内月配列($id = null)
*/
function _getArrayMonthKami($id = null)
{
    $months = array('04', '05', '06', '07', '08', '09');
    
    if (is_null($id)) {
        return $months;
    } else {
        return $months[$id];
    }
}

/**
*   年度内月配列(下期)
*
*   @param integer 番号0-6
*   @return string 指定された番号の月 or null
*   @return array 年度内月配列($id = null)
*/
function _getArrayMonthSimo($id = null)
{
    $months = array('10', '11', '12', '01', '02', '03');
    
    if (is_null($id)) {
        return $months;
    } else {
        return $months[$id];
    }
}

/**
*   現年度
*
*   @return string 現年度
*/
function _getPresentNendo()
{
    $today = getdate();
    
    if (($today['mon'] >= 10) && ($today['mon'] <= 12)) {
        return $today['year'] . 'S';
    } elseif (($today['mon'] >= 1) && ($today['mon'] <= 3)) {
        return ($today['year'] - 1) . 'S';
    } else {
        return $today['year'] . 'K';
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
//  claim, gyosya_hattyu, kanri_data, seisan_syukei, wf
////////////////////////////////////////////////////////////////////////////////////////////////////

/**
*   年度記号＝＞年度全角
*
*   @param string 年度(yyyyK or yyyyS)
*   @return string 年度(ｙｙｙｙ年上期 or ｙｙｙｙ年下期) or false
*
*   @example 2013K => ２０１３年上期
*/
function _nendoCodeToZn($kb_nendo)
{
    if (preg_match('/^[0-9]{4}(K|S)$/', $kb_nendo)) {
        if (substr($kb_nendo, 4, 1) == 'K') {
            return mb_convert_kana(substr($kb_nendo, 0, 4), 'N') . '年上期';
        } else {
            return mb_convert_kana(substr($kb_nendo, 0, 4), 'N') . '年下期';
        }
    } else {
        return false;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
//  claim, gyosya_hattyu, kanri_data, seisan_syukei
////////////////////////////////////////////////////////////////////////////////////////////////////

/**
*   年度内年月
*
*   @param string 年度(yyyyK or yyyyS) 省略時は現年度指定とする
*   @return string 年月 or false
*/
function _getNendoyyyymm($kb_nendo = null)
{
    $kb_nendo_tmp = (is_null($kb_nendo)) ?  _getPresentNendo() : $kb_nendo;
    
    if (preg_match('/^[0-9]{4}(K|S)$/', $kb_nendo_tmp)) {
        if (substr($kb_nendo_tmp, 4, 1) == 'K') {
            $month_list = _getArrayMonthKami();
            
            for ($i = 0; $i < 6; $i++) {
                $yyyymm[$i] = substr($kb_nendo_tmp, 0, 4) . $month_list[$i];
            }
        } else {
            $month_list = _getArrayMonthSimo();
            
            for ($i = 0; $i < 3; $i++) {
                $yyyymm[$i] = substr($kb_nendo_tmp, 0, 4) . $month_list[$i];
            }
            
            for ($i = 3; $i < 6; $i++) {
                $yyyymm[$i] = (substr($kb_nendo_tmp, 0, 4) + 1) . $month_list[$i];
            }
        }
        
        return $yyyymm;
    } else {
        return false;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
//  tqm, seisan_syukei
////////////////////////////////////////////////////////////////////////////////////////////////////

/**
*   年月=>年度
*
*   @param string 年月
*   @return string 年度(yyyyK or yyyyS) or false
*/
function _getyyyymmToNendo($yyyymm)
{
    if (preg_match('/^[0-9]{6}$/', $yyyymm)) {
        $yyyy   = substr($yyyymm, 0, 4);
        $mm     = substr($yyyymm, 4, 2);
        
        if (($mm >= '01') && ($mm <= '03')) {
            return ($yyyy - 1) . "S";
        } elseif (($mm >= '04') && ($mm <= '09')) {
            return $yyyy . "K";
        } elseif (($mm >= '10') && ($mm <= '12')) {
            return $yyyy . "S";
        } else {
            return false;
        }
    } else {
        return false;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
//  Windowsファイル関数
////////////////////////////////////////////////////////////////////////////////////////////////////
/*
    ファイル名取得
*/
function _winBasename($filename)
{
    try {
        $com = new COM("Scripting.FileSystemObject");
        $file_sjis = mb_convert_encoding($filename, 'SJIS', 'auto');
        
        $file = $com->GetFileName($file_sjis);
    } catch (Exception $e) {
        error_log(date('Y/m/d_H:i:s') . ' _winBasename==>' . $e->getLine() . ' LINE_' . $e->getMessage() . "\r\n", 3, getcwd() . DIRECTORY_SEPARATOR . 'err.log');
        $com = null;
        return false;
    }
    
    $com = null;
    return $file;
}

/*
    ファイルコピー
*/
function _winCopy($from, $to, $jyufuku = false)
{
    try {
        $com = new COM("Scripting.FileSystemObject");
        $from_sjis = mb_convert_encoding($from, 'SJIS', 'auto');
        $to_sjis = mb_convert_encoding($to, 'SJIS', 'auto');
        
        $ans = $com->CopyFile($from_sjis, $to_sjis, $jyufuku);
    } catch (Exception $e) {
        error_log(date('Y/m/d_H:i:s') . ' _winCopy==>' . $e->getLine() . ' LINE_' . $e->getMessage() . "\r\n", 3, getcwd() . DIRECTORY_SEPARATOR . 'err.log');
        $com = null;
        return false;
    }
    
    $com = null;
    return true;
}

/*
    ファイルディレクトリ名取得
*/
function _winDirname($filename)
{
    try {
        $com = new COM("Scripting.FileSystemObject");
        $file_sjis = mb_convert_encoding($filename, 'SJIS', 'auto');
        
        $dir = $com->GetParentFolderName($file_sjis);
    } catch (Exception $e) {
        error_log(date('Y/m/d_H:i:s') . ' _winDirname==>' . $e->getLine() . ' LINE_' . $e->getMessage() . "\r\n", 3, getcwd() . DIRECTORY_SEPARATOR . 'err.log');
        $com = null;
        return false;
    }
    
    $com = null;
    return $dir;
}

/*
    ファイル拡張子取得
*/
function _winFileExt($filename)
{
    try {
        $com = new COM("Scripting.FileSystemObject");
        $file_sjis = mb_convert_encoding($filename, 'SJIS', 'auto');
        
        $ext = $com->GetExtensionName($file_sjis);
    } catch (Exception $e) {
        error_log(date('Y/m/d_H:i:s') . ' _winFileExt==>' . $e->getLine() . ' LINE_' . $e->getMessage() . "\r\n", 3, getcwd() . DIRECTORY_SEPARATOR . 'err.log');
        $com = null;
        return false;
    }
    
    $com = null;
    return $ext;
}

/*
    ファイルサイズ取得
*/
function _winFilesize($filename)
{
    try {
        $com = new COM("Scripting.FileSystemObject");
        $file_sjis = mb_convert_encoding($filename, 'SJIS', 'auto');
        $file = $com->GetFile($file_sjis);
        $file_size = $file->Size;
    } catch (Exception $e) {
        error_log(date('Y/m/d_H:i:s') . ' _winFilesize==>' . $e->getLine() . ' LINE_' . $e->getMessage() . "\r\n", 3, getcwd() . DIRECTORY_SEPARATOR . 'err.log');
        $file = null;
        $com = null;
        return false;
    }
    
    $file = null;
    $com = null;
    return $file_size;
}

/*
    ファイル存在
*/
function _winFile_exists($filename)
{
    try {
        $com = new COM("Scripting.FileSystemObject");
        $file_sjis = mb_convert_encoding($filename, 'SJIS', 'auto');
        $ans = $com->FileExists($file_sjis);
    } catch (Exception $e) {
        error_log(date('Y/m/d_H:i:s') . ' _winFile_exists==>' . $e->getLine() . ' LINE_' . $e->getMessage() . "\r\n", 3, getcwd() . DIRECTORY_SEPARATOR . 'err.log');
        $com = null;
        return false;
    }
    
    $com = null;
    return $ans;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
//  ファイル関数
////////////////////////////////////////////////////////////////////////////////////////////////////
//ロックファイル名
define('LOCK_FILE', 'lock');
//ロックリトライ回数
define('LOCK_RETRY', 5);
//ロックタイムオーバ
define('LOCK_TIMEOVER', 60);

/*
    カレントディレクトリにテンポラリディレクトリ作成
*/
function _createCurrentTempDir($name)
{
    $tmp_path = getcwd() . DIRECTORY_SEPARATOR . $name;
    
    if (!file_exists($tmp_path)) {
        mkdir($tmp_path);
    }
}

/*
    ファイルダウンロード
*/
function _fileDownload($filepath)
{
    try {
        if (!_winFile_exists($filepath)) {
            die('ファイルが見つかりません');
        }
        
        //ファイルをコピーしてダウンロード
        _createCurrentTempDir('tmp');
        
        $path = _winDirname($filepath);
        $to_file = $path . '\\tmp\\' . date('Ymd_His') . '.' . _winFileExt($filepath);
        
        if (!_winCopy($filepath, $to_file, true)) {
            die('ダウンロード用ファイルコピー失敗');
        }
        
        $cnt = 0;
        while (!_winFileExt($to_file)) {
            if ($cnt > 10) {
                die('ダウンロード用ファイルコピータイムアウト');
            }
            sleep(1);
            $cnt++;
        }
        
        $file_sjis = mb_convert_encoding($to_file, 'SJIS');
        $file_size = _winFilesize($to_file);
        $file_url = urlencode(mb_convert_encoding(_winBasename($filepath), 'UTF8', 'SJIS'));
        
        ob_clean();
        mb_http_output('pass');
        ob_start('mb_output_handler');
        
        header("Content-Disposition: attachment; filename=\"" . basename($file_url) . "\"");
        header("Content-Length: " . $file_size);
        header("Content-Type: application/octet-stream");
        
        if (!readfile($file_sjis)) {
            die("Cannot read file(" . $file_sjis . ")");
        }
    } catch (Exception $e) {
        error_log(date('Y/m/d_H:i:s') . ' _createCurrentTempDir==>' . $e->getLine() . ' LINE_' . $e->getMessage() . "\r\n", 3, getcwd() . DIRECTORY_SEPARATOR . 'err.log');
        return false;
    }
    
    unlink($to_file);
    return true;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
//  EXCEL関連
////////////////////////////////////////////////////////////////////////////////////////////////////

/*
    EXCELダウンロード出力
*/
function _createCsvThroughExcel($input_code, $template, $logicFile, $cd_bumon = null)
{
    global $pg_con;
    
    //basename($template)の変換失敗対策
    setlocale(LC_ALL, 'jpn_jpn');
    
    if (empty($cd_bumon)) {
        $tanto_list = (array)_getTantoListByComFunc(null, $input_code);
        
        $filename = $input_code . '_' . $tanto_list[0]['kb_group'] . '_' . basename($template);
    } else {
        $filename = $input_code . '_' . $cd_bumon . '_' . basename($template);
    }
    
    $flg = false;
    try {
        $tmp_dir = 'tmp';
        _createCurrentTempDir($tmp_dir);
        
        $base_file = getcwd() . DIRECTORY_SEPARATOR . $template;
        $ext = '.' . pathinfo($template, PATHINFO_EXTENSION);
        $out_file =
            getcwd()
            . DIRECTORY_SEPARATOR
            . $tmp_dir
            . DIRECTORY_SEPARATOR
            . date('Ymd_His')
            . $ext;
        
        $excel = new COM("excel.application") or die;
        $excel->DisplayAlerts = 0;
        
        $workbook = $excel->Workbooks->Open(mb_convert_encoding($base_file, "SJIS", "auto"));
        $workbook->SaveAs(mb_convert_encoding($out_file, "SJIS", "auto"));
        
        register_shutdown_function('_excelShutdown', $excel, $workbook);
        
        //EXCELデータ作成
        require_once($logicFile);
        
        $workbook->Worksheets(1)->activate;
        $workbook->Save();
        $flg = true;
    } catch (Exception $e) {
        error_log(date('Y/m/d_H:i:s') . ' _createCsvThroughExcel==>' . $e->getLine() . ' LINE_' . $e->getMessage() . "\r\n", 3, getcwd() . DIRECTORY_SEPARATOR . 'err.log');
    }
    
    @$workbook->close();
    @$excel->Quit();
    unset($excel);
    
    if ($flg) {
        ob_clean();
        $file_sjis = mb_convert_encoding($out_file, 'SJIS');
        $file_size = filesize($out_file);
        $file_url = urlencode($filename);
        
        mb_http_output('pass');
        ob_start('mb_output_handler');
        
        header("Content-Disposition: attachment; filename=\"" . basename($file_url) . "\"");
        header("Content-Length: " . $file_size);
        header("Content-Type: application/octet-stream");
        
        if (!readfile($file_sjis)) {
            error_log(date('Y/m/d_H:i:s') . ' _createCsvThroughExcel==>' . $e->getLine() . ' LINE_' . $e->getMessage() . "\r\n", 3, getcwd() . DIRECTORY_SEPARATOR . 'err.log');
        }
        
        $result = unlink($file_sjis);
    }
}

/*
    EXCELエラーコールバック
*/
function _excelShutdown($excel, $workbook)
{
    //$workbookがcloseされた時、$workbooはvariantでemptyにならない対策
    if (!empty($workbook) && variant_get_type($workbook) != 9) {
        @$workbook->close;
    }
    if (!empty($excel)) {
        @$excel->Quit;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
//  alarm, claim, kanri_data, seisan_syukei, voc, wf
////////////////////////////////////////////////////////////////////////////////////////////////////
/*
    部門リスト
*/
function _getBumonList($cd_bumon = null, $fg_genzai = null, $fg_cost = null, $fg_siyo = null, $fg_hatu = null, $kb_nendo = null)
{
    global $pg_con;
    
    $sql = "SELECT * 
			FROM mst_bumon 
			WHERE (bumon_code = $1 AND $2 = $2 AND fg_cost = $3 AND fg_siyo = $4 AND fg_hatu = $5
				AND kb_nendo <= $6 AND kb_nendo_e >= $6) IS NOT FALSE 
			ORDER BY bumon_code
	";
    
    $pre = pg_prepare($pg_con, '', $sql);
    $params = array($cd_bumon, $fg_genzai, $fg_cost, $fg_siyo, $fg_hatu, $kb_nendo);
    $result = pg_execute($pg_con, '', $params);
    
    return pg_fetch_all($result);
}
////////////////////////////////////////////////////////////////////////////////////////////////////
//
////////////////////////////////////////////////////////////////////////////////////////////////////
/*
    担当者リスト
*/
function _getTantoListByComFunc($cd_bumon = null, $cd_tanto = null, $kengen_sm = null, $kengen = null)
{
    global $pg_con;
    
    $sql = "SELECT *  
			FROM mst_tanto 
			WHERE (kb_group = $1 AND tanto_code = $2 AND kengen_sm = $3 AND kengen = $4) IS NOT FALSE 
			ORDER BY disp_seq 
	";
    
    $pre = pg_prepare($pg_con, '', $sql);
    $params = array($cd_bumon, $cd_tanto, $kengen_sm, $kengen);
    $result = pg_execute($pg_con, '', $params);
    
    return pg_fetch_all($result);
}
