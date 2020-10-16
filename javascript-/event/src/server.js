const http = require('http')

const PORT = 8001

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Token')
  res.setHeader('Access-Control-Expose-Headers', 'Token')
  // console.log(req)
  console.log(req.headers.host)
  // console.log(res)


  let method = req.method
  if (method === 'OPTIONS') {
    res.statusCode = 204
    res.end()
    return
  }
  console.log(req.method)

  // if (/^127\./.test(req.headers.host)) {
  //   res.writeHead(302, {
  //     Location: `http://192.168.68.109:${PORT}`
  //   })
  // }

  res.setHeader('Token', '111111111111111111111111111')

  res.statusCode = 200
  res.end("hello world")
})

server.listen(PORT)
