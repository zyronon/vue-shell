<template>
    <div class="folder">
        <div class="dir-des">
            <div class="name">名称</div>
            <div class="change-date">修改日期</div>
            <div class="type">类型</div>
            <div class="size">大小</div>
        </div>
        <div class="list">
            <div class="item"
                 :class="item.isActive?'active':''"
                 v-for="item of currentDir"
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
    </div>
</template>

<script>
    import {mapActions, mapState} from "vuex";
    import File from "../../template/php/file";

    export default {
        name: "folder",
        data(){
          return{
              currentDir23:[
                  {
                      "name": ".idea",
                      "type": 1,
                      "change_date": "2020/10/23 20:21",
                      "file_size": "4096"
                  },
                  {
                      "name": "cmd.php",
                      "type": 0,
                      "change_date": "2020/09/27 17:41",
                      "file_size": "4036"
                  },],
              currentDir2:[
                  {
                      "name": ".idea",
                      "type": 1,
                      "change_date": "2020/10/23 20:21",
                      "file_size": "4096"
                  },
                  {
                      "name": "cmd.php",
                      "type": 0,
                      "change_date": "2020/09/27 17:41",
                      "file_size": "4036"
                  },
                  {
                      "name": "file.php",
                      "type": 0,
                      "change_date": "2020/09/27 17:27",
                      "file_size": "7370"
                  },
                  {
                      "name": "shell.php",
                      "type": 0,
                      "change_date": "2020/09/27 18:25",
                      "file_size": "370"
                  },
                  {
                      "name": "test2.php",
                      "type": 0,
                      "change_date": "2020/09/27 17:32",
                      "file_size": "1453"
                  },
                  {
                      "name": ".idea",
                      "type": 1,
                      "change_date": "2020/10/23 20:21",
                      "file_size": "4096"
                  },
                  {
                      "name": "cmd.php",
                      "type": 0,
                      "change_date": "2020/09/27 17:41",
                      "file_size": "4036"
                  },
                  {
                      "name": "file.php",
                      "type": 0,
                      "change_date": "2020/09/27 17:27",
                      "file_size": "7370"
                  },
                  {
                      "name": "shell.php",
                      "type": 0,
                      "change_date": "2020/09/27 18:25",
                      "file_size": "370"
                  },
                  {
                      "name": "test2.php",
                      "type": 0,
                      "change_date": "2020/09/27 17:32",
                      "file_size": "1453"
                  },
                  {
                      "name": ".idea",
                      "type": 1,
                      "change_date": "2020/10/23 20:21",
                      "file_size": "4096"
                  },
                  {
                      "name": "cmd.php",
                      "type": 0,
                      "change_date": "2020/09/27 17:41",
                      "file_size": "4036"
                  },
                  {
                      "name": "file.php",
                      "type": 0,
                      "change_date": "2020/09/27 17:27",
                      "file_size": "7370"
                  },
                  {
                      "name": "shell.php",
                      "type": 0,
                      "change_date": "2020/09/27 18:25",
                      "file_size": "370"
                  },
                  {
                      "name": "test2.php",
                      "type": 0,
                      "change_date": "2020/09/27 17:32",
                      "file_size": "1453"
                  },{
                      "name": ".idea",
                      "type": 1,
                      "change_date": "2020/10/23 20:21",
                      "file_size": "4096"
                  },
                  {
                      "name": "cmd.php",
                      "type": 0,
                      "change_date": "2020/09/27 17:41",
                      "file_size": "4036"
                  },
                  {
                      "name": "file.php",
                      "type": 0,
                      "change_date": "2020/09/27 17:27",
                      "file_size": "7370"
                  },
                  {
                      "name": "shell.php",
                      "type": 0,
                      "change_date": "2020/09/27 18:25",
                      "file_size": "370"
                  },
                  {
                      "name": "test2.php",
                      "type": 0,
                      "change_date": "2020/09/27 17:32",
                      "file_size": "1453"
                  },{
                      "name": ".idea",
                      "type": 1,
                      "change_date": "2020/10/23 20:21",
                      "file_size": "4096"
                  },
                  {
                      "name": "cmd.php",
                      "type": 0,
                      "change_date": "2020/09/27 17:41",
                      "file_size": "4036"
                  },
                  {
                      "name": "file.php",
                      "type": 0,
                      "change_date": "2020/09/27 17:27",
                      "file_size": "7370"
                  },
                  {
                      "name": "shell.php",
                      "type": 0,
                      "change_date": "2020/09/27 18:25",
                      "file_size": "370"
                  },
                  {
                      "name": "test2.php",
                      "type": 0,
                      "change_date": "2020/09/27 17:32",
                      "file_size": "1453"
                  },{
                      "name": ".idea",
                      "type": 1,
                      "change_date": "2020/10/23 20:21",
                      "file_size": "4096"
                  },
                  {
                      "name": "cmd.php",
                      "type": 0,
                      "change_date": "2020/09/27 17:41",
                      "file_size": "4036"
                  },
                  {
                      "name": "file.php",
                      "type": 0,
                      "change_date": "2020/09/27 17:27",
                      "file_size": "7370"
                  },
                  {
                      "name": "shell.php",
                      "type": 0,
                      "change_date": "2020/09/27 18:25",
                      "file_size": "370"
                  },
                  {
                      "name": "test2.php",
                      "type": 0,
                      "change_date": "2020/09/27 17:32",
                      "file_size": "1453"
                  },{
                      "name": ".idea",
                      "type": 1,
                      "change_date": "2020/10/23 20:21",
                      "file_size": "4096"
                  },
                  {
                      "name": "cmd.php",
                      "type": 0,
                      "change_date": "2020/09/27 17:41",
                      "file_size": "4036"
                  },
                  {
                      "name": "file.php",
                      "type": 0,
                      "change_date": "2020/09/27 17:27",
                      "file_size": "7370"
                  },
                  {
                      "name": "shell.php",
                      "type": 0,
                      "change_date": "2020/09/27 18:25",
                      "file_size": "370"
                  },
                  {
                      "name": "test2.php",
                      "type": 0,
                      "change_date": "2020/09/27 17:32",
                      "file_size": "1453"
                  }
              ]
          }
        },
        computed: {
            ...mapState('file', [
                'currentDir',
                'homePath',
                'currentPath'
            ]),
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
        mounted() {
        },
        methods: {
            ...mapActions('file', {
                gotoPath: 'gotoPath'
            }),
            dirClick(item) {
                // this.currentDir = this.currentDir.map(v => {
                //     v.isActive = false;
                //     return v
                // })
                // item.isActive = true
            },
            async dbClick(item) {
                let gotoPath = this.currentPath + '/' + item.name
                if (item.type) {
                    await this.gotoPath({url: this.shell.shellUrl + new File(gotoPath + '/').dir(), path: gotoPath})
                    this.$bus.$emit('parsePath', gotoPath)
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
                        // this.readFileContent(gotoPath, item.name)
                    } else {
                        // console.log('不在其中');
                    }
                }
            },
            onContextMenu() {

            }
        }
    }
</script>

<style scoped lang="scss">

    $hover-color: rgb(75, 110, 175);
    $border-color: rgb(229, 229, 229);
    $bg-color: rgb(60, 63, 65);
    .folder {
        /*padding: 30px 0 0px 0;*/
        /*height: 100%;*/
        height:calc(100% - 30px);
        box-sizing: border-box;
        overflow: auto;
        position: relative;
        width: 100%;
        background: rgb(43, 43, 43);

        img {
            height: 15px;
        }

        .dir-des {
            //position: fixed;
            //background: $bg-color;
            //width: 100%;
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

        .list {
            overflow: auto;
            box-sizing: border-box;
            /*height: calc(100% - 60px);*/
            /*margin-top: 60px;*/
            /*margin-bottom: 30px;*/


            .item {
                display: flex;
                /*margin: 3px;*/
                padding: 6px;

                &.active {
                    background: $hover-color;
                }

                &:hover {
                    background: $hover-color;
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

    }
</style>
