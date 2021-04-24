# 迭代器
`JavaScript` 中的迭代器有很多，常用的 `for in` 或者是普通的 `for` 再或者是数组的迭代器方法 `forEach, map, some, every` 等

## for of
在 `ES6` 中新增了一个迭代器 `for of`, 它和 `for in` 有什么区别呢？   
来自 `MDN`:   
> `for in` 以任意顺序来迭代对象的可枚举属性。
> `for of` 语句遍历可迭代对象定义要迭代的数据。

如何理解 `for in` 迭代对象可枚举属性呢？看下面例子
```javascript
// 数组
const arr = [1,2,3];
for (const key in arr) {
    console.log(key);
}
// 0 1 2 不符合预期

// 字符串数组
const arr = ['name','age','size'];
for (const key in arr) {
    console.log(key);
}
// 0 1 2 不符合预取

// 对象-属性都是可迭代
const arr = {
    name: 'zhansan',
    age: 12,
    size: 20
};
for (const key in arr) {
    console.log(key);
}
// name age size 符合预取

// 对象-包含不可迭代属性
const arr = {
    name: 'zhansan',
    age: 12,
    size: 20
};
Object.defineProperty(arr, 'color', {
    value: 'red',
    enumerable: false, // 不可枚举
})
for (const key in arr) {
    console.log(key);
}
// name age size 不符合预取
```
> `for in` 更多的是来迭代对象的属性

再用 `for of` 来看看下面的例子：
```javascript
// 数组
const arr = [1,2,3];
for (const key of arr) {
    console.log(key);
}
// 1 2 3
// 字符串数组
const arr = ['name','age','size'];
for (const key of arr) {
    console.log(key);
}
// name age size
// 对象
const obj = {
    name: 'zhansan',
    age: 12,
    size: 20
};
for (const key of obj) {
    console.log(key);
}
// 报错 TypeError: arr is not iterable
```
除了对象外都是可迭代的，也就是说对象 `arr` 并没有定义可迭代的数据所以不能迭代。


## `for of` 可以迭代哪些数据呢？
* 数组、字符串、类型化数组(TypeedArray)、Map、Set、`Arguments`、DOM集合、迭代生成器。
```javascript
// 迭代 arguments
function main() {
    for (const iterator of arguments) {
        console.log(iterator);
    }
}
main(1,2);
// 1 2
// 迭代 Map 输出Key-Value
const arr = new Map();
arr.set('name', 'zhangsn');
arr.set('age', 24);
for (const iterator of arr) {
    console.log(iterator);
}
// [ 'name', 'zhangsn' ]
// [ 'age', 24 ]
// 迭代 Set 输出每个value
const arr = new Set();
arr.add('name');
arr.add({size: 12});
for (const iterator of arr) {
    console.log(iterator);
}
// name
// { size: 12 }
```

## 为什么 `for of` 不能遍历对象呢？
`for of` 遍历对象报错 `arr is not iterable` 也就是说 `arr` 不是一个可迭代的，那是因为 `arr` 没有实现 `iterable` 接口。

## `iterable` 迭代接口
`iterable` 是 `ES6` 提供了一个统一的迭代接口，是要实现了该接口就能被 `for of` 迭代。   
也就是说 数组 内部就实现了 `iterable` 接口，我们不妨来看看它是如何实现的？浏览器控制台输出 `[]`，在 `[]` 的原型中有一个 `Symbol(Symbol.iterator)` 属性，我们可以输出看下：

```javascript
console.log([][Symbol.iterator]);
// ƒ values() { [native code] }
console.log([][Symbol.iterator]());
// Array Iterator {}

// 获取数组的迭代器对象
let arr = [{name: 11}, 22, 33];
const iterator = arr[Symbol.iterator]();
// 调用迭代器的 next 方法
console.log(iterator.next());
// {done: false, value: {name: 11}}

console.log(Object[Symbol.iterator]);
// undefined
```
> `Object` 没有实现 `iterator` 接口
迭代器 `next` 输出一个对象 其中一个属性 `done` 表示是否迭代完成, `value` 为当前迭代的值。

## 如何实现 `iterable` 接口
`iterator` 必须有一个 `next` 方法用来遍历，每次遍历返回一个对象，对象属性包含 `done` 和 `value`:
```javascript
const obj = {
    // 实现迭代器接口
    [Symbol.iterator]() {
        return {
            i: 0,
            // next 方法
            next() {
                if (this.i < 3) {
                    // 返回值
                    return { value: this.i++, done: false };
                }
                // 返回值
                return { value: undefined, done: true };
            }
        }
    }
};
for (var value of obj) {
  console.log(value);
}
// 0 1 2
```
## 为什么需要实现迭代器
这里也是一个典型的设计模式 **迭代器** 模式，试想一个场景，我们需要遍历对象：
```javascript
const obj = {
    arr1: [1, 2, 4]
}
// 非迭代器模式 通过.arr1来遍历
for (let a of obj.arr1) {
    console.log(a);
}
```
如果 `obj` 新增一个数据 `arr2` 也需要遍历，则又需要增加一个 `arr2` 的遍历：
```javascript
const obj = {
    arr1: [1, 2, 4],
    arr2: ['age', 'name']
}
// 非迭代器模式 通过.arr2来遍历
for (let a of obj.arr2) {
    console.log(a);
}
```
如果 `obj` 使用了迭代器模式，只需要内部实现一个 `iterator` 接口，则遍历者就不需要在区关心 `obj` 的具体数据结构，只需要迭代一次即可，这就是迭代器模式的好处
```javascript
const obj = {
    arr1: [1, 2, 4],
    arr2: ['name', 'age'],
    [Symbol.iterator]() {
        const arr = [].concat(this.arr1, this.arr2);
        let index = 0;
        return {
            next() {
                while (index < arr.length) {
                    return {
                        done: false,
                        value: arr[index++],
                    }
                }
                return {
                    done: true,
                    value: null,
                }
            }
        }
    }
};
// 迭代器模式
for (const iterator of obj) {
    console.log(iterator);
}
// 1 2 4 name age
```
## 总结
`ES6` 中的迭代器内部是通过调用统一的 `iterator` 接口来实现迭代，可以通过 `Symbol.iterator` 来实现或者是重写迭代器，除对象外建议使用 `for of` 来遍历数据。