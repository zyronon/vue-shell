<template>
    <div class="item" @click.capture="onClick" v-on="$listeners" :class="isDisabled?'disabled':''">
        <div class="left">
            <folderIcon></folderIcon>
            <span>
                    <slot></slot>
                    <slot name="name"></slot>
            </span>
        </div>
        <arrow-icon v-if="isShowArrow" class="arrow"></arrow-icon>
        <div class="children">
            <slot name="children"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ContextMenu',  //组件命名
        props: {
            isDisabled: {
                type: Boolean
            }
        },
        data() {
            return {
                isShowArrow: false
            }
        },
        mounted() {
            if (this.$slots.children && this.$slots.children.length) {
                this.isShowArrow = true
            }
        },
        computed: {},
        methods: {
            onClick($e) {
                if (this.isDisabled) {
                    $e.stopImmediatePropagation()
                    return false
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../assets/scss/color";

    $context-menu-border-color: rgb(81, 81, 81);
    .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-width: 100px;
        padding: 3px 10px;
        border-bottom: 1px solid $context-menu-border-color;
        position: relative;
        cursor: context-menu;

        .left {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        &:hover {
            background: $hover-color;

            & > .children {
                display: block;
            }
        }

        span {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .arrow {
            margin-left: 10px;

        }

        .children {
            display: none;
            z-index: 9;
            background: $bg-color;
            border: 1px solid $context-menu-border-color;;
            position: absolute;
            left: 100%;
            top: -4px;
        }
    }

    .disabled {
        opacity: .5;

        &:hover {
            background: $bg-color;
        }
    }

</style>
