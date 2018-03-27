# 插入排序 Insertion Sort

 插入排序是基于比较的排序。所谓的基于比较，就是通过比较数组中的元素，看谁大谁小，根据结果来调整元素的位置。

 ![插入排序 Insertion Sort](img/004/insert-sort-poker.jpg)

因此，对于这类排序，就有两种基本的操作：①比较操作； ②交换操作

其中，对于交换操作，可以优化成移动操作，即不直接进行两个元素的交换，还是用一个枢轴元素(tmp)将当前元素先保存起来，然后执行移动操作，待确定了最终位置后，再将当前元素放入合适的位置。（下面的插入排序就用到了这个技巧）--**因为，交换操作需要三次赋值，而移动操作只需要一次赋值**！

有些排序算法，比较次数比较多，而移动次数比较少，而有些则相反。比如，归并排序和快速排序，前者移动次数多，而后者比较次数多。


## 插入排序思路

![插入排序 Insertion Sort](img/004/insertion-sort.gif)

#### # 方法实现

```c++
#include <iostream>
#include <algorithm>
#include "SortTestHelper.h"
#include "SelectionSort.h"

using namespace std;

template<typename T>
void insertionSort(T arr[], int n) {
  for (int i = 1; i < n; i++) {
    // 寻找元素arr[i]合适的插入位置
    for (int j = i; j > 0; j--) {
      if (arr[j] < arr[j - 1]) {
        swap(arr[j], arr[j-1]);
      } else {
        // 相对于选择排序，插入排序可能不用遍历完内层循环，
        // 若有满足条件可以提前结束循环
        // 理论上所花时间要比选择排序小
        break;
      }
    }
  }
}
// 或者简写
void insertionSort(T arr[], int n) {
  for (int i = 1; i < n; i++) {
    // 寻找元素arr[i]合适的插入位置
    for (int j = i; j > 0 && arr[j] < arr[j - 1]; j--) {
      swap(arr[j], arr[j-1]);
    }
  }
}

int main () {
  int n = 10000;
  int *arr = SortTestHelper::generateRandomArray(n, 0, n);
  int *arr2 = SortTestHelper::copyIntArray(arr, n);

  SortTestHelper::testSort("Insertion Sort", insertionSort, arr, n);
  SortTestHelper::testSort("Selection Sort", selectionSort, arr, n);

  // 释放内存空间
  delete[] arr;
  delete[] arr2;

  return 0;
}
```

结果：

```
Insertion Sort : 0.323584 s
Selection Sort : 0.19882 s
```

#### # 存在问题：

内层循环每次都在赋值交换数组元素，非常耗性能！

#### # 代码优化

思路：内层循环每次不进行位置交换。先将当前内层循环元素拷贝一个副本，然后一一与前面元素对比，对比完成后再交换位置。

![插入排序优化Insetion Sort Optimize](img/004/insertion-sort-optimize.gif)

```c++
void insertionSort(T arr[], int n) {
  for (int i = 1; i < n; i++) {
    // 寻找元素arr[i]合适的插入位置
    T e = arr[i];
    // j 保存元素e应该插入的位置
    int j;
    for (j = i; j > 0 && arr[j - 1] > e; j--) {
      arr[j] = arr[j - 1];
    }
    arr[j] = e;
  }
}
```

测试结果：

```
Insertion Sort : 0.153531 s
Selection Sort : 0.199183 s
```

#### # 对几乎有序的数组排序

```c++
int main () {
  int n = 10000;
  int *arr = SortTestHelper::generateNearlyOrderedArray(n, 100);
  int *arr2 = SortTestHelper::copyIntArray(arr, n);

  SortTestHelper::testSort("Insertion Sort", insertionSort, arr, n);
  SortTestHelper::testSort("Selection Sort", selectionSort, arr, n);

  // 释放内存空间
  delete[] arr;
  delete[] arr2;

  return 0;
}
```

测试结果：

```
Insertion Sort : 0.004422 s
Selection Sort : 0.197512 s
```

#### # 结论

* 相对于选择排序，插入排序可能不用遍历完内层循环，有满足条件可以提前结束循环，理论上所花时间要比选择排序小。

* 对于近乎有序的数组，插入排序优势更为明显，即更省时间。

* 可以在更为复杂的算法/逻辑处理过程中，部分使用插入排序优化性能。

## 对比O(n^2)排序算法

* Selection Sort 选择排序

* Insertion Sort 插入排序

  Shell Sort 希尔排序，对插入排序的延伸。

* Bubble Sort 冒泡排序

## Remark

笔记作者： zx1984

主页：https://github.com/zx1984


