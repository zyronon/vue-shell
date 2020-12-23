const fs = require('fs')

let path = 'F:\\code\\vue-shell\\php-shell\\template\\file.php'
let file = fs.readFileSync(path, {encoding: 'utf-8'})
// console.log(file.match(/function pwd\(\)[\s\S]*?function/g))
file.match(/function dir\(\)[\s\S]*?{([\s\S]*?)function/g)
let phpFunctionBody = RegExp.$1
phpFunctionBody = phpFunctionBody.replace(/\s/g, '')
phpFunctionBody = phpFunctionBody.replace(/\$args/g, '${this.arg')
phpFunctionBody = phpFunctionBody.substr(0, phpFunctionBody.length - 1)
console.log(phpFunctionBody)
fs.writeFileSync('test.js', 'let a = `' + phpFunctionBody + '`')