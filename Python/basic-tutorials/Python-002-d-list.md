# Python list

Python内置的一种数据类型是列表：`list`。list是一种有序的集合，可以随时添加和删除其中的元素。

## 创建list

比如，列出班里所有同学的名字，就可以用一个list表示：

```
>>> ['Michael', 'Bob', 'Tracy']
['Michael', 'Bob', 'Tracy']
```

list是数学意义上的有序集合，也就是说，list中的元素是按照顺序排列的。

构造list非常简单，按照上面的代码，直接用 `[ ]` 把list的所有元素都括起来，就是一个list对象。通常，我们会把list赋值给一个变量，这样，就可以通过变量来引用list：

```
>>> classmates = ['Michael', 'Bob', 'Tracy']
>>> classmates # 打印classmates变量的内容
['Michael', 'Bob', 'Tracy']
```

由于Python是动态语言，所以list中包含的元素并不要求都必须是同一种数据类型，我们完全可以在list中包含各种数据：

```
>>> L = ['Michael', 100, True]
```

一个元素也没有的list，就是空list：

```
>>> empty_list = []
```

## 按照索引访问list

由于list是一个有序集合，所以，我们可以用一个list按分数从高到低表示出班里的3个同学：

```
>>> L = ['Adam', 'Lisa', 'Bart']
```

那我们如何从list中获取指定第 N 名的同学呢？方法是通过索引来获取list中的指定元素。

需要特别注意的是，索引从 `0` 开始，也就是说，第一个元素的索引是0，第二个元素的索引是1，以此类推。

因此，要打印第一名同学的名字，用 `L[0]`:

```
>>> print L[0]
Adam
```

要打印第二名同学的名字，用 L[1]，以此类推

```
>>> print L[1]
Lisa
```

要打印第四名同学的名字，用 L[3]:

```
>>> print L[3]
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
IndexError: list index out of range
```

报错了！IndexError意思就是索引超出了范围，因为上面的list只有3个元素，有效的索引是 0，1，2。

所以，使用索引时，**千万注意不要越界**。

## 倒序访问list

我们还是用一个list按分数从高到低表示出班里的3个同学：

这时，老师说，请分数最低的同学站出来。

要写代码完成这个任务，我们可以先数一数这个 list，发现它包含3个元素，因此，最后一个元素的索引是2：

```
>>> print L[2]
Bart
```

#### 有没有更简单的方法？

Bart同学是最后一名，俗称倒数第一，所以，我们可以用 -1 这个索引来表示最后一个元素：

```
>>> print L[-1]
Bart
```

Bart同学表示躺枪。

类似的，倒数第二用 -2 表示，倒数第三用 -3 表示，倒数第四用 -4 表示：

```
>>> print L[-2]
Lisa
>>> print L[-3]
Adam
>>> print L[-4]
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
IndexError: list index out of range
```

L[-4] 报错了，因为倒数第四不存在，一共只有3个元素。

使用倒序索引时，也要注意**不要越界**。

## 添加新元素

现在，班里有3名同学：

今天，班里转来一名新同学 Paul，如何把新同学添加到现有的 list 中呢？

第一个办法是用 `list` 的 `append()` 方法，把新同学追加到 list 的末尾：

```
>>> L = ['Adam', 'Lisa', 'Bart']
>>> L.append('Paul')
>>> print L
['Adam', 'Lisa', 'Bart', 'Paul']
```

#### # append()

总是把新的元素添加到 list 的尾部。

如果 Paul 同学表示自己总是考满分，要求添加到第一的位置，怎么办？

#### # insert()

方法是用list的 insert()方法，它接受两个参数，第一个参数是索引号，第二个参数是待添加的新元素：

```
>>> L = ['Adam', 'Lisa', 'Bart']
>>> L.insert(0, 'Paul')
>>> print L
['Paul', 'Adam', 'Lisa', 'Bart']
```

`L.insert(0, 'Paul')` 的意思是，`'Paul'`将被添加到索引为 0 的位置上（也就是第一个），而原来索引为 0 的Adam同学，以及后面的所有同学，都自动向后移动一位。

#### Example

假设新来一名学生Paul，Paul 同学的成绩比Bart好，但是比Lisa差，他应该排到第三名的位置，请用代码实现。

```
L = ['Adam', 'Lisa', 'Bart']
L.insert(2, 'Paul')
print L

# 结果： ['Adam', 'Lisa', 'Paul', 'Bart']
```

## 删除元素 pop()

Paul同学刚来几天又要转走了，那么我们怎么把Paul 从现有的list中删除呢？

如果Paul同学排在最后一个，我们可以用list的pop()方法删除：

```
>>> L = ['Adam', 'Lisa', 'Bart', 'Paul']
>>> L.pop()
'Paul'
>>> print L
['Adam', 'Lisa', 'Bart']
```

`pop()`方法总是删掉list的最后一个元素，并且它还返回这个元素，所以我们执行 `L.pop()` 后，会打印出 `'Paul'`。

如果Paul同学不是排在最后一个怎么办？比如Paul同学排在第三：

```
>>> L = ['Adam', 'Lisa', 'Paul', 'Bart']
```

要把Paul踢出list，我们就必须先定位Paul的位置。由于Paul的索引是2，因此，用 `pop(2)`把Paul删掉：

```
>>> L.pop(2)
'Paul'
>>> print L
['Adam', 'Lisa', 'Bart']
```

## 替换元素

```
>>> L = ['Adam', 'Lisa', 'Bart']
```

现在，Bart同学要转学走了，碰巧来了一个Paul同学，要更新班级成员名单，我们可以先把Bart删掉，再把Paul添加进来。

另一个办法是直接用Paul把Bart给替换掉：

```
>>> L[2] = 'Paul'
>>> print L
L = ['Adam', 'Lisa', 'Paul']
```

对list中的某一个索引赋值，就可以直接用新的元素替换掉原来的元素，list包含的元素个数保持不变。

由于Bart还可以用 -1 做索引，因此，下面的代码也可以完成同样的替换工作：

```
>>> L[-1] = 'Paul'
```

## 参考资料

笔记作者：Capricorncd

https://github.com/capricorncd

腾讯课堂：python零基础入门到精通

https://ke.qq.com/course/206902

原讲师：廖雪峰

https://www.imooc.com/learn/177
