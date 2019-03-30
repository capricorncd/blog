package com.shape;

public class Circle extends Shape {
	final float PI = 3.1415926f;
	float radius;
	@Override
	public float getPerimeter() {
		// TODO Auto-generated method stub
		return this.checkRadius() ? 2 * PI * this.radius : 0;
	}

	@Override
	public float getArea() {
		// TODO Auto-generated method stub
		return this.checkRadius() ? PI * this.radius * this.radius : 0;
	}

	private boolean checkRadius() {
		if (this.radius == 0) {
			System.out.println("未设置圆半径");
			return false;
		}
		return true;
	}
}
