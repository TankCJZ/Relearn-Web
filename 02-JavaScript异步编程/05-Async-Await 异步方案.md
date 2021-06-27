## `Async/Await` 语法糖
`Async/Await` 语法糖的出现能更好的处理异步，很好的替代了 `Generator` 的方式来处理异步。
```javascript
async function main() {
    return 111;
}
main().then(res => {
    console.log(111); // 111
})
```
> 在 `function` 之前加入 `async` 关键字则可将该函数定义为异步函数
```javascript
async function main() {
    return 111;
}

async function start() {
    const res = await main();
    console.log(res);
}
start(); //111
```
> 使用 `await` 关键字可以接收 `Promise` 实例执行成功后的结果，注意 `await` 必须在 `async` 函数中使用
```javascript
function main() {
    return Promise.reject(11);    
}

async function start() {
    try {
        const res = await main();
    } catch (e) {
        console.log(e); //11
    }
}
start();
```
> `await` 是无法捕获到 `rejected` 回调,必须使用 `try catch` 才能捕获到

不过顶层 `await` 语法使用在未来的标准中会支持。