import Vue from 'vue'
import App from './App'
import './assets/scss/index.scss'
import router from './router'
import store from './store'
import mixin from './utils/mixin'
import request from "./utils/http";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import Icon from 'vue-svg-icon/Icon.vue';


Vue.use(ElementUI);


Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
Vue.prototype.$request = request


Vue.mixin(mixin)
new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')
