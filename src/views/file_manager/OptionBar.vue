<template>
    <div class="option-bar">
        <div class="nav-bar">
            <div class="option-container">
                <div class="breadcrumb-container">
                    <div class="breadcrumb">
                        <div v-for="item of current_parse_path">{{item}}</div>
                    </div>
                    <input type="text" :value="currentPath">
                </div>
                <div class="options">
                    <div>
                        <img class="arrow-right" src="@/assets/images/arrow.png" alt="">
                    </div>
                    <div>
                        <img class="arrow-up" src="@/assets/images/arrow.png" alt=""
                             @click="back()">
                    </div>
                    <div>
                        <img class="home" src="@/assets/images/home.png" alt=""
                             @click="gotoPath(homePath)">
                    </div>
                    <div>
                        <img class="refresh" src="@/assets/images/refresh.png" alt=""
                             @click="gotoPath(currentPath)">
                    </div>
                </div>
            </div>
            <div class="search">
                <img class="arrow-right" src="@/assets/images/search.png" alt="">
                <input type="text" value="" placeholder="搜索">
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from "vuex";

    export default {
        name: 'OptionBar',
        data() {
            return {
                current_parse_path: ''
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
            },
        }
    }
</script>

<style scoped lang="scss">
    $hover-color: rgb(75, 110, 175);
    $border-color: rgb(229, 229, 229);
    $bg-color: rgb(60, 63, 65);

    .option-bar {
        width: 100%;
        /*position: absolute;*/
        top: 0;
        left: 0;
        height: 30px;

        .nav-bar {
            height: 30px;
            display: flex;


            .option-container {
                display: flex;
                width: 66%;

                border: 1px solid $bg-color;
                height: 100%;

                .breadcrumb-container {
                    height: 100%;
                    width: calc(100% - 120px);

                    .breadcrumb {
                        height: 100%;
                        width: 80%;
                        display: flex;
                        display: none;
                        align-items: center;
                        overflow: auto;

                        &::-webkit-scrollbar {
                            display: none; /* Chrome Safari */
                        }

                        div {
                            height: 100%;
                            display: flex;
                            align-items: center;
                            padding: 0 8px;
                            white-space: nowrap; //强制文本不换行

                            &::after {
                                margin-left: 10px;
                                content: "";
                                width: 5px;
                                height: 5px;
                                border: solid gray;
                                border-width: 1px 1px 0 0;
                                transform: translateY(2px) rotate(45deg);
                            }

                            &:nth-last-child(1) {
                                &::after {
                                    display: none;
                                }
                            }

                            &:hover {
                                background: $hover-color;
                            }
                        }
                    }

                    input {
                        /*display: none;*/
                        box-sizing: border-box;
                        outline: 0;
                        border: 0;
                        margin: 0;
                        padding: 0 15px;
                        height: 100%;
                        width: 100%;
                        color: rgb(187, 187, 187);
                        background: $bg-color;

                        &:focus {
                            /*border: 1px solid rgb(0, 120, 215);*/
                        }
                    }
                }

                .options {
                    //width: 20%;
                    width: 120px;
                    display: flex;
                    justify-content: space-around;
                    align-items: center;

                    div {
                        border-left: 1px solid $bg-color;
                        height: 100%;
                        width: 30px;
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        &:hover {
                            background: $bg-color;
                        }
                    }

                    img {
                        height: 15px;
                    }

                    .arrow-right {
                        transform: rotate(-90deg);
                    }

                    .arrow-up {
                        transform: rotate(180deg);
                    }
                }
            }

            .search {
                margin-left: 10px;
                border: 1px solid $bg-color;
                width: 33%;
                display: flex;
                align-items: center;

                img {
                    margin: 0 10px;
                    height: 15px;
                }

                input {
                    background: $bg-color;
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
    }
</style>
