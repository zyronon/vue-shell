<template>
    <div ref="menu" class="menu" :style="style" @contextmenu="e => {e.preventDefault();e.stopPropagation()}">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'Menu',  //组件命名
        props: {
            location: {
                type: Object,
                default: () => {
                    return {
                        x: 0,
                        y: 0,
                        show: false
                    }
                }
            }
        },
        data() {
            return {
                viewWidth: 1000,
                viewHeight: 700,
                node: {
                    width: 0,
                    height: 0,
                },
                style: {
                    left: '-200%'
                }
            }
        },
        watch: {
            'location.x':'calcStyle',
            'location.y':'calcStyle',
            'location.show':'calcStyle',
        },
        methods: {
            calcStyle() {
                let style = {}
                // console.log(this.viewWidth - this.location.x );
                // this.$console(this.node)
                if (this.viewWidth - this.location.x > this.node.width) {
                    style.left = this.location.x + 'px'
                } else {
                    style.right = (this.viewWidth - this.location.x) + 'px'
                }
                if (this.viewHeight - this.location.y > this.node.height) {
                    style.top = this.location.y + 'px'
                } else {
                    style.bottom = (this.viewHeight - this.location.y) + 'px'
                }
                style.display = this.location.show ? '' : 'none'
                // this.$console(style)
                this.style = style
            }
        },
        mounted() {
            this.node.width = this.$refs.menu.clientWidth
            this.node.height = this.$refs.menu.clientHeight
        }
    }
</script>

<style scoped lang="scss">
    @import "../../assets/scss/color";

    $context-menu-border-color: rgb(81, 81, 81);
    .menu {
        background: $main-bg-color;
        border: 1px solid $context-menu-border-color;
        position: fixed;
        color: $text-color;

    }


</style>
