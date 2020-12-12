<template>
    <div class="home" ref="content"
         @contextmenu="$event.preventDefault()"
         @click="menu.location.show = false"
    >
        <div class="toolbar">
            <div class="left">
                <icon name="menu" :scale="scale"></icon>
                <span>Shell管理器</span>
            </div>
            <div class="right">
                <div class="search">
                    <icon @click="leftBarIsClose = !leftBarIsClose" name="menu" :scale="scale"></icon>
                    <div class="input-container">
                        <icon name="search" :scale="scale"></icon>
                        <input type="text">
                    </div>
                </div>
                <div class="options">
                    <icon @click="isShow.shell = true" name="add" :scale="scale"></icon>
                    <span>|</span>
                    <icon name="close" :scale="scale"></icon>
                </div>
            </div>
        </div>
        <div class="content-container">
            <div class="category" :style="{width:leftBarIsClose?'90px':'200px'}">
                <div class="header">
                    <span>本地分类</span>
                    <icon name="add" :scale="scale" @click="isShow.category = true"></icon>
                </div>
                <div class="row"
                     :class="item.id === selectCategory.id?'active':''"
                     v-for="item of categories"
                     @click="selectCategory = item">
                    <icon name="menu" :scale="scale"></icon>
                    <span class="name">{{item.name}}</span>
                </div>
            </div>
            <div class="content"
                 :style="{width:leftBarIsClose?'calc(100% - 90px)':'calc(100% - 200px)'}"
                 @contextmenu="onContextMenu($event)">
                <c-table
                        :list="categoryShell"
                        @row-dblclick="(e,row) => goto('file',row)"
                        @contextmenu="(e,row) => onContextMenu(e,row)"
                >
                    <c-table-column prop="url" label="路径" sortable></c-table-column>
                    <c-table-column prop="pwd" label="密码"></c-table-column>
                    <c-table-column prop="ip" label="IP" sortable></c-table-column>
                    <c-table-column prop="note" label="备注"></c-table-column>
                    <c-table-column prop="changeDate" label="修改时间">
                        <template slot-scope="scope">
                            {{scope.changeDate|dateFormat('D')}}
                        </template>
                    </c-table-column>
                </c-table>
            </div>
        </div>

        <my-dialog title="添加Shell" :visible.sync="isShow.shell">
            <template v-slot:content>
                <div class="form">
                    <div class="form-row">
                        <span>URL地址：</span>
                        <input class="input"  type="text" v-model="form.url">
                    </div>
                    <div class="form-row">
                        <span>连接密码：</span>
                        <input class="input" type="text" v-model="form.pwd">
                    </div>
                    <div class="form-row">
                        <span>网站备注：</span>
                        <input class="input"  type="text" v-model="form.note">
                    </div>
                    <div class="form-row">
                        <span>连接类型：</span>
                        <select v-model="form.type">
                            <option value="php">PHP</option>
                            <option value="jsp">JSP</option>
                            <option value="asp">ASP</option>
                        </select>
                    </div>
                    <div class="data">
                        <div class="add-headers">
                            <div class="notice">HTTP HEADERS</div>
                            <div class="table-headers">
                                <table cellspacing="0">
                                    <thead>
                                    <tr class="thead">
                                        <th width="10%"></th>
                                        <th>KEY</th>
                                        <th>VALUE</th>
                                        <th width="10%"></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="(item,index) of form.headers">
                                        <td align="center"><input type="checkbox" v-model="item.checked"></td>
                                        <td><input type="text" v-model="item.key"></td>
                                        <td><input type="text" v-model="item.value"></td>
                                        <td align="center" @click="removeHeader(index)">
                                            <folderIcon></folderIcon>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center"><input type="checkbox" v-model="form.addHeader.checked"></td>
                                        <td><input type="text" v-model="form.addHeader.key"></td>
                                        <td><input type="text" v-model="form.addHeader.value"></td>
                                        <td align="center" @click="addHeader">
                                            <folderIcon></folderIcon>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template v-slot:footer>
                <div class="d-flex justify-content-end">
                    <c-button @click="isShow.shell = false">取消</c-button>
                    <c-button @click="test()">测试</c-button>
                    <c-button @click="add()">添加</c-button>
                </div>
            </template>
        </my-dialog>
        <my-dialog title="添加分类" :visible.sync="isShow.category">
            <template v-slot:content>
                <div class="form">
                    <div class="form-row">
                        <input type="text" v-model="formCategory.name">
                    </div>
                </div>
            </template>
            <template v-slot:footer>
                <div class="d-flex justify-content-end">
                    <c-button @click="isShow.category = false">取消</c-button>
                    <c-button @click="addCategory()">添加</c-button>
                </div>
            </template>
        </my-dialog>

        <c-menu :location="menu.location">
            <c-item @click="reload">刷新目录</c-item>
            <c-item @click="isShow.shell = true">新增</c-item>
            <c-item
                    :is-disabled="menu.chooseItem === null"
                    @click="goto('terminal')">终端
            </c-item>
            <c-item
                    :is-disabled="menu.chooseItem === null"
                    @click="goto('file')">打开
            </c-item>
            <c-item
                    :is-disabled="menu.chooseItem === null"
                    @click="edit">编辑
            </c-item>
            <c-item
                    :is-disabled="menu.chooseItem === null"
                    @click="removeShell"
            >删除
            </c-item>
        </c-menu>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        data() {
            return {
                scale: 2,
                leftBarIsClose: false,
                form: {
                    url: '',
                    note: '',
                    headers: [],
                    addHeader: {
                        checked: true,
                        key: '',
                        value: '',
                    }
                },
                categories: [],
                selectCategory: {},
                formCategory: {name: ''},
                shells: [],
                isShow: {
                    shell: false,
                    category: false
                },
                isShowDialog: false,
                menu: {
                    location: {},
                    chooseItem: null,
                },
            }
        },
        created() {
            this.$store.commit('layout/setTableColumns', [])
            this.shells = this.$storageGet('shell', [])
            this.categories = this.$storageGet('category', [])
            this.selectCategory = this.categories[0]
            // this.shells = []
        },
        computed: {
            ...mapState('layout', [
                'tableColumns',
            ]),
            categoryShell() {
                if (!this.selectCategory.id) return this.shells
                return this.shells.filter(v => v.categoryId === this.selectCategory.id)
            }
        },
        filters: {},
        methods: {
            addCategory() {
                this.categories.push({id: this.$random(), name: this.formCategory.name})
                this.$storageSet('category', this.categories)
                this.formCategory.name = ''
                this.isShow.category = false
            },
            edit() {
                this.form = this.$clone(this.menu.chooseItem)
                this.isShowDialog = true
            },
            removeShell() {
                let index = this.shells.findIndex(value => value.id === this.menu.chooseItem.id)
                if (index !== -1) {
                    this.shells.splice(index, 1)
                    this.$storageSet('shell', this.shells)
                }
            },
            async test() {
                let random = this.$random()
                let phpCode = `echo%20'${random}';`
                let url = this.$geneShellUrl(this.form) + phpCode
                let res = await this.$request(url)
                if (res === random) {
                    this.message1.success('连接成功')
                } else {
                    this.message1.success('连接失败')
                }
            },
            removeHeader(index) {
                this.form.headers.splice(index, 1)
            },
            addHeader() {
                if (!this.form.addHeader.key) {
                    return console.log('不能为空')
                }
                this.form.addHeader.checked = true
                this.form.headers.push(this.$clone(this.form.addHeader))
                this.form.addHeader = {}
                this.$console(this.form)
            },
            reload() {
                window.location.reload()
            },
            onContextMenu(e, item) {
                if (e) {
                    e.stopPropagation()
                    e.preventDefault()
                    let {x, y} = e
                    this.menu.location = {x, y, show: true}
                }
                if (item) {
                    // this.$console(item)
                    this.menu.chooseItem = item
                } else {
                    this.menu.chooseItem = null
                }
            },
            goto(type, item) {
                switch (type) {
                    case 'terminal':
                        // console.log(location.href = 'file.html?url=' + item.url + '&pwd=' + item.pwd);
                        this.$router.push({
                            path: '/terminal',
                            query: {shell: item || this.menu.chooseItem}
                        })
                        break
                    case 'file':
                        // console.log(location.href = 'file.html?url=' + item.url + '&pwd=' + item.pwd);
                        this.$router.push({
                            path: '/file',
                            query: {shell: item || this.menu.chooseItem}
                        })
                        break
                }
            },
            add() {
                if (this.form.id) {
                    let index = this.shells.findIndex(v => this.form.id === v.id)
                    if (index !== -1) {
                        this.$set(this.shells, index, this.form)
                        this.$storageSet('shell', this.shells)
                    } else {

                    }
                } else {
                    this.shells.push({
                        id: this.$random(),
                        ip: '',
                        createDate: Date.now(),
                        changeDate: Date.now(),
                        categoryId: this.selectCategory.id,
                        ...this.form
                    })
                    this.$storageSet('shell', this.shells)
                    this.form = {addHeader: {}}
                }
                this.isShow.shell = false
            },
        },
        mounted() {
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/color";

    $border-color: gray;
    $head-bg-color: rgb(33, 33, 36);
    $dialog-bg-color: rgb(54, 54, 54);
    $input-bg-color: rgb(67, 67, 67);

    .home {
        padding: 0;
        margin: 0;
        position: relative;
        background: $main-bg-color;
        height: 100%;


        .toolbar {
            height: 40px;
            padding: 5px;
            display: flex;


            .left {
                display: flex;
                align-items: center;
                width: 200px;
                color: white;
                height: 100%;

                span {
                    margin-left: 10px;
                }
            }

            .right {
                display: flex;
                flex: 1;
                align-items: center;
                justify-content: space-between;

                .search {
                    display: flex;
                    flex: 1;
                    align-items: center;

                    .input-container {
                        display: flex;
                        align-items: center;
                        background: #38383C;
                        border-radius: 20px;
                        padding: 5px 10px;
                        margin-left: 10px;
                        width: 90%;
                        box-sizing: border-box;

                        img {
                            height: 15px;
                            width: 15px;
                        }

                        input {
                            margin-left: 5px;
                            background-color: #38383C;
                            color: white;
                            background-image: none;
                            border-radius: 4px;
                            border: none;
                            box-sizing: border-box;
                            display: inline-block;
                            font-size: inherit;
                            outline: none;
                            transition: $border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
                            width: 100%;

                        }
                    }
                }

                .options {
                    display: flex;
                    align-items: center;

                    img, svg {
                        margin: 0 5px;
                        cursor: pointer;
                    }
                }
            }
        }

        .content-container {
            display: flex;
            height: calc(100% - 50px);

            .category {
                width: 200px;
                transition: all .3s;

                .header {
                    margin: 10px 15px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    color: grey;
                }


                .row {
                    margin: 2px 10px;
                    padding: 5px;
                    display: flex;
                    align-items: center;
                    color: white;
                    border: 1px solid $main-bg-color;

                    .name {
                        margin-left: 10px;
                    }


                    &:hover {
                        border-radius: 4px;
                        border: 1px solid $second-bg-color;
                        background: $second-bg-color;
                    }

                    &.active {
                        border-radius: 4px;
                        border: 1px solid $second-bg-color;
                        background: $second-bg-color;
                    }
                }
            }

            .content {
                transition: all .3s;
                background: $second-bg-color;
                width: calc(100% - 200px);
                overflow: auto;
                box-sizing: border-box;
                color: white;
            }
        }
    }

</style>
