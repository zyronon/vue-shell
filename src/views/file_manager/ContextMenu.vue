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
        <div class="item" :class="contextMenu.onFile?'':'disabled'" @click.stop="$emit('editItem')">
            <folderIcon></folderIcon>
            <span>重命名</span>
        </div>
        <div class="item" @click.stop="$emit('new')">
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
    import {TYPES} from "../../store/mutation-types";


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

            //接口不行，浏览器直接访问可以。vue里面不可以
            async download() {
                let cmd = new File(this.contextMenu.file).download()
                console.log(cmd);
                let res = await this.$request(this.shell.shellUrl + cmd)
                console.log(res);
            },
            //ok
            async deleteFile() {
                let cmd = new File(this.contextMenu.file).delete()
                console.log(cmd);
                let res = await this.$request(this.shell.shellUrl + cmd)
                console.log(res);
                await this.gotoPath(this.currentPath)
            },
        }
    }
</script>

<style scoped lang="scss">
    @import "../../assets/scss/color";


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
