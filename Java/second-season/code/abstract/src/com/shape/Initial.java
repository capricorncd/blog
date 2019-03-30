package com.shape;

public class Initial {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Rectangle rect = new Rectangle();
		rect.width = 20.0f;
		rect.height = 10.0f;
		System.out.println("长方形边长为：" + rect.getPerimeter() + "厘米");
		System.out.println("长方形面积为：" + rect.getArea() + "平方厘米");
		// circle
		Circle circle = new Circle();
		circle.radius = 20.0f;
		System.out.println("圆周为：" + circle.getPerimeter() + "厘米");
		System.out.println("圆面积为：" + circle.getArea() + "平方厘米");
	}

}
