<template>
    <div class="item"
         ref="item"
         @click.capture="onClick"
         @mouseenter="t"
         v-on="$listeners"
         :class="isDisabled?'disabled':''">
        <div class="left">
            <folderIcon></folderIcon>
            <span>
                    <slot></slot>
                    <slot name="name"></slot>
            </span>
        </div>
        <arrow-icon v-if="isShowArrow" class="arrow"></arrow-icon>
        <div class="children" ref="children" :style="style">
            <slot name="children"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'MenuItem',  //组件命名
        props: {
            isDisabled: {
                type: Boolean
            }
        },
        data() {
            return {
                isShowArrow: false,
                location: {
                    x: 0,
                    y: 0
                },
                node: {
                    width: 0,
                    height: 0,
                }
            }
        },
        mounted() {
            if (this.$slots.children && this.$slots.children.length) {
                this.isShowArrow = true
            }
        },
        computed: {
            style() {
                let style = {}
                if ((this.viewWidth - this.location.x - this.$parent.node.width) > this.node.width) {
                    style.left = '100%'
                } else {
                    style.right = '100%'
                }
                return style
            }
        },
        methods: {
            onClick($e) {
                if (this.isDisabled) {
                    $e.stopImmediatePropagation()
                    return false
                }
            },
            t(e) {
                if (this.isShowArrow) {
                    let {clientWidth, clientHeight} = this.$refs.children
                    this.node = {width: clientWidth, height: clientHeight}
                    let {x, y} = e
                    this.location = {x, y}
                    // this.$console(this.node)
                    // console.log(this.$parent.node.width);

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
            background: $main-bg-color;
            border: 1px solid $context-menu-border-color;;
            position: absolute;
            /*left: 100%;*/
            top: -4px;
        }
    }

    .disabled {
        opacity: .5;

        &:hover {
            background: $main-bg-color;
        }
    }

</style>
