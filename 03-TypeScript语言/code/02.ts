function hello(name: string) {
    console.log('hello, ', name);
}
hello('world');

const n1: string = 'hello';
const n2: number = 12; //NaN Infinity
const n3: boolean = true;

//严格模式下不能为 null
// const n4: number = null; 
// const n5: boolean = null;

// // 非严格模式下可以为Null
// const n6: number = null; 
// const n7: boolean = null;

// void 表示没有返回值 值只能为 undefined
const n8: void = undefined;

// null 类型 undefined 类型
const n9: null = null;
const n10: undefined = undefined;

// symbol 类型
const n11: symbol = Symbol('s');

// Object类型
const f1: object = function () {}
const f2: { name: string } = { name: 'hello' }

// 数组
const arr1: Array<number> = [1,3,4]; //数字类型的数组
const arr2: number[] = [1,2,4]
const arr3: number[] = [1,2,4, 12];

// 元组
const q: [number, string] = [123, 'hello'];

// 枚举
enum Color {
    Red,
    Green,
}
Color.Red
Color[0];

// 函数
function foo (name: string, age?: number): string {
    return `${name}-${age}`;
}
foo('张三', 25);
foo('张三');

// 默认参数
function foo2 (name: string = 'zhangsan'): string {
    return name;
}
foo2();
const foo3 = function (name: string, age?: number): string {
    return `${name}-${age}`;
}
const foo4 = (name: string, age?: number): string => {
    return `${name}-${age}`;
  }

// 任意类型
function stringify(data: any) {
    return JSON.stringify(data);
}
let a1: any = 123;
a1 = 'string';
a1 = 123;
a1 = false;

// 类型推断
let a = 123; // 此时会根据值 123 推断处 a 类型为 number
// a = '123'; 

let b;
b = 123; // 可以为number
b = 'str'; //  也可以为 string

// unknow
let a2: unknown;
let a3: any = a2;
// let a4: number = a2; // 报错

if (typeof a2 === 'number') {
    a2.toFixed();
}

// 断言
let res = [123, 13].find(item => item > 0);

let r1 = res as number;

// 接口
interface User {
    name: string,
    age?: number,
}

function formatUser(user: User) {
    return `${user.age}-${user.age}`;
}

formatUser({name: 'ts', age : 12}); 
formatUser({name: 'ts'});

// formatUser({name: 'ts', age : 12, size: 12});

// interface User1 {
//     name: string,
//     readonly age: number,
//     size?: number,
//   }

let u1: User1 = {
    name: 'u1',
    age: 123,
}
// u1.age = 123; //error
u1.name = 'uu';
console.log(u1)

interface UserCache {
    [key: string]: string, // key 表示动态属性名字，也可以是其他表示例如 props 不固定
}

// 给接口增加属性
let uc: UserCache = {};
uc.name = 'uc'; //ok
// uc.age = 12; //ts(2322) 只能是string
uc.size = '123'; //ok

// 类
// class Person {
//     name: string; //如果成员没有赋初始值，那就必须在构造函数中赋值
//     age: number;
//     constructor(name: string, age: number) {
//       this.name = name;
//       this.age = age;
//     }
//     // 类的方法
//     getName(): string {
//       return this.name;
//     }
//   }


  class Person {
    name: string; //不适用修饰符，默认就是 public
    private age: number; //私有
    protected sex: string; //内部和子类
    static address: string = 'sz'; //静态属性
    constructor(name: string, age: number, sex: string) {
        this.name = name;
        this.age = age;
        this.sex = sex;
    }
  }
  let person = new Person('张三', 19, '男');
  console.log(person.name); //ok
//   console.log(person.age); //ts(2341)
//   console.log(person.sex); //ts(2445)
  console.log(Person.address); //ok

  class MinPerson extends Person {
      constructor(name: string, age: number, sex: string) {
        super(name, age, sex);
        console.log(this.sex); //ok
      }
  }

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
//   let maxPerson = new MaxPerson('max');// 类“MaxPerson”的构造函数是私有的，仅可在类声明中访问

// 接口
interface UserT {
    sayName(name: string): void; //定义一个无返回值的方法
    getAge(age: number): number; //定义一个返回值为number的方法
}

interface UserT2 {
    name: string
    say(name: string): void; //定义一个无返回值的方法
}
// 接口 User 定义了两个方法，但是实现
class UserOne implements UserT, UserT2 {
    name: string = '123';
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