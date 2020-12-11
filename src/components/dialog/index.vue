<template>
    <div class="my-dialog" v-if="visible">
        <div class="mask"></div>
        <div class="dialog">
            <div class="header">
                {{title}}
                <svg @click="$emit('update:visible', false)" t="1603953684261" class="icon" viewBox="0 0 1024 1024"
                     version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="3038" width="32" height="32">
                    <path d="M519.02036023 459.47959989L221.8941505 162.35411435a37.07885742 37.07885742 0 1 0-52.45354772 52.40502656l297.12476134 297.15010821L169.44060278 809.05863314a37.07885742 37.07885742 0 1 0 52.42964924 52.42892505l297.15010821-297.12476136 297.15010822 297.12476136a37.07885742 37.07885742 0 1 0 52.42892504-52.40430237l-297.12476135-297.1740067 297.12476135-297.12548553a37.07885742 37.07885742 0 1 0-52.42892504-52.42964924L519.04498291 459.47959989z"
                          p-id="3039" fill="#8a8a8a"></path>
                </svg>
            </div>
            <div class="content">
                <slot name="content"></slot>
            </div>
            <div class="footer">
                <slot name="footer"></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'my-dialog',

        props: {
            title: {
                type: String,
                required: true
            },
            visible: {
                type: Boolean,
                default: false,
                required: true
            },
        },
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

<style scoped lang="scss">
    $border-color: gray;
    $main-bg-color: #2B2B2B;
    $head-bg-color: rgb(33, 33, 36);
    $dialog-bg-color: rgb(54, 54, 54);
    $input-bg-color: rgb(67, 67, 67);
    $main-bg-color: #2B2B2B;

    .my-dialog {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
    }

    .mask {
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        position: absolute;
        background: rgba(0, 0, 0, 0.4);
    }

    .dialog {
        top: 100px;
        left: 25%;
        position: absolute;
        border-radius: 10px;
        background: $dialog-bg-color;
        width: 50%;
        //height: 100px;
        border: 1px solid $main-bg-color;

        .header {
            font-weight: bold;
            color: white;
            padding: 20px;
            /*padding-bottom: 10px;*/
            position: relative;
            text-align: center;

            img, svg {
                width: 20px;
                height: 20px;
                position: absolute;
                right: 10px;
                top: 10px;
                cursor: pointer;
            }
        }

        .content {
            padding: 0 20px;
            color: #606266;
            font-size: 14px;
            word-break: break-all;

            .form {
                .form-row {
                    display: flex;
                    align-items: center;
                    margin: 5px 0;

                    span {
                        flex: 2;
                    }

                    input {
                        background-color: $input-bg-color;
                        background-image: none;
                        border-radius: 4px;
                        border: 1px solid $input-bg-color;;
                        box-sizing: border-box;
                        color: white;
                        display: inline-block;
                        font-size: inherit;
                        height: 30px;
                        line-height: 30px;
                        outline: none;
                        padding: 0 10px;
                        /*width: 100%;*/
                        flex: 9;
                    }

                    select {
                        background-color: $input-bg-color;
                        background-image: none;
                        border-radius: 4px;
                        border: 1px solid $input-bg-color;;
                        box-sizing: border-box;
                        color: white;
                        display: inline-block;
                        font-size: inherit;
                        height: 30px;
                        outline: none;
                        padding: 0 10px;
                        flex: 9;

                        option {
                            height: 50px;
                        }
                    }

                }

                .table-headers {
                    table {
                        word-wrap: break-word;
                        word-break: break-all;
                        table-layout: fixed;
                        width: 100%;
                        border-collapse: collapse;

                        thead {
                            color: rgb(136, 136, 136);

                            tr {
                                height: 25px;
                            }

                            th {
                                border-right: 1px solid $border-color;

                                &:nth-last-child(1) {
                                    border-right: none;
                                }
                            }
                        }

                        tbody {
                            /*text-align: center;*/
                            tr {
                                //background-color: rgb(46, 46, 46);
                                background-color: $input-bg-color;

                                height: 30px;
                                border-bottom: 1px solid $border-color;
                            }

                            td {
                                border-right: 1px solid $border-color;

                                &:nth-last-child(1) {
                                    border-right: none;
                                }
                            }

                            input[type="text"] {
                                background-color: $input-bg-color;
                                background-image: none;
                                border: none;
                                box-sizing: border-box;
                                color: white;
                                display: inline-block;
                                font-size: inherit;
                                height: 30px;
                                line-height: 30px;
                                outline: none;
                                padding: 0 10px;
                                width: 100%;
                            }
                        }
                    }
                }
            }
        }


        .footer {
            padding: 20px;

            .button {
                margin: 0 5px;
            }
        }
    }
</style>
