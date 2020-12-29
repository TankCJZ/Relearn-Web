# Promise
异步编程的一种解决方案，最早来源于社区提出和实现，ES6之后被写入到标准中

## 基本用法
* Promise构造函数接受一个函数为参数,两个参数分别是`resolve`成功的回调函数`reject`失败回调的函数
* 在`p.then`接受传入两个函数，分别成功`resolve`和失败`reject`的回调
```javascript
let p = new Promise((resolve, reject) => {
  if (/*成功*/) {
    resolve('success');
  } else {
    reject(new Error('错误'));
  }
});

p.then(function (res) {
  //成功
}, function (err) {
  //失败
})
```

## 链式调用
```javascript
function sleep(time) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time)
  })
}

sleep(1000)
  .then(() => console.log(1)) 
  .then(() => console.log(2)) 
  .then(() => console.log(3))
// 1 2 3

// 链式调用then的结果会作为返回值给下一个then作为值
sleep(1000)
  .then(() => '111') 
  .then((res) => console.log(res)) // 111
```
## 异常捕获
`catch`方法可以捕获异常
```javascript
function sleep(time) {
  return new Promise((resolve, reject) => {
    setTimeout(reject(new Error('错误')), time)
  })
}

sleep(1000)
  .then(() => console.log(1)) 
  .then(() => console.log(2)) 
  .then(() => console.log(3))
  .catch(err => console.log(err))
  // Error: 错误
```

## 最终执行
`finally`在`ECMAScript2018`中加入的新特性,不管结果是成功还是失败都会执行
```javascript
function sleep(time) {
  return new Promise((resolve, reject) => {
    setTimeout(reject(new Error('错误')), time)
  })
}

sleep(1000)
  .then(() => console.log(1)) 
  .then(() => console.log(2)) 
  .then(() => console.log(3))
  .catch(err => console.log(err))
  .finally(() => console.log('finally'))
  // Error: 错误
  // finally
```
## 静态方法
* **Promise.resolve()** 将一个对象快速转换成`Promise`并且状态为成功`fulfilled`
```javascript
let p = Promise.resolve(1);
p.then(res => console.log(res))
```
* **Promise.reject()** 将一个对象快速转换成`Promise`并且状态为成功`rejected`
```javascript
let p = Promise.reject(1);
p.catch(e => console.log(e)); //1
```
* **Promise.all()** 同时执行多个`Promise`，并返回一个新的`Promise`对象，所有执行完成状态为`fulfilled`才会进入成功状态，否则是失败状态
```javascript
let a = Promise.all([Promise.resolve(1), Promise.reject(2), Promise.resolve(3)]);
a.catch(e => console.log(e)); //2
```
* **Promise.race()** 同时执行多个`Promise`，并返回一个新的`Promise`对象，只要有一个执行完成状态为`fulfilled`才会进入成功状态，否则是失败状态
```javascript
let a = Promise.race([Promise.resolve(1), Promise.reject(2), Promise.resolve(3)]);
a.then(e => console.log(e)); //1
```

* **Promise.allSettled() ECMAScript2020** 同时执行多个`Promise`，并返回一个新的`Promise`对象，所有执行完成状态为`fulfilled`或者`rejected`状态，都会进入`then`
```javascript
let a = Promise.allSettled([Promise.resolve(1), Promise.reject(2), Promise.resolve(3)]);
a.then(e => console.log(e)); 
//[{status: "fulfilled", value: 1}, {status: "rejected", reason: 2},{status: "fulfilled", value: 3}]
```

* **Promise.try()未实现** `try catch`中`try`一种包装，传入普通函数并且可以使用`then`接受结果和`catch`捕获异常
```javascript
Promise.try(() => 1)
  .then(res => console.log(res))
  .catch(err => console.log(err))
```

## Promise.try polyfill
```javascript
if (!Promise.try) {
  Promise.try = function (func) {
    return new Promise((resolve, reject) => {
      resolve(func())
    })
  }
}
```