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
                    return false
                }
            }
        },
        data() {
            return {}
        },
        created() {
        },
        methods: {
            handleOnClick($event) {
                this.loading ? $event.stopPropagation():this.$emit('click')
            }
        },
        mounted() {
            //
        },
        render() {
            let className = 'button primary '
            className += this.loading ? 'disabled' : ''
            return (
                <div
                    onClick={this.handleOnClick}
                    class={className}>
                    {this.loading && <loading style="margin-right:5px" size="small"/>}
                    <span>{this.$slots.default}</span>
                </div>
            )
        }
    }
</script>
