"use strict";
function hello(name) {
    console.log('hello, ', name);
}
hello('world');
var n1 = 'hello';
var n2 = 12; //NaN Infinity
var n3 = true;
//严格模式下不能为 null
// const n4: number = null; 
// const n5: boolean = null;
// // 非严格模式下可以为Null
// const n6: number = null; 
// const n7: boolean = null;
// void 表示没有返回值 值只能为 undefined
var n8 = undefined;
// null 类型 undefined 类型
var n9 = null;
var n10 = undefined;
// symbol 类型
var n11 = Symbol('s');
// Object类型
var f1 = function () { };
var f2 = { name: 'hello' };
// 数组
var arr1 = [1, 3, 4]; //数字类型的数组
var arr2 = [1, 2, 4];
var arr3 = [1, 2, 4, 12];
// 元组
var q = [123, 'hello'];
// 枚举
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
})(Color || (Color = {}));
Color.Red;
Color[0];
// 函数
function foo(name, age) {
    return name + "-" + age;
}
foo('张三', 25);
foo('张三');
// 默认参数
function foo2(name) {
    if (name === void 0) { name = 'zhangsan'; }
    return name;
}
foo2();
var foo3 = function (name, age) {
    return name + "-" + age;
};
var foo4 = function (name, age) {
    return name + "-" + age;
};
//# sourceMappingURL=02.js.map