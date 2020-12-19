<script>
    export default {
        name: 'index',
        props: {
            size: {
                type: String,
                default() {
                    return 'normal'
                }
            }
        },
        data() {
            return {}
        },
        created() {
        },
        mounted() {
        },
        methods: {},
        render(createElement, context) {
            return (
                <i class={'loading ' + this.size}>
                    <div class="circle-line-inner">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </i>
            )
        }
    }
</script>
<style lang="less" scoped>
    @width: 14px;
    @font-size: 2.8px;
    .loading {
        line-height: 1;
        vertical-align: middle;
        display: inline-block;
        width: @width;
        height: @width;
        font-size: @font-size;


        &.small {
            width: @width;
            height: @width;
            font-size: @font-size;
        }
        &.normal {
            width: 2* @width;
            height: 2* @width;
            font-size: 2 *@font-size;
        }

        &.large {
            width: 4* @width;
            height: 4* @width;
            font-size: 4 *@font-size;
        }
    }

    .circle-line-inner {
        position: relative;
        width: 100%;
        height: 100%;
        animation: rotate 1.5s linear infinite;

        span {
            position: absolute;
            display: inline-block;
            width: 1.5em;
            height: .5em;
            border-top-left-radius: .25em;
            border-bottom-left-radius: .25em;
            background: #ffffff;
            opacity: .7;

            &:nth-child(1) {
                top: 50%;
                left: 0;
                margin-top: -.25em;
            }

            &:nth-child(2) {
                top: 1em;
                left: .5em;
                transform: rotate(45deg);
            }

            &:nth-child(3) {
                left: 50%;
                top: .5em;
                margin-left: -.75em;
                transform: rotate(90deg);
            }

            &:nth-child(4) {
                right: .5em;
                top: 1em;
                transform: rotate(145deg);
            }

            &:nth-child(5) {
                left: 3.5em;
                top: 50%;
                margin-top: -.25em;
                transform: rotate(180deg);
            }

            &:nth-child(6) {
                bottom: 1em;
                right: .5em;
                transform: rotate(-145deg);
            }

            &:nth-child(7) {
                left: 50%;
                bottom: .5em;
                margin-left: -.75em;
                transform: rotate(-90deg);
            }

            &:nth-child(8) {
                bottom: 1em;
                left: .5em;
                transform: rotate(-45deg);
            }
        }

    }


    @keyframes rotate {
        0% {
            transform: rotate(0);
        }
        100% {
            transform: rotate(360deg);
        }
    }

</style>
