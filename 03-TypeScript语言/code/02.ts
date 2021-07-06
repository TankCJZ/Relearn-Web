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

// 类型推断
let a = 123; // 此时会根据值 123 推断处 a 类型为 number
a = '123'; 

let b;
b = 123; // 可以为number
b = 'str'; //  也可以为 string
