<template>
    <td >
        <slot>12</slot>
    </td>
</template>
<script>
    export default {
        name: "cTableItem",

        props: {

        },
        data() {
            return {
                row: {
                    url: 'url'

                }
            }
        },
        created() {
        },
        mounted() {
            console.log(this.row);
        },
        methods: {},

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
