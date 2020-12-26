<template>
    <div class="folders">
        <dir-item :list="dirs"></dir-item>
    </div>
</template>

<script>
import DirItem from "./DirItem"
import File from "../../template/php/file";
import {TYPES} from "../../store/mutation-types";
import {mapActions, mapState} from "vuex";
import CryptoJS from 'crypto-js'

export default {
    components: {
        'dir-item': DirItem,
    },
    data() {
        return {
            dirs: [],
            currentParsePath: '',//未使用
        }
    },
    computed: {
        ...mapState('file', [
            'currentDir',
            'homePath',
            'shell'
        ]),
    },
    methods: {
        ...mapActions('file', {
            gotoPath: 'gotoPath'
        }),
        async getCurrentPath() {
            let res
            if (this.shell.decodeType === this.CONST.DECODE_TYPE.BASE64.VALUE) {
                res = await this.$genRequest(this.shell, new File(
                    this.CONST.DECODE_TYPE.BASE64[this.shell.type]
                ).pwd()) + '/'
                res = CryptoJS.enc.Base64.parse(res).toString(CryptoJS.enc.Utf8)
            }
            res = res.split('``')
            let currentPath = res[1]
            res[0].split('|').map(v => {
                if (v) {
                    this.dirs.push({
                        name: v,
                        isClose: true,
                        isActive: false,
                        children: []
                    })
                }
            })
            this.parsePath(currentPath)
            this.$store.commit('file/' + this.TYPES.SET_HOME_PATH, currentPath)
            await this.gotoPath(currentPath)
        },
        //D:/safe/code/vue-shell/php-shell解析成数组
        parsePath(path) {
            //替换反斜杠
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
            this.currentParsePath = paths
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
            // this.$console(deepNodeIndex);

            let pathDir = {}
            for (let i = paths.length - 1; i >= deepNodeIndex.length; i--) {
                let v = paths[i]
                if (i === paths.length - 1) {
                    pathDir.name = v
                    pathDir.children = []
                    pathDir.isClose = false
                    pathDir.isActive = true
                } else {
                    let temp = {}
                    temp.name = v
                    temp.isClose = false
                    temp.isActive = false
                    temp.children = [pathDir]
                    pathDir = temp
                }
            }
            // this.$console(pathDir)
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
                node.isActive = true

                // this.$console(node);
                if (Object.keys(pathDir).length) {
                    node.children.push(pathDir)
                } else {
                    this.currentDir.map(v => {
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
    },
    mounted: async function () {
        await this.getCurrentPath()

        this.$bus.$on('gotoPath', async path => {
            await this.gotoPath(path)
            this.parsePath(path)
        })
        this.$bus.$on('closeChildren', v => {
            // console.log(v);
            this.closeChildren(v)
        })
        this.$bus.$on('parsePath', path => {
            this.parsePath(path)
        })
    }
}
</script>

<style lang="less" scoped>
.folders {
    float: left;
    color: rgb(186, 173, 180);

}

</style>
