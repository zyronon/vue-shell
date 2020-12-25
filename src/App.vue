<template>
    <div id="app">
        <router-view></router-view>
        <!--        <button @click="test">wq111</button>-->
    </div>
</template>

<script>
export default {
    name: 'app',
    created() {
    },
    methods: {
        test() {
            window.nodeFunc.test(() => {
                console.log(1111111111)
            })
        }
    },

}
</script>

<style>
#app {
    height: 100%;
}
</style>
