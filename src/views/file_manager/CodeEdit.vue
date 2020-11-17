<template>
    <div id="code_edit">
        <div class="header">
            <span class="title">{{title}}</span>
            <div class="right">
                <div class="button primary" @click="save">保存</div>
                <img class="cp" src="@/assets/images/close.png" alt="" @click="$emit('close')">
            </div>
        </div>
        <textarea></textarea>
    </div>
</template>

<script>
    import CodeMirror from 'codemirror'

    import 'codemirror/mode/javascript/javascript'//加载js模式，可以高度js代码
    import 'codemirror/mode/python/python'
    import 'codemirror/mode/css/css'
    import 'codemirror/mode/shell/shell'
    import 'codemirror/mode/jsx/jsx'
    import 'codemirror/mode/markdown/markdown'
    import 'codemirror/mode/php/php'
    import 'codemirror/mode/powershell/powershell'
    import 'codemirror/mode/sql/sql'

    //全局搜索
    import 'codemirror/addon/search/jump-to-line'
    import 'codemirror/addon/search/search'
    import 'codemirror/addon/search/searchcursor'

    //输入时自动关闭括号和花括号
    import 'codemirror/addon/edit/closebrackets'

    //搜索框
    import 'codemirror/addon/dialog/dialog'
    import 'codemirror/addon/dialog/dialog.css'

    //折叠
    import 'codemirror/addon/fold/foldcode'
    import 'codemirror/addon/fold/foldgutter.css'
    import 'codemirror/addon/fold/foldgutter'
    import 'codemirror/addon/fold/comment-fold'
    import 'codemirror/addon/fold/brace-fold'
    import 'codemirror/addon/fold/indent-fold'
    import 'codemirror/addon/fold/markdown-fold'
    import 'codemirror/addon/fold/xml-fold'

    //注释
    import 'codemirror/addon/comment/comment'

    //光标所在行高亮
    // import 'codemirror/addon/selection/active-line'
    // import 'codemirror/addon/selection/mark-selection'
    import 'codemirror/addon/selection/selection-pointer'

    //返回元信息
    import 'codemirror/mode/meta'

    //美化滚动条
    import 'codemirror/addon/scroll/simplescrollbars'
    import 'codemirror/addon/scroll/simplescrollbars.css'


    import 'codemirror/lib/codemirror.css'
    import 'codemirror/theme/dracula.css'//dracula主题
    import 'codemirror/theme/material-darker.css'
    // import 'codemirror/theme/idea.css'
    import '@/assets/scss/idea-dark.css'
    import 'codemirror/theme/monokai.css'

    // import {Base64} from 'js-base64';
    // import Base64 from 'crypto-js/enc-base64';
    import base64 from '../../utils/base64.js'
    import File from '../../template/php/file.js'
    import {TYPES} from "../../store/mutation-types";

    export default {
        name: 'CodeEdit',  //组件命名
        props: {
            content: {
                type: String,
                required:true
            },
            path: {
                type: String,
                required:true
            },
            title: {
                type: String,
                required:true
            },
        },
        data() {
            return {
                theme: 'idea',
                editor: null
            }
        },
        created() {
            console.log(base64);
        },
        methods: {
            async save() {
                let content = this.editor.getValue()
                let res = await this.$request('http://localhost:8863/api/shell.php', {
                    c: new File(this.path, 'change').change(),
                    'change': encodeURIComponent(base64._encode(content, false))
                }, {}, 'POST')
                console.log(res);
            }
        },
        mounted() {
            let textarea = document.querySelector('textarea')
            this.editor = CodeMirror.fromTextArea(textarea, {
                lineNumbers: true,     // 显示行数
                indentUnit: 4,         // 缩进单位为4
                styleActiveLine: true, // 当前行背景高亮
                matchBrackets: true,   // 括号匹配
                mode: 'null',     // HMTL混合模式
                lineWrapping: false,    // CodeMirror是否应滚动或换行以显示长行。默认为false（滚动）。
                scrollbarStyle: 'overlay',//选择滚动条实现。默认值为"native"，显示本机滚动条。核心库还提供了"null"样式，该样式完全隐藏了滚动条。插件可以实现其他滚动条模型。
                theme: this.theme,   //设置主题
                // theme: "material-darker",   //设置主题
                // theme: "idea",   //设置主题
                autoCloseBrackets: true,//配合closebrackets.js自动关闭括号和花括号
                foldGutter: true,
                gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
            });
            let meta = CodeMirror.findModeByFileName(this.path)
            if (meta) {
                this.editor.setOption('mode', meta.mode);     //设置代码框的长宽
            }

            this.editor.setOption("extraKeys", {
                // Tab键换成4个空格
                Tab: function (cm) {
                    var spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
                    cm.replaceSelection(spaces);
                },
                // Esc键退出全屏
                "Ctrl-F": function (cm) {
                    CodeMirror.commands.find(cm)
                    // CodeMirror.commands.findNext(cm)
                },
                'Ctrl-/': function (cm) {
                    CodeMirror.commands.toggleComment(cm)
                }

            });
            this.editor.setSize('100%', '100%');     //设置代码框的长宽
            this.editor.setValue(this.content)
        }
        // editor.getValue();    //获取代码框的值
    }
</script>

<style scoped lang="scss">
    $hover-color: rgb(229, 243, 255);

    img {
        height: 15px;
    }

    #code_edit {
        width: 100%;
        height: calc(100% - 70px);

        .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 40px;
            border-bottom: 1px solid #cbcbcb;
            padding: 0 20px;

            .button{
                margin-right: 10px;
            }
        }


    }


</style>
