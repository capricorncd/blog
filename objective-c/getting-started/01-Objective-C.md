Objective-C完全支持C语言语法。

## # 类的定义

```
@interface SimpleClass: NSObject
// ...
@end
```


### # 源代码文件扩展名对比

||头文件|实现文件|
|:--|:--:|:--:|
|c语言|.h|.c|
|c++语言|.h|.cpp|
|oc语言|.h|.m|
|oc&c++|.h|.mm|

### # 类的属性申明

```
// XYZPerson.h
@interface Person:
NSObject

@property NSString
*firstName;

@property NSString
*lastName;

@end
```

`*` 代表指针

```
// 指针类型
@property NSNumber *yearOfBirth;
// 基本类型
@property int yearOfBirth;
// 只读属性
@property (readonly) NSString
  *firstName;
```

### # 减号方法（普通方法又称对象方法）申明

本质上是一个函数

```
@interface Person: NSObject
// void 代表返回值类型
-(void)someMethod;

-(void)someMethodWithValue:(SomeType)value;

-(void)someMethodWithFirstValue:(SomeType)info1
secondValue:(AnotherType)info2;

@end
```

加号方法（类方法，又称静态方法）申明

```
@interface NSString: NSObject
+(id)string

+(id)stringWithString:(NSString *)aString;

+(id)stringWithFormat:(NSString *)format, ...;

+(id)stringWithContentOfFile:(NSString *)path
encoding:(NSStringEncoding)enc error:(MSError **)error;

+(id)stringWithCString:(const char *)cString
encoding:(NSStringEncoding)enc;

@end
```

## # 类的实现

OC中类的申明和实现是分开的。

```
// XYZPerson.m
#import "XYZPerson.h"

@implementation XYZPerson

@end
```

#### # 例子

XYZPerson.h文件

```
@interface XYZPerson: NSObject
-(void)sayHello;
@end
```

XYZPerson.m文件

```
#import "XYZPerson"

@implementation XYZPerson
-(void)sayHello {
  // @符号代表它是OC类型的字符串，否则则认为是C语言类型的字符串
  NSLog(@"Hello, World!");
}
@end
```

