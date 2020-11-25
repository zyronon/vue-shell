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
            return {}
        },
        computed: {
            ...mapState('layout', [
                'tableColumns',
            ]),
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
                        {this.tableColumns.map(w => {
                            return <th>{w.attrs.label}</th>
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
