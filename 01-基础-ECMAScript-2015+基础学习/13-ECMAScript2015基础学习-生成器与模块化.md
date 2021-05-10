# 生成器
生成器函数提供了一个强大的选择：它允许你定义一个包含自有迭代算法的函数， 同时它可以自动维护自己的状态。 生成器函数使用 function*语法编写。
生成器也就是我们常说的 `function*` 函数，函数第一次调用会返回一个 `Generator` 迭代器，再次调用会返回 `yield` 关键字的值。
例子：
```javascript
function * g() {
    console.log('g');
    return 123;
}
const result = g();
// 返回 Generator 对象
console.log(result); // Object [Generator] {}

// 调用next
console.log(result.next());
// g
// { value: 123, done: true }

// 再次调用next
console.log(result.next());
// { value: undefined, done: true }
```
> 说明生成器 也实现了 迭代器 `iterator` 接口，有相同的 `next` 和相同的返回值数据结构 `done` `value`

## 使用 `yield`
`yield` 是在生成器中使用的关键字，每次的 `yield` 将会作为 `next` 的结果返回，如下例子：
```javascript
function * g2() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
}
const generator = g2();
console.log(generator.next());
console.log(generator.next());
console.log(generator.next());
console.log(generator.next());
// { value: 1, done: false }
// { value: 2, done: false }
// { value: 3, done: false }
// { value: 4, done: false }
```
> 生成器函数 `generator` 最大特点是惰性执行，每次 `next` 只会执行一个 `yield`
## 生成器的应用
一个生成器的实现：
```javascript
function * createId() {
    let id = 1;
    while(true) {
        yield id++;
    }
}
const cid = createId();
console.log(cid.next());
console.log(cid.next());
console.log(cid.next());
```
> 每次调用 `cid.next()` 会生成一个新的 `id`, 无需担心 `while(true)` 会死循环，因为每次执行一次 `yield` 函数会暂停，等待下一次 `next`。
生成器还有一个作用就是解决 `JavaScript` 回调嵌套的问题。

## 模块化
模块化将以单个模块形式记录，包含 `JavaScript` 模块化的发展史。
