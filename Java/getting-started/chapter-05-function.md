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
public class Func {
    // 定义print方法
    public void print(String str) {
        System.out.println(str);
    }

    public static void main(String[] args) {
        // 创建Func对象
        Func f = new Func();
        // 调用print方法
        f.print("Hello world");
    }
}
```

无参带返回值方法的使用

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

带参无返回值方法的使用

```
public int sum(int a, int b) {
  System.out.println(a + b);
}
```

1. 调用带参方法时，必须保证实参的数量、类型、顺序与形参一一对应

2. 调用方法时，实参不需要指定数据类型

3. 方法的参数可以是基本数据类型，如 int、double 等，也可以是引用数据类型，如 String、数组等

4. 当方法参数有多个时，多个参数间以逗号分隔。
