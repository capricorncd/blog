const http = require('http')
const PORT = 8000
http.createServer((req, res) => {
  console.log('request come', req.url)
  res.end('this is response message!')
}).listen(PORT)

console.log('server listening on ' + PORT)
