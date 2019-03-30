package com.shape;

public class Rectangle extends Shape {
	
	public float width;
	public float height;

	@Override
	public float getPerimeter() {
		if (this.width == 0 || this.height == 0) {
			System.out.println("未设置矩形的长或宽");
			return 0;
		}
		// TODO Auto-generated method stub
		return (this.width + this.height) * 2;
	}

	@Override
	public float getArea() {
		// TODO Auto-generated method stub
		return this.width * this.height;
	}

}
