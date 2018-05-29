浏览器输入URL后HTTP请求返回的完整过程

![浏览器输入URL后HTTP请求返回的完整过程](img/0-http-process.png)

## 网络协议分层

#### 经典五层模型

![经典五层模型](img/five-layer-model.png)

#### 低三层

* 物理层主要作用是定义物理设备如何传输数据，即硬件设备相关的东西。

如：电脑硬件、网卡端口、网线...

* 数据链路层在通信的实体间建立数据链路连接，0101010

* 网络层为数据在结点之间传输创建逻辑链路

如：用自己的电脑去访问百度，如何去寻找百度这台服务器所在的ip地址的逻辑关系

#### 传输层

TCP/IP, UDP

* 向用户提供可靠的端到端(End-to-End)服务

* 传输层向高层屏蔽了下层数据通信的细节

#### 应用层

为应用软件提供了很多服务

构建于TCP协议之上

屏蔽网络传输相关细节

## HTTP发展历史

#### HTTP/0.9

只有一个GET命令

没有HEADER等描述数据的信息

服务器发送完毕，就关闭TCP连接

#### HTTP/1.0

增加了很多命令POST、PUT、HEADER

增加了status code和header

多字符集支持、多部分发送、权限、缓存等

#### HTTP/1.1

实现了持久连接：通过某种方式，声明当前TCP连接保存，不关闭

pipeline，同一个连接可以发送多个请求

增加了host和其他一些命令。host的出现使同一台服务器可以部署多个不同web服务。比如java、nodejs服务等

#### HTTP/2

所有数据以二进制传输

同一个连接里发送多个请求不再需要按照顺序来返回

头信息压缩、推送（服务端可以主动向客户端发起推送）等提高效率的功能

## HTTP的三次握手

HTTP只有请求和响应的概念，没有连接connection

建立TCP连接三次握手

![HTTP的三次握手](img/three-way-handshake.png)

目的：

避免创建连接失败，server资源浪费、端口闲置等问题

![抓包工具wireshark](img/wireshark.jpg)

## URI URL URN

#### URI

Uniform Resource Identifier/统一资源标识符

用来唯一标识互联网上的信息资源

包含URL和URN

#### URL

Uniform Resource Locator/统一资源定位器

```
http://user:password@host.com:80/path?query=string#hash

// user:password@ n年前用于用户认证的参数，现在有其他更安全的认证方式
```

通过此类格式形成的资源路径，都叫做URL，比如ftp协议

#### URN

永久统一资源定位符

在资源移动之后还能被找到

目前还没有非常成熟的使用方案，在业界也没有一个好的使用场景

## HTTP报文

请求报文

```
GET /test/index.php HTTP/1.0 // 起始行
----------------------------
Accept: text/*               // 首部 Header
Accept-Language: en, fr
```

响应报文

```
HTTP/1.0 200 OK                 // 起始行
----------------------------
Content-type: text/plain        // 首部
Content-length: 125
                                // 空行，区别header和body
----------------------------
Hi! These are response message! // 主体
// ...
```

![HTTP报文](img/http-request-response.png)

注意：

HTTP协议规定了语义化的请求方法（METHOD）GET、POST、PUT、DELETE；

METHOD定义是“纸上”约定的语义化方法，希望你去遵循规范；但实际应用中可以不遵循使用以上语义化METHOD去做相应操作。

#### HTTP方法

用来定义对应资源的操作

常用有GET、POST等

从定义上讲有各自的语义，GET获取、POST创建、PUT更新、DELETE删除等

PS：语义的东西是字面上的，具体怎么使用取决于个人；但最好按语义规定去使用

#### HTTP CODE

定义服务器对请求的处理结果

各个区间的CODE有各自的语义

// 具体code含义，请查阅相关资料

好的HTTP服务可以通过CODE判断结果

```javascript
// 创建一个简单的服务
const http = require('http')
const PORT = 8000

http.createServer((req, res) => {
  console.log('request come', req.url)
  res.end('this is response message!')
}).listen(PORT)

console.log('server listening on ' + PORT)
```

浏览器是最常用的http client（客服端）

```
// 通过git bash请求网页
curl zx1984.cn
```
