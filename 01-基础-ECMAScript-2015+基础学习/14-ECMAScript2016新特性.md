# ECMAScript2016新特性
`ES2016` 新增内容

## Array.prototype.includes
> includes() 方法用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回false --- MDN

### 判断数组
```javascript
const arr = [1, 2, 3, null, undefined, NaN];
console.log(arr.includes(1)); //true

console.log(arr.includes(null)); //true

console.log(arr.includes(undefined)); //true
```

### 判断字符串
```javascript
console.log('JavaScript'.includes('Ja')); //true
console.log('JavaScript'.includes('ja')); //false

// 发生隐式转换 12 => '12'
console.log('12343454'.includes(12)); //true
```
> 使用 includes()比较字符串和字符时是区分大小写。

### 判断类数组
```javascript
function foo(a) {
    console.log([].includes.call(arguments, 'js')); //true
}
foo('js');
```

### `includes` 与 `indexOf` 区别
最大区别就是 `indexOf` 不能判断 `NaN`, 如下例子：
```javascript
const arr = [1, 2, 3, null, undefined, NaN];

console.log(arr.includes(NaN)); //true
console.log(arr.indexOf(NaN) > -1); //false
```

## 指数运算符
```javascript
// es2016之前
console.log(Math.pow(2, 10)); //1024

// es2016
console.log(2 ** 10);
```
> 使用 `**` 来完成指数运算