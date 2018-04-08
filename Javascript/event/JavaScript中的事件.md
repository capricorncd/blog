# JavaScript中的事件

JavaScript 使我们有能力创建动态页面。事件是可以被 JavaScript 侦测到的行为。

网页中的每个元素都可以产生某些可以触发 JavaScript 函数的事件。比方说，我们可以在用户点击某按钮时产生一个 onClick 事件来触发某个函数。事件在 HTML 页面中定义。

> 事件是文档Document或浏览器窗口中发生的，特定的交互瞬间。

> js与html之间的交互是通过事件来实现的

## 事件流

描述的是从页面中接受事件的顺序

IE：事件冒泡流

NetScape: 事件捕获流

#### # 事件冒泡

事件最开始由最具体的元素（文档中嵌套层次最深的那个节点）接收，然后逐级向上传播至最不具体的那个节点（文档Document）。

#### # 事件捕获

不太具体的节点应该更早接收到事件，而最具体的节点最后接收到事件。

## 使用事件处理程序

#### # html事件处理程序

缺点：HTML和JS代码紧密的耦合在一起。

```html
<button onclick="alert('Hello World!')">按钮</button>
```

```html
<button onclick="showMessage()">按钮</button>
<script>
function showMessage () {
  alert('Hello World!');
}
</script>
```

#### # DOM 0级事件处理程序

较传统的处理方式：

> 把一个函数赋值给一个事件的处理程序属性；

> 在第四代浏览器中出现；

> 用的比较多的方法，简单、跨浏览器等优势

```html
<button id="Button">按钮</button>
<script>
// 获取按钮节点
var $btn = document.getElementById('#Button');
// 添加click事件处理程序
$btn.onclick = function () {
  alert('这是通过DOM 0级添加的事件！');
}
// 销毁点击事件
$btn.onclick = null;
</script>
```

#### # DOM 2级事件处理程序

用于处理指定和删除事件处理程序的操作，两个方法`addEventListener()`和`removeEventListener()`，以上方法接收3个参数`事件名`、`事件处理程序`、`布尔值（false冒泡阶段调用，true捕获阶段调用）`

## 不同的事件类型

## Remarks

笔记作者：zx1984

主页：https://github.com/zx1984

原讲师：Amy

出处：https://www.imooc.com/learn/138
