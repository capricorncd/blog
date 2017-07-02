# 栈 / Stack[stæk]

**栈（stack）**又名堆栈，它是一种运算受限的线性表。其限制是仅允许在表的一端进行插入和删除运算。这一端被称为**栈顶**，相对地，把另一端称为**栈底**。向一个栈插入新元素又称作**进栈、入栈或压栈**，它是把新元素放到栈顶元素的上面，使之成为新的栈顶元素；从一个栈删除元素又称作**出栈或退栈**，它是把栈顶元素删除掉，使其相邻的元素成为新的栈顶元素。

栈机制，**后进先出 LIFO(Last In First Out)**。

栈要素：**栈顶、栈底**

### 栈实现

demo.cpp

```c++
#include <iostream>
#include "stdlib.h"
#include "MyStack.h"
using namespace std;

/******************************************/
/*
 栈类(需求)
 MyStack(int size); // 分配内存初始化栈空间，设定栈容量size，栈顶
 ~MyStack(); // 回收栈空间内存
 bool stackEmpty(); // 判断栈是否为空，为空返回true，非空返回false
 bool stackFull(); // 判断栈是否已满，为满返回true，否则返回false
 void clearStack(); // 清空栈
 int stackLength(); // 已有元素的个数
 void push(char elem); // 元素入栈，栈顶上升
 char pop(char &elem); // 元素出栈，栈顶下降
 void stackTraverse(); // 遍历栈内所有元素
 
 目的：掌握栈实现原理和运行机制
 */
/******************************************/

int main(viod)
{
	// 实例化对象
	MyStack *pStack = new MyStack(5);
	
	/**
	 * 测试
	 */
	
	// 入栈：往栈内添加元素
	pStack->push('a'); // 底
	pStack->push('e');
	pStack->push('l');
	pStack->push('l');
	pStack->push('p'); // 顶
	
	// 遍历栈元素
	pStack->stackTraverse(true);
	
	// 出栈：取出元素
	char elem = 0;
	pStack->pop(elem);
	
	cout << endl;
	cout << elem << endl;
	
	// 输出栈内元素个数
	cout << pStack->stackLength() << endl;
	
	// 是否为空
	if (pStack->stackEmpty())
	{
		cout << "栈为空" << endl;
	}
	// 是否已满
	if (pStack->stackFull())
	{
		cout << "栈已满" << endl;
	}
	
	
	
	// 销毁实例化对象
	delete pStack;
	pStack = NULL;
	
	system("pause");
	return 0;
}

```


MyStack.h

```c++
#ifndef MYSTACK_H
#define MYSTACK_H

class MyStack
{
	public:
		MyStack(int size); // 分配内存初始化栈空间，设定栈容量size，栈顶
		~MyStack(); // 回收栈空间内存
		bool stackEmpty(); // 判断栈是否为空，为空返回true，非空返回false
		bool stackFull(); // 判断栈是否已满，为满返回true，否则返回false
		void clearStack(); // 清空栈
		int stackLength(); // 已有元素的个数
		bool push(char elem); // 元素入栈，栈顶上升
		bool pop(char &elem); // 元素出栈，栈顶下降
		void stackTraverse(bool isFromBottom); // 遍历栈内所有元素
		
	private:
		char *m_pBuffer; // 栈空间指针
		int m_iSize; // 栈容量
		int m_iTop; // 栈顶，栈中元素个数
};
```

MyStack.cpp

```c++
#include <iostream> // 声明cout，否则执行会报错
#include "MyStack.h"
using namespace std;

// 构造函数 constructor
// 分配内存初始化栈空间，设定栈容量size，栈顶
MyStack::MyStack(int size)
{
	m_iSize = size;
	m_pBuffer = new char[size];
	m_iTop = 0;
} 

// 析构函数 destructor
// 回收栈空间内存
MyStack::~MyStack()
{
	delete []m_pBuffer;
}

// 判断栈是否为空，为空返回true，非空返回false
bool MyStack::stackEmpty()
{
	if (0 == m_iTop) // m_iTop == 0
	{ 
		return true;
	}
	return false;
	// return 0 == m_iTop ? true : false;
}
		
// 判断栈是否已满，为满返回true，否则返回false
bool MyStack::stackFull()
{
	if (m_iTop == m_iSize) // m_iTop >= m_iSize
	{ 
		return true;
	}
	return false;
	// return m_iTop == m_iSize ? true : false;
} 

// 清空栈
void MyStack::clearStack()
{
	m_iTop = 0;
}
		
// 已有元素的个数
int MyStack::stackLength()
{
	return m_iTop;
} 

// 元素入栈，栈顶上升
bool MyStack::push(char elem)
{
	// 站未满才可以入栈
	if (stackFull()) 
	{
		return false;
	}
	
	m_pBuffer[m_iTop] = elem;
	m_iTop++; // 此时m_iTop指向一个空位置
	return true;
}


// 元素出栈，栈顶下降
/*
char MyStack::pop()
{
	if (stackEmpty())
	{
		throw 1; // 抛出异常
	}
	else
	{
		m_iTop--;
		return m_pBuffer[m_iTop];
	}
}
*/
bool MyStack::pop(char &elem)
{
	if (stackEmpty()) 
	{
		return false;
	}
	m_iTop--;
	elem = m_pBuffer[m_iTop];
	return true;
}

// 遍历栈内所有元素
void MyStack::stackTraverse(bool isFromBottom)
{
	if (isFromBottom)
	{
		for (int i = 0; i < m_iTop; i++)
		{
			cout << m_pBuffer[i] << ",";
		}
	}
	else
	{
		for (int i = m_iTop - 1; i >= 0; i--)
		{
			cout << m_pBuffer[i] << ",";
		}
	}
}

```

