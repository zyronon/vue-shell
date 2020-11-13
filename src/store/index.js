import Vue from 'vue'
import Vuex from 'vuex'
import {TYPES} from './mutation-types'
import {layout} from './modules/layout'
import {user} from './modules/user'
import {file} from './modules/file'

Vue.use(Vuex)
const store = new Vuex.Store({
    modules: {
        layout,
        user,
        file
    },
    state: {
        historyQuery: new Map(),
    },
    mutations: {
        [TYPES.ADD_HISTORY_QUERY](state, {path, params}) {
            state.historyQuery.set(path, params)
        },
        // 设置 配置文件
        [TYPES.SET_CONFIG](state, config) {
            state.config = config
        },
    },
    actions: {
        addHistoryQuery({commit}, {path, params}) {
            commit(TYPES.ADD_HISTORY_QUERY, {path, params})
        },
    },
})

export default store
