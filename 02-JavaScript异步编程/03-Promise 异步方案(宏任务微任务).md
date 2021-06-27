## 什么是 `Promise` ?
`Promise` 是 `ES6` 中的一个新语法，最早是由 `CommonJS` 社区提出了一个 `Promise` 的规范，被加入官方规范中了，成为了语言规范。主要是为了解决异步回调地狱问题.
## 回调地狱
```javascript
$.get('xxx', () => {
    $.get('xxx', () => {
        $.get('xxx', () => {
            //...
        })
    })
});
```
> 回调函数嵌套会造成代码可读性低。
## Promise 方式
使用 `Promise` 方式改造上面案例，可减少代码嵌套，可读性提升。
```javascript
$.get('xxx')
    .then(res => {
        //...
    })
    .then(res => {
        //...
    })
    .then(res => {
        //...
    });
```
## Promise 基本概念
`Promise` 为承诺的意思，有承诺也就会有兑现，最终会有一个最终状态，完成承诺或者是拒绝了？ `Promise` 在创建后的初始状态是 `Pending` （等待中），最终会是 `Fulfilled` (已完成) 或者是 `Rejected` (拒接)中的一个。
同样，在 `Fulfilled` 或者 `Rejected` 状态接收后会触发回调机制。`onFulfilled` 对于的是已完成的回调函数, `Rejected` 对于是 `onRejected` 回调函数。
在承诺结果已经明确后就不能再次更改。

## Promise 基本使用
创建一个承诺 `new Promise()`: 传递一个函数类型参数，这个函数就是构建承诺的逻辑。
函数参数接受两个参数，也是函数类型：
* `resolve`:  将 Promise 的状态修改为 `Fulfilled` 成功
* `reject`:  将 Promise 的状态修改为 `Rejected` 拒绝
```javascript
let p = new Promise((resolve, reject) => {
    // resolve 将 Promise 的状态修改为 `Fulfilled` 成功
    resolve('成功了');
});
let p1 = new Promise((resolve, reject) => {
    // reject 将 Promise 的状态修改为 `Rejected` 拒绝
    reject('拒绝了');
});
```
## 承诺状态回调
通过实例的 `then` 方法来接收回调，`then` 函数接受两个参数,分别是成功和拒绝的回调函数
```javascript
let p = new Promise((resolve, reject) => {
    // resolve 将 Promise 的状态修改为 `Fulfilled` 成功
    resolve('成功了');
});
p.then(res => {
    console.log('resolve=>', res);
}, err => {
    console.log('reject=>', err);
});
```
> 最终会触发的回调函数取决于 `Promise` 的状态

## 使用案例
```javascript
// Promise 简单封装 ajax
function ajax(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = 'json';
        xhr.onload = function() {
            if (this.status === 200) {
                resolve(this.response);
            } else {
                reject(new Error(this.statusText));
            }
        }
        xhr.send();
    });
}
```

## 链式调用
使用 `then` 方法链式调用来避免嵌套
```javascript
let p = new Promise((resolve, reject) => {
    resolve('promise');
});
let p2 = p.then(res => {
    console.log(res); //promise
})
console.log(p); // Promise {<fulfilled>: "promise"}
console.log(p === p2); //false
```
`Prmoise` 的实例调用 `then` 方法返回的也是一个新的 `Promise` 实例, 因为返回的是 `Promise` 所以可以继续使用 `then` 
```javascript
let p = new Promise((resolve, reject) => {
    resolve('promise');
});
p.then(res => {
    console.log(res); //promise
    return 'then1';
})
.then(res => {
    console.log(res); //then1
    return 'then2';
})
.then(res => {
    console.log(res); //then2
    return 'then3';
})
.then(res => {
    console.log(res); //then3
    return 'then4';
});

```
> 每一个 `then` 方法都会为下一个 `Promise` 实例 `then` 方法接收的参数做处理，整个过程完成就是一个链式调用的。如果 `then` 中不返回值，则默认返回 `undefined`

