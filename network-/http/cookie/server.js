const http = require('http')
const fs = require('fs')

const PORT = 8000
http.createServer((req, res) => {
  console.log('request come', req.url)
  const host = req.headers.host
  if (req.url === '/') {
    const html = fs.readFileSync('index.html', 'utf8')
    if (host === 'test.com') {
      res.writeHead(200, {
        'Content-Type': 'text/html',
        // 'Set-Cookie': 'id=xxxx'
        // 'Set-Cookie': ['id=xxxx; max-age=2', 'class=Test; HttpOnly']
        'Set-Cookie': ['id=xxxx; max-age=2', 'class=Test; domain=test.com']
      })
    }
    res.end(html)
  }
}).listen(PORT)

console.log('server listening on ' + PORT)
