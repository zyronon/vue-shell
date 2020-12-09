<script>
    export default {
        name: 'CButton',
        props: {},
        data() {
            return {
                loading: false
            }
        },
        created() {
        },
        methods: {},
        mounted() {
            //{this.$slots.default}
        },
        render() {
            return (
                <div class='button1'>

                    <div class="loader circle-line-spin small">
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
                    </div>
                </div>
            )
        }
    }
</script>
<style lang="scss" scoped>
    .loader {
        float: left;
    }

    .loader {
        position: relative;
        width: 5rem;
        height: 5rem;
    }

    .loader.small {
        transform: scale(.5);
    }

    .loader.circle-line,
    .loader.circle-round {
        height: 5rem;
    }


    /*circle-line-spin*/

    .loader.circle-line-spin .circle-line-inner {
        width: 100%;
        height: 100%;
        /*animation: circle-line-spin 1.5s linear infinite;*/
    }

    .loader.circle-line-spin span {
        position: absolute;
        display: inline-block;
        width: 1.5rem;
        height: .5rem;
        border-top-left-radius: .25rem;
        border-bottom-left-radius: .25rem;
        background: #1ABC9C;
        opacity: .7;
    }

    .loader.circle-line-spin span:nth-child(1) {
        top: 50%;
        left: 0;
        margin-top: -.25rem;
    }

    .loader.circle-line-spin span:nth-child(2) {
        top: 1rem;
        left: .5rem;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
    }

    .loader.circle-line-spin span:nth-child(3) {
        left: 50%;
        top: .5rem;
        margin-left: -.75rem;
        -webkit-transform: rotate(90deg);
        transform: rotate(90deg);
    }

    .loader.circle-line-spin span:nth-child(4) {
        right: .5rem;
        top: 1rem;
        -webkit-transform: rotate(145deg);
        transform: rotate(145deg);
    }

    .loader.circle-line-spin span:nth-child(5) {
        left: 3.5rem;
        top: 50%;
        margin-top: -.25rem;
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg);
    }

    .loader.circle-line-spin span:nth-child(6) {
        bottom: 1rem;
        right: .5rem;
        -webkit-transform: rotate(-145deg);
        transform: rotate(-145deg);
    }

    .loader.circle-line-spin span:nth-child(7) {
        left: 50%;
        bottom: .5rem;
        margin-left: -.75rem;
        -webkit-transform: rotate(-90deg);
        transform: rotate(-90deg);
    }

    .loader.circle-line-spin span:nth-child(8) {
        bottom: 1rem;
        left: .5rem;
        -webkit-transform: rotate(-45deg);
        transform: rotate(-45deg);
    }

    @keyframes circle-line-spin {
        0% {
            transform: rotate(0);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    @-webkit-keyframes circle-line-spin {
        0% {
            -webkit-transform: rotate(0);
        }
        100% {
            -webkit-transform: rotate(360deg);
        }
    }

</style>
