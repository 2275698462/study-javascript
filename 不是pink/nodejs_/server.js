// 加载 http 模块，创建 web 服务对象
const http = require('http')
const server = http.createServer()
// 监听 request 请求事件
server.on('request', (request, response) => {
    response.setHeader('Content-type', 'text/plain;charset=utf-8')
    response.end('你好')
})

server.listen(3000, () => {
    console.log('web 服务器已开启')
})