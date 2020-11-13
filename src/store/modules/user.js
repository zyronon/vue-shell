import { TYPES } from '../mutation-types'
import User from '../../api/user'
import Storage from '../../utils/storage'

export const user = {
    // namespaced: true,
    state: {
        userInfo: {},
        token: Storage.get('token') === '' ? null : Storage.get('token'),
        roles: [],
        notReadMessages: [],
    },
    mutations: {
        // 设置用户信息
        [TYPES.SET_USERINFO](state, userInfo) {
            state.userInfo = userInfo
        },
        // 设置 token
        [TYPES.SET_TOKEN](state, token) {
            state.token = token
            Storage.set('token', token)
        },
        [TYPES.LOGOUT](state) {
            Storage.remove('token')
            state.token = null
            state.userInfo = null
            state.roles = []
        },
        [TYPES.SET_ROLES](state, roles) {
            state.roles = roles
        },
        // 设置所有未读消息
        [TYPES.SET_NOT_READ_MESSAGES](state, message) {
            state.notReadMessages = message
        },
    },
    getters: {},
    actions: {
        logout({ commit }) {
            commit(TYPES.LOGOUT)
        },
        async getUserInfo({ commit }) {
            const res = await User.userInfo()
            if (res.code === '000000') {
                commit(TYPES.SET_USERINFO, res.data)
                return Promise.resolve(res.msg)
            }
            return Promise.reject(res.msg)
        },
    },
}
export default {}
