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
                <dir-item :list="dirs" class="drive"></dir-item>
            </div>
            <div class="dir-content">
                <div class="float-top">
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
                                    <img class="arrow-up" src="@/assets/images/arrow.png" alt=""
                                         @click="back()">
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
                    <div class="dir-des">
                        <div class="name">名称</div>
                        <div class="change-date">修改日期</div>
                        <div class="type">类型</div>
                        <div class="size">大小</div>
                    </div>
                </div>
                <div class="dirs">
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
                </div>
                <div class="file-tab">
                    <div class="tab" v-for="(item,index) of readFiles" @click="showFileContent(item)">
                        <img src="@/assets/images/txt-file.png" alt="">
                        <span>{{item.title}}</span>
                        <img class="cp" src="@/assets/images/close.png" alt="" @click="removeFile(index)">
                    </div>
                </div>
            </div>
        </div>
        <div class="file-content" v-if="readFile.isShow">
            <div class="header">
                <span class="title">{{readFile.title}}</span>
                <div class="right">
                    <div class="button">保存</div>
                    <img class="cp" src="@/assets/images/close.png" alt="" @click="readFile.isShow = false">
                </div>
            </div>
            <div class="content">
                <div class="lines">
                    <div class="line-number" v-for="item of readFile.lines">{{item}}</div>
                </div>
                <!--                <textarea>{{readFile.content}}</textarea>-->
                <pre contenteditable="">{{readFile.content}}</pre>
            </div>
        </div>

        <div v-if="contextMenu.isShow" :style="{top:contextMenu.top+'px',left:contextMenu.left+'px'}"
             class="contextmenu">
            <div class="item" @click="gotoPath(current_path)">
                <img src="@/assets/images/file.png" alt="">
                <span>刷新目录</span>
            </div>
            <div class="item" @click="$refs.file.click()">
                <input type="file" ref="file" id="file" style="display: none" @change="upload($event)">
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
            <div class="item" @click="isShowDialog = true">
                <img src="@/assets/images/file.png" alt="">
                <span>新建</span>
            </div>
            <div class="item">
                <img src="@/assets/images/file.png" alt="">
                <span>在此处打开终端</span>
            </div>
        </div>
        <div class="mask" v-if="isShowDialog"></div>
        <div class="dialog" v-if="isShowDialog">
            <div class="header">
                新建
            </div>
            <div class="content">
                名称:<input type="text" v-model="createFileName">
            </div>
            <div class="footer">
                <div class="button primary" @click="isShowDialog = false">取消</div>
                <div class="button primary" @click="createFile()">确定</div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import DirItem from "./DirItem"
    import File from '../../template/php/file.js'
    import CONSTANT from "../../utils/const_var";

    export default {
        components: {
            'dir-item': DirItem
        },
        data() {
            return {
                isShowDialog: false,
                createFileName: '',
                shell: {
                    url: 'api/shell.php',
                    pwd: 'c',
                    shellUrl: 'api/shell.php?c=',
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
                    lines: 0,
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
            async upload(e) {
                // console.log(e);
                let file = e.path[0].files[0]
                let formData = new FormData()
                formData.append('file', file)
                let res = await axios.post(this.shell.shellUrl + new File(file.name).upload(), formData, {
                    headers: {'Content-type': 'multipart/form-data'}
                })
                await this.gotoPath(this.current_path)
                // console.log(res);

            },
            back() {
                let backUrl = JSON.parse(JSON.stringify(this.current_parse_path))
                backUrl.pop()
                if (backUrl.length) {
                    backUrl = backUrl.join('/')
                    console.log(backUrl);
                    this.gotoPath(backUrl)
                }
            },
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
                let res = await this.$request(this.shell.shellUrl + new File().pwd()) + '/'
                res = res.split('``')
                this.home_path = this.current_path = res[1]
                res[0].split('|').map(v => {
                    if (v) {
                        this.dirs.push({
                            name: v,
                            isClose: true,
                            children: []
                        })
                    }
                })
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
                let s = new File(this.contextMenu.path + this.createFileName).create()
                console.log(s);
                let res = await this.request(s)
                console.log(res);
                await this.gotoPath(this.current_path)
                this.isShowDialog = false
            },
            async deleteFile() {
                console.log(this.contextMenu.path);
                let s = new File(this.contextMenu.file).delete()
                console.log(s);
                let res = await this.request(s)
                console.log(res);
                await this.gotoPath(this.current_path)
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
                // console.log(deepNodeIndex);

                let pathDir = {}
                for (let i = paths.length - 1; i >= deepNodeIndex.length; i--) {
                    let v = paths[i]
                    if (i === paths.length - 1) {
                        pathDir.name = v
                        pathDir.children = []
                        pathDir.isClose = false
                    } else {
                        let temp = {}
                        temp.name = v
                        temp.isClose = false
                        temp.children = [pathDir]
                        pathDir = temp
                    }
                }
                // this.con(pathDir)
                // this.con(paths6)
                if (deepNodeIndex.length) {
                    let node = {}
                    deepNodeIndex.map(v => {
                        if (node.children && node.children.length) {
                            node = node.children[v]
                        } else {
                            node = this.dirs[v]
                        }
                        node.isClose = false
                    })
                    // console.log(node);
                    if (Object.keys(pathDir).length) {
                        node.children.push(pathDir)
                    } else {
                        this.current_dir.map(v => {
                            if (v.type && v.name !== '..' && v.name !== '.') {
                                if (node.children.findIndex(w => w.name === v.name) === -1) {
                                    node.children.push({
                                        name: v.name,
                                        children: [],
                                        isClose: true
                                    })
                                }
                            }
                        })
                    }
                } else {
                    this.dirs.push(pathDir)
                }
                // this.con(this.dirs)
            },
            closeChildren(path) {
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
                console.log(path);
                console.log(paths);
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

                if (deepNodeIndex.length) {
                    let node = {}
                    deepNodeIndex.map(v => {
                        if (node.children && node.children.length) {
                            node = node.children[v]
                        } else {
                            node = this.dirs[v]
                        }
                    })
                    console.log(node);
                    node.isClose = !node.isClose
                } else {
                    this.dirs.map(v => {

                    })
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
                this.current_dir = []
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
                this.current_path = path
                this.parsePath(this.current_path)
            },
            dbClick(item) {
                let gotoPath = this.current_path + '/' + item.name
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
                        // console.log('在其中');
                        this.readFileContent(gotoPath, item.name)
                    } else {
                        // console.log('不在其中');
                    }
                }
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
            readFileContent(path, fileName) {
                let that = this
                let phpCode = 'echo @file_get_contents( \'' + path + '\');'
                $.ajax({
                    url: 'http://localhost/shell.php?c=' + phpCode,
                    success(res) {
                        let row = {
                            title: fileName,
                            content: res,
                            path: path,
                            lines: res.split('\n').length
                        }
                        that.readFile = {...that.readFile, ...row}
                        that.readFile.isShow = true
                        that.readFiles.push(row)
                    }
                })
            },
            showFileContent(item) {
                let that = this
                that.readFile = {...that.readFile, ...item}
                that.readFile.isShow = !that.readFile.isShow
                console.log(that.readFile);
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
            this.$bus.$on('closeChildren', v => {
                console.log(v);
                this.closeChildren(v)
            })
        }
    }
</script>

<style lang="scss" scoped>

    $hover-color: rgb(229, 243, 255);
    $border-color: rgb(229, 229, 229);
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


        .tab-content {
            //border-top: 1px solid gray;
            display: flex;
            height: 100%;


            .left-dir {
                width: 20%;
                overflow: auto;

                .drive {
                    margin: 2px;
                }
            }

            .dir-content {
                width: 80%;
                height: 100%;
                position: relative;

                .float-top {
                    width: 100%;
                    background: #ffffff;
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 60px;

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

                    .dir-des {
                        display: flex;
                        /*margin: 3px;*/
                        padding: 6px;

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
                }

                .dirs {
                    overflow: auto;
                    height: 100%;
                    padding: 60px 0 30px 0;
                    box-sizing: border-box;
                    /*height: calc(100% - 60px);*/
                    /*margin-top: 60px;*/
                    /*margin-bottom: 30px;*/

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

                }

                .file-tab {
                    /*height: 30px;*/
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

            }
        }
    }

    .file-content {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        background: #fff;

        .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 40px;
            border-bottom: 1px solid #cbcbcb;
            padding: 0 20px;
        }

        .content {
            height: calc(100% - 70px);
            width: 100%;
            display: flex;
            overflow: auto;
            background: rgb(215, 215, 175);

            &::-webkit-scrollbar {
                display: none; /* Chrome Safari */
            }

            .lines {
                background: rgb(175, 175, 135);

                .line-number {
                    background: rgb(175, 175, 135);
                    padding: 0 20px;

                    height: 25px;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    /*text-align: end;*/
                }
            }

            pre {
                width: calc(100% - 50px);
                /*height: 100%;*/
                /*overflow-x: auto;*/
                resize: none;
                border: 0;
                outline: 0;
                padding: 2px;
                margin: 0;
                background: rgb(215, 215, 175);
                font-family: sans-serif;
                line-height: 25px;
                color: #484801;

                &::selection {
                    /*color: #fff;*/
                    background: #dafd94;
                }
            }

            textarea {
                width: calc(100% - 50px);
                /*height: 100%;*/
                /*overflow-x: auto;*/
                resize: none;
                border: 0;
                outline: 0;
                padding: 2px;
                margin: 0;
                background: rgb(215, 215, 175);
                font-family: sans-serif;
                line-height: 25px;
                color: #484801;

                &::selection {
                    /*color: #fff;*/
                    background: #dafd94;
                }
            }
        }
    }

    .mask {
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        position: absolute;
        background: rgba(0, 0, 0, 0.5);
    }

    .dialog {
        top: calc(50% - 100px);
        left: 25%;
        position: absolute;
        border-radius: 4px;
        background: #ffffff;
        width: 50%;
        //height: 100px;
        border: 1px solid $border-color;

        .content {
            padding: 30px 20px;
            color: #606266;
            font-size: 14px;
            word-break: break-all;
        }


        .header {
            padding: 20px;
            padding-bottom: 10px;
        }

        .footer {
            padding: 20px;
            padding-top: 10px;
            text-align: right;
            box-sizing: border-box;
        }
    }
</style>
