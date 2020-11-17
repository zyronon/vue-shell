<template>
    <div class="context-menu">
        <item>刷新目录</item>
        <item>上传文件</item>
        <item @click="t">下载文件</item>
        <item :is-disabled="true" @click="t">删除</item>
        <item>重命名</item>
        <item>
            新增
            <template v-slot:children>
                <item>新增文件</item>
                <item>新增文件夹</item>
            </template>
        </item>
        <item>在此处打开终端</item>
    </div>
</template>

<script>
    import item from "./item";

    export default {
        components: {
            item
        },
        name: 'ContextMenu',  //组件命名
        props: {

        },
        data() {
            return {}
        },
        computed: {},
        methods: {
            t(){
                console.log(1);
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../assets/scss/color";

    $context-menu-border-color: rgb(81, 81, 81);
    .context-menu {
        /*width: 100px;*/
        /*height: 200px;*/
        background: $bg-color;
        border: 1px solid $context-menu-border-color;
        position: absolute;
        top: 50%;
        left: 30%;
        color: $text-color;

    }


</style>
