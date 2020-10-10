# Set类型

dict的作用是建立一组 key 和一组 value 的映射关系，dict的key是不能重复的。

有的时候，我们只想要 dict 的 key，不关心 key 对应的 value，目的就是保证这个集合的元素不会重复，这时，set就派上用场了。

set 持有一系列元素，这一点和 list 很像，但是set的元素没有重复，而且是无序的，这点和 dict 的 key很像。

创建 set 的方式是调用 set() 并传入一个 list，list的元素将作为set的元素：

```python
>>> s = set(['A', 'B', 'C'])
```

可以查看 set 的内容：

```
>>> print s
set(['A', 'C', 'B'])
```

请注意，上述打印的形式类似 list， 但它不是 list，仔细看还可以发现，打印的顺序和原始 list 的顺序有可能是不同的，因为set内部存储的元素是无序的。

因为set不能包含重复的元素，所以，当我们传入包含重复元素的 list 会怎么样呢？

```python
>>> s = set(['A', 'B', 'C', 'C'])
>>> print s
set(['A', 'C', 'B'])
>>> len(s)
3
```

结果显示，set会自动去掉重复的元素，原来的list有4个元素，但set只有3个元素。

## 访问set

由于set存储的是无序集合，所以我们没法通过索引来访问。

访问 set中的某个元素实际上就是判断一个元素是否在set中。

例如，存储了班里同学名字的set：

```
>>> s = set(['Adam', 'Lisa', 'Bart', 'Paul'])
```

我们可以用 `in` 操作符判断：

Bart是该班的同学吗？

```
>>> 'Bart' in s
True
```

bart是该班的同学吗？

```
>>> 'bart' in s
False
```

看来大小写很重要，'Bart' 和 'bart'被认为是两个不同的元素。

## set的特点

set的内部结构和dict很像，唯一区别是不存储value，因此，判断一个元素是否在set中速度很快。

set存储的元素和dict的key类似，必须是不变对象，因此，任何可变对象是不能放入set中的。

最后，set存储的元素也是没有顺序的。

#### # set的这些特点，可以应用在哪些地方呢？

星期一到星期日可以用字符串'MON', 'TUE', ... 'SUN'表示。

假设我们让用户输入星期一至星期日的某天，如何判断用户的输入是否是一个有效的星期呢？

可以用 if 语句判断，但这样做非常繁琐：

```python
x = '???' # 用户输入的字符串
if x!= 'MON' and x!= 'TUE' and x!= 'WED' ... and x!= 'SUN':
    print 'input error'
else:
    print 'input ok'
```

注意：if 语句中的...表示没有列出的其它星期名称，测试时，请输入完整。

如果事先创建好一个set，包含'MON' ~ 'SUN'：

```python
weekdays = set(['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'])
```

再判断输入是否有效，只需要判断该字符串是否在set中：

```python
x = '???' # 用户输入的字符串
if x in weekdays:
    print 'input ok'
else:
    print 'input error'
```

这样一来，代码就简单多了。

## 遍历set

由于 set 也是一个集合，所以，遍历 set 和遍历 list 类似，都可以通过 for 循环实现。

直接使用 for 循环可以遍历 set 的元素：

```python
>>> s = set(['Adam', 'Lisa', 'Bart'])
>>> for name in s:
...     print name
...
Lisa
Adam
Bart
```

注意: 观察 for 循环在遍历set时，元素的顺序和list的顺序很可能是不同的，而且不同的机器上运行的结果也可能不同。

## 更新set/添加或删除元素

由于set存储的是一组不重复的无序元素，因此，更新set主要做两件事：

一是把新的元素添加到set中，二是把已有元素从set中删除。

#### # 添加元素时，用set的add()方法：

```python
>>> s = set([1, 2, 3])
>>> s.add(4)
>>> print s
set([1, 2, 3, 4])
```

如果添加的元素已经存在于set中，add()不会报错，但是不会加进去了：

```python
>>> s = set([1, 2, 3])
>>> s.add(3)
>>> print s
set([1, 2, 3])
```

#### # 删除set中的元素时，用set的remove()方法：

```python
>>> s = set([1, 2, 3, 4])
>>> s.remove(4)
>>> print s
set([1, 2, 3])
```

如果删除的元素不存在set中，remove()会报错：

```python
>>> s = set([1, 2, 3])
>>> s.remove(4)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
KeyError: 4
```

所以用add()可以直接添加，而remove()前需要判断。

#### # Example

针对下面的set，给定一个list，对list中的每一个元素，如果在set中，就将其删除，如果不在set中，就添加进去。

```python
s = set(['Adam', 'Lisa', 'Paul'])
L = ['Adam', 'Lisa', 'Bart', 'Paul']
for k in L:
    if k in s:
        s.remove(k)
    else:
        s.add(k)
print s
```

## 参考资料

笔记作者：Capricorncd

https://github.com/capricorncd

腾讯课堂：python零基础入门到精通

https://ke.qq.com/course/206902

原讲师：廖雪峰

https://www.imooc.com/learn/177
