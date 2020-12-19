<template>
    <svg class="" width="16" height="14.000000000000002" xmlns="http://www.w3.org/2000/svg">
        <!-- Created with Method Draw - http://github.com/duopixel/Method-Draw/ -->
        <g>
            <title>background</title>
            <rect fill="none" id="canvas_background" height="16" width="18" y="-1" x="-1"/>
            <g display="none" overflow="visible" y="0" x="0" height="100%" width="100%" id="canvasGrid">
                <rect fill="url(#gridpattern)" stroke-width="0" y="0" x="0" height="100%" width="100%"/>
            </g>
        </g>
        <g>
            <title>Layer 1</title>
            <path stroke="#000" id="svg_2" d="m0.062747,13.656661l7.967875,-13.656661l7.967875,13.656661l-15.93575,0z"
                  fill-opacity="null" stroke-opacity="null" stroke-width="0" fill="#adadad"/>
        </g>
    </svg>
</template>

<script>
    export default {
        name: "arrow-icon",
        props: {},
        data() {
            return {}
        },
        created() {
        },
        mounted() {
        },
        methods: {}
    }
</script>

<style scoped lang="less">
    @import "../assets/less/color";

    svg {
        transform: rotate(90deg) scale(.7);
    }

    .bottom {
        transform: rotate(180deg) scale(.7)
    }
</style>
