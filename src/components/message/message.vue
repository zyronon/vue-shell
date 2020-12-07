<template>
    <transition name="fade" @after-leave="handleAfterLeave">
        <div class="message"
             v-if="visible"
             :style="positionStyle"
             @mouseenter="clearTimer"
             @mouseleave="startTimer"
        >
            <div class="message-header">
                <div class="left">
                    <svg t="1603954121990" viewBox="0 0 1129 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                         p-id="21473" width="200" height="200" class="icon">
                        <path data-v-5e27c0e4=""
                              d="M492.57931 877.462069a19.244138 19.244138 0 0 1-6.885517-1.412414 17.655172 17.655172 0 0 1-10.593103-18.714483L512 590.035862h-172.667586A17.655172 17.655172 0 0 1 323.089655 564.965517L476.689655 209.037241a17.655172 17.655172 0 0 1 16.242759-10.593103h252.645517a17.655172 17.655172 0 0 1 15.183448 8.474483 17.655172 17.655172 0 0 1 0 17.655172l-105.931034 205.506207h146.184827a17.655172 17.655172 0 0 1 15.713104 9.886897 17.655172 17.655172 0 0 1-1.588966 17.655172L506.703448 870.4a17.655172 17.655172 0 0 1-14.124138 7.062069z m-126.411034-322.736552h167.017931a17.655172 17.655172 0 0 1 13.241379 6.002759 17.655172 17.655172 0 0 1 4.237242 13.947586L519.591724 794.482759l247.172414-329.445518h-139.828966a17.655172 17.655172 0 0 1-15.713103-25.6l105.931034-205.506207h-211.862069z"
                              fill="#8a8a8a" p-id="21474"></path>
                    </svg>
                    <strong class="mr-auto">提示</strong>
                </div>
                <span class="close" @click="close">&times;</span>
            </div>
            <div class="message-body">
                {{message}}
            </div>
        </div>
    </transition>
</template>
<script>
    export default {
        name: 'Message',
        data() {
            return {
                visible: true,
                message: '',
                duration: 3000,
                type: 'info',
                verticalOffset: 220,
                timer: null,
                onClose: null,
            };
        },
        computed: {
            positionStyle() {
                return {
                    'top': `${this.verticalOffset}px`
                };
            }
        },
        methods: {
            handleAfterLeave() {
                this.$destroy(true);
                this.$el.parentNode.removeChild(this.$el);
            },
            close() {
                this.visible = false
                if (typeof this.onClose === 'function') {
                    this.onClose(this);
                }
            },

            clearTimer() {
                clearTimeout(this.timer);
            },

            startTimer() {
                if (this.duration > 0) {
                    this.timer = setTimeout(() => {
                        if (this.visible) {
                            this.close();
                        }
                    }, this.duration);
                }
            },
            keydown(e) {
                if (e.keyCode === 27) { // esc关闭消息
                    if (this.visible) {
                        this.close();
                    }
                }
            }
        },
        mounted() {
            this.startTimer();
            document.addEventListener('keydown', this.keydown);
        },
        beforeDestroy() {
            document.removeEventListener('keydown', this.keydown);
        }
    }
</script>
<style lang="scss" scoped>

    .fade-enter-active, .fade-leave-active {
        opacity: 1;
        transform: translateY(0%)
    }

    .fade-enter, .fade-leave-to {
        transition: all .5s;
        opacity: 0;
        transform: translateY(-100%)
    }
    .message {
        color: black;
        display: inline-block;
        background: white;
        border-radius: 4px;
        position: fixed;
        right: 30px;
        top: 20px;
        width: 200px;


        animation: .5s slidein;
        @keyframes slidein {
            from { transform: translateY(-100%); }
            to   { transform: translateY(0%);
            }
        }

        .message-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 5px;

            .left {
                display: flex;
                justify-content: space-between;
                align-items: center;
                color: rgb(108, 118, 125);

                svg {
                    width: 18px;
                    height: 18px;
                }
            }

            .close {
                cursor: default;
                height: 18px;
                margin-right: 5px;
                transform: scale(1.5);
            }
        }

        .message-body {
            border-radius: 0 0 4px 4px;
            padding: 10px;
            background: rgb(225, 226, 227);
        }

    }
</style>
