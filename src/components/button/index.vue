<script>
    import loading from '../loading'

    export default {
        components: {
            loading
        },
        name: 'CButton',
        props: {
            loading: {
                type: Boolean,
                default() {
                    return true
                }
            }
        },
        data() {
            return {
                loading: false
            }
        },
        created() {
        },
        methods: {},
        mounted() {
            //
        },
        render() {
            return (
                <div class='button primary'>
                    <div style="display: flex; align-items: center;">
                        <loading size="small"/>
                        <span style="margin-left:5px">{this.$slots.default}</span>
                    </div>
                </div>
            )
        }
    }
</script>
