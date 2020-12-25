<template>
    <div class="header">
        <div class="slot">
            <slot></slot>
        </div>
        <div class="options">
            <icon @click="hide" name="close" :scale="scale"></icon>
            <icon @click="large" name="close" :scale="scale"></icon>
            <icon @click="close" name="close" :scale="scale"></icon>
        </div>
    </div>
</template>

<script>
export default {
    name: 'index',
    props: {},
    data() {
        return {
            leftBarIsClose: false,
            scale: 2,
            isShow: {
                shell: false
            }
        }
    },
    created() {
    },
    mounted() {
    },
    methods: {
        hide() {
            window.nodeFunc.hideWindow()
        },
        large() {
            window.nodeFunc.maximizeWindow()
        },
        close() {
            window.nodeFunc.closeWindow()
            console.log('close')
        },
    }
}
</script>

<style scoped lang="less">
.header {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .slot {
        flex: 1;
    }

    .options {
        //-webkit-app-region: drag;
        display: flex;
        align-items: center;
        margin-right: 10px;

        img, svg {
            margin: 0 5px;
        }
    }
}
</style>
