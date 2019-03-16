package com.array;

import java.util.Arrays;

/*
 * 创建指定长度的 int 型数组，
 * 并生成 100 以内随机数为数组中的每个元素赋值，
 * 然后输出数组
 */
//public class Test {
//    public static void main(String[] args) {
//    	Test ts = new Test();
//    	// create array
//    	int[] arr = ts.createArray(8);
//    	
//    	System.out.println(Arrays.toString(arr));
//    }
//    
//    public int[] createArray(int length) {
//    	int[] arr = new int[length];
//    	for (int i = 0; i < length; i++) {
//    		arr[i] = (int)(Math.random() * 100);
//    	}
//    	return arr;
//    }
//}

/*
 * 实现输出考试成绩的前三名
 * 1、 考试成绩已保存在数组 scores 中，数组元素依次为 89 , -23 , 64 , 91 , 119 , 52 , 73
 * 2、 要求通过自定义方法来实现成绩排名并输出操作，将成绩数组作为参数传入
 * 3、 要求判断成绩的有效性（ 0—100 ），如果成绩无效，则忽略此成绩
 */
public class Test {
    public static void main(String[] args) {
    	Test ts = new Test();
    	// create array
    	int[] scores = new int[]{89 , -23 , 64 , 91 , 119 , 52 , 73};
    	scores = ts.sort(scores);
    	// 输出0—100有效前3名成绩
    	int count = 0;
    	for (int i = 0; i < scores.length; i ++) {
    		if (count >= 3) break;
    		if (scores[i] >= 0 && scores[i] <= 100) {
    			System.out.println(scores[i]);
    			count++;
    		}
    	}
    }
    
    /*
     * 从大到小排序
     */
    public int[] sort(int[] arr) {
    	int temp;
    	for (int i = 0; i < arr.length; i++) {
    		for (int j = i; j < arr.length; j++) {
    			if (arr[j] > arr[i]) {
    				temp = arr[i];
    				arr[i] = arr[j];
    				arr[j] = temp;
    			}
    		}
    	}
    	return arr;
    }
}