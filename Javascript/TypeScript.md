# TypeScript

TypeScript是一种由微软开发的自由和开源的编程语言。它是JavaScript的一个超集，而且本质上向这个语言添加了可选的静态类型和基于类的面向对象编程。

## 参数

### 2. 参数类型

语法 **标识符: 类型**

默认类型：string number boolean any

```typescript

let myname: string = 'zhongxing';

let obj: any = {
	a: 'xxxxxxxxxxx',
	b: 121212
}

let age: number = 32;

let man: boolean = true;
```

#### 自定义类型

```typescript
class Person {
	name: string;
	age: number;
}

let zhangsan: Person = new Person();

zhangsan.name = 'lisi';
zhangsan.age = 18;
```

#### 参数默认值&可选参数

```typescript
// 以方法为例，普通变量见上方例子
// ? 为可选参数，可选参数必须申明在必选参数之后
function test (a: string, b?: string, c: string = 'xxxxx') {
	console.log(a);
	console.log(b);
	console.log(c);
}

test('aaxx', 'bbxx', 'ccxx');
test('aaxx', 'bbxx');
```

* **?** 为可选参数，**可选参数必须申明在必选参数之后**

## 函数新特性

### 1. Rest and Spread操作符

用来声明任意数量的方法参数

```typescript
// ...args 可以传任意多个参数
function fun1(...args) {
	args.forEach(function (arg) {
		console.log(arg);
	})
}

fun1(1, 2, 3); // 1 2 3

fun1('a', 'b', 'c0', 'd0'); // a b c0 d0
```

```typescript
// 把任意长度的数组参数，转换为固定参数方法调用
function fun2(a, b, c) {
	console.log(a);
	console.log(b);
	console.log(c);
}

let args1 = [1, 2];
fun2(...args1); // 1 2 undefiend

let args2 = [3, 3, 5, 6, 8, 9];
fun2(...args2); // 3 3 5
```

### 2. generator函数

控制函数的执行过程，手工暂停和恢复代码执行。

```typescript
// 方法前面加*号
function* doSomething () {
	console.log('start');
	
	// 相当于断点
	yield;
	
	console.log('finish');
}

// 方法使用，不能直接调用 doSomething();
// 需将方法声明为一个变量
let fun1 = doSomething();
// 执行其next()方法
fun1.next();
// 每调一次next()，程序就执行到一个yield位置
fun1.next();
```

```typescript
// 买股票的例子
function* getStockPrice(stock) {
	while(true) {
		yield Math.random()*100;
	}
}

// 买IBM的股票
let priceGenerator = getStockPrice('IBM');
// 当低于15元时购买
let limitPrice = 15;
// 起始价格100
let price = 100;

// 当股票价格大于 limitPrice时，就再去取一次价格
while (price > limitPrice) {
	price = priceGenerator.next().value;
	console.log(`the generator return ${price}`);
}

console.log(`buying at ${price}`);
```

### 3. destructuring析构表达式

通过析构表达式将**对象属性**或**数组**拆解成任意数量的变量。

```typescript
// 通过析构表达式将对象拆解成任意数量的变量
function getStock () {
	return {
		code: 'IBM',
		price: 100,
		obj: {
			a: 12154,
			b: 10000
		}
	}
}

// es5实现
var stock = getStock();
var code = stock.code;
var price = stock.price;

// 析构表达式
let {code, price} = getStock(); // code, price 必须与getStock()属性相同

console.log(code); // IBM

// 自定义变量
let {code: codeXX, price, obj: {b}} = getStock();

console.log(codeXX); // IBM

console.log(b); // 10000

```

```typescript
// 通过析构表达式将数组拆解成任意数量的变量
let arr = [1, 2, 3, 4, 5, 6];

let [num1, , , num2, ...others] = arr;

console.log(num1); // 1
console.log(num2); // 4
console.log(others); // [5, 6]

// 函数中调用
function doSomething ([num1, , , num2, ...others]) {
	console.log(num1); // 1
	console.log(num2); // 4
	console.log(others); // [5, 6]
}
doSomething(arr);
```

## 表达式和循环

### 1. 箭头表达式

用来声明匿名函数，消除传统匿名函数的this指针问题

```typescript
// 单行写法
let sum = (arg1, arg2) => arg1 + arg2;
// 多行
let sum2 = (arg1, arg2) => {
	// ...
	return arg1 + arg2;
}

/** **********************************/
// 编译后
var sum = function (arg1, arg2) {
	return arg1 + arg2;
}
/** **********************************/

// 一个参数
let sum = arg1 => {
	console.log(arg1);
}
```

```typescript
let arr = [1, 2, 3, 4, 5];

console.log(arr.filter(value => value%2 == 0));
// 结果 [2, 4]
```

### 2. forEach(), for in 和 for of

**forEach** 不支持break，会忽略数组的属性

**for in** 不会忽略数组的属性

**for of** 支持break，会忽略数组的属性

```typescript
let arr = [1, 2, 3, 4];
	arr.desc = 'four number';

// forEach
arr.forEach(val => {
	// desc属性被忽略
	console.log(val); // 1 2 3 4
});

// for in
for (let key in arr) {
	console.log(key); // 0 1 2 3 desc
}

// for of
// 可以使用break
for (let val of arr) {
	// desc属性被忽略
	console.log(val); // 1 2 3 4
}
```

## 面向对象特性

### 1. 类 (Class)

**类**是TypeScript的核心，使用TypeScript开发时，大部分代码都是写在类里的。

#### 类的定义

控制符 **public、  private、  protected**  

* **public** 公有方法，类内部及外面均可调用。

* **private** 私有方法，类内部可以访问，外部不能访问。

* **protected** [prə'tektɪd] 受保护的，在类的内部及子类可以访问，外部不能访问到。

```typescript
// 定义类
class Person {
	// public name; // 可不必声明控制符
	
	constructor(public name: string) { // 必须声明控制符
		console.log(this.name);
	}
	
	eat () {
		console.log(this.name + ' eating');
	}
}
// 实例化
let p1 = new Person('superman');
//	p1.name = 'batman';
	p1.eat(); // superman eating
```

#### 构造函数 constructor

外部实例化类时调用，且只会调用一次。

```typescript
class Person {
	// 构造函数
	constructor () {
		console.log('Hello world!');
	}
}
```


#### 类的继承

关键字 **extends、 super**

* **extends** 声明类的继承关系
* **super** 调用父类的构造函数或方法。**子类只能调用父类的构造函数**，否则会报错

```typescript
class Person {
	constructor(public name: string) {
		console.log(this.name);
	}
}

// Employee 继承Person的所有属性和方法
class Employee extends Person {
	// ...
	constructor(name: string, code: string) {
		// 调用父类的constructor
		super(name);
		console.log('super');
		this.code = code;
	}
	
	// 新的属性、方法
	code: string;
	
	work () {
		// 调用父类的方法
		super.eat();
	}
}

let el = new Employee('naem', '1');
	el.work();
```

### 2. 泛型 (generic)

参数化的类型，一般用于限制集合的内容。