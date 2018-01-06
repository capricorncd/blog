# JavaScript 正则表达式

Regular Expression 使用单个字符串来描述、匹配一系列符合`某个句法规则`的字符串。
按某种`规则`去匹配符合条件的字符串。不同编程语言的正则表达式略有不同。

图形工具(正则表达式在线工具)：http://regexper.com

## 一、语法
JavaScript通过内置对象 RegExp 支持正则表达式，有两种方法实例化RegExp对象：字面量和构造函数。

#### 1. 字面量

```javascript
// 实例化一个正则表达式，匹配字符串中的is单词
var reg = /\bis\b/g;

'She is girl, This is a computer.'.replace(reg, 'IS');
// 结果 'She IS girl, This IS a computer.'
```

#### 2. 构造函数

```javascript
var reg = new RegExp('\\bis\\b', 'g');
'She is girl, This is a computer.'.replace(reg, 'IS');
// 结果 'She IS girl, This IS a computer.'
```

## 二、元字符

正则表达式由两种基本字符类型组成：原义文本字符和元字符。`元字符`是在正则表达式中`有特殊含义`的`非字母`字符。

```bash
* + $ ^ . | \ () {} []
```

| 字符 | 含义 | 字符 | 含义 |
|----|----|----|----|
| \t | 水平制表符 | \v | 垂直制表符 |
| \n | 换行符 | \r | 回车符 |
| \0 | 空字符 | \f | 换页符 |
| \cX | 与X对应的控制字符(ctrl+X) |

#### 1.字符类

- 匹配单个字符
  一般情况下正则表达式一个字符对应字符串一个字符，表达式`ab\t`的含义是'ab' + table键

- 匹配一类字符[]
  可以使用元字符`[]`来构建一个简单的类。所谓`类`就是指符合某些特性的对象，一个泛指，而不是特指某个字符。
  表达式`[abc]`把字符a或b或c归为一类，表达式可以匹配这类的字符，即可以匹配a或b或c中的任一个。

```javascript
'a1b2c3d4'.replace(/[abc]/g, 'X'); // 结果：'X1X2X3d4'
```

- 字符类取反

  使用元字符`^`创建 反向类/负向类。反向类的意思是不属于某类的内容。
 表达式`[^abc]`表示不是字符a或b或c的内容


```javascript
'a1b2c3d4'.replace(/[^abc]/g, 'X'); // 结果：'aXbXcXXX'
```

#### 2.范围类

使用`[a-z]`来连接两个字符表示从`a到z的任意字符`，这是一个闭区间，也就是包含a和z本身。

```javascript
'a1b2c3D4'.replace(/[a-zA-Z]/g, 'X'); // 结果：'X1X2X3X4'

// 匹配数字
'2017-05-01'.replace(/[0-9]/g, 'X'); // 结果：'XXXX-XX-XX'
// 匹配横线
'2017-05-01'.replace(/[0-9-]/g, 'X'); // 结果：'XXXXXXXXXX'
```

#### 3.预定义类

| 字符 | 等价类 | 含义 |
|----|----|----|
| . | [^\r\n] | 除回车符和换行符之外的所有字符 |
| \d | [0-9] | 数字字符 |
| \D | [^0-9] | 非数字字符 |
| \s | [\t\n\xOB\f\r] | 空白符 |
| \S | [^\t\n\xOB\f\r] | 非空白符 |
| \w | [a-zA-Z_0-9] | 单词字符(字母、数字、下划线) |
| \W | [^a-zA-Z_0-9] | 非单词字符 |

匹配一个`ab + 数字 + 任意字符`的字符串

```javascript
ab\d.
```

#### 4.边界

几个常见的边界匹配字符

| 字符 | 含义 | 字符 | 含义 |
|----|----|----|----|
| ^ | 以xxx开始 | $ | 以xxx结束 |
| \b | 单词边界 | \B | 非单词边界 |

注意：`^`符号不在中括号[]内，则表示以xxx开始，而非取反的意思。

```javascript
'@123@abc@'.replace(/@./g, 'X'); // 'X23Xbc@'

'@123@abc@'.replace(/^@./g, 'X'); // 'X23@abc@'

'@123@abc@'.replace(/.@/g, 'X'); // '@12XabX'
```

#### 5.量词

| 字符 | 含义 |
|----|----|
| ? | 出现零次或一次(最多出现一次)|
| + | 出现一次或多次(至少出现一次)|
| * | 出现零次或多次(任意次)|
| {n} | 出现n次|
| {n, m} | 出现n到m次|
| {n,} | 至少出现n次|

## 三、贪婪模式与非贪婪模式

#### 1.贪婪模式

尽可能多的匹配。

```javascript
'123456789'.replace(/\d{3,6}/, 'X'); // X789
```

#### 2.非贪婪模式

尽可能少的匹配，也就是说一旦成功匹配就不再继续尝试。方法：在量词后面加上 `?`即可。

```javascript
'123456789'.match(/\d{3,6}?/g); // ['123', '456', '789']
```

## 四、分组、或、反向引用(分组捕获)、忽略分组

#### 1.分组

使用`()`可以达到`分组`的功能，使量词作用于分组

```bash
// 匹配字符串 'Byron' 连续出现3次的场景。
 Byron{3}  // 匹配'n'连续出现了3次的场景
(Byron){3} // 匹配'Byron'连续出现了3次的场景
```

