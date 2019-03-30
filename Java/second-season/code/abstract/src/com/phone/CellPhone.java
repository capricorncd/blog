package com.phone;

public class CellPhone extends Phone {

	@Override
	public void call() {
		// TODO Auto-generated method stub
		System.out.println("以前的手机，是通过键盘来打电话");
	}

	@Override
	public void message() {
		// TODO Auto-generated method stub
		System.out.println("以前的手机，是通过键盘来发短信");
	}

}
