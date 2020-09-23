class File {
    constructor(arg1, arg2) {
        this.arg1 = arg1
        this.arg2 = arg2
        console.log(1);
    }

    dir() {
        return `
        header("Content-Type: text/html;charset=GBK");
        $dir = '${this.arg1}';
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
            echo $res;
        }
        `
    }

    pwd() {
        return `
        $path = dirname($_SERVER["SCRIPT_FILENAME"]);
        if ($path == "") $path = dirname($_SERVER["PATH_TRANSLATED"]);
        if ($path == "") $path = getcwd();
        echo $path;
        `
    }

    download() {
        return `
        header('Content-Length:' . filesize('${this.arg1}'));
        header('Content-Disposition:attachment;filename=' . basename('${this.arg1}'));
        echo @file_get_contents('${this.arg1}');
       `
    }

    upload() {
        return `
        header('Content-Length:' . filesize('${this.arg1}'));
        header('Content-Disposition:attachment;filename=' . basename('${this.arg1}'));
        echo @file_get_contents('${this.arg1}');
       `
    }

    create() {
        return `
       @file_put_contents('${this.arg1}', '');
       `
    }

    delete() {
        return `
       @unlink('${this.arg1}');
       `
    }

    rename() {
        return `
       @rename('${this.arg1}','${this.arg2}');
       `
    }
}

export default File
