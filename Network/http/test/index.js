const http = require('http')
const fs = require('fs')
const PORT = 8888

http.createServer((req, res) => {
  console.log('request come', req.url)

  if (req.url === '/') {
    const html = fs.readFileSync('test.html', 'utf8')
    res.writeHead(200, {
      'Content-Type': 'text/html'
    })
    res.end(html)
  }
  // 缓存演示
  if (req.url === '/script.js') {
    const etag = req.headers['if-none-match']
    if (etag === '888') {
      res.writeHead(304, {
        'Content-Type': 'text/javascript',
        'Cache-Control': 'max-age=20000, no-cache',
        'Last-Modified': '123',
        'Etag': '888'
      })
      res.end('')
    } else {
      res.writeHead(200, {
        'Content-Type': 'text/javascript',
        'Cache-Control': 'max-age=20000, no-cache',
        'Last-Modified': '123',
        'Etag': '888'
      })
      res.end('console.log("script loaded twice!")')
    }
  }

}).listen(PORT)

console.log('server listening on ' + PORT)
