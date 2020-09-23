<template>
    <div class="content" @click="contextMenu.isShow = false">
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
                <dir-item :list="dirs" class="dir"></dir-item>
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
                                     @click="gotoPath(home_path)">
                            </div>
                            <div>
                                <img class="refresh" src="@/assets/images/refresh.png" alt=""
                                     @click="gotoPath(current_path)">
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
                <div class="dir "
                     :class="item.isActive?'active':''"
                     v-for="item of current_dir"
                     @click="dirClick(item)"
                     @dblclick="dbClick(item)"
                     @contextmenu.prevent="onContextMenu($event,item)">
                    <img src="@/assets/images/file.png" alt="" v-if="item.type">
                    <img src="@/assets/images/txt-file.png" alt="" v-else>
                    <div class="name">{{item.name}}</div>
                    <div class="change-date">{{item.change_date}}</div>
                    <div class="type">{{item|fileType}}</div>
                    <div class="size">{{item.file_size|size}}</div>
                </div>
                <div class="file-tab">
                    <div class="tab" v-for="(item,index) of readFiles" @click="showFileContent(item)">
                        <img src="@/assets/images/txt-file.png" alt="">
                        <span>{{item.title}}</span>
                        <img class="cp" src="@/assets/images/close.png" alt="" @click="removeFile(index)">
                    </div>
                </div>
                <div class="file-content" v-if="readFile.isShow">
                    <div class="title">
                        <span>{{readFile.title}}</span>
                        <img class="cp" src="@/assets/images/close.png" alt="" @click="readFile.isShow = false">
                    </div>
                    <pre>{{readFile.content}}</pre>
                </div>
            </div>
        </div>

        <div v-if="contextMenu.isShow" :style="{top:contextMenu.top+'px',left:contextMenu.left+'px'}"
             class="contextmenu">
            <div class="item">
                <img src="@/assets/images/file.png" alt="">
                <span>刷新目录</span>
            </div>
            <div class="item">
                <img src="@/assets/images/file.png" alt="">
                <span>上传文件</span>
            </div>
            <div class="item" @click="download()">
                <img src="@/assets/images/file.png" alt="">
                <span>下载文件</span>
            </div>
            <div class="item" @click="deleteFile()">
                <img src="@/assets/images/file.png" alt="">
                <span>删除</span>
            </div>
            <div class="item" @click="rename">
                <img src="@/assets/images/file.png" alt="">
                <span>重命名</span>
            </div>
            <div class="item" @click="createFile">
                <img src="@/assets/images/file.png" alt="">
                <span>新建</span>
            </div>
            <div class="item">
                <img src="@/assets/images/file.png" alt="">
                <span>在此处打开终端</span>
            </div>
        </div>
    </div>
</template>

