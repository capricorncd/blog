# JavaScript进阶篇

#### JavaScript能做什么？

1. 增强页面动态效果(如:下拉菜单、图片轮播、信息滚动等)

2. 实现页面与用户之间的实时、动态交互(如:用户注册、登录验证等)

## 一、变量

#### 1. 什么是变量

从字面上看，变量是可变的量；从编程角度讲，变量是用于存储某种/某些数值的存储器。

#### 2. 变量命名

1. 必须以字母、下划线或美元符号开头，后面可以跟字母、下划线、美元符号和数字。

2. 变量名区分大小写，如:A与a是两个不同变量。

3. 不允许使用JavaScript关键字和保留字做变量名。

| 关键字 | -- | -- | -- |
| :--: | :--: | :--: | :--: |
| break | else | new | var |
| case | finally | return | void |
| catch | for | switch | while |
| default | if | throw | delete |
| in | try | do | instanceof |
| typeof |  |  |  |

| 保留字 | -- | -- | -- |
| :--: | :--: | :--: | :--: |
| abstract | enum | int | short |
| boolean | export | interface | static |
| byte | extends | long | super |
| char | final | native | synchronized |
| class | float | package | throws |
| const | goto | private | transient |
| debugger | implements | protected | volatile |
| double | import | public | |

#### 3. 变量声明及赋值

```
声明变量语法: var 变量名;   
```

`var`就相当于找盒子的动作，在JavaScript中是关键字（即保留字），这个关键字的作用是声明变量，并为**变量**准备位置(即内存）。

```javascript
// 声明一个变量num1
var num1, mun2; 
// 声明一个变量mynum并赋值
var mynum = 10; 

// 123是数值
var num1 = 123;
// "一二三"是字符串   
var num2 = "一二三";
// 布尔值true（真），false(假)
var num3 = true;    
```

其中，num1变量存储的内容是数值；num2变量存储的内容是字符串，字符串需要用一对引号""括起来，num3变量存储的内容是布尔值(true、false)。

**注意:** 
1. 等号 "="的作用是给变量赋值，不是等于号。
2. 变量也可以不声明，直接使用，但为了规范，需要先声明，后使用。


## 二、表达式、操作符、运算符

**表达式**与数学中的定义相似，表达式是指具有一定的值、用操作符把常数和变量连接起来的代数式。一个表达式可以包含常数或变量。

```javascript
// 赋值表达式
var num = 0;
  (变量)    (赋值)  (表达式)
var result    =    num + 1;

// 串表达式
'表达式num + 1' + '的' + '结果为：' + result

// 数值表达式
num + 5 * 10

// 布尔表达式
20000 > 35000; // false
num == 5; // false
num < 60; // true
```

#### 1. +号操作符

操作符是用于在JavaScript中指定一定动作的符号。

```
sum = numa + numb;
```
其中的`=`和`+`都是操作符。

JavaScript中还有很多这样的操作符，例如，算术操作符(`+`、`-`、`*`、`/`等)，比较操作符(`<`、`>`、`>=`、`<=`等)，逻辑操作符(`&&`、`||`、`!`)。

**注意:** `=` 操作符是赋值，不是等于。

**算术运算符**主要用来完成类似加减乘除的工作，在JavaScript中，`+`不只代表加法，还可以连接两个字符串，例如：

```javascript
// mystring的值“JavaScript”这个字符串
var mystring = "Java" + "Script"; 
```

#### 2. 自加一，自减一 ( ++和--)

算术操作符除了(`+`、`-`、`*`、`/`)外，还有两个非常常用的操作符，自加一`++`；自减一`--`。

```javascript
mynum = 10;
mynum++; //mynum的值变为11
mynum--; //mynum的值又变回10

mynum = mynum + 1;//等同于mynum++
mynum = mynum - 1;//等同于mynum--
```

#### 3. 比较操作符

| 操作符 | 描述 | 操作符 | 描述  |
| :--: | -- | :--: | -- |
| < | 小于 | > | 大于  |
| <= | 小于等于 | => | 大于等于 |
| == | 等于 | != | 不等于  |

```javascript
var a = 5; //定义a变量，赋值为5
var b = 9; //定义b变量，赋值为9
document.write (a < b); //a小于b的值吗? 结果是真(true)
document.write (a >= b); //a大于或等于b的值吗? 结果是假(false)
document.write (a != b); //a不等于b的值吗? 结果是真(true)
document.write (a == b); //a等于b的值吗? 结果是假(false)
```

#### 4. 逻辑与操作符