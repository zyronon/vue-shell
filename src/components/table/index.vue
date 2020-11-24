<template>
    <table cellspacing="0">
        <thead>
        <tr>
            <th v-for="item of attrs">{{item.label}}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) of list">
            <!--            <td v-for="attr of attrs">{{item[attr.prop]}}</td>-->
            <slot :item="item"></slot>
        </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        name: "cTable",
        props: {
            list: {
                type: Array,
                default: () => {
                    return [
                        {
                            url: 'url111111',
                            pwd: 'pwd',
                            ip: 'ip',
                            note: 'note',
                            changeDate: Date.now(),
                        },
                        {
                            url: 'url',
                            pwd: 'pwd',
                            ip: 'ip',
                            note: 'note',
                            changeDate: Date.now(),
                        },
                        {
                            url: 'url',
                            pwd: 'pwd',
                            ip: 'ip',
                            note: 'note',
                            changeDate: Date.now(),
                        },
                    ]
                }
            }
        },
        data() {
            return {
                attrs: [],
            }
        },
        created() {
            let s = this.$slots
            s.default.map(v => {
                this.attrs.push(v.data.attrs)
            })

        },
        mounted() {
            console.log(this.$children);
            this.$children.map(v => {
                v._data.row = {}
            })

        },
        methods: {}
    }
</script>

<style scoped lang="scss">
    @import "../../assets/scss/color";

    $border-color: gray;
    //$bg-color: #2B2B2B;
    $head-bg-color: rgb(33, 33, 36);
    $dialog-bg-color: rgb(54, 54, 54);
    $input-bg-color: rgb(67, 67, 67);

    table {
        word-wrap: break-word;
        word-break: break-all;
        table-layout: fixed;
        width: 100%;
        border-collapse: collapse;
        //border: 1px solid $border-color;

        thead {
            color: rgb(136, 136, 136);

            tr {
                height: 30px;
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
                background-color: rgb(46, 46, 46);

                height: 30px;
                //border-bottom: 1px solid $border-color;
                &:nth-child(even) {
                    background-color: rgb(43, 43, 43);
                }

                &:hover {
                    background-color: rgb(55, 55, 55);
                }

                &:active {
                    background-color: rgb(63, 63, 63);
                }
            }

            td {
                //border-right: 1px solid $border-color;
                //width: 50%;
            }
        }
    }
</style>
