#ifndef SELECTIONSORT_STUDENT_H
#define SELECTIONSORT_STUDENT_H

#include <iostream>
#include <ctime>
#include <cassert>

using namespace std;

namespace SortTestHelper {
  // 生成有n个元素的随机数数组，每个元素的随机范围为[rangeL, rangeR]
  int* generateRandomArray(int n, int rangeL, int rangeR) {

    assert(rangeL <= rangeR); // 依赖cassert库

    int *arr = new int[n];
    srand(time(NULL)); // 依赖ctime库
    for (int i = 0; i < n; i++)
      arr[i] = rand() % (rangeR - rangeL + 1) + rangeL;
    return arr;
  }

  // 生成一个几乎有序的数组
  int *generateNearlyOrderedArray(int n, int swapTimes) {
    int *arr = new int[n];
    for (int i = 0; i < n; i++) {
      arr[i] = i;
    }

    // 随机打乱部分顺序
    srand(time(NULL));
    for (int i = 0; i < swapTimes; i++) {
      int posx = rand() % n;
      int posy = rand() % n;
      swap(arr[posx], arr[posy]);
    }

    return arr;
  }

  // 提取打印，封装成方法
  template<typename T>
  void printArray(T arr[], int n) {
    for (int i = 0; i < n; i++)
      cout << arr[i];
    cout << endl;
    return;
  }

  // 测试排序算法的性能
  template<typename T>
  void testSort (string sortName, void(*sort)(T[], int), T arr[], int n) {
    clock_t startTime = clock(); // 依赖ctime库
    sort(arr, n);
    clock_t endTime = clock();

    cout << sortName << " : " << double(endTime - startTime) / CLOCKS_PER_SEC << " s" << endl;
    // CLOCKS_PER_SEC: 时钟周期
    // endTime - startTime: 之间有多少个时钟周期
    return;
  }

  // 复制一个整型数组
  int* copyIntArray(int a[], int n) {
  	int* arr = new int[n];
  	copy(a, a+n, arr);
  	return arr;
  }
};

#endif // SELECTIONSORT_STUDENT_H
