<template>
    <div class="folder"
         @mousemove="mousemove"
         @mouseup="setResizeStatusFalse"
         @click="contextMenu.isShow = false"
         @contextmenu="onContextMenu($event)"
    >
        <slot></slot>
        <div class="dir-des" :class="isResizing?'no-hover':''">
            <div class="name"
                 :class="sortStatus.rowOne?sortStatus.rowOne:''"
                 :style="{'width':widths.rowOne+'px'}"
                 @click="sort(1)"
            >名称
                <div @mousedown="resize.rowOne = true" class="resize-vertical"></div>
            </div>
            <div class="change-date"
                 :class="sortStatus.rowTwo?sortStatus.rowTwo:''"
                 :style="{'width':widths.rowTwo+'px'}"
                 @click="sort(2)"
            > 修改日期
                <div @mousedown="resize.rowTwo = true" class="resize-vertical"></div>
            </div>
            <div class="type"
                 :class="sortStatus.rowThree?sortStatus.rowThree:''"
                 :style="{'width':widths.rowThree+'px'}"
                 @mousedown="resize.rowThree = true"
                 @click="sort(3)"
            >类型
                <div @mousedown="resize.rowThree = true" class="resize-vertical"></div>
            </div>
            <div class="size"
                 :class="sortStatus.rowFour?sortStatus.rowFour:''"
                 :style="{'width':widths.rowFour+'px'}"
                 @click="sort(4)"
            >大小
            </div>
        </div>
        <div class="list">
            <div class="item"
                 :class="item.isActive?'active':''"
                 v-for="item of currentDir"
                 @click.stop="dirClick(item)"
                 @dblclick="dbClick(item)"
                 @contextmenu.prevent="onContextMenu($event,item)">
                <div class="name"
                     :style="{'width':widths.rowOne+'px'}">
                    <folder-icon v-if="item.type"></folder-icon>
                    <img src="@/assets/images/txt-file.png" alt="" v-else>
                    <input type="text" :value="item.name" v-if="true">
                    <span v-else>{{item.name}}</span>
                </div>
                <div class="change-date"
                     :style="{'width':widths.rowTwo+'px'}"
                     @mousedown="resize.rowTwo = true">{{item.change_date}}
                </div>
                <div class="type"
                     :style="{'width':widths.rowThree+'px'}"
                     @mousedown="resize.rowThree = true">{{item|fileType}}
                </div>
                <div class="size"
                     :style="{'width':widths.rowFour+'px'}"
                     @mousedown="resize.rowFour = true">{{item.file_size|size}}
                </div>
            </div>
        </div>
        <context-menu v-if="contextMenu.isShow"
                      :style="contextMenuStyle"
                      :context-menu="contextMenu"
        >
        </context-menu>
    </div>
</template>

