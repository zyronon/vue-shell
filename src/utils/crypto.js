import CryptoJS from 'crypto-js'

export default {
    base64Encode(val) {
        return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(val))
        // return window.btoa(unescape(encodeURIComponent(val)));
    },
    base64Decode(val) {
        return CryptoJS.enc.Base64.parse(val).toString(CryptoJS.enc.Utf8)
        // return decodeURIComponent(escape(window.atob(val)));
    }
}
