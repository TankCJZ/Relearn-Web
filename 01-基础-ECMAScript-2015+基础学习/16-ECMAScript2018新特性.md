# ES2018新特性
* 异步迭代器 await/async
* Promise.finally
* Rest参数和扩展运算符
* 正则表达式： 命名捕获组 ，反向断言，dotAll模式，Unicode转义
* 非转义序列的模板字符串

## 异步迭代器 await/async
在同步循环代码中调用异步函数中可以使用该特性
```javascript
// ES2018之前
async function main() {
    for (let i of arr) {
        await doSomething();
    }
}
```
> 由于循环体本身就是同步执行，并且会在内部的 异步代码之前完成全部调用.

```javascript
// ES2018后
async function main() {
    for await (let i of arr) {
        doSomething();
    }
}
```
## Promise.finally
`Promise` 不管最终是否执行 `then` 或者是 `catch` ，我们都希望能执行一些清理工作代码，例如：清理数据，关闭连接，重置状态等
```javascript
Promise.resolve()
    .then()
    .then()
    .catch()
    .finally(() => {
        console.log('end')
    })
```

## Rest参数和扩展运算符
和数组一样使用 `...` 使用展开运算符，如下：
```javascript
const obj = {
    a: 1,
    b: 2,
    c: 3,
}
const { a, ...o } = obj;
// o 可以获取对象剩余属性
console.log(a, o); // 1 { b: 2, c: 3 }

// 使用场景：当我们需要做数据清理，剔除不需要的属性时候使用

// 也可以在函数参数时候使用
function main({ a, ...o }) {
    console.log(a, o); //1 { b: 2, c: 3 }
}
main(obj);

// 展开运算符只能实现对象的 浅拷贝
let person = {
    name: 'js',
};
let a = {
    width: 12,
    height: 20,
    person,
};
// 拷贝
let cloneA = {  ...a };
person.name = 'es';

// cloneA 的 person 会发生变化
console.log(cloneA, a);
```
> 展开运算符只能实现对象的 浅拷贝

## 正则表达式-命名捕获组
使用 `?<name>` 可给捕获括号 `(` 后命名，提高代码可读性，并且匹配失败会返回 `undefined`。
```javascript
// old
const reDate = /([0-9]{4})-([0-9]{2})-([0-9]{2})/,
  match  = reDate.exec('2018-04-30'),
  year   = match[1], // 2018
  month  = match[2], // 04
  day    = match[3]; // 30

// now
const
  reDate = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/,
  match  = reDate.exec('2018-04-30'),
  year   = match.groups.year,  // 2018
  month  = match.groups.month, // 04
  day    = match.groups.day;   // 30
```

## 正则表达式-dotAll模式
通过标记 `s` 允许终止符的出现
```javascript
// old
/java.script/.test('java\nscript'); //false

// now 增加标记符 `s`
/java.script/s.test('java\nscript'); //true
```

## 正则表达式 Unicode 转义
