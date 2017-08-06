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


## 二、JS基础语法 (表达式、操作符、运算符)

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

#### 4. 逻辑与操作符(&&)

```javascript
// 数学里面的 a<b<c
b > a && b < c
```

`&&`是逻辑与操作符，只有`&&`两边值同时满足(同时为真)，整个表达式值才为真。

| A | B | A && B |
| -- | -- | -- |
| 真(true) | 真(true) | 真(true) |
| 真(true) | 假(false) | 假(false) |
| 假(false) | 真(true) | 假(false) |
| 假(false) | 假(false) | 假(false) |

**注意:** 如果A为假，A && B为假，不会在执行B; 反之，如果A为真，要由 B 的值来决定 A && B 的值。

#### 5. 逻辑或操作符(||)

`||`逻辑或操作符，相当于生活中的**或者**，当两个条件中有任一个条件满足，“逻辑或”的运算结果就为“真”。

**注意:** 如果A为真，A || B为真，不会在执行B; 反之，如果A为假，要由 B 的值来决定 A || B 的值。

#### 6. 逻辑非操作符(!)

`!`是逻辑非操作符，也就是**'不是'**的意思,非真即假，非假即真。

| A | !A |  
| :--: | :--: |  
| 真(true) | 假(false) |
| 假(false) | 真(true) |

#### 7. 操作符优先级

**算术操作符** → **比较操作符** → **逻辑操作符** → **"="赋值符号**

```javascript
var n = 3;
var m = 6;
var result = n + 30 > 10 && m * 3 < 2; // 结果为false
```

## 三、数组

**数组**是一个值的集合，每个值都有一个索引号，从0开始，每个索引都有一个相应的值，根据需要添加更多数值。

![数组](img/js2-1.png)

#### 1. 创建数组

```javascript
var myArray = new Array();
// 或
var maArray = [];
```

 我们创建数组的同时，还可以为数组指定长度，长度可任意指定。
 
```javascript
// 创建数组，存储8个数据。 
var myArray = new Array(8);
```

#### 2. 数组赋值

```javascript
var myArray = new Array(); //创建一个新的空数组
	myArray[0] = 66; //存储第1个人的成绩
	myArray[1] = 80; //存储第2个人的成绩
	myArray[2] = 90; //存储第3个人的成绩
	myArray[3] = 77; //存储第4个人的成绩
	myArray[4] = 59; //存储第5个人的成绩
```

**注意：**数组每个值有一个索引号，从0开始。

用更简洁的方式来创建数组：

```javascript
var myArray = new Array(66,80,90,77,59); // 创建数组同时赋值
```
工作中最常用的方式**字面量数组**
```javascript
var myArray = [66, 80, 90, 77, 59]; // 直接输入一个数组（称 “字面量数组”）
```

**数组存储的数据**可以是任何类型（数字、字符、布尔值、对象等）

#### 3. 向数组增加一个新元素

![数组](img/js2-2.png)

```javascript
// 使用一个新索引，为数组增加一个新元素
myArray[5] = 88; 
// 或
myArray.push(88);
```

#### 4. 使用数组元素

![数组](img/js2-3.png)

要得到一个数组元素的值，只需引用数组变量并提供一个索引，如：  
```javascript
// 获取第一个人的成绩
var score1 = myArray[0];
// 获取第三个人的成绩
var score3 = myArray[2];
```

#### 5. 数组属性length

**Length属性**表示数组的长度，即数组中元素的个数。

```javascript
// 获得数组myarray的长度
var len = myArray.length;
```
**注意：**

1. 因为数组的索引总是由0开始，所以一个数组的首尾限分别是：**0**和**length-1**。如数组的长度是5，数组的上下限分别是0和4。

2. 同时，JavaScript数组的length属性值是可变的。在未限定数组长度（容量）时，删除或新增数组中的元素后，数组的长度值会改变。

```javascript
var arr = [98,76,54,56,76]; // 包含5个数值的数组
document.write('数组长度为： ' + arr.length); // 数组长度为： 5
arr[15] = 34;  //增加元素，使用索引为15,赋值为34
document.write('数组长度为： ' + arr.length); // 数组长度为： 16
```

#### 6. 二维数组

一维数组，我们看成一组盒子，每个盒子只能放一个内容。

```
一维数组的表示: myArray[ ]
```

二维数组，我们看成一组盒子，不过每个盒子里还可以放多个盒子。

```
二维数组的表示: myArray[ ][ ]
```

**注意:** 二维数组的两个维度的索引值也是从0开始，两个维度的最后一个索引值为长度-1。

**(1) 二维数组的定义一**

