<template>
    <div class="table">
        <div v-show="false">
            <slot></slot>
        </div>
        <c-table-tbody v-bind="$attrs" v-on="$listeners"></c-table-tbody>
    </div>
</template>

<script>
    export default {
        name: "cTable",
    }
</script>
<style>
    .table {
        overflow: hidden;
        height: 100%;
        width: 100%;
        max-width: 100%;

    }
</style>
