const fs = require('fs')
const http = require('http')
const path = require('path')
const server = http.createServer()
server.on('request', (req, res) => {
    if (req.url === '/index.html') {
        fs.readFile(path.join(__dirname, 'dist/index.html'), (err, data) => {
            res.setHeader('Content-type', 'text/html;charset=utf-8')
            res.end(data.toString())
        })
    } else {
        res.setHeader('Content-type', 'text/html;charset=utf-8')
        res.end('访问的路径不存在')
    }
})
server.listen(3000, () => {
    console.log('服务启动')
})