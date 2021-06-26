# Linux

centOS常用操作命令

## 查看wget是否安装

```shell
rpm -qa|grep "wget"
> wget-1.19.5-8.el8_1.1.x86_64
# 以上输出证明系统已安装wget
```

## nodejs安装

https://nodejs.org/en/download/

```shell
cd /usr/local/src
# 下载
wget https://nodejs.org/dist/v14.17.1/node-v14.17.1-linux-x64.tar.xz
# 解压
tar -xvf node-v14.17.1-linux-x64.tar.xz
# 重命名
mv node-v14.17.1-linux-x64 nodejs
```

添加至系统变量

```shell
vi /etc/profile
# 按下i键，进入可编辑状态

# 在 /etc/profile 文件末尾增加配置
export PATH=$PATH:/usr/local/src/nodejs/bin
# 按下esc，输入:wq退出编辑并保存

# 执行命令使配置文件生效
source /etc/profile
```

检测是否安装成功

```shell
node -v
> v14.17.1
npm -v
> 6.14.13
```

## 文件操作

```shell
# 删除空目录（文件夹）
rmdir MyDir
# 删除非空目录（文件夹）
rm -rf MyDir/
# rm命令通常用于删除Linux中的文件。可以添加参数用来删除目录。例如，递归地删除目录，使用递归选项-r或-R，如果目录是受写保护的，则会提示是否继续删除目录和目录中的文件作为一个整体。-f 强制删除而不被提示。

# 删除多个目录
rm -rf dir1 dir2 dir3
```

## 源码安装

```shell
cd ./nginx
# 源文件安装
# ./configure --prefix=/usr/local/nginx
# 需要使用https开始ssl模块时：
./configure --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module
make
sudo make install
# 查看安装结果
/usr/local/nginx
```

Error

```shell
./configure --prefix=/usr/local/nginx
# 错误信息
# configure: error: C compiler cc is not found
# 解决方法
yum -y install gcc gcc-c++ autoconf automake make
```

```shell
make
# 错误信息
# make: *** No rule to make target 'build', needed by 'default'.  Stop.
# 解决方法
yum -y install pcre pcre-devel
yum -y install openssl openssl-devel
yum -y install zlib zlib-devel
# yum install -y gcc pcre pcre-devel openssl openssl-devel gd gd-devel
```

## nginx

```shell

```