<template>
    <div class="app" id="app" ref="content">
        <div class="toolbar">
            <div class="button primary" @click="isShowDialog = true">添加</div>
            <div class="button primary">编辑</div>
            <div class="button primary">删除</div>
            <div class="button primary">设置</div>
        </div>
        <div class="content-container">
            <div class="category">
                <div class="row">
                    <div class="name">所有</div>
                </div>
                <div class="row">
                    <div class="name">默认分类</div>
                </div>
                <div class="row">
                    <div class="name">默认分类2</div>
                </div>
            </div>
            <div class="content">
                <table cellspacing="0">
                    <tr>
                        <th width="50%">路径</th>
                        <th>密码</th>
                        <th>IP</th>
                        <th>备注</th>
                        <th>创建时间</th>
                        <th>修改时间</th>
                    </tr>
                    <tr v-for="item of shells">
                        <td width="50%" @click="goto(item)">
                            {{item.url}}
                        </td>
                        <td>{{item.pwd}}</td>
                        <td>{{item.ip}}</td>
                        <td>{{item.note}}</td>
                        <td>{{item.createDate|date}}</td>
                        <td>{{item.changeDate|date}}</td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="mask" v-if="isShowDialog"></div>
        <div class="dialog" v-if="isShowDialog">
            <div class="header">
                添加
            </div>
            <div class="content">
                URL:<input type="text" v-model="shellConfig.url">
                密码:<input type="text" v-model="shellConfig.pwd">
                备注:<input type="text" v-model="shellConfig.note">
            </div>
            <div class="footer">
                <div class="button primary" @click="isShowDialog = false">取消</div>
                <div class="button primary" @click="test()">测试</div>
                <div class="button primary" @click="add()">添加</div>
            </div>
        </div>
    </div>
</template>

<script>
    import { types } from '../../store/mutation-types'

    export default {
        data(){
          return{
              shellConfig: {url: '', note: ''},
              shells: [],
              isShowDialog: false
          }
        },
        created(){
            this.shells = this.get('shell', [])
        },
        filters: {
            // 时间转换器
            date(v) {
                if (!v) return ''
                if (typeof v === 'number') {
                    const temp = v + ''
                    if (temp.length === 10) {
                        return dayjs.unix(v).format('YYYY-MM-DD HH:mm:ss')
                    }
                    return dayjs(v).format('YYYY-MM-DD HH:mm:ss')
                }
                if (typeof v === 'string') {
                    if (v.length === 10) {
                        return dayjs.unix(parseInt(v, 10)).format('YYYY-MM-DD HH:mm:ss')
                    }
                    return dayjs(parseInt(v, 10)).format('YYYY-MM-DD HH:mm:ss')
                }
                return dayjs(v).format('YYYY-MM-DD HH:mm:ss')

            },
        },
        methods: {
            goto(item) {
                console.log(item);
                // console.log(location.href = 'about.html?url=' + item.url + '&pwd=' + item.pwd);
                console.log(location.href = 'about_file.html?url=' + item.url + '&pwd=' + item.pwd);
            },
            add() {
                this.shells.push({
                    url: this.shellConfig.url,
                    pwd: this.shellConfig.pwd,
                    ip: '',
                    category: '',
                    note: this.shellConfig.note,
                    createDate: Date.now(),
                    changeDate: Date.now(),
                })
                this.set('shell', this.shells)
                this.shellConfig = {}
                this.isShowDialog = false
            },
            test() {

            },
            set(key, value) {
                if (typeof value === 'object') {
                    value = JSON.stringify(value)
                }
                localStorage.setItem(key, value)
            },
            get(key, default2 = '') {
                const value = localStorage.getItem(key) || default2
                try {
                    return JSON.parse(value)
                } catch (e) {
                    return value
                }
            },
            remove(key) {
                localStorage.removeItem(key)
            },
        },
        mounted() {

        }
    }
</script>

<style lang="scss" scoped>
    html, body {
        padding: 0;
        margin: 0;
        height: 100%;

    }

    $border-color: gray;
    input {
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #DCDFE6;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        font-size: inherit;
        height: 40px;
        line-height: 40px;
        outline: none;
        padding: 0 15px;
        transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
        width: 100%;

        &:focus {
            outline: none;
            border-color: #4080B0;
        }
    }
    .button {
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        background: #fff;
        border: 1px solid #DCDFE6;
        border-color: #DCDFE6;
        color: #606266;
        -webkit-appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: none;
        margin: 0;
        transition: .1s;
        font-weight: 500;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        padding: 12px 20px;
        font-size: 14px;
        border-radius: 4px;

        &.primary {
            color: #fff;
            background-color: #4080B0;
            border-color: #4080B0;
        }
        &:active {
            opacity: .7;
        }
    }
    .app {
        position: relative;;
        padding: 10px;
        width: 800px;
        height: 500px;
        border: 1px solid $border-color;

        .toolbar {
        }



        .content-container {
            border-top: 1px solid $border-color;
            padding-top: 20px;
            margin-top: 20px;
            display: flex;

            .category {
                width: 20%;
            }

            .content {
                width: 80%;

                table {
                    word-wrap: break-word;
                    word-break: break-all;
                    table-layout: fixed;
                    width: 100%;
                    border: 1px solid $border-color;
                    border-collapse: collapse;

                    tr {
                        height: 50px;
                        border: 1px solid $border-color;

                        th {
                            border-right: 1px solid $border-color;
                        }

                        td {
                            border-right: 1px solid $border-color;
                            //width: 50%;
                        }
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
    }

</style>
