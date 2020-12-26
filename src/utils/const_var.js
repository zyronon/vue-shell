export default {
    REDIRECT: 'redirect',

    // 请求方法
    POST: 'post',
    GET: 'get',
    PATCH: 'patch',
    DELETE: 'delete',
    PUT: 'put',

    PAGENUMBER: 1,
    PAGESIZE: 10,
    DELAYTIME: 250,
    SUCCESS: '000000',
    REQUEST_TYPE: {
        POST: 'POST'
    },
    ENCODE_TYPE: {
        NONE: 'NONE',
        BASE64: 'BASE64',
    },
    DECODE_TYPE: {
        NONE: 'NONE',
        BASE64: {
            VALUE: 'BASE64',
            PHP: 'base64_encode'
        },
    },

}
