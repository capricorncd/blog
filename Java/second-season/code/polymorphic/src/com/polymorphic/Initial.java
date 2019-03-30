package com.polymorphic;

public class Initial {

	public static void main(String[] args) {
		/*
		 * 引用多态/方法多态
		 */
		// 父类的引用可以指向本类的对象
		Animal obj1 = new Animal();
		// 父类的引用可以指向子类的对象
		Animal obj2 = new Dog();
		Animal obj3 = new Cat();
		// methods polymorphic
		obj1.eat();
		obj2.eat();
		obj3.eat();
		/*
		 * 引用类型转换
		 */
		Dog dog = new Dog();
		Animal animal = dog; // 自动类型提升，向上类型转换
		// Warning
		// Dog dog2 = animal; // Type mismatch: cannot convert from Animal to Dog
		Dog dog2 = (Dog)animal; // 向下类型转换 强制类型转换
		// error
		// Cat cat = (Cat)animal; // 编译时Cat类型(不会报错)，运行时Dog类型(抛出异常)
		// instanceof
		if (animal instanceof Cat) {
			Cat cat = (Cat)animal;
		} else {
			System.out.println("无法进行Cat类型转换");
		}
	}

}
