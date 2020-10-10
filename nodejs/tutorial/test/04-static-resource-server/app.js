const http = require('http')
const chalk = require('chalk')
const path = require('path')
const config = require('./src/config')
const route = require('./src/index')
// supervisor: 监听文件变化，并重启服务工具

const server = http.createServer((req, res) => {
  const filePath = path.join(config.root, req.url)
  route(req, res, filePath)
  // res.statusCode = 200
  // res.setHeader('Content-Type', 'text/plain')
  // res.write('<html>')
  // res.write('<body>')
  // res.write('Hello Word')
  // res.write(filePath)
  // res.write('</body>')
  // res.write('</html>')
  // res.end('<!-- end -->')
})

server.listen(config.port, config.hostname, () => {
  const addr = `http://${config.hostname}:${config.port}`
  console.info(`Server started at ${chalk.green(addr)}`)
})
