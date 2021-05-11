# ECMAScript 2017 新特性
ES2017 是一个小版本的更新，只增加一些新的 `API`.

## Object.values
以数组的形式返回对象的 `value` 值
```javascript
const obj = {
    name: 'js',
    value: 'es2017'
};
console.log(Object.values(obj)); //['js', 'es2017']
```

## Object.keys
同理以数组的形式返回的对象 `key` 值
```javascript
const obj = {
    name: 'js',
    value: 'es2017'
};
console.log(Object.keys(obj)); //['name', 'value']
```

## Object.entries
返回对象的 `key` 和 `value` 值，返回值为一个二维数组
```javascript
const obj = {
    name: 'js',
    value: 'es2017'
};
console.log(Object.entries(obj)); // [ [ 'name', 'js' ], [ 'value', 'es2017' ] ]
```

## Object.getOwnPropertyDescriptors
方法用来获取一个对象的所有自身属性的描述符。
为了解决 `Object.assign()` 方法只能浅拷贝对象自身可枚举属性，并且访问器属性会被转成数据属性，如下例子：
```javascript
const o = {
    name: 'js',
    age: 'es2017',
    get fullname() {
        return this.name + this.age;
    }
}
console.log(o.fullname); //jses2017

const o2 = Object.assign({}, o);
// fullname无法拷贝，北城
console.log(o2); //{ name: 'js', age: 'es2017', fullname: 'jses2017' }
```

### `fullname` 无法拷贝变成了数据属性
这样会导致什么问题呢？ `fullname` 值不会跟随 `name` `age` 变化而生成新的值
```javascript
const o = {
    name: 'js',
    age: 'es2017',
    get fullname() {
        return this.name + this.age;
    }
}
const o2 = Object.assign({}, o);

o2.name = 'javascript';
console.log(o2.fullname); //jses2017
```

### 如何能实现 `get` 函数拷贝
通过 `getOwnPropertyDescriptors` 获取对象描述再重新设置给新的对象
```javascript
// 方式一
const o = {
    name: 'js',
    age: 'es2017',
    get fullname() {
        return this.name + this.age;
    }
}
const descriptor = Object.getOwnPropertyDescriptors(o);
const o2 = Object.defineProperties({}, descriptor);
console.log(o2); //{ name: 'js', age: 'es2017', fullname: [Getter] }

o2.name = 'javascript';
console.log(o2.fullname); //javascriptes2017

// 方式二 来自 MDN
const o2 = Object.create(
    Object.getPrototypeOf(o),
    Object.getOwnPropertyDescriptors(o)
  );

  o2.name = 'javascript';
console.log(o2.fullname); // javascriptes2017
```
> 以上两种方式都是使用到了 `getOwnPropertyDescriptors` 来保留 `get`

## 字符串填充
字符串左侧开始填充`String.prototype.padStart`， 和字符串右侧开始填充`String.prototype.padEnd`.   
`str.padStart(targetLength [, padString])`
接受两个参数：
* `targetLength` 需要填充目标的长度
* `padString` 填充的字符串，可选，默认值 ''
```javascript
// padStart
const str1 = '5';
console.log(str1.padStart(2, '0')); //05

// 日期格式
const date = {
    year: 2021,
    month: 5,
    day: 11,
}
console.log(`${date.year}/${String(date.month).padStart(2, 0)}/${date.day}`); //2021/05/11 
```

## `async` 和 `await`
解决异步编程回调的问题，本质上是 `Promise` 的一种语法糖，详细笔记将在异步编程模块记录。
```javascript
function foo1() {
    return new Promise((resolve, reject) => {
        console.log('foo1');
        resolve();
    })
}

async function foo2() {
    console.log('foo2');
}

async function main() {
    await foo1(); //foo1
    await foo2(); //foo2
}
main();
```
> `foo1` 写法等级于 `foo2`