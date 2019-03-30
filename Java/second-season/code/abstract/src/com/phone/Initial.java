package com.phone;

public class Initial {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Phone tel1 = new CellPhone();
		tel1.call();
		tel1.message();
		Phone tel2 = new SmartPhone();
		tel2.call();
		tel2.message();
	}

}
