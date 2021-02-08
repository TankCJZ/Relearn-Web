# Symbol 
为ES6新增一个 原始数据类型，叫做'符号'，特点是能定义唯一的值

## 如何使用
```javascript
// 1. 创建Symbol
let s1 = Symbol();
console.log(s1); //Symbol

// 2. 传递一个字符串
let s2 = Symbol('s2');
console.log(s2); //Symbol(s2)

// 3. 使用静态方法for方法
let s3 = Symbol.for('s3');
console.log(s3); //Symbol(s3)
```

## 唯一性
```javascript
let s4 = Symbol();
let s5 = Symbol();
console.log(s4 === s5); //false

let b1 = Symbol('b1');
let b2 = Symbol('b2');
console.log(b1 === b2); //false
```
> `Symbol` 创建的值是唯一的

## 创建相同的Symbol
```javascript
let s6 = Symbol.for('s6');
let s7 = Symbol.for('s6');
console.log(s6 === s7); //true

let a6 = Symbol.for(true);
let a7 = Symbol.for('true');
console.log(a7 === a6); //true

```
> 使用`Symbol.for`传递相同字符串可以创建相同`Symbol`,注意`for`只接受字符串参数，非字符串会做隐式转换

## 使用Symbol做对象属性
```javascript
let o1 = {
    [Symbol()]: 'name',
}
console.log(o1); //{ [Symbol()]: 'name' }
```
## 使用Symbol模拟对象私有属性-主要作用
```javascript
// moduleA.js
let name = Symbol('name');
module.exports = {
    [name]: 'zhangsan',
    getName() {
        return this[name]
    }
}
// moduleB.js
const person = require('./11-moduleA');
console.log(person.getName()); //zhangsan
console.log(person[Symbol('name')]); //undefined
```
> Symbol是唯一的，所以无法构建出第二个出来，也就是在`moduleB`中是无法获取到`name`属性的

## Symbol作为JSON
```javascript
console.log(JSON.stringify({[Symbol('key')]: 'value'});) //{}
```
> 当使用 JSON.stringify() 时，以 symbol 值作为键的属性会被完全忽略

## Symbol内置符号
```javascript
// 重写对象toString返回值 Symbol.toStringTag
let obj = {};
console.log(obj.toString()); //[object Object]
obj[Symbol.toStringTag] = 'obj';
console.log(obj.toString()); //[object obj]

// 自定义迭代器 Symbol.iterator
let arr = {
    name: 'zhangsan',
    age: 12,
};
arr[Symbol.iterator] = function* () {
    yield 1;
    yield arr.name;
    yield arr.age;
}
console.log([...arr]); //[ 1, 'zhangsan', 12 ]
```
> 更多内置符号异步 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol

## 总结
`Symbol`由于唯一的特性，更多是用来做对象属性私有化，和重写内置`Symbol`属性。