<script>
    import {mapActions, mapState} from "vuex";
    import File from "../../template/php/file";
    import ContextMenu from "./ContextMenu";

    export default {
        name: "folder",
        components: {
            ContextMenu
        },
        props: {
            directoryWidth: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                viewWidth: 1000,
                viewHeight: 700,
                resize: {
                    custom: false,
                    rowOne: false,
                    rowTwo: false,
                    rowThree: false,
                    rowFour: false,
                },
                widths: {
                    rowOne: 1000 * .5,
                    rowTwo: 1000 * .2,
                    rowThree: 1000 * .15,
                    rowFour: 1000 * .15,
                },
                sortStatus: {
                    rowOne: null,
                    rowTwo: null,
                    rowThree: null,
                    rowFour: null,
                },
                contextMenu: {
                    isShow: false,
                    onFile: true,
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    path: '',
                    file: '',
                },
            }
        },
        watch: {
            'directoryWidth'() {
                if (!this.resize.custom) {
                    let rightWidth = 1000 - this.directoryWidth
                    this.widths.rowOne = rightWidth * 0.5
                    this.widths.rowTwo = rightWidth * 0.2
                    this.widths.rowThree = rightWidth * 0.15
                    this.widths.rowFour = rightWidth * 0.15
                }
            }
        },
        computed: {
            ...mapState('file', [
                'currentDir',
                'homePath',
                'currentPath'
            ]),
            isResizing() {
                return this.resize.rowOne || this.resize.rowTwo || this.resize.rowThree || this.resize.rowFour
            },
            contextMenuStyle() {
                let style = {}
                if (this.contextMenu.top) {
                    style.top = this.contextMenu.top + 'px'
                }
                if (this.contextMenu.bottom) {
                    style.bottom = this.contextMenu.bottom + 'px'
                }
                if (this.contextMenu.right) {
                    style.right = this.contextMenu.right + 'px'
                }
                if (this.contextMenu.left) {
                    style.left = this.contextMenu.left + 'px'
                }
                return style
            }

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
            let rightWidth = this.viewWidth - this.directoryWidth
            this.widths.rowOne = rightWidth * 0.5
            this.widths.rowTwo = rightWidth * 0.2
            this.widths.rowThree = rightWidth * 0.15
            this.widths.rowFour = rightWidth * 0.15
        },
        methods: {
            ...mapActions('file', {
                gotoPath: 'gotoPath'
            }),
            onContextMenu(e, item) {
                this.contextMenu.isShow = true
                if (this.viewHeight - e.clientY < 250) {
                    this.contextMenu.bottom = this.viewHeight - e.clientY
                    this.contextMenu.top = null
                } else {
                    this.contextMenu.top = e.clientY - 30
                    this.contextMenu.bottom = null
                }
                if (this.viewWidth - e.clientX < 180) {
                    this.contextMenu.right = this.viewWidth - e.clientX
                    this.contextMenu.left = null
                } else {
                    this.contextMenu.left = e.clientX - this.directoryWidth
                    this.contextMenu.right = null
                }
                if (item) {
                    this.contextMenu.file = this.currentPath + item.name
                    this.contextMenu.path = this.currentPath
                    this.contextMenu.onFile = true
                    e.stopPropagation();
                    e.preventDefault()
                } else {
                    this.contextMenu.onFile = false
                }
            },
            mousemove(e) {
                // console.log(e.clientX);
                if (this.resize.rowOne) {
                    let rowOneWidth = e.clientX - this.directoryWidth
                    if (rowOneWidth > 100) {
                        let rightWidth = this.viewWidth - this.directoryWidth - rowOneWidth
                        if (rightWidth < 250) return
                        let rowFourWidth = rightWidth - this.widths.rowTwo - this.widths.rowThree
                        if (rowFourWidth > 50) {
                            this.widths.rowFour = rowFourWidth
                        } else {
                            this.widths.rowTwo = (rightWidth - 50) * 0.5
                            this.widths.rowThree = (rightWidth - 50) * 0.5
                        }
                        this.widths.rowOne = rowOneWidth
                    }
                }
            },
            setResizeStatusFalse() {
                this.resize.rowOne = false
                this.resize.rowTwo = false
                this.resize.rowThree = false
                this.resize.rowFour = false
                // this.contextMenu.isShow = false
            },
            sort(row) {
                switch (row) {
                    case 1:
                        this.sortStatus.rowOne = this.sortStatus.rowOne ? this.sortStatus.rowOne === 'up' ? 'down' : null : 'up';
                        break;
                    case 2:
                        this.sortStatus.rowTwo = this.sortStatus.rowTwo ? this.sortStatus.rowTwo === 'up' ? 'down' : null : 'up';
                        break;
                    case 3:
                        this.sortStatus.rowThree = this.sortStatus.rowThree ? this.sortStatus.rowThree === 'up' ? 'down' : null : 'up';
                        break;
                    case 4:
                        this.sortStatus.rowFour = this.sortStatus.rowFour ? this.sortStatus.rowFour === 'up' ? 'down' : null : 'up';
                        break;
                }

            },
            test() {
                console.log('pppp');
            },
            dirClick(item) {
                console.log(item);
                // this.currentDir = this.currentDir.map(v => {
                //     v.isActive = false;
                //     return v
                // })
                // item.isActive = true
            },
            async dbClick(item) {
                let gotoPath = this.currentPath + '/' + item.name
                if (item.type) {
                    await this.gotoPath(gotoPath)
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
        }
    }
</script>

<style scoped lang="scss">

    $hover-color: rgb(75, 110, 175);
    $border-color: rgb(229, 229, 229);
    $bg-color: rgb(43, 43, 43);
    $text-color: rgb(186, 173, 180);
    .folder {
        /*padding: 30px 0 0px 0;*/
        /*height: 100%;*/
        height: calc(100% - 30px);
        box-sizing: border-box;
        overflow-y: scroll;
        overflow-x: hidden;
        position: relative;
        width: 100%;
        color: $text-color;
        background: $bg-color;

        img {
            height: 15px;
        }

        .dir-des {
            //position: fixed;
            //background: $bg-color;
            //width: 100%;
            display: flex;
            /*margin: 3px;*/

            .name, .change-date, .type, .size {
                position: relative;
                padding: 6px;
                box-sizing: border-box;

                &:hover {
                    background: rgb(76, 76, 76);
                }


                .resize-vertical {
                    content: '';
                    height: 100%;
                    position: absolute;
                    right: -4px;
                    top: 0;
                    cursor: col-resize;
                    width: 8px;
                    z-index: 10;
                }
            }

            $arrow-color: #ccc;

            .up {
                &::after {
                    content: '';
                    width: 5px;
                    height: 5px;
                    border-top: 1px solid $arrow-color;
                    border-left: 1px solid $arrow-color;
                    transform: rotate(45deg) translateY(7px);
                    position: absolute;
                    left: 50%;
                    top: 0;
                }
            }

            .down {
                &::after {
                    content: '';
                    width: 5px;
                    height: 5px;
                    border-bottom: 1px solid $arrow-color;
                    border-right: 1px solid $arrow-color;
                    transform: rotate(45deg) translate(-2px, 4px);
                    position: absolute;
                    left: 50%;
                    top: 0;
                }
            }
        }

        .no-hover {
            .name, .change-date, .type, .size {
                &:hover {
                    background: rgb(43, 43, 43);
                }
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

                .name {
                    input {
                        background-color: $bg-color;
                        background-image: none;
                        border: 2px solid $hover-color;
                        border-radius: 2px;
                        -webkit-box-sizing: border-box;
                        box-sizing: border-box;
                        color:  $text-color;
                        display: inline-block;
                        font-size: inherit;
                        height: 30px;
                        line-height: 30px;
                        outline: none;
                        padding: 0 10px;
                         width: 90%;
                        -webkit-box-flex: 9;
                        -ms-flex: 9;
                        flex: 9;
                    }
                }

                &.active {
                    background: $hover-color;
                }

                &:hover {
                    background: $hover-color;
                }
            }


        }

        &::-webkit-scrollbar {
            width: 8px;
            height: 10px;
            background: #F1F1F1;
        }

        &::-webkit-scrollbar-button {
            display: none;
        }

        &::-webkit-scrollbar-thumb {
            border-radius: 10px;
            background: #C1C1C1;

            &:hover {
                background: #a8a8a8;
            }

            &:active {
                background: #787878;
            }
        }

        &::-webkit-scrollbar-track {
            border-radius: 10px;
            background: #F1F1F1;
        }

    }
</style>
