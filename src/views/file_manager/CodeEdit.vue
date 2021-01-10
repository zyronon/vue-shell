<template>
    <div id="code_edit">
        <c-header>
            <span class="title">{{title}}</span>
            <div class="pull-right">
                <select id="mode" v-model="mode">
                    <option value="html">HTML</option>
                    <option value="php">PHP</option>
                    <option value="java">JAVA</option>
                    <option value="sql">SQL</option>
                    <option value="nginx">Nginx</option>
                    <option value="markdown">Markdown</option>
                    <option value="javascript">JS</option>
                    <option value="jsx">JSX</option>
                    <option value="vue">VUE</option>
                    <option value="css">CSS</option>
                </select>
                <c-button style="margin-left: 10px;" @click="save">保存</c-button>
                <c-button style="margin-left: 10px;" @click="$emit('close')">关闭</c-button>
            </div>
        </c-header>
        <CodeEditor class="editor" ref="editor" :mode.sync="mode" :path="path" :content="content"></CodeEditor>
    </div>
</template>

<script>
    import CodeEditor from '@/components/editor'
    import File from '../../template/php/file.js'
    import crypto from '../../utils/crypto'

    export default {
        name: 'CodeEdit',  //组件命名
        components: {
            CodeEditor
        },
        props: {
            content: {
                type: String,
                required: true
            },
            path: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
        },
        data() {
            return {
                mode: '',
                theme: 'idea',
                editor: null
            }
        },
        created() {
        },
        methods: {
            async save() {
                let shell = this.$route.query.shell
                shell = JSON.parse(shell)
                let content = this.$refs.editor.getValue()

                let res = await this.$genRequest(shell, new File().change, [
                    this.path, crypto.base64Encode(content, false)
                ])
                if (!res) {
                    this.$bus.$emit('updateContent', {path: this.path, content})
                }
            }
        },
    }
</script>

<style scoped lang="less">
    @hover-color: rgb(229, 243, 255);
    @import "src/assets/less/color";

    #code_edit {
        background: @main-bg-color;

        .editor {
            height: calc(100vh - 80px);
        }
    }


</style>
