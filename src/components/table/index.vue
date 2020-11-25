<template>
    <div>
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

