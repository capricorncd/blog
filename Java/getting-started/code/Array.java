package com.array;
import java.util.Arrays;
/*
public class Array {
	public static void main(String[] args) {
		// right:
		int score[] = new int[]{45, 56, 76, 23};
		// error: 
		// Cannot define dimension expressions
		// when an array initializer is provided
//		int score[] = new int[4]{45, 56, 76, 23};
		// error:
		// Variable must provide either dimension expressions
		// or an array initializer
//		int[ ] score = new int[ ];
		System.out.println(score[4]);
	}
}
*/
/*
public class Array {
    public static void main(String[] args) {
		// 定义一个整型数组，并赋初值
		int[] nums = new int[] { 61, 23, 4, 74, 13, 148, 20 };
		int max = nums[0]; // 假定最大值为数组中的第一个元素
		int min = nums[0]; // 假定最小值为数组中的第一个元素
		double sum = 0;// 累加值
		double avg = 0;// 平均值
		for (int i = 0; i < nums.length; i++) { // 循环遍历数组中的元素
	        // 如果当前值大于max，则替换max的值
			if (i > 0 && nums[i] > max) {
				max = nums[i];
			}
	        // 如果当前值小于min，则替换min的值
			if (i > 0 && nums[i] < min) {
				min = nums[i];
			}
	        // 累加求和
			sum += nums[i];
		}
        // 求平均值
		avg = sum / nums.length;
		System.out.println("数组中的最大值：" + max);
		System.out.println("数组中的最小值：" + min);
		System.out.println("数组中的平均值：" + avg);
	}
}
*/

public class Array {
    public static void main(String[] args) {
		// 定义一个整型数组，并赋初值
		int[] nums = new int[] { 61, 23, 4, 74, 13, 148, 20 };
		Arrays.sort(nums);
		System.out.println("排序后的首尾数为：" + nums[0] + ", " + nums[nums.length - 1]);
		System.out.println("toString: " + Arrays.toString(nums));
		for (int i : nums) {
			System.out.println("print by foreach: " + i);
		}
	}
}