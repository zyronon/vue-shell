import dayjs from 'dayjs'

export default {
    // 时间转换器
    dateFormat(val, type) {
        if (!val) return ''
        let date
        if (typeof val === 'number') {
            if (`${val}`.length === 10) date = dayjs.unix(val)
            else date = dayjs(val)
        }
        if (typeof val === 'string') {
            if (val.length === 10) date = dayjs.unix(parseInt(val, 10))
            else date = dayjs(parseInt(val, 10))
        }
        switch (type) {
            case 'Y':
                return date.format('YYYY')
            case 'M':
                return date.format('YYYY-MM')
            case 'D':
                return date.format('YYYY-MM-DD')
            case 'H':
                return date.format('YYYY-MM-DD HH') + ':00'
            case 'm':
                return date.format('YYYY-MM-DD HH:mm')
            case 's':
                return date.format('YYYY-MM-DD HH:mm:ss')
            default:
                return date.format('YYYY-MM-DD HH:mm:ss')
        }
    },
    // 为空判断
    $(v) {
        if (!v) return ''
        if (v === null) return ''
        if (v === undefined) return ''
        return ''
    },

}