```javascript
var myArray = new Array(); //先声明一维
for(var i = 0; i < 2; i++) {   //一维长度为2
myArray[i] = new Array();  //再声明二维 
	for(var j = 0; j < 3; j++) {   //二维长度为3
		myArray[i][j] = i + j;   // 赋值，每个数组元素的值为i+j
	}
}
```

将上面二维数组，用表格的方式表示:

| ` | 0 | 1 | 2 |
| -- | -- | -- | -- |
| 0 | myArray[0][0] | myArray[0][1] |myArray[0][2] |
| 1 | myArray[1][0] | myArray[1][1] |myArray[1][2] |
| 2 | myArray[2][0] | myArray[2][1] |myArray[2][2] |

**(2) 二维数组的定义二**

```javascript
var myArray = [[0, 1, 2 ], [1, 2, 3]]
```
**(3)  赋值**

```javascript
myArray[0][1] = 5; //将5的值传入到数组中，覆盖原有值。
```
**说明:** myarr[0][1], **0** 表示表的行，**1**表示表的列

## 四、 流程控制语句

#### 1. if语句

**if语句**是基于条件成立才执行相应代码时使用的语句。

```javascript
if (条件) {
	条件成立时执行代码
}
```

#### 2. if...else语句

**if...else语句**是在指定的条件成立时执行代码，在条件不成立时执行else后的代码。

```
if (条件) {
	条件成立时执行的代码
} else {
	条件不成立时执行的代码
}
```

#### 3. if..else嵌套语句（多重判断）

要在多组语句中选择一组来执行，使用if..else嵌套语句。

```
if (条件1) {
	条件1成立时执行的代码
} else if (条件2) {
	条件2成立时执行的代码
}
...
else if (条件n) {
	条件n成立时执行的代码
} else {
	条件1、2至n不成立时执行的代码
}
```

#### 4.	Switch语句（多种选择）

当有很多种选项的时候，switch比if else使用更方便。

```
switch (表达式) {
	case 值1:
		// 执行代码块 1
  	break;
  case 值2:
  	// 执行代码块 2
  	break;
  ...
  case 值n:
		// 执行代码块 n
		break;
	default:
		// 与 case 值1 、 case 值2...case 值n 不同时执行的代码
}
```

**Switch**必须赋初始值，值与每个case值匹配。满足执行该 case 后的所有语句，并用**break语句**来阻止运行下一个case。如所有case值都不匹配，执行default后的语句。

#### 5. for循环（重复重复）

```bash
for (初始化变量; 循环条件; 循环迭代) {
	// 循环语句 
}
```
 
```javascript
var myArray = ['A', 'B', 'C', 'D', 'N'];
// 输出数组每个元素
for (var i = 0; i < myArray.length; i++) {
	// 控制台日志输出
	console.log(myArray[i] + '\n'); 
	// \n 代表回车换行，可用<br>代替
}
```

#### 6. while循环（反反复复）

和for循环有相同功能的还有while循环, **while循环**重复执行一段代码，直到某个条件不再满足。

```
while (判断条件) {
	// 循环语句
}
```
例子
```javascript
var num = 0; // 初始化值
while (num <= 6) // 条件判断
{
  document.write("取出第" + num + "个球<br/>");
  num++; // 条件值更新
}
```

#### 7. do...while循环（来来回回）

**do while结构**的原理和while结构是基本相同的，但是它保证循环体**至少被执行一次**
。因为它是先执行代码，后判断条件，如果条件为真，继续循环。

```
do {
    // 循环语句
} while (判断条件)
```
例子
```javascript
var num = 1;
do {
	document.write("数值为:" + num + "<br />");
	num++; // 更新条件
} while (num <= 5)
```

#### 8. break（退出循环）

for、switch、while、do...while循环中使用**break语句**退出当前循环，直接执行后面的代码。

```
for (初始条件; 判断条件; 循环后条件值更新) {
	if (特殊情况) {
		break; // 退出整个循环
	}
	循环代码
}
```

#### 9. continue（继续循环）

continue的作用是仅仅跳过本次循环，而整个循环体继续执行。

```
for (初始条件; 判断条件; 循环后条件值更新) {
	if (特殊情况) {
		continue; // 跳过该步，执行循环
	}
	循环代码
}
```
例子
```javascript
var scores = [70, 80, 66, 90, 50, 100, 89]; // 定义数组scores并赋值
for(var i = 0; i < scores.length; i++) {
	if(scores[i] < 60) {
		continue;
		document.write("成绩不及格，不输出！" + "<br>");
	}
	document.write("成绩:" + scores[i] + "及格，输出!" + "<br>");
}
```

## 五、函数

**函数**的作用，可以写一次代码，然后反复地重用这个代码。

#### 1. 不带参数函数与带参函数

```
// 不带参数的函数
function 函数名() {
	函数体;
}

