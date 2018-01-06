# JavaScript入门篇

## 一、你知道，为什么JavaScript非常值得我们学习吗？

1. 所有主流浏览器都支持JavaScript。
2. 目前，全世界大部分网页都使用JavaScript。
3. 它可以让网页呈现各种动态效果。
4. 做为一个Web开发师，如果你想提供漂亮的网页、令用户满意的上网体验，JavaScript是必不可少的工具。

## 二、语句和符号

### 1. 注释

作用是提高代码的可读性，帮助自己和别人阅读和理解你所编写的JavaScript代码，注释的内容不会在网页中显示。注释可分为单行注释与多行注释两种。

**单行注释**，在注释内容前加符号 “//”。**多行注释**以"/\*"开始，以"\*/"结束。

### 2. 变量

```javascript
var 变量名
```

变量名可以任意取名，但要遵循命名规则:

1. 变量必须使用字母、下划线(_)或者美元符($)开始。

2. 然后可以使用任意多个英文字母、数字、下划线(_)或者美元符($)组成。

3. 不能使用JavaScript关键词与JavaScript保留字。

### 3. 判断语句（if...else）

```javascript
if(条件)
{ 条件成立时执行的代码 }
else
{ 条件不成立时执行的代码 }
```

### 4. 函数

函数是完成某个特定功能的一组语句。如没有函数，完成任务可能需要五行、十行、甚至更多的代码。这时我们就可以把完成特定功能的代码块放到一个函数里，直接调用这个函数，就省重复输入大量代码的麻烦。

```
function 函数名()
{
    函数代码;
}
```

1. function定义函数的关键字。

2. "函数名"你为函数取的名字。

3. "函数代码"替换为完成特定功能的代码。

### 5. 输出内容（document.write）

`document.write()` 可用于直接向 HTML 输出流写内容。简单的说就是直接在网页中输出内容。

```
// 输出内容用""括起，直接输出""号内的内容
document.write("I love JavaScript！");

// 通过变量，输出内容
var mystr="hello world!";
document.write(mystr);

// 输出多项内容，内容之间用+号连接
var mystr="hello";
document.write(mystr + "I love JavaScript");

// 输出HTML标签，并起作用，标签使用""括起来
var mystr="hello";
document.write(mystr + "<br>");
document.write("JavaScript");

// JS中如何输出空格
// 1. 使用输出html标签&nbsp;
document.write("&nbsp;&nbsp;"+"1"+"&nbsp;&nbsp;&nbsp;&nbsp;"+"23");
// 2. 使用CSS样式
document.write("<span style='white-space:pre;'>"+"  1        2    3    "+"</span>");
```

### 6. 警告（alert 消息对话框）

```
alert(字符串或变量);
```
1. 在点击对话框"确定"按钮前，不能进行任何其它操作。

2. 消息对话框通常可以用于调试程序。

3. alert输出内容，可以是字符串或变量，与document.write 相似。

### 7. 确认（confirm 消息对话框）

`confirm` 消息对话框通常用于允许用户做选择的动作

```
// str：在消息对话框中要显示的文本
// 返回值: Boolean值
confirm(str);
```
#### 返回值:
当用户点击"确定"按钮时，返回true
当用户点击"取消"按钮时，返回false

### 8. 提问（prompt 消息对话框）

`prompt` 弹出消息对话框,通常用于询问一些需要与用户交互的信息。弹出消息对话框（包含一个确定按钮、取消按钮与一个文本输入框）。

```
// str1: 要显示在消息对话框中的文本，不可修改
// str2：文本框中的内容，可以修改
prompt(str1, str2);
```
#### 返回值:
1. 点击确定按钮，文本框中的内容将作为函数返回值
2. 点击取消按钮，将返回null

### 9. 打开新窗口（window.open）

`open()` 方法可以查找一个已经存在或者新建的浏览器窗口。

```
window.open([URL], [窗口名称], [参数字符串])
```

#### 参数说明:

**URL：** 可选参数，在窗口中要显示网页的网址或路径。如果省略这个参数，或者它的值是空字符串，那么窗口就不显示任何文档。
**窗口名称：** 可选参数，被打开窗口的名称。

```
1.该名称由字母、数字和下划线字符组成。
2."_top"、"_blank"、"_self"具有特殊意义的名称。
    _blank：在新窗口显示目标网页
    _self：在当前窗口显示目标网页
    _top：框架网页中在上部窗口中显示目标网页
3.相同 name 的窗口只能创建一个，要想创建多个窗口则 name 不能相同。
4.name 不能包含有空格。
```

