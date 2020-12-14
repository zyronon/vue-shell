<template>
    <div class="header">
        <div class="slot">
            <slot></slot>
        </div>
        <div class="options">
            <icon name="close" :scale="scale"></icon>
            <icon name="close" :scale="scale"></icon>
            <icon name="close" :scale="scale"></icon>
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
        methods: {}
    }
</script>

<style scoped lang="scss">
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .slot{
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
