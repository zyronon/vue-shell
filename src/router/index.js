import Vue from 'vue'
import VueRouter from 'vue-router'
import _import from '../utils/import'
import CONST from '../utils/const_var'

Vue.use(VueRouter)

// 静态路由表
export const CONSTRouterMap = [
     {
        path: '/terminal',
        name: 'terminal',
        component: _import('pages/terminal'),
        hidden: true,
    }, {
        path: '/file',
        name: 'file',
        component: _import('file_manager/file'),
        hidden: true,
    }, {
        path: '/home',
        name: 'home',
        component: _import('pages/home'),
        hidden: true,
    }, {
        path: '/codeExec',
        name: 'codeExec',
        component: _import('pages/codeExec'),
        hidden: true,
    },
    {
        path: '',
        name: '',
        redirect: '/home'
    },

]

// 创建 router 实例，然后传 `routes` 配置
export default new VueRouter({
    // mode: 'history',
    routes: CONSTRouterMap,
    scrollBehavior: () => ({y: 0}),
})
