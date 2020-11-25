<script>
    export default {
        name: "cTableItem",
        props: {},
        data() {
            return {}
        },
        created() {
            let columns = this.$store.state.layout.tableColumns
            columns.push({
                attrs: this.$attrs,
                renderCell: (data) => {
                    return (<div>
                        {this.$scopedSlots.default
                            ? this.$scopedSlots.default(data)
                            : data[this.$attrs.prop]}
                    </div>);
                }
            })
            this.$store.commit('layout/setTableColumns', columns)
        },
        mounted() {
        },
        methods: {},
        render(createElement, context) {
            return <div/>
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


</style>
