<template>
    <div class="option-bar">
        <div class="search">
            <img class="arrow-right" src="@/assets/images/search.png" alt="">
            <input type="text" value="" placeholder="搜索">
        </div>
        <div class="option-container">
            <input ref="input" type="text" :value="currentPath"  @keyup.enter="gotoPath($event.target.value)">
            <div class="options">
                <div>
                    <!--                        <img class="arrow-right" src="@/assets/images/arrow.png" alt="">-->
                    <svg @click="gotoPath($refs.input.value)" t="1605277616457" class="icon arrow-right" viewBox="0 0 1024 1024" version="1.1"
                         xmlns="http://www.w3.org/2000/svg" p-id="3434" width="32" height="32">
                        <path d="M550.032 945.557V211.999L730.36 399.318c4.796 4.795 12.57 4.795 17.367 0l37.627-37.627c4.795-4.796 4.795-12.57 0-17.367L558.343 108.517a12.524 12.524 0 0 0-0.721-0.797l-1.259-1.259-35.009-36.367c-2.568-2.567-5.99-3.746-9.352-3.564-3.369-0.188-6.8 0.991-9.372 3.562l-36.267 37.627c-0.241 0.243-0.463 0.496-0.68 0.752l-227.05 235.852c-4.797 4.796-4.797 12.57 0 17.367l37.627 37.627c4.795 4.795 12.569 4.795 17.367 0l178.637-185.562v731.8c0 6.783 5.498 12.28 12.28 12.28h53.213c6.781 0 12.28-5.497 12.28-12.28z"
                              fill="#AFB1B3" p-id="3435"></path>
                    </svg>
                </div>
                <div>
                    <svg @click="back()" t="1605277616457" class="icon arrow-up" viewBox="0 0 1024 1024"
                         version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3434" width="32" height="32">
                        <path d="M550.032 945.557V211.999L730.36 399.318c4.796 4.795 12.57 4.795 17.367 0l37.627-37.627c4.795-4.796 4.795-12.57 0-17.367L558.343 108.517a12.524 12.524 0 0 0-0.721-0.797l-1.259-1.259-35.009-36.367c-2.568-2.567-5.99-3.746-9.352-3.564-3.369-0.188-6.8 0.991-9.372 3.562l-36.267 37.627c-0.241 0.243-0.463 0.496-0.68 0.752l-227.05 235.852c-4.797 4.796-4.797 12.57 0 17.367l37.627 37.627c4.795 4.795 12.569 4.795 17.367 0l178.637-185.562v731.8c0 6.783 5.498 12.28 12.28 12.28h53.213c6.781 0 12.28-5.497 12.28-12.28z"
                              fill="#AFB1B3" p-id="3435"></path>
                    </svg>
                    <!--                        <img class="arrow-up" src="@/assets/images/arrow.png" alt="" @click="back()">-->
                </div>
                <div>
                    <svg @click="gotoPath(homePath)" t="1605277812960" class="icon home" viewBox="0 0 1024 1024"
                         version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5589" width="32" height="32">
                        <path d="M513.3 192.8l320.1 292.6c-16.3 2-31.6 8.7-43.8 19.4l-0.2 0.2-0.2 0.2c-11.8 10.5-25.8 29-25.8 58.1v272.5H646.2V720c0-43.5-36-78.8-80.3-78.8H460.3c-44.3 0-80.3 35.4-80.3 78.8v115.7H264.2v-273c0-40-30.5-73.2-69.9-78.2l319-291.7m0-64.8c-11.2 0-22.4 3.8-30.4 11.3L114.6 476c-13.2 11.3-17 28.3-9.9 43.8 7.1 15.1 22.2 24 39.6 24h39.6c11.3 0 20.3 8.5 20.3 18.8V856c0 21.7 19.3 39.6 42.9 39.6h150c23.6 0 42.9-17.9 42.9-39.6V720c0-10.4 9-18.8 20.3-18.8h105.6c11.3 0 20.3 8.5 20.3 18.8v136.1c0 21.7 19.3 39.6 43.4 39.6h150c24.1 0 43.9-17.9 43.9-39.6v-293c0-5.6 1.4-9.4 5.7-13.2 3.8-3.3 9-5.2 14.6-5.2H881c17.5 0 32.5-9.4 39.6-24 8-15.5 4.2-33-8-44.3L543.8 139.3c-8-7.5-19.3-11.3-30.5-11.3z"
                              fill="#AFB1B3" p-id="5590"></path>
                    </svg>
                    <!--                        <img class="home" src="@/assets/images/home.png" alt="" @click="gotoPath(homePath)">-->
                </div>
                <div>
                    <svg @click="gotoPath(currentPath)" t="1605277894779" class="icon refresh"
                         viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6426"
                         width="32" height="32">
                        <path d="M919.864 473.155c-21.451 0-38.844 17.393-38.844 38.845 0 203.48-165.546 369.025-369.016 369.025-203.48 0-369.025-165.546-369.025-369.025s165.546-369.025 369.025-369.025c115.742 0 224.597 55.006 293.895 145.99H667.962c-21.451 0-38.845 17.393-38.845 38.845s17.394 38.845 38.845 38.845H877.38c21.451 0 38.844-17.393 38.844-38.845V118.384c0-21.451-17.393-38.844-38.844-38.844s-38.845 17.393-38.845 38.844v89.227c-83.62-89.373-201.711-142.325-326.53-142.325C265.687 65.286 65.29 265.683 65.29 512s200.397 446.714 446.714 446.714S958.71 758.317 958.71 512c0-21.452-17.393-38.845-38.845-38.845z"
                              p-id="6427" fill="#AFB1B3"></path>
                    </svg>
                    <!--                        <img class="refresh" src="@/assets/images/refresh.png" alt="" @click="gotoPath(currentPath)">-->
                </div>
                <span>|</span>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from "vuex";
    import {TYPES} from "../../store/mutation-types";

    export default {
        name: 'OptionBar',
        data() {
            return {
                currentParsePath: ''
            }
        },
        computed: {
            ...mapState('file', [
                'currentDir',
                'homePath',
                'currentPath'
            ]),
        },
        methods: {
            ...mapActions('file', {
                gotoPath: 'gotoPath'
            }),
            back() {
                this.parsePath(this.currentPath)
                let backUrl = JSON.parse(JSON.stringify(this.currentParsePath))
                backUrl.pop()
                if (backUrl.length) {
                    backUrl = backUrl.join('/')
                    console.log(backUrl);
                    this.gotoPath(backUrl)
                }
            },
            parsePath(path) {
                //替换反斜杠
                path = path.replace(/\\/g, '/')
                if (path.endsWith('/')) {
                    path = path.substr(0, path.length - 1)
                }
                let paths
                if (path.startsWith('/')) {
                    paths = path.split('/')
                    paths[0] = '/'
                } else {
                    paths = path.split('/')
                }
                this.currentParsePath = paths
            },
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/less/color";


    .option-bar {
        display: flex;
        margin: 5px 0;
        align-items: center;

        .option-container {
            flex: 1;
            display: flex;

            border: 1px solid @main-bg-color;
            height: 100%;

            input {
                /*display: none;*/
                box-sizing: border-box;
                outline: 0;
                border: 0;
                margin: 0;
                height: 100%;
                width: 100%;
                color: rgb(187, 187, 187);
                background: @main-bg-color;

                &:focus {
                    /*border: 1px solid rgb(0, 120, 215);*/
                }
            }

            .options {
                //width: 20%;
                width: 120px;
                display: flex;
                justify-content: space-around;
                align-items: center;

                div {
                    border-left: 1px solid @main-bg-color;
                    height: 100%;
                    width: 30px;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    &:hover {
                        background: @main-bg-color;
                    }
                }

                img, svg {
                    height: 15px;
                    width: 15px;
                    padding: 2px;
                    border-radius: 2px;

                    &:hover {
                        background: rgb(76, 80, 82);
                    }
                }

                .arrow-right {
                    transform: rotate(90deg);
                }

                .arrow-up {
                    transform: rotate(0deg);
                }
            }
        }

        .search {
            border: 1px solid @main-bg-color;
            width: 200px;
            display: flex;
            align-items: center;

            img {
                margin: 0 10px;
                height: 15px;
                width: 15px;
                padding: 2px;
                border-radius: 2px;

                &:hover {
                    background: rgb(76, 80, 82);
                }
            }

            input {
                background: @main-bg-color;
                box-sizing: border-box;
                outline: 0;
                border: 0;
                margin: 0;
                height: 100%;
                width: 100%;
                color: rgb(187, 187, 187);
            }
        }
    }
</style>
