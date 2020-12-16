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
    const electron = require('electron')

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
            },
            large() {
            },
            close() {
                let name = electron.remote.app.getName()
                alert(name)
            },
        }
    }
</script>

<style scoped lang="scss">
    .header {
        height: 40px;
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
    }
</style>
