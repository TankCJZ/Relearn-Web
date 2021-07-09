"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
// 任意类型
function stringify(data) {
    return JSON.stringify(data);
}
var a1 = 123;
a1 = 'string';
a1 = 123;
a1 = false;
// 类型推断
var a = 123; // 此时会根据值 123 推断处 a 类型为 number
// a = '123'; 
var b;
b = 123; // 可以为number
b = 'str'; //  也可以为 string
// unknow
var a2;
var a3 = a2;
// let a4: number = a2; // 报错
if (typeof a2 === 'number') {
    a2.toFixed();
}
// 断言
var res = [123, 13].find(function (item) { return item > 0; });
var r1 = res;
function formatUser(user) {
    return user.age + "-" + user.age;
}
formatUser({ name: 'ts', age: 12 });
formatUser({ name: 'ts' });
// 给接口增加属性
var uc = {};
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
var Person = /** @class */ (function () {
    function Person(name, age, sex) {
        this.name = name;
        this.age = age;
        this.sex = sex;
    }
    Person.address = 'sz'; //静态属性
    return Person;
}());
var person = new Person('张三', 19, '男');
console.log(person.name); //ok
//   console.log(person.age); //ts(2341)
//   console.log(person.sex); //ts(2445)
console.log(Person.address); //ok
var MinPerson = /** @class */ (function (_super) {
    __extends(MinPerson, _super);
    function MinPerson(name, age, sex) {
        var _this = _super.call(this, name, age, sex) || this;
        console.log(_this.sex); //ok
        return _this;
    }
    return MinPerson;
}(Person));
var MaxPerson = /** @class */ (function () {
    function MaxPerson() {
    }
    // 可以通过静态修饰符方式来实现，内部实例化再返回，可以做到单例模式
    MaxPerson.create = function () {
        if (this.instance) {
            return this.instance;
        }
        else {
            this.instance = new MaxPerson();
            return this.instance;
        }
    };
    return MaxPerson;
}());
var maxPerson1 = MaxPerson.create();
var maxPerson2 = MaxPerson.create();
console.log(maxPerson1 === maxPerson2); // true
// 接口 User 定义了两个方法，但是实现
var UserOne = /** @class */ (function () {
    function UserOne() {
        this.name = '123';
    }
    UserOne.prototype.say = function (name) {
        console.log(name);
    };
    UserOne.prototype.sayName = function (name) {
        console.log(name);
    };
    UserOne.prototype.getAge = function (age) {
        return age;
    };
    return UserOne;
}());
// 抽象类
var Animal = /** @class */ (function () {
    function Animal() {
    }
    Animal.prototype.run = function () {
        console.log('run');
    };
    return Animal;
}());
// 实现抽象类
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cat.prototype.getAnimalName = function (name) {
        return "cat name is " + name;
    };
    return Cat;
}(Animal));
var cat = new Cat();
cat.run();
// 泛型
function createArray(length, value) {
    var arr = Array(length).fill(value);
    return arr;
}
console.log(createArray(3, 10)); //[ 10, 10, 10 ]
function createArray2(length, value) {
    var arr = Array(length).fill(value);
    return arr;
}
console.log(createArray2(3, 'arr')); //[ 10, 10, 10 ]
function createArray3(length, value) {
    var arr = Array(length).fill(value);
    return arr;
}
console.log(createArray3(3, 10));
console.log(createArray3(3, 'arr'));
//# sourceMappingURL=02.js.map