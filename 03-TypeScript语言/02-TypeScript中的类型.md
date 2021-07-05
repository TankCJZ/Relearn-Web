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
