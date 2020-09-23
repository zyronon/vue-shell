import Vue from 'vue'
import App from './App'
import './assets/scss/index.scss'
import router from './router'
import store from './store'
import mixin from './utils/mixin'
import request from "./utils/http";

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
Vue.prototype.$request = request


Vue.mixin(mixin)
new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')