// 有参数的函数
function 函数名(参数1, 参数2) {
	函数代码
	// 在函数代码中使用参数1、参数2
}
```

**function**定义函数的关键字，**“函数名”**你为函数取的名字，**“函数体”**替换为完成特定功能的代码。

**注意:** 带参函数的参数可以多个，根据需要增减参数个数。参数之间用(逗号`,`）隔开。

```javascript
// 定义函数
// 两个数求和并显示结果的功能
function add2(x, y) {
	var sum = x + y;
	document.write('x + y 的结果为： ' + sum);
}
// 使用函数
// js代码中直接调用，直接写函数名（带参数的函数传入参数）
​add2(2, 4); // x + y 的结果为： 6
```

还有一种情况: **在HTML文件中调用**，可以通过点击按钮后调用定义好的函数。

```html
<html>
<head>
<script type="text/javascript">
function add2() {
	var sum = 5 + 6;
	alert(sum);
}
</script>
</head>
<body>
	<!-- 按钮,onclick点击事件，直接写函数名 -->
	<button onclick="add2()">点我，执行函数</button>
</body>
</html>
```

#### 2. 返回值的函数 return

```javascript
// 定义一个带参函数
function add2(x, y) {
	var sum = x + y;
	return sum;
}
// 或
function add2(x, y) {
	return x + y;
}
// 使用函数
​var result = add2(2, 4); // 将结果赋值给result，即result=6
```

**注意:**函数中参数和返回值不只是数字，还可以是字符串或其它类型。

## 六、事件

**事件**是可以被 JavaScript 侦测到的行为。 网页中的每个元素都可以产生某些可以触发 JavaScript 函数或程序的事件。

| 事件 | 说明 |
| -- | -- |
| onclick | 鼠标单击事件 |
| onmouseover | 鼠标经过事件 |
| onmouseout | 鼠标移开事件 |
| onchange | 文本输入框内容改变事件 |
| onselect | 文本输入框内容被选中事件 |
| onfocus | 光标聚焦事件 |
| onblur | 光标离开事件 |
| onload | 网页内容（资源）加载完成事件 |
| onunload | 网页关闭事件 |

#### 1. 鼠标单击事件(onclick）

**onclick**是鼠标单击事件，当在网页上单击鼠标时，就会发生该事件。同时onclick事件调用的程序块就会被执行，通常与按钮一起使用。（例子见5.1）

#### 2. 鼠标经过事件（onmouseover）

鼠标经过事件，当鼠标移到一个对象上时，该对象就触发onmouseover事件，并执行onmouseover事件调用的程序。

#### 3. 鼠标移开事件（onmouseout）

鼠标移开事件，当鼠标移开当前对象时，执行onmouseout调用的程序。

#### 4. 光标聚焦事件（onfocus）

当网页中的对象获得聚点时，执行onfocus调用的程序就会被执行。

如下代码, 当将光标移到文本框内时，即焦点在文本框内，触发onfocus 事件，并调用函数message()。

```html
<html>
<head>
<script type="text/javascript">
function message() {
	alert('请输入用户名');
}
</script>
</head>
<body>
	<input name="username" type="text" placeholder="请输入用户名" onfocus="message()">
</body>
</html>
```

#### 5. 失焦事件（onblur）

**onblur事件**与onfocus是相对事件，当光标离开当前获得聚焦对象的时候，触发onblur事件，同时执行被调用的程序。

#### 6. 内容选中事件（onselect）

选中事件，当文本框或者文本域中的文字被选中时，触发onselect事件，同时调用的程序就会被执行。

```html
<html>
<head>
<script type="text/javascript">
function message() {
	alert('您触发了onselect事件');
}
</script>
</head>
<body>
	<input name="Text" type="text" value="很多文字内容" onselect="message()">
</body>
</html>
```

#### 7. 文本框内容改变事件（onchange）

通过**改变文本框的内容**（并失去焦点）会触发onchange事件，同时执行被调用的程序。

**onchange**通常在select元素上使用，当选项改变时，做一些事情。

#### 8. 加载事件（onload）

**onload事件**会在页面加载完成后，立即发生，同时执行被调用的程序。 开发中经常会碰到需要页面加载完成后才能去做某些“事情”。

#### 9. 卸载事件（onunload）

当用户退出页面时（页面关闭、页面刷新等），触发**onunload事件**，同时执行被调用的程序。

```html
<html>
<head>
<meta charset="utf-8">
<title> 卸载事件 </title>
</head>
<body>
	 欢迎学习JavaScript。
	 
	<script type="text/javascript">   
		window.onunload = function () {   
		  alert("您确定离开该网页吗？");   
		}   
	</script>  
