# Object Oriented Programming

面向对象特性、java中的包

### 面向对象特性

三大特性：封装、继承、多态

### 封装

1、概念

> 将类的某些信息隐藏在类内部，不允许外部程序直接访问，而是通过该类提供的方法来实现对隐藏信息的操作和方法。

2、好处

> 只能通过规定的方法访问数据
> 隐藏类的实例细节，方便修改和实现

3、封装的实现步骤

![](img/oop-encapsulation.jpg)

```java
public class Hello {
    provite float screen;

    // getter
    public float getScreen() {
        return screen;
    }

    // setter
    public void setScreen(float newScreen) {
        screen = newScreen;
    }
}
```

### java中的包

1、作用

管理Java文件

解决同名文件冲突

2、包的定义：package 报名

注意：必须放在Java源程序的第一行，包名间可以使用`.`号隔开，eg: `com.test.HelloWorld`

```
// 例子：音乐类-MyClassMusic
// music
com.test.music.MyClassMusic
// movie
com.test.movie.MyClassMusic
```

3、系统中的包

`java.(功能).(类)`

```
java.lang.(类) 包含java语言基础的类
java.util.(类) 包含java语言中各种工具类
java.io.(类) 包含输入、输出相关功能的类
```

4、包的使用

可以通过`import`关键字，在某个文件使用其它文件中的类。

```
import com.test.music.MyClass
```

Java中，包的命名规范是全小写字母拼写

使用的时候不但可以加载某个包下面的所以文件

```
com.test.*
```

也可以加载某个具体包下的所以文件

```
com.test.music.*
```

### Java中的访问修饰符

```
class Telphone {
    private float screen = 5.0f;

    public float getScreen() {
        return screen;
    }
    publick void setScreen(float newScreen) {
        screen = newScreen;
    }
    // ...
}
```

访问修饰符--可以修饰属性和方法的访问范围。

|访问修饰符|本类|同包|子类|其他|
|:--|:--:|:--:|:--:|:--:|
|private|o|-|-|-|-|
|默认|o|o|-|-|
|protected|o|o|o|-|
|public|o|o|o|o|

### Java中的this关键字

1、this关键字代表当前对象

```
this.属性 操作当前对象的属性
this.方法 调用当前对象的方法
```

2、封装对象的属性的时候，经常会使用this关键字

```
# Eclipse编辑器自动生成getter/setter
菜单栏 -> source -> Generate Getters and Setters ...
# 指定需要生成getter或setter方法的属性
```

```
class Telphone {
    private float screen = 5.0f;

    public float getScreen() {
        return screen;
    }
    publick void setScreen(float screen) {
        this.screen = screen;
    }
    // ...
}
```
