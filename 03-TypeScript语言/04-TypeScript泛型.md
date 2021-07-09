
## 泛型
泛型是一个比较难用语言描述的类型，它的特性是，在定义接口或函数、类的时候没有指定具体的类型，而是在使用的时候来确定类型。如下例子：   
```typescript
// 定义一个创建指定长度数字数组 返回数字数组
function createArray(length: number, value: number): Array<number> {
  const arr = Array<number>(length).fill(value);
  return arr;
}

console.log(createArray(3, 10)); //[ 10, 10, 10 ]
```
如果我们想创建 字符串或者其他类型呢？ 就必须重写，将 value 类型定义成我们需要的
```typescript
function createArray2(length: number, value: string): Array<string> {
  const arr = Array<string>(length).fill(value);
  return arr;
}
console.log(createArray2(3, 'arr')); //[ 'arr', 'arr', 'arr' ]
```
有了泛型后就不用这么麻烦了   
在函数名称后面使用尖括号来定义泛型，如下：   
```typescript
function createArray3<T>(length: number, value: T): Array<T> {
    const arr = Array<T>(length).fill(value);
    return arr;
}
```
使用的时候也是在函数名称后面来指定具体类型在尖括号里面，这个类型具体后面使用 `T` 的参数类型   
```typescript
// T 为 number 类型，第二个参数就必须为 number
console.log(createArray3<number>(3, 10)); //[ 10, 10, 10 ]
// T 为 string 类型，第二个参数就必须为 string
console.log(createArray3<string>(3, 'arr')); //[ 'arr', 'arr', 'arr' ]
```
> 泛型的使用可以减少代码量，很好复用的。