### 进制转换

* 十进制2015转二进制、八进制、十六进制

```
// div 求商
// mod 求模(余)
N = (N div d) \* d + N mod d
```

### 括号匹配检验

* 检验一个字符串中各种括号是否匹配

```
[()] [()()] [()[()]]
```

### 注释

#### 1. 析构函数(destructor)

**析构函数(destructor)** 与构造函数相反，当对象结束其生命周期时（例如对象所在的函数已调用完毕），系统自动执行析构函数。析构函数往往用来做“清理善后” 的工作（例如在建立对象时用new开辟了一片内存空间，delete会自动调用析构函数后释放内存）。

以C++语言为例： 析构函数名也应与类名相同，只是在函数名前面加一个位取反符~，例如~stud( )，以区别于构造函数。它不能带任何参数，也没有返回值（包括void类型）。只能有一个析构函数，不能重载。如果用户没有编写析构函数，编译系统会自动生成一个缺省的析构函数（即使自定义了析构函数，编译器也总是会为我们合成一个析构函数，并且如果自定义了析构函数，编译器在执行时会先调用自定义的析构函数再调用合成的析构函数），它也不进行任何操作。所以许多简单的类中没有用显示的析构函数。

#### 2. C++指针

**指针**是一个特殊的变量，它里面存储的数值被解释成为内存里的一个地址。要搞清一个指针需要搞清指针的四方面的内容：指针的类型，指针所指向的类型，指针的值或者叫指针所指向的内存区，还有指针本身所占据的内存区。让我们分别说明。 

**指针的类型** 从语法的角度看，你只要把指针声明语句里的指针名字去掉，剩下的部分就是这个指针的类型。这是指针本身所具有的类型。让我们看看例一中各个指针的类型：  

```c++
int *ptr; //指针的类型是int *  
char *ptr; //指针的类型是char *  
int **ptr; //指针的类型是 int **  
int (*ptr)[3]; //指针的类型是 int(*)[3]  
int *(*ptr)[4]; //指针的类型是 int *(*)[4]
```

**指针的值**是指针本身存储的数值，这个值将被编译器当作一个地址，而不是一个一般的数值。在32位程序里，所有类型的指针的值都是一个32位整数，因为32位程序里内存地址全都是32位长。 

指针所指向的内存区就是从指针的值所代表的那个内存地址开始，长度为sizeof(指针所指向的类型)的一片内存区。以后，我们说一个指针的值是XX，就相当于说该指针指向了以XX为首地址的一片内存区域；我们说一个指针指向了某块内存区域，就相当于说该指针的值是这块内存区域的首地址。 

指针所指向的内存区和指针所指向的类型是两个完全不同的概念。在例一中，指针所指向的类型已经有了，但由于指针还未初始化，所以它所指向的内存区是不存在的，或者说是无意义的。 

以后，每遇到一个指针，都应该问问：这个指针的类型是什么？指针指向的类型是什么？该指针指向了哪里？  

**指针本身所占据的内存区**

指针本身占了多大的内存？你只要用函数sizeof(指针的类型)测一下就知道了。在32位平台里，指针本身占据了4个字节的长度。

指针本身占据的内存这个概念在判断一个指针表达式是否是左值时很有用。 　

**指针的算术运算**

指针可以加上或减去一个整数。指针的这种运算的意义和通常的数值的加减运算的意义是不一样的。例如： 

```c++
char a[20];
int *ptr = a;  
// ...  
// ...  
ptr++; 
```
 
更多阅读: [http://www.cnblogs.com/ggjucheng/archive/2011/12/13/2286391.html](http://www.cnblogs.com/ggjucheng/archive/2011/12/13/2286391.html, "_blank")
