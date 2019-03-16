package com.array;

public class Func {
	public void print(String str) {
		System.out.println(str);
	}
	
	public int sum() {
		int a = 1;
		int b = 3;
		return a + b;
	}
	
	public static void main(String[] args) {
		Func f = new Func();
		f.print("Hello world" + f.sum());
	}
}
