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
const arr3: number[] = [1,2,4, '12']