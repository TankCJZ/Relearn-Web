## 使用`var`定义变量   
```javascript
for (var i=0; i<3; i++) {
  for (var i=0; i<3; i++) {
    console.log(i);
  } 
}
// 0 1 2
```
what,上面代码并没有输出我们预期的结果？   
看下MDN上`var`解释：   
> var声明变量会在执行任何代码之前处理，其作用域是在它当前的执行上下文，它可以是嵌套的函数，或者对于声明在任何函数外的变量来说是全局，赋值给未声明的变量会被隐式的创建成全局变量

## 再看上面代码：   
* 变量i只会在自己的作用域上下文也就是(window)中，所有这里共用的是同一个i
* 在第一次内层循环后，i变成了3,所以第二次外层循环时候不成立，会执行i++,此时i为4,内层循环不成立所以不会执行了

```javascript
for (var i=0; i<3; i++) {
  for (var i=0; i<3; i++) {
    console.log(i);
  }
  console.log(i)
}
console.log(i);
// 输出 0 1 2 3 4
```

## 作用域提升
作用域是在它当前的执行上下文,也就是`window`上：   
```javascript
var elements = [{}, {}, {}];
for (var i=0; i<elements.length; i++) {
  elements[i].onClick = function () {
    console.log('3=>', i);
  }
}

elements[0].onClick(); //3
elements[1].onClick(); //3
elements[2].onClick(); //3
```

## 变量提升
> var声明会在所有代码之前处理，所以这里不会报错,在严格模式下是会报错的
```javascript
console.log(a); //undefined
var a = 'name';
```

## let 定义变量
为了解决`var`问题而生的，`let`定义变量会声明一个块级作用域变量，并且可选初始化一个值。   

MDN描述：   
> let允许你声明一个作用域被限制在 块级中的变量、语句或者表达式。与 var 关键字不同的是， var声明的变量只能是全局或者整个函数块的。 var 和 let 的不同之处在于后者是在编译时才初始化

## let var 不同处？
* var 在执行代码前处理,可以重复声明,会变成全局变量,声明全局会给全局对象增加属性,作用域在整个封闭函数
* let 在编译时候初始化，不能重复声明，全局声明不会给全局对象增加属性,作用域在声明的块，或者字块

## const 声明常量
const 定义常量后不能再次修改其指向的内存地址，但是可以修改内存值。   
const 不能先定义后赋值

```javascript
//const 不能先定义后赋值
const a;
a = 123;
// Missing initializer in const declaration

//定义常量后不能再次修改其指向的内存地址，但是可以修改内存值。
const obj = {};
obj.a = 123; //可以修改值

obj = null; //错误，重新赋值会修改内存地址

```
## 最佳实践
* 不使用var 使用let 和 const
* let遵循先定义后使用原则
* const 的使用取决你是否需要重新赋值