</body>
</html>
```

## 七、对象

JavaScript中的所有事物都是**对象**，如:字符串、数值、数组、函数等，每个对象带有**属性**和**方法**。

**对象的属性**：反映该对象某些特定的性质的，如：字符串的长度、图像的长宽等；

**对象的方法**：能够在对象上执行的动作。例如，表单的“提交”`Submit()`，时间的“获取”`getFullYear()`等；

JavaScript 提供多个内建对象，比如 String、Date、Array 等等，使用对象前先定义。

```javascript
var objectName = new Array(); // 使用new关键字定义对象
// 或者
var objectName = [];
```

**访问对象属性的语法:**

```javascript
objectName.propertyName
```
如使用 Array 对象的 length 属性来获得数组的长度：

```javascript
var myArray = new Array(6); // 定义数组对象，能存放的元素个数为6
var len = myArray.length; // 访问数组长度length属性，结果为6
```

**访问对象的方法：**

```javascript
objectName.methodName()
```

如使用**string对象**的 `toUpperCase()` 方法来将文本转换为大写：

```javascript
var str = "Hello world!"; // 创建一个字符串
var result = str.toUpperCase(); // 使用字符串对象方法
// 结果：HELLO WORLD!
```

#### 1. Date 日期对象

**日期对象**可以储存任意一个日期，并且可以精确到毫秒数（1/1000 秒）。

```javascript
var nowDate = new Date(); 
```
定义nowDate成为日期对象，并且已有初始值：当前时间(当前电脑系统时间)。

如果要**自定义初始值**，可以用以下方法：

```javascript
var d = new Date(2016, 10, 1);  // 2016年10月1日
var d = new Date('Oct 1, 2016'); // 2016年10月1日
```

```bash
访问方法语法：<日期对象>.<方法>
```

| 方法 | 描述 |
| -- | -- |
| get/setDate() | 返回/设置日期 |
| get/setFullYear() | 返回/设置年份，用四位数表示 |
| get/setYear() | 返回/设置年份 |
| get/setMonth() | 返回/设置月份，0-11<br>0代表一月份，11代表十二月份 |
| get/setHours() | 返回/设置小时，24小时制 |
| get/setMinutes() | 返回/设置分钟数 |
| get/setSeconds() | 返回/设置秒钟数 |
| get/setTime() | 返回/设置时间（毫秒为单位） |

* **返回/设置年份 get/setFullYear()**

```javascript
var myDate = new Date(); // 当前时间2016年8月6日
console.log(myDate); 
// Sun Aug 06 2016 22:05:09 GMT+0800 (中国标准时间)
// 1. 结果格式依次为：星期、月、日、年、时、分、秒、时区。(谷歌浏览器)
// 2. 不同浏览器，时间格式有差异。

var year = myDate.getFullYear();
console.log(year); ; // 2016

myDate.setFullYear(95); // 设置年份
console.log(myDate.getFullYear()); // 95
```

* **返回星期方法 getDay()**

getDay() 返回星期，返回的是0-6的数字，0 表示星期天。如果要返回相对应“星期”，通过数组完成，代码如下:

```javascript
var myDate = new Date();//定义日期对象
var weekDays = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
//定义数组对象,给每个数组项赋值 
var week = myDate.getDay(); // 返回值存储在变量mynum中
document.write(week); // 输出getDay()获取值
document.write("今天是：" + weekday[week]); // 输出星期几
```

* **返回/设置时间方法 get/setTime()**

get/setTime() 返回/设置时间，单位毫秒数，计算从 1970 年 1 月 1 日零时到日期对象所指的日期的毫秒数。

```javascript
// 实现当前日期时间推迟1小时
var myDate = new Date();
document.write("当前时间：" + myDate + "<br>");
myDate.setTime(myDate.getTime() + 60 * 60 * 1000);
document.write("推迟一小时时间：" + myDate);
```

#### 2. String 字符串对象

```javascript
// 定义一个字符串对象
var str = "I love JavaScript!"
// 访问字符串对象的属性length:
var len = str.length;
// 访问字符串对象的方法：
// 使用 toUpperCase()方法将字符串小写字母转换为大写
var upperCaseStr = str.toUpperCase(); // I LOVE JAVASCRIPT!
``` 

* **返回指定位置的字符**

**charAt()**方法可返回指定位置的字符。返回的字符是长度为 1 的字符串。

```javascript
stringObject.charAt(index)
```

参数**index**必须，表示字符串中某个位置的数字，即字符在字符串中的下标。

1. 字符串中第一个字符的下标是 0。最后一个字符的下标为字符串长度减一（string.length - 1）。

2. 如果参数 index 不在 0 与 string.length - 1 之间，该方法将返回一个空字符串。

》》》