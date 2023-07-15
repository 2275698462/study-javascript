// 加载 fs 模块对象
const fs = require('fs')
// 写入文件内容
fs.writeFile('./test.txt', 'hello, Node.js', (err) => {
    if (err) console.log(err)
    else console.log('写入成功')
})
// 读取文件内容
fs.readFile('./test.txt', (err, data) => {
    if (err) {
        console.log(err)
    } else {
        // data 是 buffer 16 进制数据流对象
        console.log(data.toString())
    }
})