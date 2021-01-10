<template>
    <div class="header">
        <div class="slot">
            <slot></slot>
        </div>
        <div class="options">
            <minus style="margin:0 5px;"  @click="hide" theme="outline" size="19" fill="#8A8A8A" :strokeWidth="3"/>
            <full-screen style="margin:0 5px;"  @click="large" theme="outline" size="15" fill="#8A8A8A" :strokeWidth="3"/>
            <close style="margin:0 5px;"  @click="close" theme="outline" size="19" fill="#8A8A8A" :strokeWidth="3"/>
        </div>
        <div class="drag"></div>
    </div>
</template>

<script>
    import { Close, Minus, FullScreen} from '@icon-park/vue'

    export default {
        components: {
            FullScreen,
            Minus,
            Close,
        },
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
