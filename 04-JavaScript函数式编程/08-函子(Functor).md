## 什么是函子(`Functor`)
* 容器：包含值和值的变形关系（这个变形关系就是函子）
* 函子：是一个特殊的容器，通过一个普通的对象来实现，该对象具有 `map` 方法，`map` 方法可以运行一个函数对值进行处理（变形关系）
通俗来讲，函子的作用就是为了处理函数式编程中出现的一些副作用，比如说异常处理，异步操作。

## 代码演示函子
* 函子首先必须是一个对象容器
```javascript
class Functor {

}
```
* 函子对象中需要维护一个值,不对外开放，是内部维护的。
```javascript
class Functor {
    constructor(value) {
        this._value = value;
    }
}
```
* 具有一个 `map` 方法, `map` 是一个纯函数，接受一个函数类型参数来处理内部维护的值,并且会返回一个新的函子
```javascript
class Functor {
    constructor(value) {
        this._value = value;
    }
    map(fn) {
        // 返回一个新的函子
        return new Functor(fn(this._value))
    }
}
```
* 使用函子
```javascript
class Functor {
    constructor(value) {
        this._value = value;
    }
    map(fn) {
        // 返回一个新的函子
        return new Functor(fn(this._value))
    }
}

let res = new Functor(10)
    .map(v => v + 10) // 10 + 10 = 20
    .map(v => v * 10) // 20 * 10 = 200
console.log(res); //Functor { _value: 200 }
```
> `map` 始终都是返回一个新的 `Functor` 对象。

* 使用静态方法
```javascript
class Functor {
    static of(value) {
        return new Functor(value);
    }
    constructor(value) {
        this._value = value;
    }
    map(fn) {
        // 返回一个新的函子
        return this.of(fn(this._value))
    }
}
let res = Functor.of(10)
    .map(v => v + 10) // 10 + 10 = 20
    .map(v => v * 10) // 20 * 10 = 200
console.log(res); //Functor { _value: 200 }
```

## 函子总结
* 函数式编程的运算不直接操作之，而是又函子完成
* 函子就是一个实现了 `map` 锲约的对象
* 可以把函子想象成一个盒子，里面封装了一个值，只能使用 `map` 去修改值，而且盒子是无法打开的
* 每次修改都是返回新的值盒子