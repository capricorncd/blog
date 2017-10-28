# Ajax全接触

**AJAX**即“Asynchronous Javascript And XML”（异步JavaScript和XML），是指一种创建交互式网页应用的网页开发技术。  
**AJAX** = 异步 JavaScript和XML（标准通用标记语言的子集）。  
**AJAX** 是一种用于创建快速动态网页的技术。  
**AJAX** 是一种在无需重新加载整个网页的情况下，能够更新部分网页的技术。  
通过在后台与服务器进行少量数据交换，AJAX 可以使网页实现异步更新。这意味着可以在不重新加载整个网页的情况下，对网页的某部分进行更新。  
传统的网页（不使用 AJAX）如果需要更新内容，必须重载整个网页页面。


## 实现局部更新的基本流程：

* 运用HTML和CSS来实现页面，表达信息；

* 运用XMLHttpRequest和Web服务器进行数据的异步交换；

* 运用JavaScript操作DOM，实现动态局部内容更新。

## XMLHttpRequest 对象

XMLHttpRequest 得到了所有现代浏览器较好的支持。唯一的浏览器依赖性涉及 XMLHttpRequest 对象的创建。在 IE 5 和 IE 6 中，必须使用特定于 IE 的 ActiveXObject() 构造函数。

```javascript
var request;
if (window.XMLHttpRequest) {
    // IE7+, Firefox, Chrome, Opera, Safari ...
    request = new XMLHttpRequest();
} else {
    // IE6, IE5
    request = new ActiveXObject('Microsoft.XMLHTTP');
}
```

## HTTP

http是计算机通过网络进行通信的规则。

http是一种无状态协议，即不建立持久的连接。

#### HTTP请求

一个完整的HTTP请求过程，通常有以下7个步骤：

1. 建立TCP连接  
2. 浏览器向Web服务器发送请求命令
3. 浏览器发送请求头信息
4. 服务器应答
5. 服务器发送应答头信息
6. 服务器向浏览器发送数据
7. Web服务器关闭TCP连接

#### Request/请求

1. HTTP请求的方法或动作，比如GET、POST ...
2. 正在请求的URL，即请求地址
3. 请求头，包含一些客户端环境信息，身份验证信息等
4. 请求体，即请求正文。请求正文中可以包含客户提交的查询字符串、表单数据等等

 **GET** 一般用于信息获取，使用URL传递参数，对所发送信息的数量有限制，一般在2000个字符。GET请求是**幂等**的。 幂等 http://www.i3geek.com/archives/841  
 **POST** 一般用于修改服务器上的资源，对所发送信息的数据大小无限制。

#### Response/响应

1. 一个由数字和文字组成的状态码，用来显示请求是成功还是失败
2. **响应头**，也和请求头一样包含许多有用的信息，如服务器类型、日期时间、内容类型和长度等等
3. **响应体**，也就是响应正文

HTTP状态码由3位数字构成，其中首位数字定义了状态码的类型：

| 状态码 | 说明 |
| :--: | :-- |
| 1XX | 信息类。表示收到浏览器请求，正在进一步的处理中 |
| 2XX | 成功。表示用户请求被正确接收、理解和处理。如200 OK |
| 3XX | 重定向。表示请求没有成功，客户端必须采取进一步的动作 |
| 4XX | 客户端错误。表示客户端提交的请求有错误。如404 NOT Found |
| 5XX | 服务器错误。表示服务器不能完成对请求的处理。如 500 |

## XMLHTTPRequest属性/方法

#### 1. 请求方法

- open(method, url, async, username, password)

    初始化HTTP请求参数，例如URL和HTTP方法，但是并不发送请求。

    > method 参数是用于请求的 HTTP 方法。值包括 GET、POST 和 HEAD。

    > url 参数是请求的主体。大多数浏览器实施了一个同源安全策略，并且要求这个 URL 与包含脚本的文本具有相同的主机名和端口。

    > async 参数指示请求使用应该异步地执行。如果这个参数是 false，请求是同步的，后续对 send() 的调用将阻塞，直到响应完全接收。如果这个参数是 true 或省略，请求是异步的，且通常需要一个 onreadystatechange 事件句柄。

    > username 和 password 参数是可选的，为 url 所需的授权提供认证资格。如果指定了，它们会覆盖 url 自己指定的任何资格。

- setRequestHeader()

    向一个打开但未发送的请求设置或添加一个 HTTP 请求。

- send(string)

    发送 HTTP 请求，使用传递给 open() 方法的参数，以及传递给该方法的可选请求体。

