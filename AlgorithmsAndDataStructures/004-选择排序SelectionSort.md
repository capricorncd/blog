# 选择排序 Selection Sort

**选择排序**（Selection sort）是一种简单直观的排序算法。它的工作原理是每一次从待排序的数据元素中选出最小（或最大）的一个元素，存放在序列的起始位置，直到全部待排序的数据元素排完。选择排序是不稳定的排序方法（比如序列[5, 5, 3]第一次就将第一个[5]与[3]交换，导致第一个5挪动到第二个5后面）。

## O(n^2)的排序算法

#### # 为什么要学习O(n^2)的排序算法？

* 基础

* 编码简单，易于实现，是一些简单情景的首选

* 在一些特殊情况下，简单的排序算法更有效

* 简单的排序算法思想衍生出复杂的排序算法

* 作为子过程，改进更复杂的排序算法

## 选择排序思路

![选择排序 Selection Sort](img/003/selection-sort.png)

实例

main.cpp

```c++
#include <iostream>

// 低版本需要引入swap所在库algorithm
// #include <algorithm>
// 高版本C++，swap在std命名空间中
using namespace std;

// 只能对int型数组进行排序
void selectionSort(int arr[], int n) {
  for (int i = 0; i < n; i++) {
    // 寻找[i, n)前闭后开区间里的最小值
    int minIndex = i;
    for (int j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex])
        minIndex = j;
    }
    // 交换索引为i, minIndex元素位置
    swap(arr[i], arr[minIndex]);
  }
}

// test
int main() {
  // 定义数组
  int a[10] = {10, 9, 8, 7, 6, 5, 4, 3, 2, 1};
  // 排序
  selectionSort(a, 10);
  // 打印
  for (int i = 0; i < 10; i++)
    // 打印排序后数组的每一个元素
    cout<<a[i]<< " ";
  // 打印一个回车endl
  cout<<endl;
  return 0;
}
```

结果

```
1 2 3 4 5 6 7 8 9 10
```

## 使用模板（泛型）编写算法

main.cpp

```c++
#include <iostream>

using namespace std;

template<typename T>

void selectionSort(T arr[], int n) {
  for (int i = 0; i < n; i++) {
    int minIndex = i;
    for (int j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex])
        minIndex = j;
    }
    swap(arr[i], arr[minIndex]);
  }
}

// test
int main() {
  // 浮点数
  float b[4] = {4.4, 3.3, 2.2, 1.1};
  selectionSort(b, 4);
  for (int i = 0; i < 4; i++)
    cout<<b[i]<< " ";
  cout<<endl;

  // string
  string c[4] = {"D", "C", "B", "A"};
  selectionSort(c, 4);
  for (int i = 0; i < 4; i++)
    cout<<c[i]<< " ";
  cout<<endl;

  return 0;
}
```
结果
```
1.1 2.2 3.3 4.4
A B C D
```

#### 自定义类型

Student.h

```c++
// IDE自动生成的宏定义
#ifndef SELECTIONSORT_STUDENT_H
#define SELECTIONSORT_STUDENT_H

using namespace std;

// 定义Student结构体
struct Student {
  string name;
  int score;
  // 小于号重载
  bool operator<(const Strudent &otherStudent) {
    return score < otherStrudent.score;
  }

  friend ostream& operator<<(ostream &os, Student &student) {
    os<<"Student: "<<student.name<<" "<<student.score<<endl;
    return os;
  }
};

#endif // SELECTIONSORT_STUDENT_H
```

测试Student

```c++

```

