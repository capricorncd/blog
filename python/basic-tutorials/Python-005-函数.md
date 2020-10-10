# 函数

我们知道圆的面积计算公式为：
```
S = πr²
```
当我们知道半径r的值时，就可以根据公式计算出面积。假设我们需要计算3个不同大小的圆的面积：
```
r1 = 12.34
r2 = 9.08
r3 = 73.1
s1 = 3.14 * r1 * r1
s2 = 3.14 * r2 * r2
s3 = 3.14 * r3 * r3
```
当代码出现有规律的重复的时候，你就需要当心了，每次写3.14 * x * x不仅很麻烦，而且，如果要把3.14改成3.14159265359的时候，得全部替换。

有了函数，我们就不再每次写s = 3.14 * x * x，而是写成更有意义的函数调用 s = area_of_circle(x)，而函数 area_of_circle 本身只需要写一次，就可以多次调用。

抽象是数学中非常常见的概念。举个例子：

计算数列的和，比如：1 + 2 + 3 + ... + 100，写起来十分不方便，于是数学家发明了求和符号∑，可以把1 + 2 + 3 + ... + 100记作：
```
100
∑n
n=1
```
这种抽象记法非常强大，因为我们看到∑就可以理解成求和，而不是还原成低级的加法运算。

而且，这种抽象记法是可扩展的，比如：
```
100
∑(n²+1)
n=1
```
还原成加法运算就变成了：
```
(1 x 1 + 1) + (2 x 2 + 1) + (3 x 3 + 1) + ... + (100 x 100 + 1)
```
可见，借助抽象，我们才能不关心底层的具体计算过程，而直接在更高的层次上思考问题。

写计算机程序也是一样，函数就是最基本的一种代码抽象的方式。

Python不但能非常灵活地定义函数，而且本身内置了很多有用的函数，可以直接调用。

## 调用python内置函数

要调用一个函数，需要知道函数的名称和参数，比如求绝对值的函数 abs，它接收一个参数。

#### abs 函数

```
>>> abs(100)
100
>>> abs(-20)
20
>>> abs(12.34)
12.34
```

调用函数的时候，如果传入的参数数量不对，会报TypeError的错误，并且Python会明确地告诉你：abs()有且仅有1个参数，但给出了两个：

```
>>> abs(1, 2)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: abs() takes exactly one argument (2 given)
```

如果传入的参数数量是对的，但参数类型不能被函数所接受，也会报TypeError的错误，并且给出错误信息：str是错误的参数类型：

```
>>> abs('a')
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: bad operand type for abs(): 'str'
```

#### cmp(x, y)

比较函数 cmp(x, y) 就需要两个参数，如果 x<y，返回 -1，如果 x==y，返回 0，如果 x>y，返回 1：

```
>>> cmp(1, 2)
-1
>>> cmp(2, 1)
1
>>> cmp(3, 3)
0
```

####  int()函数

把其他数据类型转换为整数：

```
>>> int('123')
123
>>> int(12.34)
12
```

#### str()函数

把其他类型转换成 str：

```
>>> str(123)
'123'
>>> str(1.23)
'1.23'
```

#### sum()

接受一个list作为参数，并返回list所有元素之和。请计算 `1*1 + 2*2 + 3*3 + ... + 100*100`。

```
L = []
n = 1
while n <= 100:
    L.append(n * n)
    n += 1
print sum(L)
# 338350
```

## 自定义函数

在Python中，定义一个函数要使用 `def` 语句，依次写出`函数名`、`括号`、`括号中的参数`和`冒号`:，然后，在缩进块中编写函数体，函数的返回值用 `return` 语句返回。

我们以自定义一个求绝对值的 my_abs 函数为例：

```
def my_abs(x):
    if x >= 0:
        return x
    else:
        return -x
```

**请注意**，函数体内部的语句在执行时，一旦执行到return时，函数就执行完毕，并将结果返回。因此，函数内部通过条件判断和循环可以实现非常复杂的逻辑。

如果没有return语句，函数执行完毕后也会返回结果，只是结果为 None。

return None可以简写为return。

#### 例子

请定义一个 square_of_sum 函数，它接受一个list，返回list中每个元素平方的和。

```
def square_of_sum(L):
    sum = 0
    for item in L:
        sum += item * item
    return sum

print square_of_sum([1, 2, 3, 4, 5])
print square_of_sum([-5, 0, 5, 15, 25])
```

## 函数返回多值

在游戏中经常需要从一个点移动到另一个点，给出坐标、位移和角度，就可以计算出新的坐标：

\# math包提供了`sin()`和 `cos()`函数，我们先用import引用它：

```
import math
def move(x, y, step, angle):
    nx = x + step * math.cos(angle)
    ny = y - step * math.sin(angle)
    return nx, ny
```

这样我们就可以同时获得返回值：

```
>>> x, y = move(100, 100, 60, math.pi / 6)
>>> print x, y
151.961524227 70.0
```

但其实这只是一种假象，Python函数返回的仍然是单一值：

```
>>> r = move(100, 100, 60, math.pi / 6)
>>> print r
(151.96152422706632, 70.0)
```

用print打印返回结果，原来返回值是一个tuple！

但是，在语法上，返回一个tuple可以省略括号，而多个变量可以同时接收一个tuple，按位置赋给对应的值，所以，Python的函数返回多值其实就是返回一个tuple，但写起来更方便。

#### 任务

一元二次方程的定义是：`ax² + bx + c = 0`

请编写一个函数，返回一元二次方程的两个解。

注意：Python的math包提供了sqrt()函数用于计算平方根。

```
import math

def quadratic_equation(a, b, c):
    sq = math.sqrt(b * b - 4 * a * c)
    x1 = (-b + sq) / (2 * a)
    x2 = (-b - sq) / (2 * a)
    return x1, x2

print quadratic_equation(2, 3, 0)
# (0.0, -1.5)
print quadratic_equation(1, -6, 5)
# (5.0, 1.0)
```

## 递归函数

一个函数在内部调用自身本身，这个函数就是**递归函数**。

举个例子，我们来计算阶乘 `n! = 1 * 2 * 3 * ... * n`，用函数 fact(n)表示，可以看出：

```
fact(n) = n! = 1 * 2 * 3 * ... * (n-1) * n = (n-1)! * n = fact(n-1) * n
```

所以，fact(n)可以表示为 n * fact(n-1)，只有n=1时需要特殊处理。

于是，fact(n)用递归的方式写出来就是：

```python
def fact(n):
    if n==1:
        return 1
    return n * fact(n - 1)
```

上面就是一个递归函数。可以试试：

```python
>>> fact(1)
1
>>> fact(5)
120
```

递归函数的优点是定义简单，逻辑清晰。理论上，所有的递归函数都可以写成循环的方式，但循环的逻辑不如递归清晰。

**使用递归函数需要注意防止栈溢出**。在计算机中，函数调用是通过栈（stack）这种数据结构实现的，每当进入一个函数调用，栈就会加一层栈帧，每当函数返回，栈就会减一层栈帧。由于栈的大小不是无限的，所以，递归调用的次数过多，会导致栈溢出。可以试试计算 fact(10000)。

## 参考资料

笔记作者：Capricorncd

https://github.com/capricorncd

python零基础入门到精通

https://ke.qq.com/course/206902

原讲师：廖雪峰

https://www.imooc.com/learn/177
