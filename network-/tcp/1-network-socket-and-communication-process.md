# 网络套接字与通信过程

![1-network-socket-and-communication-process](img/1-network-socket-and-communication-process.png)

### 端口

网络套接字与通信过程，使用**端口**（Port）来标记不同的网络进程。

端口Port使用16比特表示（取值范围：0~65535）

|服务|端口|
|:--|:--|
|FTP|21|
|HTTP|80|
|HTTPS|443|
|DNS|53|
|TELNET|23|

端口{Port} 标记不同**进程**

IP {IP} 标记不同**计算机**

IP与Port组合 {IP:Port} 套接字

**套接字**（Socket）是抽象概念，表示TCP连接的一端

通过**套接字**可以进行数据发送或接收

![](img/2.png)



