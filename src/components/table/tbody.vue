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
                noSortList: this.$clone(this.list),
                useList: this.$clone(this.list),
            }
        },
        computed: {
            ...mapState('layout', [
                'tableColumns',
            ]),
        },
        watch: {
            'list'(){
                console.log(1);
            }
        },
        created() {
        },
        mounted() {
        },
        methods: {
            sort(id) {
                let item = this.tableColumns.find(v => v.id === id)
                if (item.attrs.sortable === undefined) return
                item.sort = item.sort !== -1 ? item.sort === 1 ? 0 : -1 : 1
                this.tableColumns.map(v => {
                    if (v.id !== item.id) {
                        v.sort = -1
                    }
                })
                if (item.sort === -1) {
                    this.sortBy()
                } else if (item.sort === 1) {
                    this.sortBy(item.attrs.prop, 'ascending')
                } else {
                    this.sortBy(item.attrs.prop, 'descending')
                }
                // this.$console(item)
                this.$store.commit('layout/setTableColumns', this.tableColumns)
            },
            sortBy(key, type) {
                if (key === undefined) {
                    this.useList = this.$clone(this.noSortList)
                } else {
                    if (type === 'ascending') {
                        console.log('升序');
                        for (let i = 0; i < this.useList.length - 1; i++) {
                            for (let j = 0; j < this.useList.length - 1 - i; j++) {
                                if (this.useList[j][key] > this.useList[j + 1][key]) {
                                    let temp = this.useList[j]
                                    this.useList[j] = this.useList[j + 1]
                                    this.useList[j + 1] = temp
                                }
                            }
                        }
                    } else {
                        for (let i = 0; i < this.useList.length - 1; i++) {
                            for (let j = 0; j < this.useList.length - 1 - i; j++) {
                                if (this.useList[j][key] < this.useList[j + 1][key]) {
                                    let temp = this.useList[j]
                                    this.useList[j] = this.useList[j + 1]
                                    this.useList[j + 1] = temp
                                }
                            }
                        }
                        console.log('降序');
                    }
                }
            }
        },

        render(createElement, context) {
            let tableStyle = ''
            let tableBodyStyle = ''
            let widths = this.tableColumns.reduce((acc, v) => {
                if (v.attrs.width !== undefined) {
                    let width = v.attrs.width
                    width = width.replace('px', '')
                    acc += Number(width)
                }
                return acc
            }, 0)
            if (widths !== 0) {
                //todo 这里先不加这么多，算法后面还要改，这里应该判断widths是否起过50%，没超过就不要加直接100%应该也可以
                tableStyle += `width: calc(100% + ${widths * .5}px);`
            } else {
                tableStyle += `width: 100%;`
                tableBodyStyle = `overflow-x: hidden`
            }

            // console.log(widths);
            return (
                <div class="table-body" style={tableBodyStyle}>
                    <table cellSpacing="0" style={tableStyle}>
                        <thead>
                        <tr>
                            {this.tableColumns.map(w => {
                                let sortClass = ''
                                if (w.sort !== -1) {
                                    sortClass = w.sort === 1 ? 'up' : 'down'
                                }
                                return <th
                                    width={w.attrs.width}
                                    class={sortClass}
                                    onClick={e => this.sort(w.id)}
                                >
                                    {w.attrs.label}
                                    <div class="resize-vertical"/>
                                </th>
                            })}

                        </tr>
                        </thead>
                        <tbody>
                        {this.useList.map(v => {
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

                </div>
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

    .table-body {
        overflow: auto;
        width: 100%;
        height: 100%;

        table {
            word-wrap: break-word;
            word-break: break-all;
            table-layout: fixed;
            //width: 100%;
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

    }
</style>
