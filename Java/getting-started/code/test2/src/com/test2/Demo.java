package com.test2;
import java.util.Scanner;
/*
 * 求3个班级，各4名学生的平均成绩
 */
public class Demo {
	public static void main(String[] args) {
		Scanner input = new Scanner(System.in);
		int classNum = 3;
		int studentNum = 4;
		int score;
		double sum;
		double avgs;
		for (int i = 1; i <= classNum; i++) {
			sum = 0;
			System.out.println("**请输入第" + i + "个班级的成绩");
			for (int j = 1; j <= studentNum; j++) {
				System.out.print("请输入第" + j + "位学生的成绩(整数):");
				score = input.nextInt();
				sum += score;
			}
			avgs = sum / studentNum;
			System.out.println(i + "班总分为"+ sum +"，平均分为" + avgs);
		}
	}
}
