const http = require('http')
const fs = require('fs')

const PORT = 8000
http.createServer((req, res) => {
  console.log('request come', req.url)

  const html = fs.readFileSync('index.html', 'utf8')
  const img = fs.readFileSync('../img/wireshark.jpg')

  if (req.url === '/') {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    })
    res.end(html)
  } else {
    res.writeHead(200, {
      'Content-Type': 'image/jpeg'
    })
    res.end(img)
  }
}).listen(PORT)

console.log('server listening on ' + PORT)
