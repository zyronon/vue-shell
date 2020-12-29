import { TYPES } from '../mutation-types'
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
    },
    getters: {},
    actions: {
        // async getUserInfo({ commit }) {
        //     const res = await User.userInfo()
        //     if (res.code === '000000') {
        //         commit(TYPES.SET_USERINFO, res.data)
        //         return Promise.resolve(res.msg)
        //     }
        //     return Promise.reject(res.msg)
        // },
    },
}
export default {}
