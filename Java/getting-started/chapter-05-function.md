# 方法

语法

```
访问修饰符 返回值类型 方法名(参数列表) {
  方法体
}
```

* 访问修饰符：方法允许被访问的权限范围，可以是 public、protected、private 甚至可以省略。其中 public 表示该方法可以被其他任何代码调用。

* 返回值类型：方法返回值的类型，如果方法不返回任何值，则为 void；如果有返回值，则需要指定返回值的类型，并且在方法体中使用 return 语句返回值。

* 方法名：定义的方法的名字，必须使用合法的标识符。

* 参数列表：传递给方法的参数列表，参数可以有多个，多个参数间以`逗号`隔开，每个参数由`参数类型`和`参数名`组成，以空格隔开。

根据方法是否带参、是否带返回值，可将方法分为四类:

```
Ø 无参无返回值方法

Ø 无参带返回值方法

Ø 带参无返回值方法

Ø 带参带返回值方法
```

```
public void print(String str) {
  System.out.println(str);
}
```

example

```java
// Func.java
public class Func {
    // 定义print方法
    public void print(String str) {
        System.out.println(str);
    }

    public static void main(String[] args) {
        // 创建Func对象
        Func fn = new Func();
        // 调用print方法
        fn.print("Hello world");
    }
}
```

无参带返回值方法:

```java
public int sum() {
  int a = 1;
  int b = 3;
  return a + b;
}
```

1. 如果方法的返回类型为 void ，则方法中不能使用 return 返回值！

2. 方法的返回值最多只能有一个，不能返回多个值。

3. 方法返回值的类型必须兼容，例如，如果返回值类型为 int ，则不能返回 String 型值。

带参无返回值方法:

```
public int sum(int a, int b) {
  System.out.println(a + b);
}
```

1. 调用带参方法时，必须保证实参的数量、类型、顺序与形参一一对应

2. 调用方法时，实参不需要指定数据类型

3. 方法的参数可以是基本数据类型，如 int、double 等，也可以是引用数据类型，如 String、数组等

4. 当方法参数有多个时，多个参数间以逗号分隔。

带参有返回值方法:

```
public int sum(int a, int b) {
  return a + b;
}
```

### Java 中方法的重载

什么是方法的重载呢？

> 如果同一个类中包含了两个或两个以上方法名相同、方法参数的个数、顺序或类型不同的方法，则称为方法的重载，也可称该方法被重载了。如下所示 4 个方法名称都为 show ，但方法的参数有所不同，因此都属于方法的重载：

```java
// 无参数方法
public void show() {
    System.out.println("not arguments");
}

// 重载show方法，一个字符串参数
public void show(String name) {
    System.out.println("argument name: " + name);
}

// 重载show方法，两个参数
public void show(String name, int age) {
    System.out.println(name + " is " + age + " years old");
}

// 重载show方法，两个参数顺序不同
public void show(int age, String name) {
    System.out.println("The " + age + "-year-old people is " + name + ".");
}
```

如何区分调用的是哪个重载方法呢？

> 当调用被重载的方法时， Java 会根据参数的个数和类型来判断应该调用哪个重载方法，参数完全匹配的方法将被执行。如：

```java
public static void main(String[] args) {
    Func fn = new Func();
    fn.show(); // 调用无参数的show方法
    fn.show("Juny"); // 调用带有一个参数的show方法
    fn.show("Juny", 15); // 调用带有字符串+整型参数的show方法
}
```

判断方法重载的依据：

> 1、 必须是在同一个类中

> 2、 方法名相同

> 3、 方法参数的个数、顺序或类型不同

> 4、 与方法的修饰符或返回值没有关系

Test.java

```java
package com.test;

import java.util.Arrays;

/*
 * 创建指定长度的 int 型数组，
 * 并生成 100 以内随机数为数组中的每个元素赋值，
 * 然后输出数组
 */
public class Test {
    public static void main(String[] args) {
        Test ts = new Test();
        // create array
        int[] arr = ts.createArray(8);

        System.out.println(Arrays.toString(arr));
    }

    public int[] createArray(int length) {
        int[] arr = new int[length];
        for (int i = 0; i < length; i++) {
            arr[i] = (int)(Math.random() * 100);
        }
        return arr;
    }
}
```