```javascript
// GET
request.open('GET', 'get.php', true);
request.send();

// POST
request.open('POST', 'post.php', true);
request.send();

// POST data
request.open('POST', 'create.php', true);
request.setRequestHeader('Content-type', 'apllication/x-www-form-urlencoded');
request.send('name=张三&gender=1&qq=1355952333');
```

#### 2. 响应属性/方法

- responseText

    获取字符串形式的响应数据

    > 接收到的服务器的响应体（不包括头部），或者如果还没有接收到数据的话，就是空字符串。

    > 如果 readyState 小于 3，这个属性就是一个空字符串。当 readyState 为 3，这个属性返回目前已经接收的响应部分。如果 readyState 为 4，这个属性保存了完整的响应体。

    > 如果响应包含了为响应体指定字符编码的头部，就使用该编码。否则，假定使用 Unicode UTF-8。

- responseXML

    获取XML形式的响应数据

- status和statusText

    以数字和文本形式返回HTTP状态码

    > status: 由服务器返回的 HTTP 状态代码，如 200 表示成功，而 404 表示 "Not Found" 错误。

    > statusText: 这个属性用名称而不是数字指定了请求的 HTTP 的状态代码。也就是说，当状态为 200 的时候它是 "OK"，当状态为 404 的时候它是 "Not Found"。

    > 当 readyState 小于 3 的时候读取status/statusText属性会导致一个异常。

- getAllResponseHeaders()

    获取所有的响应报头。

    >把 HTTP 响应头部作为未解析的字符串返回。

    > 如果 readyState 小于 3，这个方法返回 null。否则，它返回服务器发送的所有 HTTP 响应的头部。头部作为单个的字符串返回，一行一个头部。每行用换行符 "\r\n" 隔开。

- getResponseHeader()

    查询响应中的某个字段的值。

    > 返回指定的 HTTP 响应头部的值。其参数是要返回的 HTTP 响应头部的名称。可以使用任何大小写来制定这个头部名字，和响应头部的比较是不区分大小写的。

    > 该方法的返回值是指定的 HTTP 响应头部的值，如果没有接收到这个头部或者 readyState 小于 3 则为空字符串。如果接收到多个有指定名称的头部，这个头部的值被连接起来并返回，使用逗号和空格分隔开各个头部的值。

#### 3. 事件句柄

- onreadystatechange

    每次 readyState 属性改变的时候调用的事件句柄函数。当 readyState 为 3 时，它也可能调用多次。

#### 4. 其他方法

- readyState

    HTTP 请求的状态。当一个XMLHttpRequest初次创建时，这个属性的值从 0 开始，直到接收到完整的HTTP响应，这个值增加到4。

    5个状态中每一个都有一个相关联的非正式的名称，下表列出了状态、名称和含义：

| 状态 | 名称 | 描述(w3school) |
| :--: | :-- | :-- |
| 0 | Uninitialized | 初始化状态。XMLHttpRequest 对象已创建或已被 abort() 方法重置。|
| 1 | Open | open() 方法已调用，但是 send() 方法未调用。请求还没有被发送。|
| 2 | Sent | Send() 方法已调用，HTTP 请求已发送到 Web 服务器。未接收到响应。|
| 3 | Receiving | 所有响应头部都已经接收到。响应体开始接收但未完成。|
| 4 | Loaded | HTTP 响应已经完全接收。|


| 状态 | 描述(姜维_Wayne) |
| :--: | :-- |
| 0 | 请求未初始化，open()还没有调用；部分浏览器可能不会触发该步骤 |
| 1 | 服务器连接已建立，open()已经调用了 |
| 2 | 请求已接收，即服务器接收到了头信息了 |
| 3 | 请求处理中，即接收到响应主题了 |
| 4 | 请求已完成，且响应已完成 |

注意：

    (1) readyState 可用于监听服务器响应的变化。

    (2) readyState 的值不会递减，除非当一个请求在处理过程中的时候调用了 abort() 或 open() 方法。每次这个属性的值增加的时候，都会触发 onreadystatechange 事件句柄。

- abort()

    取消当前响应，关闭连接并且结束任何未决的网络活动。

    > 这个方法把 XMLHttpRequest 对象重置为 readyState 为 0 的状态，并且取消所有未决的网络活动。例如，如果请求用了太长时间，而且响应不再必要的时候，可以调用这个方法。

    // abort `英[əˈbɔ:t] 美[əˈbɔ:rt]` vt.使流产;使夭折;使中止; vi.流产;堕胎;发育不全; n.流产;中止计划

```javascript
var request = new XMLHttpRequest();
request.open('GET', 'get.php', true);
request.send();
request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
        // do something
        // request.responseText
    }
}
```

## Remarks

讲师： 姜维_Wayne

视频地址：http://www.imooc.com/learn/250