# 函数
ES5中增加了函数的，默认参数，剩余参数，不具名参数，函数构造器增强，扩展运算符，块级函数，箭头函数等。

## 函数默认值
在ES6之前通常这样使用默认值：   
```javascript
// ||
function foo(name, age) {
  name = name || 'zhangsan';
  age = age || 20;
}

```
使用短路运算`||`有什么问题？   
```javascript
function foo(name) {
  name = name || 'tom';
  console.log(name);
}
foo(false); //name如果未false值修改成tom了
```
正确用法使用`typeof`判断   
```javascript
function foo(name) {
  // 增加了代码
  name = typeof name !== 'undefined' ? name : 'tom';
  console.log(name);
}
foo(false);
```
ES6默认值：   
```javascript
function foo(name = 'tom', age = 20) {
  console.log(name)
}
foo(); //tom
```

## 剩余参数
在很多函数中可以接受任意个数的参数，例如console.log(),在ES6之前获取所有参数通常是使用`arguments`   
```javascript
function foo() {
  console.log(arguments); //Arguments(4) [1, 2, 3, 4, callee: ƒ, Symbol(Symbol.iterator): ƒ]
}
foo(1,2,3,4);
```
在ES6中可以使用剩余操作符`...`:   
```javascript
function foo(...args) {
  console.log(args); //[1,2,3,4]
}
foo(1,2,3,4);

```
剩余参数只能作为函数的最后一个参数并且只能使用一次:   
```javascript
function foo(name, ...args) {
  console.log(name, args); //tom [2,2,4]
}
foo('tom', 2,2,3);
```

## 数组展开操作符
在ES6之前我们传递数组每个值，需要逐个下标，或者遍历来传递   
```javascript
let arr = [1,2,3,4];
console.log(arr[0], arr[1], arr[2], arr[3]);
for (var i=0; i<arr.length; i++) {
  console.log(arr[i]);
}
```
或者使用apply   
```javascript
//apply接受一个数组参数
let arr = [1,2,3,4];
console.log.apply(console, arr); //[1,2,3,4]
```
**在ES6之后可以使用数组展开**`...`   
```javascript
let arr = [1,2,3,4];
console.log(...arr);
```

## 箭头函数
ES6中新增了箭头函数   
* 简写代码
  ```javascript
  // es6之前
  function foo(name) {
    console.log(name);
  }
  // 箭头函数 只有一行代码，就可以使用这种简写方式
  let foo = name => console.log(name);
  ```
* 多个参数
  ```javascript
  let foo = (name, age) => {
    console.log(name);
    console.log(age);
    return true;
  }
  ```

## 箭头函数的this
箭头函数不会改变this的指向,没有this的机制，也就是说没有this,它的this是箭头函数外层的this
```javascript
let obj = {
  name: 'tom',
  sayName1: function () {
    console.log(this.name);
  },
  sayName2: () => {
    console.log(this.name);
  },
  sayName3: function () {
    setTimeout(() => {
      console.log(this.name)
    })
  },
  sayName4: function () {
    // 需要保留this
    let that = this;
    setTimeout(function(){
      console.log(that.name)
    })
  }
}
obj.sayName1(); //tom
obj.sayName2(); //undefined
obj.sayName3(); //tom
obj.sayName4(); //tom
```
> 箭头函数不需要将this应用保留，所以箭头函数可以避免that 的使用场景

## 函数length 和 name属性
`length`获取函数参数的长度,`name`函数名
```javascript
function foo(name, age) {
  console.log(name, age);
} 
console.log(foo.name); //foo
console.log(foo.length); //2
```