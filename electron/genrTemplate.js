const fs = require('fs')

let path = 'D:\\safe\\code\\vue-shell\\php-shell\\template\\file.php'
let file = fs.readFileSync(path, {encoding: 'utf-8'})
// console.log(file)
let template = `
export default class File {
    constructor(arg1, arg2) {
        this.arg1 = arg1
        this.arg2 = arg2
    }


    dir() {
        return \`${getFunctionBody(file, 'dir')}\`
    }

    pwd() {
        return \`${getFunctionBody(file, 'pwd')}\`
    }

    download() {
        return \`${getFunctionBody(file, 'download')}\`
    }

    upload() {
        return \`${getFunctionBody(file, 'upload')}\`
    }

    createFile() {
        return \`${getFunctionBody(file, 'createFile')}\`
    }

    createFolder() {
        return \`${getFunctionBody(file, 'createFolder')}\`
    }

    read() {
        return \`${getFunctionBody(file, 'read')}\`
    }

    change() {
        return \`${getFunctionBody(file, 'change')}\`
    }

    deleteFile() {
        return \`${getFunctionBody(file, 'deleteFile')}\`
    }

    deleteFolder() {
        return \`${getFunctionBody(file, 'deleteFolder')}\`
    }

    rename() {
        return \`${getFunctionBody(file, 'rename')}\`
    }
}
`

fs.writeFileSync('./electron/test.js', template)
// console.log(getFunctionBody(file, 'pwd'))

function getFunctionBody(file, funcName) {
    let regexp = new RegExp(`function ${funcName}[\\s\\S]*?({[\\s\\S]*?)function`, 'g') // 首个参数为字符串模式的构造函数
    file.match(regexp)
    let phpFunctionBody = RegExp.$1
    // console.log(phpFunctionBody)
    phpFunctionBody = phpFunctionBody.replace(/\s/g, '')//todo as也会被去掉空格，会报错
    // phpFunctionBody = phpFunctionBody.replace(/\r\n/g, '')
    phpFunctionBody = phpFunctionBody.replace(/\$arg/g, '${this.arg')
    phpFunctionBody = phpFunctionBody.substr(1, phpFunctionBody.length - 1)
    return phpFunctionBody
}
