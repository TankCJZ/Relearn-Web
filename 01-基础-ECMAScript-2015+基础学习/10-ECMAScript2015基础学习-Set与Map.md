# Set 与 Map
新的数据结构类似于数组,`Set`存放的数据是唯一的，没有重复值，`Map`类似于对象存放键值对的集合，`hash`结构

## Set
`Set`集合，存放的数据是唯一的，没有重复值
* 创建`Set`实例
```javascript
// 可传入一个数组 如果有重复自动去重
let s = new Set([1,2,3,4,4]);
console.log(s); //Set(4) {1, 2, 3, 4}

// 可以对NaN去重
let s1 = new Set([NaN, NaN])
console.log(s1);

// 使用严格比较模式
let s2 = new Set([{}, {}]);
console.log(s2.size); //2

let s3 = new Set([null, undefined]);
console.log(s3.size); //2
```
* 添加数据 `add`
```javascript
let s = new Set();
s.add(1).add(2).add(3).add(1);
console.log(s); // Set(3) {1, 2, 3}

```
* 删除 `delete`
```javascript
let s = new Set();
s.add(1).add(2).add(3).add(1);
s.delete(1);
console.log(s); //Set(2) {2, 3}
```
* 获取成员总数 `size`
```javascript
let s = new Set();
s.add(1).add(2).add(3).add(1);
s.delete(1);
console.log(s.size); //2
```
* 检查是否存在某值 `has`
```javascript
let s = new Set();
s.add(1).add(2).add(3).add(1);
s.delete(1);
console.log(s.has(1)); //true
```
* 清除所有成员 `clear`
```javascript
let s = new Set();
s.add(1).add(2).add(3).add(1);
s.delete(1);
console.log(s.clear()); // 无返回值
console.log(s.size) // 0
```
* 遍历操作
```javascript
let s = new Set();
s.add(1).add(2).add(3).add(1);

// 遍历键名
for (let item of s.keys()) {
  console.log(item);
}

// 遍历值 Set键值是同一个所以相同
for (let item of s.values()) {
  console.log(item);
}

// 遍历键值对象
for (let [key, value] of s.entries()) {
  console.log(key, value); //11 22 33
}

// forEach
s.forEach(item => console.log(item)); //1 2 3

```
## Map
`Map`类似于对象存放键值对的集合，`hash`结构
```javascript
// old
let map = {}
map['key'] = 'value';
map[{name: 'tom'}] = 'tom';
map[{name: 'joker'}] = 'joker';

console.log(map); //{key: "value", [object Object]: "joker"}
```
> 使用object来模拟存在的问题，object的key只能是string类型，如果非string会进行隐式转换成string
```javascript
// now
let map = new Map();
let tom = {name: 'tom'};
let joker = {name: 'joker'};
map.set('key', 'value');
map.set(tom, 'tom');
map.set(joker, 'joker');
map.set({}, 'obj');

console.log(map.get(tom)); //tom
console.log(map.get(joker)); //joker
console.log(map.get({})); //undefined 注意key为对象时必须是同一个引用

```
> Map的键可以是各种数据类型，所以更适合做键值数据集合，注意key为对象时必须是同一个引用

## Map 基本使用
```javascript
let map = new Map();
// 添加数据
map.set('name', 'tom').set('key', 'value');
// 可以使用NaN，null undefined作为key
map.set(undefined, 1).set(NaN, 'nan');
// 获取数据
console.log(map.get('key'));
// 是否存在
console.log(map.has('key'));
// 删除
console.log(map.delete('key')); //返回是否删除成功
// 获取集合大小
console.log(map.size);
// 清空数据
console.log(map.clear());
```
## Map 遍历
```javascript

let map = new Map();
// 添加数据
map.set('name', 'tom').set('key', 'value').set(undefined, 1).set(NaN, 'nan');
// 遍历键名遍历器
for (item of map.keys()) {
  console.log(item)
}

// 遍历值 遍历器
for (item of map.values()) {
  console.log(item)
}

// 遍历键值集合 遍历器
for ([key, value] of map.entries()) {
  console.log(key, value)
}
```