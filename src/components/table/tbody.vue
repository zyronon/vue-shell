<script>
    import {mapState} from "vuex";

    export default {
        name: "cTableTbody",
        props: {
            list: {
                type: Array,
                default: () => {
                    return []
                }
            }
        },
        data() {
            return {
                columns: []
            }
        },
        computed: {
            ...mapState('layout', [
                'tableColumns',
            ]),
        },
        watch: {
            '$store.state.layout.tableColumns'(){
                console.log(11);
            }
        },
        created() {
        },
        mounted() {
        },
        methods: {},
        render(createElement, context) {
            return (
                <table cellSpacing="0">
                    <thead>
                    <tr>
                        {this.columns.map(w => {
                            return <th class="up">{w.attrs.label}
                                <div class="resize-vertical"/>
                            </th>
                        })}

                    </tr>
                    </thead>
                    <tbody>
                    {this.list.map(v => {
                        return (
                            <tr onClick={e => this.$emit('row-click', e, v)}>
                                {this.tableColumns.map(w => {
                                    return <td>{w.renderCell(v)}</td>
                                })}
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            )
        }
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
            text-align: left;
            color: rgb(136, 136, 136);

            tr {
                height: 30px;
            }

            th {
                // border-right: 1px solid $border-color;
                position: relative;

                &:nth-last-child(1) {
                    border-right: none;
                }

                &:hover {
                    background: rgb(76, 76, 76);
                }

                .resize-vertical {
                    content: '';
                    height: 100%;
                    position: absolute;
                    right: -4px;
                    top: 0;
                    cursor: col-resize;
                    width: 8px;
                    z-index: 10;
                }
            }

            $arrow-color: #ccc;

            .up {
                &::after {
                    content: '';
                    width: 5px;
                    height: 5px;
                    border-top: 1px solid $arrow-color;
                    border-left: 1px solid $arrow-color;
                    transform: rotate(45deg) translateY(7px);
                    position: absolute;
                    left: 50%;
                    top: 0;
                }
            }

            .down {
                &::after {
                    content: '';
                    width: 5px;
                    height: 5px;
                    border-bottom: 1px solid $arrow-color;
                    border-right: 1px solid $arrow-color;
                    transform: rotate(45deg) translate(-2px, 4px);
                    position: absolute;
                    left: 50%;
                    top: 0;
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
                    // background-color: rgb(43, 43, 43);
                }


                &.active {
                    background: $hover-color;
                }

                &:hover {
                    background: $hover-color;
                }
            }

            td {
                //border-right: 1px solid $border-color;
                //width: 50%;
            }
        }
    }
</style>
