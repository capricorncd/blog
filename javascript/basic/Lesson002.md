编程语言特点：有变量、有函数、有数据结构、可以进行基本计算

## # Js引入方式

页面内嵌`<script></script>`标签

外部引入`<script src="location"></script>`

为符合web标准(w3c标准中的一项)结构、样式、行为相分离，通常会采用外部引入。

|结构|行为|样式|
|:--:|:--:|:--:|
|html|js|css|


## # 变量

* 变量声明

  声明、赋值分解

  单一 var

  ```
  var a; // 变量声明，向系统申请一个存储空间
  var b = 100;
  var c = 200;
  var d = 300;

  // 单一var模式
  var a, b, c, d;
  ```

## # 数据类型

原始值（原始类型）:存在`栈`

Number、String、Boolean、undefined、null

引用值（引用类型）:存于`堆`，栈存储堆指针

Array Object Function Date RegExp ...

```
// 原始值
var a = 10;
var b = a;
a = 20;
console.log(a, b); // 20 10
```

```
// 引用值
var arr = [1, 2];
var arr2 = arr;
arr.push(3);
console.log(arr); // [1, 2, 3]
console.log(arr2); // [1, 2, 3]
```

```
// 引用值
var arr = [1, 2];
var arr2 = arr;
arr = [1, 3];
console.log(arr); // [1, 3]
console.log(arr2); // [1, 2]
```

## # 语法

语句结尾需加`;`号结束。

#### # 错误

1. 低级错误：语法解析错误

2. 逻辑错误：标准错误，情有可原

js语法错误会引发后续代码终止，但不会影响其他js代码块。

```html
<!--代码块A-->
<script>
  // doSomethimgA()
</script>

<!--代码块B-->
<script>
  // doSomethimgB()
</script>
```

#### # 运算操作符

`+`符

> 数学运算，字符串链接；

> 任何数据类型 `+` 字符串都等于字符串。

`-` `*` `/` `%` `=` `()` 符

```javascript
 1 / 0; // Infinity
-1 / 0; // -Infinity
 1 * 0; // 0
 1 % 0; // NaN
 0 % 1; // 0
 0 / 0; // NaN
```

优先级`=`最低，`()`优先级较高

`++` `--` `+=` `-=` `/=` `*=` `%=`

赋值顺序，自右向左；计算顺序，自左向右。

