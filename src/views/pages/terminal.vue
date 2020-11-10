<template>
    <div class="content">
        <div class="terminal" ref="terminal">
            <div class="row" v-for="type of row">
                <div class="type-history">{{type.history}}</div>
                <pre class="result">{{type.result}}</pre>
            </div>
            <div class="row">
                <div class="type-container">
                <textarea class="type"
                          @input="input($event,type)"
                          @keydown="keydown($event,type)"
                          v-model="type.tmpPwd"></textarea>
                    <span class="float-pwd">{{type.pwd}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {types} from '../../store/mutation-types'

    export default {
        data() {
            return {
                pwd: 'D:\\safe\\hw\\2020_09_18',
                row: [],
                type: {},
                urlencode: [
                    {
                        k: '%',
                        v: '%25'
                    }, {
                        k: '&',
                        v: '%26'
                    },
                ]
            }
        },
        created() {
            let search = location.search.substr(1).split('&')
            let param = search.reduce((p, c, i) => {
                let t = c.split('=')
                p[t[0]] = t[1]
                return p
            }, {})
            this.getPwd(param)
        },
        directives: {
            focus: {
                inserted: function (el) {
                    el.focus()
                }
            }
        },
        methods: {
            getPwd() {
                let that = this
                let cmd = 'echo %25cd%25'
                let phpCode = 'header("Content-Type: text/html;charset=GBK");system(\'' + cmd + ' 2>%261\');'
                $.ajax({
                    url: 'http://localhost/shell.php?c=' + phpCode,
                    success(res) {
                        console.log(JSON.stringify(res));
                        res = res.replace('\r\n', '')
                        console.log(JSON.stringify(res));
                        that.pwd = res
                        that.type = {
                            tmpPwd: that.pwd + '>',
                            pwd: that.pwd + '>',
                            id: '',
                        }
                    }
                })
            },
            clone(obj) {
                return JSON.parse(JSON.stringify(obj))
            },
            exec(event, cmd) {
                if (cmd === '') return
                if (cmd === 'cls') {
                    this.row = []
                    this.type.tmpPwd = this.type.pwd
                    this.type.id = ''
                    return
                }
                let that = this
                let phpCode = 'header("Content-Type: text/html;charset=GBK");system(\'' + cmd + ' 2>%261\');'
                $.ajax({
                    url: 'http://localhost/shell.php?c=' + phpCode,
                    success(res) {
                        that.row.push({
                            cmd: cmd,
                            history: that.clone(that.type.tmpPwd),
                            result: res,
                        })
                        console.log(that.row);
                        that.type.tmpPwd = that.type.pwd
                        that.$nextTick(() => {
                            that.$refs.content.scrollTop = that.$refs.terminal.scrollHeight;
                        })
                    }
                })
            },
            cmdAutoComplete(type, cmd) {
                switch (cmd) {
                    case 'cls':
                        this.row = []
                        this.row.push({
                            tmpPwd: this.pwd + '>',
                            pwd: this.pwd + '>',
                            history: '',
                            result: '',
                        })
                        break;
                }

            },
            keydown(event, type) {
                let cmd = type.tmpPwd.substr(type.pwd.length, type.tmpPwd.length)
                console.log(type);
                // console.log(event.keyCode);
                if (event.keyCode === 13) {
                    event.returnValue = false;
                    this.exec(event, cmd)
                }
                if (event.keyCode === 9) {
                    console.log('tab键');
                    this.cmdAutoComplete(type, cmd)
                    event.returnValue = false;
                }
                if (event.keyCode === 38) {
                    console.log(JSON.stringify(this.row, null, 4))
                    if (this.type.id !== '') {
                        if (this.type.id !== 0) {
                            this.type.id = this.type.id - 1
                            this.type.tmpPwd = this.row[this.type.id].history
                        } else {
                            this.type.tmpPwd = this.row[this.row.length - 1].history
                            this.type.id = this.row.length - 1
                        }
                    } else {
                        if (this.row.length) {
                            this.type.tmpPwd = this.row[this.row.length - 1].history
                            this.type.id = this.row.length - 1
                        }
                    }
                    console.log(this.type.id);
                    return
                }
                if (event.keyCode === 40) {
                    console.log(JSON.stringify(this.row, null, 4))
                    console.log(this.type.id);
                    if (this.type.id !== '') {
                        if (this.type.id !== this.row.length - 1) {
                            this.type.id = this.type.id + 1
                            this.type.tmpPwd = this.row[this.type.id].history
                        } else {
                            this.type.id = 0
                            this.type.tmpPwd = this.row[this.type.id].history
                        }
                    }
                    return
                }
                if (event.keyCode === 8) {
                    if (type.tmpPwd === type.pwd) {
                        event.returnValue = false;
                    }
                }
            },
            input(event, type) {
                let textArea = event.target;
                if (textArea.scrollHeight > 195) {
                    textArea.style.height = textArea.scrollHeight + 'px'
                }
                if (event.target.value === '') {
                    type.tmpPwd = type.pwd
                }
                if (type.tmpPwd.length < type.pwd.length) {
                    type.tmpPwd = type.pwd
                }
                if (type.tmpPwd.substr(0, type.pwd.length) !== type.pwd) {
                    type.tmpPwd = type.pwd
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    .content {
        $font-color: rgb(0, 255, 0);
        $font-size: 18px;
        overflow: auto;
        height: 100%;
        background: #000;
        color: $font-color;


        .terminal {
            //width: 800px;
            //height: 800px;
            background: #000;
            color: $font-color;
            font-size: $font-size;
            font-family: "Microsoft YaHei UI";

            .row {
                margin-bottom: 20px;

                .type-container {
                    position: relative;

                    .float-pwd {
                        background: #000;
                        position: absolute;
                        /*left: 0px;*/
                        left: -1px;
                        top: 0px;
                        color: $font-color;
                        font-size: $font-size;
                        //background: #fffffb;
                    }

                    textarea {
                        resize: none;
                        font-family: "Microsoft YaHei UI";
                        height: 200px;
                        text-align: start;
                        //width: 100px;
                        width: 100%;
                        padding: 0;
                        margin: 0;
                        box-sizing: border-box;
                        border: 0;
                        outline: 0;
                        background: #000;
                        font-size: $font-size;
                        color: $font-color;
                    }
                }

                .type-history {
                    word-break: break-all;
                }

                .result {
                    font-family: "Microsoft YaHei UI";
                    margin: 0;
                }
            }
        }

    }

</style>
