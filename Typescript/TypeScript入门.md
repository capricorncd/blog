# TypeScript入门

TypeScript是一种由微软开发的自由和开源的编程语言。它是JavaScript的一个超集，而且本质上向这个语言**添加了可选的静态类型和基于类的面向对象编程**。其**遵循ES6规范**。

https://www.typescriptlang.org/

## TypeScript的优势

* 支持ES6规范

* 强大的IDE支持，3大特性： 类型检查、语法提示、重构

* Angular2的开发语言

## 搭建TypeScript开发环境

npm安装

```bash
npm install -g typescript
```

```bash
tsc --version
```

```bash
// 将在Hello.ts同级目录生成Hello.js文件
tsc Hello.ts
```

## 字符串新特性

#### 1. 多行字符串

```typescript
let str = `lsjfkaj
fkdsajfk
adsjf
kdajfkdjad`;
```

#### 2. 字符串模板

```typescript
let text = 'World';

let getName = function () {
    return 'World';
}

console.log(`Hello ${text}`); // Hello World
console.log(`Hello ${getName()}`); // Hello World
```

#### 3. 自动拆分字符串

用字符串模板去调用一个方法，同时把模板里的参数传给表达式。

```typescript
function test (temp, name, age) {
    console.log(temp);
    console.log(name);
    console.log(age);
}

let myMame = 'zhang san';

let getAge = function () {
    return 18;
}

test`Hello my name is ${myName}, I'm ${getAge()}`;
```

## 参数新特性

#### 1. 参数类型

语法 **标识符: 类型**

默认类型：`string`, `number`, `boolean`, `any`, `void`(针对function无返回值)

```typescript

let myname: string = 'zhongxing';

let obj: any = {
    a: 'xxxxxxxxxxx',
    b: 121212
}

let age: number = 32;

let man: boolean = true;

function Fun (): void {
  // ...
  // void类型，不能使用return返回值
}
```

#### 2. 自定义类型

```typescript
class Person {
    name: string;
    age: number;
}

let zhangsan: Person = new Person();

zhangsan.name = 'lisi';
zhangsan.age = 18;
```

#### 3. 参数默认值&可选参数

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

#### 1. Rest and Spread操作符

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
// js
// fun2.apply(void 0, args1);

let args2 = [3, 3, 5, 6, 8, 9];
fun2(...args2); // 3 3 5
// js
// fun2.apply(void 0, args2);
```

#### 2. generator函数

控制函数的执行过程，手工暂停和恢复代码执行。

https://babeljs.io/

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

买股票的例子

https://babeljs.io/repl

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

#### 3. destructuring析构表达式

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
```

```javascript
// es5实现
var stock = getStock();
var code = stock.code;
var price = stock.price;
```

```javascript
// 析构表达式
let {code, price} = getStock(); // code, price 必须与getStock()属性相同

console.log(code); // IBM

// 自定义变量
let {code: codeXX, price, obj: {b}} = getStock();

console.log(codeXX); // IBM

console.log(b); // 10000
```

通过析构表达式将数组拆解成任意数量的变量

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

#### 1. 箭头表达式

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

#### 2. forEach(), for in 和 for of

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

## 面向对象特性/类 (Class)

**类**是TypeScript的核心，使用TypeScript开发时，大部分代码都是写在类里的。

#### 1. 类的定义

控制符 public、  private、  protected

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
//  p1.name = 'batman';
    p1.eat(); // superman eating
```

#### 2. 构造函数 constructor

外部实例化类时调用，且只会调用一次。

```typescript
class Person {
    // 构造函数
    constructor () {
        console.log('Hello world!');
    }
}
```


#### 3. 类的继承

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

#### 4. 泛型 (generic)

参数化的类型，一般用于限制集合的内容。

用来指定一个数组，只能存放指定类型的元素。

```typescript
// 引用上面的类 Person(name) Employee(name, code)
// 只能存放Person类型的元素
let workers: Array<Person> = [];
    workers[0] = new Person('张三');
    workers[1] = new Employee('李四', '2');
```

#### 5. 接口 (Interface)

用来建立某种代码约定，使得其它开发者在调用某个方法或创建新的类时必须遵循接口所定义的代码约定。

> JavaScript 中没有Interface的概念

* 接口定义 `interface`

```typescript
// 声明一个接口IPerson，同时设置两个属性
interface IPerson {
    name: string;
    age: number;
}

// 作为方法()参数的类型声明
class Person {
    constructor(public config: IPerson) {
    }
}
// 参数必须与接口声明的参数相同
let p1 = new Person({
    name: 'zhangsna',
    age: 18
});
```
* ES5
```typescript
// 编译后
var Person = (function () {
    funtion Person(config) {
        this.config = config;
    }
    return Person;
}());

var p1 = new Person({
    name: 'zhangsna',
    age: 18
});
```

----------------- 华丽的分割线 -----------------

* 接口实现类 `implements`

```typescript
interface Animal {
    eat();
}

// 所有声明这个接口的类，都要实现这个接口的方法
class Sheep implements Animal {
    eat () {
        console.log('I eat grass');
    }
}

class Tiger implements Animal {
    eat () {
        console.log('I eat meat');
    }
}
```

* ES5

```typescript
// 编译后
var Sheep = (function () {
    funtion Sheep () {
    }
    Sheep.prototype.eat = function () {
        console.log('I eat grass');
    }
    return Sheep;
}());

var Tiger = (function () {
    funtion Tiger () {
    }
    Tiger.prototype.eat = function () {
        console.log('I eat meat');
    }
    return Tiger;
}());
```

#### 6. 模块 (Module)

模块可以帮助开发者将代码分割为可重用的单元。开发者可以自己决定将模块中的哪些资源(类、方法、变量)暴露出去供外部使用，哪些资源只在模块内使用。

> TypeScript中，一个文件即一个模块。

> 模块中的两个关键字 **export、 import**。**export** 控制模块对外暴露哪些方法或参数， **import** 需要某个模块提供哪些方法或参数。

```typescript
/** file a.ts **/
export let prop1;

let prop2;

export funtion func1 () {
}

funtion func2 () {
}

export class Class1 {
}

class Class2 {
}
```

```typescript
/** file b.ts **/
// 导入a.ts暴露的属性、方法和类
import {prop1, func1, Class1} from './a';

console.log(prop1);
func1();
new Class1();
```

#### 7. 注解 (annotation)

注解为程序的元素(类、方法、变量)加上更直观更明了的说明，这些说明信息与程序的业务逻辑无关，而是供指定的工具或框架使用的。

```bash
# angular application
# dir
app/
  |- app.component.css
  |- app.component.html
  |- app.component.ts
```

app.component.ts

```typescript
// Angular2
import { Component } from '@angular/core';

// 注解
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    title = 'app works';
}
```

app.component.html

```html
<h1>
  {{title}}
</h1>
```

#### 8. 类型定义文件 (*.d.ts)

类型定义文件用来帮助开发者在TypeScript中使用已有的JavaScript的工具包。如jQuery

> 所有文件均以.d.ts结尾

```typescript
/** file jquery.d.ts **/

/**
 * 此处省略n多代码
 */
declare module "jquery" {
    export = $;
}

declare let jQuery: JQueryStatic;
declare let $: JQueryStatic;
```

**代码来源**：https://github.com/DefinitelyTyped/DefinitelyTyped

**安装工具**：https://github.com/typings/typings
