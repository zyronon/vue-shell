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
        <div class="drag"></div>
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
            },
        }
    }
</script>

<style scoped lang="less">
    .header {
        position: relative;
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .slot {
            flex: 1;
        }

        .options {
            display: flex;
            align-items: center;
            margin-right: 10px;

            img, svg {
                margin: 0 5px;
            }
        }

        .drag {
            -webkit-app-region: drag;
            width: 100%;
            height: 15px;
            position: absolute;
            right: 0;
            top: 0;
        }
    }
</style>
