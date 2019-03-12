package com.test1;
import java.util.Scanner;
/*
 * 为指定成绩加分，直到分数大于等于 60 为止，
 * 输出加分前和加分后的成绩，并统计加分的次数
 */
/*
 * 使用Scanner工具类来获取用户输入的成绩信息
 * Scanner类位于java.util包中，使用时需要导入
 * 步骤：
 * 1.导入java.util.Scanner
 * 2.创建Scanner对象
 * 3.接收并保存用户输入的值
 */
public class test1 {
	public static void main(String[] args) {
		// create Scanner Object
		Scanner input = new Scanner(System.in);
		// notice
		// println输出后会换行，print不会
		System.out.print("请输入考试成绩（整数）：");
		// score
		// get user input score, and save to variable
		int score = input.nextInt();
		// count
		int count = 0;
		System.out.println("origin score: " + score);
		while (score < 60) {
			count++;
			score++;
		}
		System.out.println("result score: " + score);
		System.out.println("count times: " + count);
	}
}