```javascript
// 匹配字母+数字连续出现3次的场景
'a1b2c3d4'.replace(/[a-z]\d{3}/g, 'X'); // a1b2c3d4
'a1b2c3d4'.replace(/([a-z]\d){3}/g, 'X'); // Xd4
```

#### 2.或

使用 `|`可以达到`或`的效果

```javascript
'ByronCasper'.replace(/Byron|Casper/g, 'X'); // XX
'ByronsperByrCasper'.replace(/Byr(on|Ca)sper/g, 'X'); // XX
```

#### 3.反向引用(分组捕获)

```javascript
// 实现：2017-05-01 => 05/01/2017
'2017-05-01'.replace(/(\d{4})-(\d{2})-(\d{2})/g, '$2/$3/$1'); // 05/01/2017
```

#### 4.忽略分组

不希望捕获某些分组，只需在分组内加上`?:`即可。

```bash
(?:Byron).(ok)
```

## 五、前瞻、后顾(后瞻)

正则表达式从文本头部向尾部开始解析，文本尾部方向，称为`前`。
`前瞻`就是在正则表达式匹配到规则的时候，向前检查是否符合断言，后顾/后瞻方向相反。

JavaScript不支持后顾。

符合与不符合特定断言称为`肯定/正向`匹配和`否定/负向`匹配。

| 名称 | 正则 | 备注 |
| ---- | ---- | ---- |
| 正向前瞻 | exp(?=assert)||
| 负向前瞻 | exp(?!assert)||
| 正向后顾 | exp(?<=assert)| JavaScript不支持 |
| 负向后顾 | exp(?<\!assert)| JavaScript不支持 |

```bash
\w(?=\d)
```

```javascript
'a2*34v8' .repalce(/\w(?=\d)/g, 'X'); // X2*X4X8
'a2*34vv' .repalce(/\w(?!\d)/g, 'X'); // aX*3XXX
```

## 六、对象属性

| 字符 | 含义 | 默认值 |
|----| ---- | ---- |
| g | global 全文搜索，不添加则搜索到第一个匹配停止 | flase |
| i | ignore case 忽略大小写，默认大小写敏感 | flase |
| m | multiple lines 多行搜索 | flase |
| l | lastIndex 当前表达式匹配内容的最后一个字符的下一个位置 ||
| s | source 正则表达式的文本字符串 ||

```javascript
var mulStr = '
    @123
    @456
    @789
';

mulStr.replace(/^@\d/g, 'X');
// 'X23
// @456
// @789'

mulStr.replace(/^@\d/gm, 'X');
// 'X23
// X56
// X89'
```

## 七、RegExp对象方法test与exec

#### 1、test()

test() 方法用于检测一个字符串是否匹配某个模式。

```javascript
RegExpObject.test(string);
```
`string` 必需。要检测的字符串。
- 返回值
如果字符串 string 中含有与 RegExpObject 匹配的文本，则返回 true，否则返回 false。
- 说明
 调用 RegExp 对象 r 的 test() 方法，并为它传递字符串 s，与这个表示式是等价的：(r.exec(s) != null)。

#### 2、exec(str)

使用正则表达式模式对字符串执行搜索，并将更新全局RegExp对象的属性以反映匹配结果


```javascript
// exec() 方法用于检索字符串中的正则表达式的匹配。
RegExpObject.exec(string)
```
- 返回值
返回一个数组，其中存放匹配的结果。如果未找到匹配，则返回值为 null。

- 说明
exec() 方法的功能非常强大，它是一个通用的方法，而且使用起来也比 test() 方法以及支持正则表达式的 String 对象的方法更为复杂。

  如果 exec() 找到了匹配的文本，则返回一个结果数组。否则，返回 null。此数组的第 0 个元素是与正则表达式相匹配的文本，第 1 个元素是与 RegExpObject 的第 1 个子表达式相匹配的文本（如果有的话），第 2 个元素是与 RegExpObject 的第 2 个子表达式相匹配的文本（如果有的话），以此类推。除了数组元素和 length 属性之外，exec() 方法还返回两个属性。index 属性声明的是匹配文本的第一个字符的位置。input 属性则存放的是被检索的字符串 string。我们可以看得出，在调用非全局的 RegExp 对象的 exec() 方法时，返回的数组与调用方法 String.match() 返回的数组是相同的。

  但是，当 RegExpObject 是一个全局正则表达式时，exec() 的行为就稍微复杂一些。它会在 RegExpObject 的 lastIndex 属性指定的字符处开始检索字符串 string。当 exec() 找到了与表达式相匹配的文本时，在匹配后，它将把 RegExpObject 的 lastIndex 属性设置为匹配文本的最后一个字符的下一个位置。这就是说，您可以通过反复调用 exec() 方法来遍历字符串中的所有匹配文本。当 exec() 再也找不到匹配的文本时，它将返回 null，并把 lastIndex 属性重置为 0。

## 八、支持正则表达式的 String 对象的方法

| 方法 | 描述 |
| --- | --- |
| search | 检索与正则表达式相匹配的值。 	|
| match | 找到一个或多个正则表达式的匹配。|
| replace | 替换与正则表达式匹配的子串。|
| split | 把字符串分割为字符串数组。 |


### # 备注

笔记作者： Capricorncd

主页：https://github.com/capricorncd

原讲师：Samaritan89

出处：https://www.imooc.com/learn/706

w3school文档： http://www.w3school.com.cn/jsref/jsref_obj_regexp.asp
