/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-07-23 16:43
 */
const http = require('http')

http.createServer(function (request, response) {

  // 发送 HTTP 头部
  // HTTP 状态值: 200 : OK
  // 内容类型: text/plain
  response.writeHead(200, {'Content-Type': 'text/plain'});

  // 发送响应数据 "Hello World"
  response.end('Hello World\n')
}).listen(8888);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');

const opt = {
  host:'这里放代理服务器的ip或者域名',
  port: 80,
  method:'GET',//这里是发送的方法
  path:'/api',   //这里是访问的路径
  headers:{
    //这里放期望发送出去的请求头
  }
}
//以下是接受数据的代码
let body = '';
let req = http.request(opt, function(res) {
  console.log("Got response: " + res.statusCode);
  res.on('data',function(d){
    body += d;
  }).on('end', function(){
    console.log(res.headers)
    console.log(body)
  });

}).on('error', function(e) {
  console.log("Got error: " + e.message);
})
req.end();
