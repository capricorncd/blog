# 类和对象

面向对象

1. 对象的概念

2. 什么是面向对象

3. 类

4. 什么是对象的属性

5. 什么是对象的方法

6. 类与对象的关系/区别

* 对象的概念

万物皆对象，客观存在的事物皆为对象。

* 什么是面向对象

人 -》关注 =》 事物信息

* 类

类是模子，确定对象将会拥有的特征（属性）和行为（方法）。

类的特点：类是对象的类型，具有相同属性和方法的一组对象的集合。

* 什么是对象的属性

属性：对象具有的各种特征，每个对象的每个属性都拥有特定值。

* 什么是对象的方法

方法：对象执行的操作。

* 类与对象的关系/区别

类是抽象的概念，仅仅是模板，不如说"手机"；

对象是一个你能够看得到，摸得着的具体实体。

|"手机"类|对象|
|:--|:--|
|特征（属性）屏幕/CPU/内存|华为, 小米...|
|行为（方法）打电话/发短信|华为, 小米...|

### 类的定义

类的重要性：所以Java程序都以类class为组织单元。

类的组成：属性和方法。

定义一个类的步骤：

```
定义类名，编写类的属性，编写类的方法
```

语法

```
public class 类名 {
    // 定义属性部分（成员变量）
    类型 属性1;
    类型 属性2;
    ...
    类型 属性n;

    // 定义方法部分
    方法1;
    方法2;
    ...
    方法n;
}
```

例子

```java
// Telphone.java
package com.phone;

// 1. 定义一个类Telphone
public class Telphone {
    // 2. 属性（成员变量）
    float screenSize;
    float cpu;
    float memory;

    // 3. 方法 干什么
    vodi call() {
      System.out.println("Telphone有打电话的功能");
    }

    vodi sendMessage() {
        System.out.println("Telphone有发短信的功能");
    }
}
```

### 使用对象

使用对象的步骤：

1 创建对象

```
类名 对象名 = new 类名();
```

```java
Telphone phone = new Telphone();
```

2 使用对象

```
引用对象的属性：对象名.属性
```

```
// 给screenSize属性赋值5
phone.screenSize = 5;
```

```
引用对象的方法：对象名.方法名()
```

```
// 调用sendMessage()方法
phone.sendMessage();
```

完整例子：

com.test/Telphone.java

```java
package com.test;

public class Telphone {
	float screenSize;
	float cpu;
	float memory;

	void call() {
		System.out.println("call");
	}

	void sendMessage() {
		System.out.println("screenSize: " + screenSize + ", cup: " + cpu + ", memory: " + memory);
	}
}
```

com.test/useTelphone.java


```
package com.test;

public class useTelphone {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Telphone phone = new Telphone();
		phone.sendMessage();
		// 赋值
		phone.screenSize = 5.4f;
		phone.cpu = 1.4f;
		phone.memory = 4.0f;
		phone.sendMessage();
	}
}
```

### 成员变量和局部变量

1 成员变量：在`类`中定义，用了描述对象将要有什么。

2 局部变量：在类的`方法`中定义，在方法中临时保存数据。

![成员变量和局部变量](img/global-local-varibable.png)

区别

||成员变量|局部变量|
|:--|:--|:--|
|作用域|在整个类内部都是可见的|仅限于定义它的方法中|
|初始值|Java会给成员变量一个初始值，调用时可以不赋值|不会赋初始值，调用前必须赋值|

同一个方法中，不允许有同名局部变量。

两类变量同名时，局部变量具有更高的优先级（就近原则）。

### 构造方法

使用`new 构造方法` 创建一个新的对象。
构造方法是定义在Java类中的一个用来初始化对象的方法，构造方法与类同名且没有返回值。

### 原课程地址

[Java入门第二季](https://www.imooc.com/learn/124)