**参数字符串：** 可选参数，设置窗口参数，各参数用逗号隔开。

#### 参数表:

| 参数 | 值 | 说明 |
| -- | -- | -- |
| top | Number | 窗口顶部离开屏幕顶部的像素值 |
| left | Number | 窗口左侧离开屏幕左端的像素值 |
| width | Number | 窗口宽度 |
| height | Number | 窗口高度 |
| menubar | yes/no | 是否显示窗口菜单 |
| toolbar | yes/no | 是否显示窗口工具条 |
| scrollbars | yes/no | 是否显示窗口滚动条 |
| status | yes/no | 是否显示窗口状态栏 |

### 10. 关闭窗口（window.close）

```
window.close();   //关闭本窗口
<窗口对象>.close();   //关闭指定的窗口
```

```
//将新打的窗口对象，存储在变量mywin中
var mywin=window.open('http://www.imooc.com');
mywin.close();
```

## 三、 DOM

**文档对象模型DOM**（Document Object Model）定义访问和处理HTML文档的标准方法。DOM 将HTML文档呈现为带有元素、属性和文本的树结构（节点树）。

```html
<html>
    <body>
        <div>
            <p>
                <a href="http://www.javascript.com">JavaScript DOM</a>
            </p>
        </div>
        <ul>
            <li>JavaScript</li>
            <li>DOM</li>
            <li>CSS</li>
        </ul>
    </body>
</html>
```

HTML文档可以说由节点构成的集合，三种常见的DOM节点:

1. 元素节点：上图中`<html>`、`<body>`、`<p>`等都是元素节点，即标签。

2. 文本节点:向用户展示的内容，如`<li>...</li>`中的JavaScript、DOM、CSS等文本。

3. 属性节点:元素属性，如`<a>`标签的链接属性`href="http://www.javascript.com"`。

### 1. 通过ID获取元素

标签的id属性值是唯一的

```
document.getElementById(“id”)
```

**结果:** `null`或`[object HTMLParagraphElement]`

**注:** 获取的元素是一个对象，如想对元素进行操作，我们要通过它的属性或方法。

### 2. innerHTML 属性

innerHTML 属性用于获取或替换 HTML 元素的内容。

```
Object.innerHTML
```

注意:

1.`Object` 是获取的元素对象，如通过`document.getElementById("ID")`获取的元素。

2.注意书写，innerHTML区分大小写。

我们通过`id="con"`获取`<p>`元素，并将元素的内容输出和改变元素内容，代码如下:

```html
<html>
    <head>
        <title>innerHTML</title>
    </head>
    <body>
        <div>
            <p>
                <a href="http://www.javascript.com">JavaScript DOM</a>              </p>
        </div>
        <ul>
            <li id="con">JavaScript</li>
            <li>DOM</li>
            <li>CSS</li>
        </ul>
        <script>
            var con = document.getElementById("con");
            document.write('原始标签的内容：' + con.innerHTML);
            // 新内容
            con.innerHTML = '新输入的内容';
            document.write('修改后的内容：' + con.innerHTML);
        </script>
    </body>
</html>
```

### 3. 改变 HTML 样式

HTML DOM 允许 JavaScript 改变 HTML 元素的样式。

```
<p id="pcon">Hello World!</p>
<script>
    var mychar = document.getElementById("pcon");
    mychar.style.color="red";
    mychar.style.fontSize="20";
    mychar.style.backgroundColor ="blue";
</script>
```

### 4. 显示和隐藏（display属性）

网页中经常会看到显示和隐藏的效果，可通过display属性来设置。

```
Object.style.display = value
```

注意: Object是获取的元素对象，如通过`document.getElementById("id")`获取的元素。

| value取值 | 描述 |
| -- | -- |
| none | 元素被隐藏 |
| block | 元素被显示为块级元素 |

### 5. 控制类名（className 属性）

className 属性设置或返回元素的class 属性

```
object.className = classname
```

**作用:**

1. 获取元素的class 属性

2. 为网页内的某个元素指定一个css样式来更改该元素的外观


### # 备注

笔记作者： Capricorncd

主页：https://github.com/capricorncd

原讲师：未知

出处：https://www.imooc.com/learn/36