## 异常处理
`Promise` 中的异常处理, 在 `Promise` 的实例中出现异常会触发 `rejected` 回调：   
```javascript
let p = new Promise((resolve, reject) => {
    sss(); //调用了一个不存在的函数,会触发rejected回调
    resolve(11);
});
p.then(res => {
    console.log(res)
}, err => {
    console.error('发生错误：', err); // 发生错误： ReferenceError: sss is not defined
})
```
也可以使用 `Promise` 实例的 `catch` 方法来注册异常回调:   
```javascript
let p = new Promise((resolve, reject) => {
    sss(); //调用了一个不存在的函数,会触发rejected回调
    resolve(11);
});
p.then(res => {
    console.log(res);
})
.catch(err => {
   console.error('发生错误2：', err); //发生错误2： ReferenceError: sss is not defined
})
```
> 推荐使用 `catch` 来注册异常回调，如果同时使用两种方式，则 `then` 会失效.
```javascript
let p = new Promise((resolve, reject) => {
    resolve(11);
});
p.then(res => {
    sss(); //调用了一个不存在的函数,会触发rejected回调
    console.log(res);
})
.catch(err => {
   console.error('发生错误2：', err); //发生错误2： ReferenceError: sss is not defined
})
```
> 不管是 `Promise` 实例中，还是实例方法 `then` 中发生异常都会触发 `catch`， 推荐使用 `catch` 方法能更好的支持链式调用

**`then` 方法注册失败回调和 `catch` 注册失败回调区别？**

```javascript
let p = new Promise((resolve, reject) => {
    resolve(11);
});
p.then(res => {
    new Promise.reject('errr'); //使用 reject 静态方法快速注册一个 `rejected` 状态的 `Promise`
}, err => {
    console.log('reject', err); //这里不能捕获到 Promise.reject('errr')
});
```
```javascript
let p = new Promise((resolve, reject) => {
    resolve(11);
});
p.then(res => {
    new Promise.reject('errr'); //使用 reject 静态方法快速注册一个 `rejected` 状态的 `Promise`
})
.catch(err => {
    console.log('reject', err); //可以捕获到 Promise.reject('errr')
})
```
结论：通过 `then` 方法第二个参数注册失败回调只能捕获到当前 `Promise` 实例的异常，而 `then ` 是可以捕获到整个链条实例异常。

还可以在全局对象中注册一个 `unhandledrehection` 来捕获代码中没有手动处理的异常。
```javascript
window.addEventListener("unhandledrejection", event => {
  console.warn(`UNHANDLED PROMISE REJECTION: ${event.reason}`);
});
window.onunhandledrejection = event => {
  console.warn(`UNHANDLED PROMISE REJECTION: ${event.reason}`);
};
```
## 静态方法
`Promise` 包含以下静态方法：
* `Promise.resolve()` 快速将一个值转换成成功状态的 `Promise` 对象
* `Promise.reject()`  快速将一个值转换成失败状态的 `Promise` 对象
* `Promise.all()`    并行执行多个 `Promise` 实例 所有都成功执行成功
* `Promise.any()`   并行执行多个 `Promise` 实例 只要有一个返回成功,则就会返回该成功的 `Promise`
* `Promise.race()`   并行执行多个 `Promise` 实例 一旦有一个返回成功或者失败，则就执行该 `Promise`
* `Promise.allSettled()`   并行执行多个 `Promise` 实例，不管结果如何最终都会返回每个实例的成功失败的结果
```javascript
// Promise.resolve()
let p1 = Promise.resolve('p1');
p1.then(res => {
    console.log(res); // p1
});
// 如果接收参数是一个 Promise 对象则会原样返回
let p = new Promise((resolve, reject) => resolve('p'));
let p1 = Promise.resolve(p);
p1.then(res => {
    console.log(res); // p
});
// 如果接收参数是一个带有 then 方法的对象并且有成功和失败回调
let p2 = Promise.resolve({
    then: (resolve, reject) => {
        resolve('p2');
    }
});
p2.then(res => {
    console.log(res); // p2
});
```
> 对象如果实现了 `thenable` 接口也会被支持 `Promise`，这是为了兼容在原生没有实现 `Promise` 特性之前，有一些第三库实现了 `Promise` 对象，这样第三方实现的可以直接转换成原生 `Promise`
```javascript
// `Promise.reject()
let p2 = Promise.reject('p2');
p2.catch(res => {
    console.log('rejected', res); // rejected p2
});
```
```javascript
//Promise.all() 所有任务都执行完成才会进入then 或者 catch 回调
// 例如同时请求多个接口，必须等待最后完成的请求才能触发回调
let p1 = Promise.resolve('p1');
let p2 = Promise.resolve('p2');
Promise.all([p1, p2])
    .then(res => {
        console.log(res); // ["p1", "p2"]
    });

