# 条件判断和循环

计算机之所以能做很多自动化的任务，因为它可以自己做条件判断。

## if语句

比如，输入用户年龄，根据年龄打印不同的内容，在Python程序中，可以用if语句实现：

```
age = 20
if age >= 18:
    print 'your age is', age
    print 'adult'
print 'END'
```

注意: `Python代码的缩进规则`。具有相同缩进的代码被视为代码块，上面的3，4行 print 语句就构成一个代码块（但不包括第5行的print）。如果 if 语句判断为 True，就会执行这个代码块。

缩进请严格按照Python的习惯写法：`4个空格，不要使用Tab，更不要混合Tab和空格`，否则很容易造成因为缩进引起的语法错误。

注意: if 语句后接表达式，然后用`:`表示代码块开始。

如果你在Python交互环境下敲代码，还要特别留意缩进，并且退出缩进需要多敲一行回车：

```
>>> age = 20
>>> if age >= 18:
...     print 'your age is', age
...     print 'adult'
...
your age is 20
adult
```

## if-elif-else

有的时候，一个 if ... else ... 还不够用。比如，根据年龄的划分：

```
条件1：18岁或以上：adult
条件2：6岁或以上：teenager
条件3：6岁以下：kid
```

```
if age >= 18:
    print 'adult'
else:
    if age >= 6:
        print 'teenager'
    else:
        print 'kid'
```

要避免嵌套结构的 `if ... else ...`，我们可以用 `if ...` 多个`elif ... else ...` 的结构，一次写完所有的规则：

```
if age >= 18:
    print 'adult'
elif age >= 6:
    print 'teenager'
elif age >= 3:
    print 'kid'
else:
    print 'baby'
```

elif 意思就是 `else if`。这样一来，我们就写出了结构非常清晰的一系列条件判断。

特别注意: 这一系列条件判断会从上到下依次判断，如果某个判断为 True，执行完对应的代码块，后面的条件判断就直接忽略，不再执行了。

## for循环

Python的 for 循环就可以依次把list或tuple的每个元素迭代出来：

```
L = ['Adam', 'Lisa', 'Bart']
for name in L:
    print name
```

# Example

班里考试后，老师要统计平均成绩，已知4位同学的成绩用list表示如下：
```
L = [75, 92, 59, 68]
```
请利用for循环计算出平均成绩。

```python
L = [75, 92, 59, 68]
sum = 0.0
for item in L:
    sum += item
print sum / 4
```

## while循环

和 for 循环不同的另一种循环是 while 循环，while 循环不会迭代 list 或 tuple 的元素，而是根据表达式判断循环是否结束。

```
N = 10
x = 0
while x < N:
    print x
    x = x + 1
```

while循环每次先判断 `x < N`，如果为True，则执行循环体的代码块，否则，退出循环。

在循环体内，`x = x + 1` 会让 x 不断增加，最终因为 `x < N` 不成立而退出循环。

如果没有这一个语句，while循环在判断 `x < N` 时总是为True，就会无限循环下去，变成死循环，所以要特别留意while循环的退出条件。

# break退出循环

用 for 循环或者 while 循环时，如果要在循环体内直接退出循环，可以使用 break 语句。

比如计算1至100的整数和，我们用while来实现：

```python
sum = 0
x = 1
while True:
    sum = sum + x
    x = x + 1
    if x > 100:
        break
print sum
```

## continue继续循环

在循环过程中，可以用break退出当前循环，还可以用continue跳过后续循环代码，继续下一次循环。

假设我们已经写好了利用for循环计算平均分的代码：

```python
L = [75, 98, 59, 81, 66, 43, 69, 85]
sum = 0.0
n = 0
for x in L:
    sum = sum + x
    n = n + 1
print sum / n
```

现在老师只想统计及格分数的平均分，就要把 x < 60 的分数剔除掉，这时，利用 continue，可以做到当 x < 60的时候，不继续执行循环体的后续代码，直接进入下一次循环：

```python
for x in L:
    if x < 60:
        continue
    sum = sum + x
    n = n + 1
```

## 多重循环

在循环内部，还可以嵌套循环，我们来看一个例子：

```python
for x in ['A', 'B', 'C']:
    for y in ['1', '2', '3']:
        print x + y
```

`x` 每循环一次，`y` 就会循环 3 次，这样，我们可以打印出一个全排列：

```python
A1
A2
A3
B1
B2
B3
C1
C2
C3
```

## 参考资料

笔记作者：Capricorncd

https://github.com/capricorncd

腾讯课堂：python零基础入门到精通

https://ke.qq.com/course/206902

原讲师：廖雪峰

https://www.imooc.com/learn/177
