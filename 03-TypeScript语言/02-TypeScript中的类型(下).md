# TypeScript 类型系统下

## 接口
使用 `interface` 关键字来定义接口:
```typescript
// 定义一个 User 接口 包含 string 类型的属性 name 和 number 类型的 age 属性。
interface User {
    name: string,
    age: number,
}
```
在何时使用接口呢？例如我们有一个函数接收参数必须是一个 `User` 对象，如下
```typescript
// javascript 方式
function formatUser(user) {
  return `${user.name}-${user.age}`;
}

// 使用 typescript 接口方式, 会强制要求参数 user 对象必须包含接口 User 定义的属性
function formatUser1(user: User) {
  return `${user.name}-${user.age}`;
}

// good
formatUser1({name: 'ts', age : 12});
// 报错
formatUser1({name: 'ts', age : 12, size: 12});
// 报错
formatUser1({name: 'ts'});
```
> 接口作用是为了约束对象接口，一个对象使用某个接口，那么就必须实现该接口的属性

**接口可选成员**   
在成员中后面使用 `?` 可定义为可选成员
```typescript
interface User {
  name: string,
  age?: number,
}
function formatUser(user: User) {
  return `${user.name}-${user.age}`;
}
// 正确
formatUser({name: 'ts'});
```

**接口只读成员**  
```typescript
interface User {
  name: string,
  readyonly age: number,
  size?: number, //只读
}

let u1: User = {
    name: 'u1',
    age: 123,
}
u1.age = 123; //报错 无法分配到 "age" ，因为它是只读属性 ts(2540)
u1.name = 'uu'; //ok
```

**动态成员**   
使用 `[]` 方式可以定义动态成员，如下：
```typescript
interface UserCache {
    [key: string]: string, // key 表示动态属性名字，也可以是其他表示例如 props 不固定
}

let uc: UserCache = {};
// 给接口增加属性 只要属性是string 并且 对于值也是string即可
uc.name = 'uc'; //ok
uc.age = 12; //ts(2322) 只能是string
uc.size = '123'; //ok
```

## 类 `Class`
`TypeScript` 不仅支持 `JavaScript` 中类的用法而且进行了增强，例如特殊的访问修饰符 `public static private protected` 抽象类 `abstruct class`
```typescript
// 定义一个 Person 类
class Person {
  name: string; //如果成员没有赋初始值，那就必须在构造函数中赋值
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  // 定义类的方法
  getName(): string {
    return this.name;
  }
}
```
**类的修饰符**   
* `private` 私有属性，只能内部访问，外界无法访问
* `public` 共有属性，所有人(外界和内部)都可以访问
* `protected` 只有内部和子类内部可以访问
* `static` 静态属性，通过 类名.属性名即可访问
```typescript
class Person {
  name: string; //不适用修饰符，默认就是 public
  private age: number; //私有
  protected sex: string; //内部和子类
  static address: string = 'SZ'; //静态属性 静态属性可和 private protected public 一起使用
  constructor(name: string, age: number, sex: string) {
      this.name = name;
      this.age = age;
      this.sex = sex;
  }
}
let person = new Person('张三', 19, '男');
console.log(person.name); //ok
console.log(person.age); //ts(2341)
console.log(person.sex); //ts(2445)
console.log(Person.address); //ok 静态属性通过类名访问

// 在子类中访问 sex
class MinPerson extends Person {
    constructor(name: string, age: number, sex: string) {
      super(name, age, sex);
      console.log(this.sex); //ok
    }
}

// 构造函数 constructor 默认也是 public 如果为 private 则不能被实例化
class MaxPerson {
  name: string;
  private constructor(name: string) {
    this.name = name;
  }
}
let maxPerson = new MaxPerson('max'); //ts(2673) 类“MaxPerson”的构造函数是私有的，仅可在类声明中访问

// 如果构造函数为私有，该如何实例化类呢？
  class MaxPerson {
    private static instance: MaxPerson;
    private constructor() {
    }
    // 可以通过静态修饰符方式来实现，内部实例化再返回，可以做到单例模式
    static create() {
        if (this.instance) {
            return this.instance;
        } else {
            this.instance = new MaxPerson();
            return this.instance;
        }
    }
  }

  let maxPerson1 = MaxPerson.create();
  let maxPerson2 = MaxPerson.create();

  console.log(maxPerson1 === maxPerson2); // true
```

**只读成员**
同理在属性名称之前加入 `readonly` 关键字可实现只读属性。
`public readonly name: string`

## 类和接口
熟悉 `java` 的同学应该知道，接口一般只定义方法名，具体实现过程由实现接口的类来实现。例如在浏览器中 `w3c` 组织只会定义相关规范，具体实现由浏览器来完成。对于开发者来说只需要调用统一的接口，而不用关心浏览器的实现。
简单来讲，接口可以用来约束类。
```typescript
// 接口
interface User {
    sayName(name: string): void; //定义一个无返回值的方法
    getAge(age: number): number; //定义一个返回值为number的方法
}
// 使用 implements 关键字加 接口名称
class UserOne implements User {
    sayName(name: string) {
        console.log(name);
    }
    getAge(age: number) {
        return age;
    }
}

interface User2 {
    name: string
    say(name: string): void; //定义一个无返回值的方法
}
// 实现多个接口 必须实现每个接口定义的方法或者属性
class UserOne1 implements User, User2 {
    name: string = 'user';
    say(name: string) {
        console.log(name);
    }
    sayName(name: string) {
        console.log(name);
    }
    getAge(age: number) {
        return age;
    }
}
```

## 抽象类
抽象类也是 `TypeScript` 增加的特性，在 `class` 之前加上关键字 `abstract` 来定义抽象类:
```typescript
// 定义一个抽象类 Animal
abstract class Animal {
    // 抽象类可以由自己的方法
    run(): void {
        console.log('run')
    }
}
```
抽象类也可以定义抽象方法, 同样也是在方法的前面加上关键字 `abstract`:   
```typescript
abstract class Animal {
    run(): void {
        console.log('run')
    }
    // 抽象方法
    abstract getAnimalName(name: string): string;
}
```
> 抽象方法不需要再抽象类中实现，只需要定义名称，参数，和返回值类型即可
那么抽象类中的抽象方法是应该由子类来实现的，父亲给儿子下命令，儿子不得不去做。
```typescript
// 实现抽象类 创建一个 Cat 类并且继承 抽象类 `Animal` 并且实现了 `getAnimalName` 方法
class Cat extends Animal {
    getAnimalName(name: string) {
        return `cat name is ${name}`;
    }
}
// Cat 类同时也会继承到父类 的属性 以及非抽象方法
let cat = new Cat();
cat.run(); //run
```