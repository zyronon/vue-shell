<template>
    <div id="app">
        <!--        <router-view></router-view>-->
        <button @click="test">wq111</button>
    </div>
</template>

<script>

export default {
    name: 'app',
    created() {
    },
    methods: {
        test() {
            window.nodeFunc.closeWindow()
        }
    },

}
</script>

<style>
#app {
    height: 100%;
}
</style>
