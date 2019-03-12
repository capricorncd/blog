# 流程控制语句

### if, if else

```
if (BooleanConditionalExpression) {
  // do something
} else {
  // do something
}

if (BooleanConditionalExpression1) {
  // do something
} else if (BooleanConditionalExpression2) {
  // do something
} else {
  // do something
}
```

### switch

```
switch (Expression) {
  case Value1:
    // do something
    break;
  case Value1:
    // do something
    break;
  default:
    // do something
}
```

### while

```java
int i = 1;
while (i <= 10) {
  System.out.println(i);
  i++;
}

int j = 2;
int sum = 0;
do {
  sum += j;
  j += 2;
  System.out.println(sum);
} while (j <= 50);
```

### for

```
for (循环变量初始化; 循环条件; 循环变量变化) {
  // 循环操作
}
```

执行过程：

1. 执行循环变量初始化部分，设置循环的初始状态，此部分在整个循环中只执行一次

2. 进行循环条件的判断，如果条件为 true ，则执行循环体内代码；如果为 false ，则直接退出循环

3. 执行循环变量变化部分，改变循环变量的值，以便进行下一次条件判断

4. 依次重新执行< 2 >、< 3 >、< 4 >，直到退出循环

特点：相比 while 和 do...while 语句结构更加简洁易读

注意：

1. for 关键字后面括号中的三个表达式必须用 “;” 隔开，三个表达式都可以省略，但 “;” 不能省略。

    a. 省略“循环变量初始化”，可以在 for 语句之前由赋值语句进行变量初始化操作，如:

    ```
    int i = 0;
    for (; i < 10; i++) {
      // do something
    }
    ```

    b. 省略“循环条件”，可能会造成循环将一直执行下去，也就是我们常说的“死循环”现象，如:

    ```
    for (int i = 0; ; i++) {
      // do something
    }
    ```

    在编程过程中要避免“死循环”的出现，因此，对于上面的代码可以在循环体中使用 break 强制跳出循环。

    c. 省略“循环变量变化”，可以在循环体中进行循环变量的变化，如：

    ```
    for (int i = 0; i < 5; ) {
      // do something
      i++;
    }
    ```

2. for 循环变量初始化和循环变量变化部分，可以是使用 “,” 同时初始化或改变多个循环变量的值，如：

    ```
    for (int i = 1, j = 5; i < 5; i++, j--) {
      // do something
    }
    ```

    代码中，初始化变量部分同时对两个变量 i 和 j 赋初值，循环变量变化部分也同时对两个变量进行变化。


3. 循环条件部分可以使用逻辑运算符组合的表达式，表示复杂判断条件，但一定注意运算的优先级，如：

    ```
    for (int i = 1; i < 10 && i != 5; i++) {
      // do something
    }
    ```

    代码中，必须同时满足变量 i 小于 10 ，并且 i 不等于 5 时才会进行循环，输出变量 i 的值。

### break

```
for (int i = 0; i < 10; i++) {
  if (i == 5) {
    break;
  }
  System.out.println(i);
}
// result: 0 1 2 3 4
```

### continue

```
for (int i = 0; i < 10; i++) {
  if (i == 5) {
    continue;
  }
  System.out.println(i);
}
// result: 0 1 2 3 4 6 7 8 9
```

### 编程题

```
/*
 * 为指定成绩加分，直到分数大于等于 60 为止，
 * 输出加分前和加分后的成绩，并统计加分的次数
 */
```

见code/test1

```
/*
 * 求3个班级，各4名学生的平均成绩
 */
```

见code/test2