<script>
    import DirItem from "./DirItem"
    import File from '../../template/php/file.js'

    export default {
        components: {
            'dir-item': DirItem
        },
        data() {
            return {
                shell: {
                    url: 'http://localhost/shell.php',
                    pwd: 'c',
                    shellUrl: '',
                },
                contextMenu: {
                    isShow: false,
                    top: 0,
                    left: 0,
                    path: '',
                    file: '',
                },
                readFile: {
                    isShow: false,
                    content: '',
                    title: '',
                    path: ''
                },
                readFiles: [],
                root_path: '',
                current_dir: [],
                current_path: '',
                current_parse_path: [],
                home_path: '',
                dirs: [],
                dirs2: [
                    {
                        "name": "D:",
                        "children": [
                            {
                                "name": "code",
                                "children": [
                                    {
                                        "name": "php",
                                        "children": [
                                            {
                                                "name": "niuniu",
                                                'children': []
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        },
        created() {
            this.init()
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
            async init() {
                this.shell.shellUrl = this.generateShellUrl()
                await this.getCurrentPath()

            },
            generateShellUrl() {
                if (this.shell.url.indexOf('?') !== -1) {
                    return this.shell.url + '&' + this.shell.pwd + '='
                }
                return this.shell.url + '?' + this.shell.pwd + '='
            },
            async getCurrentPath() {
                this.home_path = this.current_path = await this.$request(this.shell.shellUrl + new File().pwd())+'/'
                this.parsePath(this.current_path)
                await this.gotoPath(this.current_path)

            },
            async download() {
                console.log(this.contextMenu.path);
                let s = new File(this.contextMenu.path).download()
                console.log(s);
                let res = await this.request(s)
                console.log(res);
            },
            async createFile() {
                console.log(this.contextMenu.path);
                let s = new File(this.contextMenu.path + 'test.txt').create()
                console.log(s);
                let res = await this.request(s)
                console.log(res);
            },
            async deleteFile() {
                console.log(this.contextMenu.path);
                let s = new File(this.contextMenu.file).delete()
                console.log(s);
                let res = await this.request(s)
                console.log(res);
            },
            async rename() {
                console.log(this.contextMenu.path);
                let s = new File(this.contextMenu.file, this.contextMenu.file + '2').rename()
                console.log(s);
                let res = await this.request(s)
                console.log(res);
            },
            onContextMenu(e, item) {
                console.log(e, item);
                // console.log(e.clientX, '----', e.clientY);
                // console.log(e.pageX, '----', e.pageY);
                // console.log(e.offsetX, '----', e.offsetY);
                // console.log(e.screenX, '----', e.screenY);
                // console.log(e.x, '----', e.y);
                this.contextMenu.isShow = true
                this.contextMenu.top = e.y
                this.contextMenu.left = e.x
                this.contextMenu.file = this.current_path + item.name
                this.contextMenu.path = this.current_path
            },
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
                // this.con(paths);
                let deepNodeIndex = []
                for (let i = 0; i < paths.length; i++) {
                    let v = paths[i]
                    if (deepNodeIndex.length) {
                        let node = {}
                        deepNodeIndex.map(v => {
                            if (node.children && node.children.length) {
                                node = node.children[v]
                            } else {
                                node = this.dirs[v]
                            }
                        })
                        // this.con(node);
                        let index = node.children.findIndex(w => w.name === v)
                        if (index !== -1) {
                            deepNodeIndex.push(index)
                        } else {
                            break
                        }
                    } else {
                        let index = this.dirs.findIndex(w => w.name === v)
                        if (index !== -1) {
                            deepNodeIndex.push(index)
                        } else {
                            break
                        }
                    }
                }

                let pathDir = {}
                for (let i = paths.length - 1; i >= deepNodeIndex.length; i--) {
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
                // this.con(pathDir)
                // console.log(deepNodeIndex);
                // this.con(paths6)
                if (deepNodeIndex.length) {
                    let node = {}
                    deepNodeIndex.map(v => {
                        if (node.children && node.children.length) {
                            node = node.children[v]
                        } else {
                            node = this.dirs[v]
                        }
                    })
                    if (Object.keys(pathDir).length) {
                        node.children.push(pathDir)
                    } else {
                        this.current_dir.map(v => {
                            // console.log(v);
                            console.log();
                            if (v.type && v.name !== '..' && v.name !== '.') {
                                node.children.push({
                                    name: v.name,
                                    children: []
                                })
                            }
                        })
                    }
                } else {
                    this.dirs.push(pathDir)
                }
                // this.con(this.dirs)
            },
            dirClick(item) {
                this.current_dir = this.current_dir.map(v => {
                    v.isActive = false;
                    return v
                })
                item.isActive = true
            },
            async gotoPath(path) {
                let res = await this.$request(this.shell.shellUrl + new File(path + '/').dir())
                let row = res.split('\n')
                row.map(v => {
                    if (v) {
                        let row = v.split('``')
                        this.current_dir.push({
                            name: row[0],
                            type: Number(row[1]),
                            change_date: row[2],
                            file_size: row[3],
                        })
                    }
                })
            },
            dbClick(item) {
                let gotoPath = this.current_path + item.name
                if (item.type) {
                    this.gotoPath(gotoPath)
                } else {
                    let suffixIndex = gotoPath.lastIndexOf('.')
                    let suffix = gotoPath.substr(suffixIndex + 1).toLowerCase();
                    let allowReadSuffix = [
                        'txt',
                        'php',
                        'php4',
                        'php5',
                        'asp',
                        'aspx',
                        'jsp',
                        'jspx',
                        'htaccess',
                    ]
                    console.log(item);
                    if (allowReadSuffix.find(v => v === suffix) && (item.file_size < 1024 * 1024)) {
                        console.log('在其中');
                        this.readFileContent(gotoPath, item.name)
                    } else {
                        console.log('不在其中');
                    }
                }
            },
            readFileContent(path, fileName) {
                let that = this
                let phpCode = 'echo @file_get_contents( \'' + path + '\');'
                $.ajax({
                    url: 'http://localhost/shell.php?c=' + phpCode,
                    success(res) {
                        // console.log(res);
                        that.readFile.isShow = true;
                        that.readFile.title = fileName;
                        that.readFile.content = res;
                        that.readFile.path = path;
                        that.readFiles.push({
                            title: fileName,
                            content: res,
                            path: path,
                            // isShow: true
                        })
                    }
                })
            },
            removeFile(i) {
                console.log(i);
                let fileTab = this.readFiles[i]
                if (fileTab.path === this.readFile.path) {
                    this.readFile = {
                        isShow: false,
                        content: '',
                        title: '',
                        path: ''
                    }
                }
                this.readFiles.splice(i, 1)
                if (this.readFiles.length === 0) {
                    this.readFile.isShow = !this.readFile.isShow
                }
            },
            showFileContent(item) {
                let that = this
                that.readFile.isShow = !that.readFile.isShow
                that.readFile.title = item.title;
                that.readFile.content = item.content;
                that.readFile.path = item.path;
            },
            con(res) {
                console.log(JSON.stringify(res, null, 4));
            },
            async request(phpCode) {
                return new Promise(resolve => {
                    $.ajax({
                        url: 'http://localhost/shell.php?c=' + phpCode,
                        success(res) {
                            resolve(res)
                        }
                    })
                })
            }
        },
        mounted() {
            this.$bus.$on('gotoPath', v => {
                console.log(v);
                this.gotoPath(v)
            })
        }
    }
</script>

<style lang="scss" scoped>
    .content {
        height: 100%;
        width: 100%;
        position: relative;

        img {
            height: 15px;
        }

        .cp {
            cursor: pointer;
        }

        .contextmenu {
            /*width: 100px;*/
            /*height: 200px;*/
            background: darkgray;
            border-radius: 4px;
            position: absolute;
            top: 50px;

            .item {
                cursor: pointer;
                display: flex;
                align-items: center;
                padding: 10px;

                img {
                    margin-right: 10px;
                }
            }
        }


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
            height: 100%;


            .left-dir {
                width: 20%;
                overflow: auto;

                .dir {
                    //background: #999999;
                    //border: 1px solid #999999;
                    margin: 2px;

                }
            }

            .dir-content {
                width: 80%;
                height: 100%;
                overflow: auto;
                position: relative;

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
                                overflow: auto;

                                &::-webkit-scrollbar {
                                    display: none; /* Chrome Safari */
                                }

                                div {
                                    height: 100%;
                                    display: flex;
                                    align-items: center;
                                    padding: 0 8px;
                                    white-space: nowrap; //强制文本不换行

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
                    /*margin: 3px;*/
                    padding: 6px;

                    &.active {
                        background: rgb(204, 232, 255);
                    }

                    &:hover {
                        background: rgb(229, 243, 255);
                    }

                    .name {
                        width: 50%;
                        margin-left: 10px;
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

                .file-tab {
                    z-index: 9;
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    background: #e8e7e7;
                    display: flex;
                    overflow: auto;

                    .tab {
                        cursor: pointer;
                        padding: 5px;
                        display: flex;
                        align-items: center;
                        background: lightgray;
                        margin-right: 5px;
                        border-radius: 4px 4px 0 0;

                        img {
                            margin: 2px 5px;
                            height: 15px;
                        }
                    }
                }

                .file-content {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    background: #fff;

                    .title {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        height: 40px;
                        border-bottom: 1px solid #cbcbcb;
                        padding: 0 20px;


                    }
                }
            }
        }
    }
</style>
