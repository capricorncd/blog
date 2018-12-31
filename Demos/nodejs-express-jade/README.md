# Node.js-Express-jade-mongoose

> node.js express mongoose jade DEMO

## MongoDB安装（Win64）

* 下载地址：https://www.mongodb.com/download-center

> Community Server -> Windows Server 2008 R2 64-bit and later, with SSL support x64

> 当前版本：Current Stable Release (3.4.10)

* 图文安装教程 http://blog.csdn.net/qq_27093465/article/details/54574948

> /bin 同级目录下新建 mongo.conf 文件

mongo.conf

```
#数据库路径
dbpath = D:\mongo\data

#日志输出文件路径
logpath = D:\mongo\log\mongo.log

#错误日志采用追加模式
logappend = true

#启用日志文件，默认启用
journal = true

#这个选项可以过滤掉一些无用的日志信息，若需要调试使用请设置为false
quiet = true

#端口号 默认为27017
port = 27017
```

**注意**

1. 安装目录最好不要有空格，如'D:\Program Files\mongo'

2. 需要以管理员身份运行cmd，否则可能导致某些操作没有权限

* 通过cmd进入mongo/bin， 执行mongo，即可用命令进行数据库创建、查看、删掉等事宜

  具体命令请见： http://www.runoob.com/mongodb/mongodb-create-database.html

## 备注

Create by capricorncd

https://github.com/capricorncd




