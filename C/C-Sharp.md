# C# 基础入门

C#是微软公司发布的一种面向对象的、运行于.NET Framework和.NET Core(完全开源，跨平台)之上的高级程序设计语言。并定于在微软职业开发者论坛(PDC)上登台亮相。C#是微软公司研究员Anders Hejlsberg的最新成果。C#看起来与Java有着惊人的相似；它包括了诸如单一继承、接口、与Java几乎同样的语法和编译成中间代码再运行的过程。但是C#与Java有着明显的不同，它借鉴了Delphi的一个特点，与COM（组件对象模型）是直接集成的，而且它是微软公司 .NET windows网络框架的主角。

更多：https://baike.baidu.com/item/c%23

```
C# 读作C Sharp
```

Visual Studio 2013 控制台程序代码示例:

```c-sharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApplication//命名空间
{
    class Program//类
    {
        static void Main(string[] args)//Main方法，程序入口
        {
            Console.WriteLine("Hello World!");// 输出并换行
        }
    }
}
```

注意：代码中的`Console.WriteLine()`与`Console.Write()`区别，后者不换行，而前者会在打印之后换行。

### 快捷键

F5：代码调试，会自动关闭控制台
Ctrl+F5：运行，不自动关闭控制台
F9：添加或删除断点
F10：断点执行

### 关键字

关键字 `class` ，这个关键字的用途是声明类。比如上面例子中，类名叫做Program。

关键字 `namespace` ，这个关键字的用途是声明“命名空间”。比如上面例子中，命名空间叫做MyApp1。

关键字 `using` ，这个关键字的用途是导入命名空间。比如这句：`using System.Text;` 作用是导入System.Text命名空间中的类。

关键字 `static` (静态的)、 `void` (无返回值)、 `string` (字符串类型)。常常在Main()方法的声明中看到:static void Main(string[] args)

Main() 方法是 `C#` 中的特殊方法，是程序的入口，就是说，如果没有 `Main ()`方法，程序就无法启动。

**注意：你会发现，所有关键字都是由小写字母组成的，C#语言中，大小写是严格区分的。**

### 注释

**单行注释**的符号是2条斜线（请注意斜线的方向），2条斜线右侧的内容就是注释，左侧的代码不会受影响。

**多行注释**以`/*`开始，以`*/`结束，之间的内容就是注释，可以包含多行。

**文档注释**写在类、方法或属性（以后会学到）的前面，它的符号是3条斜线`///`。

### 常量

使用关键字 `const` 定义。

```c-sharp
const double PI = 3.1415926;
```

### 变量

```c-sharp
int number = 100;
double price = 99.99;
char gender = '男';
string name = "Jack";
bool isJack = true;

// 自动类型转换
// 低精度类型会自动转换为较高精度的类型
3.5 + 8 = 11.5

// 强制类型转换
// 无法自动转换为我们需要的类型，可以用强制类型转换
// double 型强制转换为int型将失去小数部分
int n = (int)9.5;// 9
```

### 标识符命名规则

程序中的变量名、常量名、类名、方法名，都叫做标识符。

标识符只能由**英文字母、数字和下划线**组成，不能包含空格和其他字符。

错误的标识符声明：

```c-sharp
string $user; //错在使用了其他字符
```

变量名不能用数字开头。

```c-sharp
double 6h;//错在用数字开头
```

不能用关键字当变量名。

```c-sharp
char static ;//错在用关键字static做变量名
```

### 运算符

算术运算符

```c-sharp
9 + 2.5; // 11.5
9 + "2.5"; // 92.5
15 - 20; // -5
0.8 * 3; // 2.4
2 / 0.5; // 4.0
5 / 10; // 0
19 / 5; // 3
19 % 5; // 4

int i = 0;
i++; // 0
int j = 0;
++j; // 1
```

比较运算符

```c-sharp
int a = 1;
int b = 1;

a == b; // True
a != b; // False
a > b; // False
a < b; // False
a >= b; // True
a <= b; // True
```

逻辑运算符

```c-sharp
int x = 1;
int y = 2;
// 逻辑非
!(x > 0); // False
// 逻辑与
x > 0 && y > 0; // True
// 逻辑或
x > 3 || y > 3; // False
x == 1 || y == 1; // True
```

赋值运算符

```c-sharp
int x = 2;
x += 3; // 5

int y = 2;
y -= 3; // -1

int z = 2;
z *= 3; // 6

int i = 2;
i /= 2; // 1

int j = 2;
j %= 2; // 0
```

### 条件

if

```c-sharp
if () {
  // do something
} else {
  // do something
}
```

条件运算符

```
条件 ? 表达式 : 表达式
```

switch

```
switch(变量)
{
  case 1:
    // do something
    break;
  case 2:
    // do something
    break;
  case n:
    // do something
    break;
  default:
    // do ...
}
```

### 循环

while

```
while (条件) {}

do {} while(条件)
```

for

```c-sharp
for (int i = 0; i < 10; i++) {
  if (i == 5) continue;
  if (i >= 8) break;
  COnsole.Write(i + " ");
}
// 0 1 2 3 4 6 7
```

### 数组

一维数组

```c-sharp
int[] arr = new int[3];
arr[0] = 1;
arr[1] = 2;
arr[2] = 52;

int[] arr2 = new int[3]{ 1, 2, 3 };

int[] arr3 = new int[]{ 1, 2, 3 };
arr3.Length; // 3

int[] num = { 12, 54, 7, 65 };
foreach (int i in num)
{
    Console.WriteLine(i);
}
```

二维数组

```c-sharp
int[,] arr = new int[,]{{1, 3, 5}, {6, 7, 9}}; 
```

### 示例

```c-sharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApplication2
{
    class Program
    {
        static void findMaxScore()
        {
            string[] names = new string[] { "武松", "钱冬雨", "浮沉", "陈璐", "周鑫", "林日鹏", "何坤", "关欣" };
            int[] scores = new int[] { 89, 90, 98, 56, 60, 91, 93, 85 };
            int max = scores[0];
            int index = 0;
            for (int i = 1; i < scores.Length; i++)
            {
                if (scores[i] > max)
                {
                    max = scores[i];
                    index = i;
                }
            }
            Console.WriteLine("考试最好成绩是: {0} {1}分。", names[index], max);
        }
        static void Main(string[] args)
        {
            // 查找最大值
            findMaxScore();

            // 数组
            int[] num = { 12, 54, 7, 65 };
            foreach (int i in num)
            {
                Console.WriteLine(i);
            }
            
            // 获取用户输入
            string name;
            Console.WriteLine("please, enter your name.");
            name = Console.ReadLine();
            Console.WriteLine("Hello {0}", name);
        }
    }
}
```