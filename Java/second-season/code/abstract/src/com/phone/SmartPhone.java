package com.phone;

public class SmartPhone extends Phone {

	@Override
	public void call() {
		// TODO Auto-generated method stub
		System.out.println("智能手机，是通过语音来打电话");
	}

	@Override
	public void message() {
		// TODO Auto-generated method stub
		System.out.println("智能手机，是通过语音来发短信");
	}

}
