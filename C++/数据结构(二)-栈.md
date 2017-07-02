# 栈 / Stack[stæk]

**栈**在计算机中是一种机制。**后进先出 LIFO**：Last In First Out

栈要素：**栈顶、栈底**

### 进制转换

* 十进制2015转二进制、八进制、十六进制

```
N = (N div d) \* d + N mod d
```

### 括号匹配检验

* 检验一个字符串中各种括号是否匹配

```
[()] [()()] [()[()]]
```

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

