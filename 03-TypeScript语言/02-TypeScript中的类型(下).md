# TypeScript 类型系统

## TypeScript 配置文件的使用
安装 `TypeScript` 后，执行 `npm init -y` 生成 `package.json` 文件，接着执行 `yarn tsc --init`会生成一个 `tsconfig.json` 的配置文件。

## 原始类型
```typescript
const n1: string = 'hello';
const n2: number = 12; //可以为NaN Infinity
const n3: boolean = true;

// 严格模式下不能为空，下面代码在 `tsconfig.json` 的 `strict` 为 true (默认) 会报宏
const n4: number = null; 
const n5: boolean = null;

// 非严格模式下可以为 null
const n6: number = null; 
const n7: boolean = null;

// void 表示没有返回值 值只能为 undefined
const n8: void = undefined;

// null 类型 undefined 类型
const n9: null = null;
const n10: undefined = undefined;

// 报错
const n11: symbol = Symbol('s');
```
## 标准库的申明
`TypeScript` 中的标准库就是内置对象所对于的申明。
`tsconfig.json` 默认是支持 `es5` 语法，如果我们使用 `Promise, Symbol` 等 `es2015+` 特性则会提示错误：
```typescript
const n11: symbol = Symbol('s');
```
> "Symbol" 仅指类型，但在此处用作值。是否需要更改目标库?请尝试将 `lib` 编译器选项更改为 es2015 或更高版本
根据提示修改配置文件的目标库 `lib` 选项即可:
```json
{
  "compilerOptions": {
    "lib": ["es2015", "dom"], 
  }
}
```
> `dom` 库可支持 `dom` 相关 `api`，例如 `console`

## `Object` 类型
`TypeScript` 中的 `Object` 类型是指所有的非原始类型。并非只是 `Object` 对象类型
```typescript
const f1: object = function () {}
// 定义对象类型，其中定义的属性 name 必须为 string ,所以赋值的 name 必须为 string 类型，否则会报语法错误
const f2: { name: string } = { name: 'hello' }
```

## 数组类型
定义数组的两种方式：
```typescript
// 定义所有值必须为number类型的数组
const arr1: Array<number> = [1,3,4];
const arr2: number[] = [1,2,4]

// 报错 '12' 不是number类型
const arr3: number[] = [1,2,4, '12'];
```

## 元组类型
元组类型 `Tuple`, 类似于数组，可以给每个数组值定义不同类型
```typescript
// 定义一个元组包含两个值，第一个为number类型，第二个为string类型
const q: [number, string] = [123, 'hello'];
```

## 枚举类型
使用 `enum` 来定义枚举，枚举中的值默认从 `0` 开始累加，也可以指定值。
```typescript
enum Color {
    Red,
    Green,
}
// 获取枚举值
Color.Red
Color[0]; // 等同于Color.Red
Color[1]; // 等同于Color.Green

// 指定值
enum Color {
    Red = 'Red',
    Green = 'Green', // 值可以是字符串
    Yellow = 1, // 值也可以是数字
}
Color.Red; //正确
Color[0]; //报错
```
枚举编译结果最终还是以对象的形式定义,并且会常驻运行时中，建议使用常量方式定义枚举
```javascript
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
})(Color || (Color = {}));
Color.Red;
Color[0];
```

## 函数类型
在 `javascript` 中两种函数定义方式：函数申明和函数表达式。
```typescript
// 函数申明的方式使用 `:` 定义参数类型 `()`后定义函数返回值类型
function foo (name: string, age?: number): string {
    return `${name}-${age}`;
}
foo('张三', 25);
foo('张三');

// 函数表达式的方式
const foo3 = function (name: string, age?: number): string {
  return `${name}-${age}`;
}
// 或者是箭头函数
const foo4 = (name: string, age?: number): string => {
  return `${name}-${age}`;
}

// 编译结果
var foo3 = function (name, age) {
    return name + "-" + age;
};
var foo4 = function (name, age) {
    return name + "-" + age;
};
```
**可选参数**   
在参数后面加 `?` 定义可选参数 `?age`,注意可选参数只能在必选参数的后面。
**默认参数**   
```typescript
function foo2 (name: string = 'zhangsan'): string {
  return name;
}
```
## 任意类型 (`any`)
在某些内置的 `API` 本身就支持任意类型参数，而 `TypeScript` 必须兼容该 `API`，所以就会有任意类型的出现.
```typescript
// 例如 JSON.stringify()
function stringify(data: any) {
  return JSON.stringify(data);
}

// 申明为any 类型后 可以赋值任意类型值
let a1: any = 123;
a1 = 'string';
a1 = 123;
a1 = false;
```
> `any` 相当于是动态类型，本质上和普通的 `JavaScript` 使用 `let` 定义的没有区别，一般不建议使用。

## 不确定类型 (`unknown`)
`unknown` 是 `TypeScript3.0` 新增加的一个类型，表示不确定的类型。与 `any` 不同的地方是 `unknown` 更安全：
```typescript
let a2: unknown
// unknown 只能赋值给 any 类型的变量
let a3: any = a2; //正常
let a4: number = a2; // 报错

// 在使用缩小类型判断 会进行类型检测
if (typeof a2 === 'number') {
    a2.toFixed(); //被检测为number类型，可以调用相关的方法
}

// 直接调用会报错
a2.toFixed(); //报错
```
> 在能使用 `unknown` 的时候就不要使用 `any`.

## 隐式类型推断
在 `typescript` 中如果为定义类型，那么 `typescript` 会根据值来进行隐式推断类型
```typescript
let a = 123; // 此时会根据值 123 推断处 a 类型为 number
a = 'str'; // 报错
```
如果变量定义了但是没有赋值，则会推断为 `any` 类型
```typescript
let b;
b = 123; // 可以为number
b = 'str'; //  也可以为 string
```

## 类型断言
隐式推断一个变量可能会是一个不确定的值时候就可以使用 `as` 或者是 `<*>` 的方式可以给一个变量进行断言：
```typescript
// 在变量后面使用 as 加类型可将变量类型进行断言
let res = [123, 13].find(item => item > 0);
// 此时的 res 值可能是一个 number 或者是 undefined 没有找到则是返回 undefined

// 所以这时候就可以使用类型断言
let r1 = res as number; //将res断言为number类型

// 使用 <number> 断言
let r2 = <number>res;
```
> 注意： 类型断言只是在编译阶段存在，并不是直接改变变量类型，和类型转换是两码事