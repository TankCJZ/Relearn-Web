# 数组解构

## 在ES6之前
```javascript
var arr = [100, 200, 300];

console.log(arr[0], arr[1], arr[2]); //100, 200, 300
```
## 获取所有数据
```javascript
const arr = [100, 200, 300];

let [name, age, sex] = arr;
console.log(name, age, sex); //100, 200, 300
```

## 只获取单个或者多个
保留`,`即可   
```javascript
const arr = [100, 200, 300];

let [, , a] = arr;
console.log(a); //300
```

## 获取剩余数据
```javascript
const arr = [100, 200, 300];
let [s, ...rest] = arr;
console.log(rest); //[200, 300]
```

## 如果不存在返回`undefined`
```javascript
const arr = [100, 200, 300];
let [a1, a2, a3, a4] = arr;
console.log(a1, a2, a3, a4); //100 200 300 undefined
```

## 给不存在的设置默认值
```javascript
const arr = [100, 200, 300];
let [b1, b2, b3, b4 = 'none'] = arr;
console.log(b1, b2, b3, b4); //100 200 300 none
```

## 例子-获取路径
```javascript
let path = 'root/www/ecmascript';
let [root, , projectPath] = path.split('/');
console.log(root, projectPath) //root ecmascript
```

## 数组解构-优势
使用数组解构可以很好获取我们需要的值，并且可以重新定义，语义上更友好，配合默认值可以避免获取不到导致报错情况。

# 对象解构
对象解构是不能自定义属性名哦。
## 不能自定义属性名   
```javascript
const obj = {name: 'ecma', age: 12};
let { name } = obj;
console.log(name); //ecma
```
## 设置默认值
如果属性值不存在，可以设置默认值.   
```javascript
const obj = {name: 'ecma', age: 12};
let { sex = 12 } = obj;
console.log(sex); //12
```

## 不能重复定义
```javascript
const obj = {name: 'ecma', age: 12};
let name = 'ss';
let { name } = obj;
console.log(name); //报错
```

## 属性重命名
使用`:`可以重新命名，并且同时可以设置默认值
```javascript
const obj = {name: 'ecma', age: 12};
let { name: nickName} = obj;
console.log(nickName); //ecma
```

## 重命名+默认值
```javascript
const obj = {name: 'ecma', age: 12};
let { name1: nickName1 = 'name1'} = obj;
console.log(nickName1); //name1
```

## 获取指定+全部
```javascript
const obj = {name: 'ecma', age: 12};
let { age, ...rest } = obj;
console.log(age, rest); //12 { name: 'zero' }
```