import {types} from '../mutation-types'
import User from '../../api/user'
import Storage from '../../utils/storage'

export const file = {
    namespaced: true,
    state: {
        currentDir: [],
    },
    mutations: {
        // 设置用户信息
        [types.SET_CURRENT_DIR](state, currentDir) {
            state.currentDir = currentDir
        },

    },
    getters: {},
    actions: {
        logout({commit}) {
            commit(types.LOGOUT)
        },
    },
}
export default {}
