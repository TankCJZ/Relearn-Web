# 对象
## 对象字面量增强
```javascript
let name = 'tom';
let obj = {
  age: 12,
  name,
  getName() {
    console.log(this.name)
  }
}
console.log(obj);
console.log(obj.getName());
```
## 计算属性名
给对象增加动态属性   
```javascript
let obj = {
  age: 12,
  name,
  getName() {
    console.log(this.name)
  },
  [Math.random()]: () => {
    console.log(1)
  }
}
console.log(obj)
```

## Object.assign
将多个源对象复制到一个目标对象   
```javascript
let source = {
  name: 'tom',
}
let target = {
  age: 12,
}
console.log(Object.assign(target, source))  //{name: 'tom', age: 12}

// 生成的新对象 和 target 对象是同一个
let result = Object.assign(target, source);
console.log(result === target); //true

// 如果需要创建一个全新的对象可以将target 设置为{}
console.log(Object.assign({}, target, source) === target)  //false
```
> 后面对象的属性会覆盖前面对象属性，通常用来设置默认参数

## Object.is
判断两个值是否相等，在ES6之前我们使用`==`或者严格相等`===`来判断，那么他们有什么区别呢？   
```javascript
// 1.== 会在比较之前自动转换类型， 隐式转换
console.log(0 == false); // 转换成0 boolean 后再比较

// 2.=== 不会隐式转换，直接比较
console.log(0 === false); //false
console.log(NaN === NaN); //false  不能比较NaN
console.log(+0 === -0); //true  不能比较正负0

// 3.Object.is 可以解决NaN不相等的问题，和正负零相等问题
console.log(NaN === NaN); //true  
console.log(+0 === -0); //false 
```
## Object.is Polyfill
来自MDN   
```javascript
if (!Object.is) {
  Object.is = function(x, y) {
    // SameValue algorithm
    if (x === y) { // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN  通过NaN !== NaN 的方式来判断
      return x !== x && y !== y;
    }
  };
}
```
