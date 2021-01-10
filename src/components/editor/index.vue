<template>
    <div>
        <textarea></textarea>
    </div>
</template>

<script>
    import CodeMirror from 'codemirror'

    import 'codemirror/mode/javascript/javascript'//加载js模式，可以高度js代码
    import 'codemirror/mode/css/css'
    import 'codemirror/mode/python/python'
    import 'codemirror/mode/jsx/jsx'
    import 'codemirror/mode/markdown/markdown'
    import 'codemirror/mode/sql/sql'
    import 'codemirror/mode/nginx/nginx'
    import 'codemirror/mode/vue/vue'
    // import 'codemirror/mode/shell/shell'
    // import 'codemirror/mode/powershell/powershell'
    import 'codemirror/mode/php/php'//自带

    //全局搜索
    import 'codemirror/addon/search/jump-to-line'
    import 'codemirror/addon/search/search'
    import 'codemirror/addon/search/searchcursor'

    //输入时自动关闭括号和花括号
    import 'codemirror/addon/edit/closebrackets'

    //搜索框
    // import 'codemirror/addon/dialog/dialog'
    // import 'codemirror/addon/dialog/dialog.css'

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
    import 'codemirror/addon/selection/active-line'
    // import 'codemirror/addon/selection/mark-selection'
    // import 'codemirror/addon/selection/selection-pointer'

    //返回元信息
    import 'codemirror/mode/meta'


    import 'codemirror/lib/codemirror.css'
    import 'codemirror/theme/dracula.css'//dracula主题
    import 'codemirror/theme/material-darker.css'
    // import 'codemirror/theme/idea.css'
    import '@/assets/less/idea-dark.css'
    // import 'codemirror/theme/monokai.css'

    export default {
        name: 'CodeEditor',
        props: {
            content: '',
            mode: '',
            path: '',
        },
        data() {
            return {
                theme: 'idea',
                editor: null,
                shell: null,
                res: null,
            }
        },
        created() {
        },
        watch: {
            mode() {
                this.editor.setOption('mode', this.mode)
            }
        },
        methods: {
            getValue() {
                return this.editor.getValue()
            },
        },
        mounted() {
            let textarea = document.querySelector('textarea')
            this.editor = CodeMirror.fromTextArea(textarea, {
                lineNumbers: true,     // 显示行数
                indentUnit: 4,         // 缩进单位为4
                styleActiveLine: true, // 当前行背景高亮
                lineWrapping: true,    // CodeMirror是否应滚动或换行以显示长行。默认为false（滚动）。
                // scrollbarStyle: 'overlay',//选择滚动条实现。默认值为"native"，显示本机滚动条。核心库还提供了"null"样式，该样式完全隐藏了滚动条。插件可以实现其他滚动条模型。
                theme: this.theme,   //设置主题
                // theme: "material-darker",   //设置主题
                // theme: "idea",   //设置主题
                matchBrackets: true,   // 括号匹配
                autoCloseBrackets: true,//配合closebrackets.js自动关闭括号和花括号
                foldGutter: true,
                gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
                extraKeys: {
                    // Tab键换成4个空格
                    Tab: function (cm) {
                        let spaces = Array(cm.getOption('indentUnit') + 1).join(' ')
                        cm.replaceSelection(spaces)
                    },
                    // Esc键退出全屏
                    'Ctrl-F': function (cm) {
                        CodeMirror.commands.find(cm)
                        // CodeMirror.commands.findNext(cm)
                    },
                    'Ctrl-/': function (cm) {
                        CodeMirror.commands.toggleComment(cm)
                    }
                }
            })

            if (this.mode) {
                this.editor.setOption('mode', this.mode)
            }

            if (this.path) {
                let meta = CodeMirror.findModeByFileName(this.path)
                if (meta) {
                    this.editor.setOption('mode', meta.mode)
                    this.$emit('update:mode', meta.mode)
                }
            }

            this.editor.setSize('100%', '100%')
            this.editor.setValue(this.content)
        }

    }
</script>

<style lang="less" scoped>
    /deep/ .CodeMirror {
        font-family: 'Operator Mono', 'Source Code Pro', Menlo, Monaco, Consolas, Courier New, monospace;
    }
</style>
