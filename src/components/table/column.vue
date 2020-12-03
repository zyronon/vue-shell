<script>
    export default {
        name: "cTableColumn",
        props: {},
        data() {
            return {}
        },
        created() {
            // this.$console(this.$attrs)
            let columns = this.$store.state.layout.tableColumns
            columns.push({
                id: Math.random().toString(36).slice(2) + Date.now().toString(36),
                attrs: this.$attrs,
                sort: -1,
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
