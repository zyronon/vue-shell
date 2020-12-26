import CONST from '../utils/const_var'
import request from '../utils/http'

export default {
    userInfo(data, params) { // eslint-disable-line
        // return request('patient/read', data, params, CONST.GET)
        return Promise.resolve({
            code: '000000',
            data: {
                account: 'Admin',
                username: 'Admin',
                password: '666666',
                avatar: 'https://i.loli.net/2018/08/18/5b7819891bab1.jpg',
            },
            msg: '操作成功',
        })
    },
    
    // 消息
    // 获取所有用户未读信息
    notReadMessages(data, params) {
        return request('user/notReadMessages', data, params, CONST.GET)
    },
    // 获取所有用户信息
    allMessages(data, params) {
        return request('user/allMessages', data, params, CONST.GET)
    },
    // 设置为已读信息
    hasReadMessage(data, params) {
        return request('user/hasReadMessage', data, params, CONST.GET)
    },
    // 设置为已读信息
    hasReadAllMessage(data, params) {
        return request('user/hasReadAllMessage', data, params, CONST.GET)
    },
}
