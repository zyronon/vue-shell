<template>
    <div class="contextmenu">
        <div class="item" @click="gotoPath(currentPath)">
            <folderIcon></folderIcon>
            <span>刷新目录</span>
        </div>
        <div class="item" @click="$refs.file.click()">
            <input type="file" ref="file" id="file" style="display: none" @change="upload($event)">
            <folderIcon></folderIcon>
            <span>上传文件</span>
        </div>
        <div class="item" @click="download()">
            <folderIcon></folderIcon>
            <span>下载文件</span>
        </div>
        <div class="item" :class="contextMenu.onFile?'':'disabled'" @click="deleteFile()">
            <folderIcon></folderIcon>
            <span>删除</span>
        </div>
        <div class="item" :class="contextMenu.onFile?'':'disabled'" @click.stop="rename($event)">
            <folderIcon></folderIcon>
            <span>重命名</span>
        </div>
        <div class="item" @click="isShowDialog = true">
            <folderIcon></folderIcon>
            <span>新建</span>
        </div>
        <div class="item">
            <folderIcon></folderIcon>
            <span>在此处打开终端</span>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from "vuex";
    import axios from "axios";
    import File from "../../template/php/file";

    export default {
        name: 'ContextMenu',  //组件命名
        props: {
            contextMenu: {
                type: Object,
            }
        },
        data() {
            return {}
        },
        computed: {
            ...mapState('file', [
                'currentPath',
                'shell'
            ]),
        },
        methods: {
            ...mapActions('file', {
                gotoPath: 'gotoPath'
            }),
            async upload(e) {
                // console.log(e);
                let file = e.path[0].files[0]
                let formData = new FormData()
                formData.append('file', file)
                let res = await axios.post(this.shell.shellUrl + new File(file.name).upload(), formData, {
                    headers: {'Content-type': 'multipart/form-data'}
                })
                await this.gotoPath(this.currentPath)
                // console.log(res);

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
                await this.gotoPath(this.currentPath)
                this.isShowDialog = false
            },
            async deleteFile() {
                console.log(this.contextMenu.path);
                let s = new File(this.contextMenu.file).delete()
                console.log(s);
                let res = await this.request(s)
                console.log(res);
                await this.gotoPath(this.currentPath)
            },
            async rename(e) {
                console.log(this.contextMenu.path);
                let s = new File(this.contextMenu.file, this.contextMenu.file + '2').rename()
                console.log(s);
                let res = await this.request(s)
                console.log(res);
            },
        }
    }
</script>

<style scoped lang="scss">
    $bg-color: rgb(60, 63, 65);
    $hover-color: rgb(75, 110, 175);


    .contextmenu {
        /*width: 100px;*/
        /*height: 200px;*/
        background: $bg-color;
        position: absolute;

        .item {
            display: flex;
            align-items: center;
            padding: 5px 10px;
            border-bottom: 1px solid rgb(81, 81, 81);

            &:hover {
                background: $hover-color;
            }

            & + .disabled {
                background: $bg-color;
                color: grey;
            }
        }


    }


</style>