// 如果有一个为 `rejected` 则会触发 `catch`
let p3 = Promise.resolve('p3');
let p4 = Promise.reject('p4');
Promise.all([p3, p4])
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log('reject', err); //reject p4
    })
```
```javascript
// 只要有一个成功就返回，这里会直接输出 p3
let p3 = Promise.resolve('p3');
let p4 = Promise.reject('p4');
Promise.any([p3, p4])
    .then(res => {
        console.log(res); // p3
    })
    .catch(err => {
        console.log('reject', err); //不会执行
    })
```
```javascript
// 超过 500ms 没有相应则超时处理
const timeout = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, 'timeout');
});

const ajax = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, 'data');
});
Promise.race([timeout, ajax])
    .then(res => {
        console.log(res); // timeout
    });
```

```javascript
let p1 = Promise.resolve('p1');
let p2 = Promise.reject('p2');
Promise.allSettled([p1, p2])
    .then(res => {
        console.log(res); // [{status: "fulfilled", value: "p1"}, {status: "rejected", reason: "p2"}]
    });
```

## 实例方法 `finally`
无论状态为成功或者失败，最终都会执行 `finally`, 一般用于关闭资源或者重置状态工作
```javascript
let loading = true;
 Promise.resolve('p1')
    .then(res => {
        //
    })
    .catch(err => {
        //
    })
    .finally(() => {
        loading = false; //不管成功还是失败都需要关闭loading
    })
```

## 宏任务和微任务
`Promise` 和  `setTimeout` 都属于异步任务，如果在细分的话，`Promise` 属于微任务， `setTimeout` 属于宏任务，宏任务和微任务都是属于异步任务，那么他们有什么区别呢？
```javascript
console.log('start');
Promise.resolve()
    .then(() => {
        console.log('promise');
    })
console.log('end');
```
毫无疑问，上面例子执行顺序是 依次输出 `start end promise`，因为 `Promise` 是异步任务，会在主任务执行完成后执行。
再看下面例子：
```javascript
console.log('start');
setTimeout(() => {
    console.log('time');
}, 0)
Promise.resolve()
    .then(() => {
        console.log('promise');
    })
    .then(() => {
        console.log('promise1');
    })
console.log('end');
// 一次输出
// start
// end 
// promise
// promise1
// time
```
`Promise` 异步任务会在 `setTimeout` 之前执行，也就是算同样是异步任务，微任务会在宏任务之前执行。
宏任务就是我们说的回调消息队列 `Queue`，而微任务则会在 本轮调用栈 `call stack` 执行完成后执行，当微任务执行完成后再执行 消息队列任务也就是宏任务。也有一种说法：微任务就是调用栈的附属任务，每次调用栈执行完成都会执行附属任务。

## 微任务有哪些？
`Promise`，`MutationObserver` `Nodejs`中的 `process.nextTick`

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