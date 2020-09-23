import Vue from 'vue'
import VueRouter from 'vue-router'
import _import from '../utils/import'
import CONSTANT from '../utils/const_var'

Vue.use(VueRouter)

// 静态路由表
export const constantRouterMap = [
    {
        path: '/login',
        name: 'login',
        component: _import('pages/login'),
        hidden: true,
    }, {
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
    },
    {
        path: '',
        name: '',
        // redirect: '/article/index',
        redirect: '/file'
    },

]

// 创建 router 实例，然后传 `routes` 配置
export default new VueRouter({
    // mode: 'history',
    routes: constantRouterMap,
    scrollBehavior: () => ({y: 0}),
})
