# 字符串模板

## 支持插值
```javascript
const name = 'zhangsan';
let tmpStr = `name is ${name}`;
console.log(tmpStr);
```

## 支持换行
```javascript
// ES6之前 换行需要使用\n
console.log('换行 \n下一行');

// ES6
console.log(`换行
adad`);
```

## 标签化模板
在模板之前之前可以使用一个标签函数，改函数被调用时接受模板字符串参数   
* 第一个参数为模板字符串通过`${}`切割后的数组
* 第二个参数为插值
```javascript

function tag(strArr, name) {
  console.log(strArr, name); // ["hello ↵ ", "", raw: Array(2)] 'tom'
}

let name = 'tom';
let str = tag`hello \n ${name}`;

```
> 标签化模板通常可以用来二次处理字符串

## 获取原始值
如果字符串中出现换行，可通过`String.raw`可以获得模板字符串原始值   
```javascript
//format: hello 
// world
console.log('format:', `hello \n world`);
console.log('rawString', String.raw`hello \n world`); //rawString hello \n world
```