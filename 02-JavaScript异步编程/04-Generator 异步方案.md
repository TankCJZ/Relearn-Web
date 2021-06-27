## Generator
`Generator` 是生成器函数，也是异步处理的一种方案，生成器函数在普通函数前 加 `*`:
```javascript
function * start() {
    console.log('start');
    yield 'foo';
}
const g = start();
const result = g.next();
console.log(result);// {value: 0, done: false}
```
使用 `next` 方法可以获取到对于生成器函数的 `yield` 结果，再次调用则会获取下一次 `yield` 结果，以此类推。
```javascript
// 无限生成器
function * start() {
    let index = 0;
    while (true) {
        yield index++;
    }
}
const g = start();
let result = g.next();
console.log(result); //{value: 0, done: false}
result = g.next();
console.log(result); // {value: 1, done: false}
```
返回对象中两个属性 `value` 是对于的 `yield` 值，`done` 表示是否执行完成 `yield`.

## 生成器捕获异常
```javascript
function * start() {
    let index = 0;
    try {
        yield index++;
    } catch (e) {
        // err Error: 异常
        // at <anonymous>:13:9
        console.log('err:', e); // 此处可以捕获到 throw 抛出的异常
    }
}
const g = start();
const result = g.next();
console.log(result);
// 使用 throw 抛出异常
g.throw(new Error('异常')); 
```

## co 异步方案
借助生成器实现扁平化的处理异步，著名的 `co` 库就是使用该方式处理异步
```javascript
function * start() {
    let index = 0;
    try {
        yield ajax(); //ajax 异步请求数据伪代码 返回 Promise
        yield ajax(); //ajax 异步请求数据伪代码 返回 Promise
    } catch (e) {
        // err Error: 异常
        // at <anonymous>:13:9
        console.log('err:', e); // 此处可以捕获到 throw 抛出的异常
    }
}
function co(generator) {
    const g = generator();
    function handle (result) {
        if (result.done) return;
        result.value.then(data => {
            handle(g.next(data));
        }, err => {
            g.then(err);
        })
    }
    handle(g.next());
}
co(start);
```