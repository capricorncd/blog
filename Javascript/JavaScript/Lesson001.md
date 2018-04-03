## Web发展史

Mosaic，互联网历史上第一个获普遍使用和能够显示图片的网页浏览器。于1993年问世。

1994年4月 马克·安德森和Silicon Graphics（简称SGI，译为视算科技或硅图）

1994年11月 改名为Netscape Navigator

微软的Internet Explorer、Mozilla FireFox等，及其早期版本皆以Mosaic为基础开发。

## js历史

js作为Netscape Navigator浏览器的一部分首次出现在1196年。最初的设计目标是改善网页的用户体验。

作者：Brendan Eich，用了23天搞定js

期初js被命名为LiveScript，后和Sun公司合作，因市场宣传需要（推广java），改名为JavaScript.

后来Sun公司被Oracle收购，js版权归Oracle所有。

## 主流浏览器

|主流浏览器|内核|
|:--|:--|
|Internet Explorer|trident|
|Chrome|webkit/blink(2014)|
|FireFox|Gecko|
|Opera|presto|
|Safari|webkit|

## 浏览器组成

1. shell部分（如顶部菜单、设置等等）

2. 内核部分

* 渲染引擎（语法规则和渲染）16毫秒更新一次

* js引擎

* 其他模块（如异步...）

## 浏览器发展史

执行20行以上的js代码，浏览器几乎会崩溃，后来开始独立js渲染引擎：

2001年ie6，首次实现对js引擎的优化和分类。瞬间让js代码的执行能力提高到了1W行以上。同时XP系统问世，ie6成为xp系统的标配。

2008年Google发布最新浏览器Chrome，采用优化后的js引擎，代号V8。因把js代码之间转换为机械码来执行，进而以速度快而闻名。（直接将js代码转换为二进制）

后FireFox也推出了具备强大功能的js引擎

FireFox3.5 TraceMoney（对频繁执行的代码做了路径优化）

FireFox4.0 JeagerMonkey

## js的逼格

解释性语言 - 不需要编译成文件，可跨平台运行

单线程

ECMA标准 - 为了取得技术优势，微软推出了JScript，CEnvi推出ScriptEase，与js同样可在浏览器上运行。为了统一规格js兼容与ECMA标准，因此也称为ECMAScript。

#### 将代码翻译为机械码(二进制)

* 编译（编译性语言）c c++

> 通篇翻译，生成一个二进制文件。

> 优点：快，可开发些底层的东西

> 不足：移植性不好（不夸平台）

* 解释 js php python

> 读一行代码，翻译一行，执行一行。

> 优点：跨平台

> 不足：稍微慢（强大硬件支持下，差别小）

【注意】java非编译性语言，也非解释性语言。java为oak语言。

.java -> javac -> 编译 -> .class -> jvm -> 解释执行

####  js 单线程

单线程在程序执行时，所走的程序路径按照连续顺序排下来，前面的必须处理好，后面的才会执行。

#### JavaScript三大部分

ECMAScript、DOM（操作文档）、BOM（操作浏览器）

#### js执行队列

单线程模拟多线程效果

|js|执行|主线程|||||
|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
|task1,1ms|task2,1ms|task2,1ms|task1,1ms|task2,1ms|task1,1ms|

时间片轮转(轮转时间片)：时间片轮转调度是一种最古老，最简单，最公平且使用最广的算法，又称RR调度。每个进程被分配一个时间段，称作它的时间片，即该进程允许运行的时间。
