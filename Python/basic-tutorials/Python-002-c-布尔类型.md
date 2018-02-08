# Python 布尔类型

我们已经了解了Python支持布尔类型的数据，布尔类型只有True和False两种值，但是布尔类型有以下几种运算：

## 与运算 and

只有两个布尔值都为 True 时，计算结果才为 True。

```
True and True   # ==> True
True and False   # ==> False
False and True   # ==> False
False and False   # ==> False
```

## 或运算 or

只要有一个布尔值为 True，计算结果就是 True。

```
True or True   # ==> True
True or False   # ==> True
False or True   # ==> True
False or False   # ==> False
```

## 非运算 not

把True变为False，或者把False变为True

```
not True   # ==> False
not False   # ==> True
```

布尔运算在计算机中用来做条件判断，根据计算结果为True或者False，计算机可以自动执行不同的后续代码。

## Example

在Python中，布尔类型还可以与其他数据类型做 and、or和not运算，请看下面的代码：

```
a = True
print a and 'a=T' or 'a=F'
```

计算结果不是布尔类型，而是字符串 'a=T'，这是为什么呢？

因为Python把`0`、`空字符串''`和`None`看成 `False`，其他数值和非空字符串都看成 `True`，所以：

```
True and 'a=T' 计算结果是 'a=T'
继续计算 'a=T' or 'a=F' 计算结果还是 'a=T'
```

## 短路计算

要解释上述结果，又涉及到 and 和 or 运算的一条重要法则：**短路计算**。

1. 在计算 `a and b` 时，如果 `a` 是 `False`，则根据与运算法则，整个结果必定为 `False`，因此返回 `a`；如果 `a` 是 `True`，则整个计算结果必定取决与 `b`，因此返回 `b`。

2. 在计算 `a or b` 时，如果 `a` 是 `True`，则根据或运算法则，整个计算结果必定为 `True`，因此返回 `a`；如果 `a` 是 `False`，则整个计算结果必定取决于 `b`，因此返回 `b`。

所以Python解释器在做布尔运算时，只要能提前确定计算结果，它就不会往后算了，直接返回结果。


## 参考资料

笔记作者：zx1984

https://github.com/zx1984

腾讯课堂：python零基础入门到精通

https://ke.qq.com/course/206902

原讲师：廖雪峰

https://www.imooc.com/learn/177
