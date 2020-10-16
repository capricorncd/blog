const http = require('http')
const PORT = 8000
http.createServer((req, res) => {
  console.log('request come', req.url)
  // 允许跨域设置
  res.writeHead(200, {
    'Access-Control-Allow-Origin': '127.0.0.1:8001',
    'Access-Control-Allow-Headers': 'X-Test-Cors',
    'Access-Control-Allow-Methods': 'POST, PUT, DELETE',
    // 设置的时间内，不用再发起预请求来验证
    'Access-Control-Max-Age': '1001'
  })
  res.end('this is response message!')
}).listen(PORT)

console.log('server listening on ' + PORT)
