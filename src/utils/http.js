import axios from 'axios'
import globalMethods from './global-methods'
import Config from '../config/index'
import CONSTANT from './const_var'
import store from '../store'
import Storage from './storage'

const instance = axios.create({
    // baseURL: process.env.NODE_ENV === 'production' ? Config.PRODUCT_API_URL : Config.API_URL,
    timeout: 15000,
    // headers:{'Content-Type': 'application/x-www-form-urlencoded'}
})

// // request 拦截器
// instance.interceptors.request.use(
//     (config) => {
//         // if (Storage.get('token')) {
//         // config.headers['access_token'] = Storage.get('token')
//         // }
//         return config
//     },
//     error => Promise.reject(error),
// )

// respone 拦截器
instance.interceptors.response.use(
    // 响应正常的处理
    (response) => {
        console.log(response)
        // // console.log(response.data)
        const {data} = response
        // console.log(typeof data);
        let temp = data
        if (typeof data === 'object') {
            temp = JSON.stringify(data)
        }
        if (`${temp}`.indexOf('ERROR//') !== -1) {
            alert('ERROR')
            return Promise.resolve('')
        }

        return Promise.resolve(data)
    },
    // 请求出错的处理
    (error) => {
        console.log(error)
    },
)


/**
 * @apiDescription 封装的网络请求方法
 * @apiGroup
 * @apiName request
 * @apiParam  url 地址
 * @apiParam  data 请求数据
 * @apiParam  params 请求参数
 * @apiParam  method 方法类型：get或者post
 * @apiParam  version 接口版本号
 * @apiParamExample
 *       request('Appointment/appointmentList', data, params, CONSTANT.GET)
 * @apiReturn Promise
 */
async function request(url, data = {}, params = {}, method = CONSTANT.GET, headers = {}) {
    let temp = ''
    for (let v in data) {
        temp += v + '=' + data[v] + '&'
    }
    // console.log(temp);
    return instance({
        url,
        method,
        data: temp,
        params,
        headers
    })
}

export default request
