
# 代理 Proxy

## ES6之前使用Object.defineProperty
在Vue2.x版本使用的就是该方法实现代理，只能拦截属性访问和修改，例如不能拦截数组的下标方式操作
```javascript
let o = {}
Object.defineProperty(o, 'name', {
  get() {
    console.log('get');
    return o._name;
  },
  set(value) {
    console.log('set', value);
    o._name = value;
  }
});
o.name = 222;
```
## Proxy代理
Proxy 也可以叫做拦截器，Proxy 可以拦截外接对对象的访问和修改，在Vue3.0版本使用是该对象来替换`defineProperty`   
* 第一个参数为需要代理的对象，
* 第二个参数代理的行为
```javascript
let o = {
  name: 'tom'
}
let proxyO = new Proxy(o, {
  get(target, propKey, receiver) {
    // target 需要代理的对象
    // propKey 当前操作的属性
    // receiver 当前代理器对象的实例
    console.log('get value', target, propKey, receiver)
  },
  set(target, propKey, value, receiver) {
    // target 需要代理的对象
    // propKey 当前设置的属性值
    // receiver 当前代理器对象的实例
    console.log('set value', target, propKey, value, receiver)
  },
  has() {
    // in 操作符的捕捉器。 xxx in Obj
  },
  apply() {
    // 函数调用操作的
  },
  construct() {
    // new 操作符的捕捉器 new XX();
  },
  defineProperty() {
    // Object.defineProperty 方法的捕捉器。
  },
  deleteProperty() {
    // 删除属性操作拦截器 o.delete
  },
  //...共13种拦截器
});

proxyO.name;
```

## defineProperty 和 Proxy区别
`defineProperty` 只能监听属性的读写 `Proxy` 能监听更多的操作，并且更好的支持属性的操作监听
```javascript
let arr = [1,2,3,4];

let arrProxy = new Proxy(arr, {
  set(target, propKey, value, receiver) {
    // propKey 此时未数组的下标
    console.log(propKey, value); //"0" 100 "4" 200 "length" 5
    return target[propKey] = value;
  }
});
arrProxy[0] = 100;
arrProxy.push(200); //数组长度增加了 触发'length'
```

# Reflect 静态对象
Reflect有和和Proxy一样为了可以操作对象而提供的一个新API，Reflect不是一个函数对象，因此它是不可构造的。
* Reflect.apply 对一个对象进行函数调用
* Reflect.get 获取对象某个属性值
* Reflect.has 判断对象是否存在某个属性
* Reflect.setPrototypeOf 设置目标对象的原型
* Reflect.getPrototypeOf 获取目标对象的原型对象
* Reflect.construct(target, args) 调用对象的构造函数 相当于 new Target(args)
* Reflect.deleteProperty(target, name) 删除对象的属性 相当于 delete target[name]
* Reflect.defineProperty(target, propKey, config)  定义对象属性 相当于Object.defineProperty()
* Reflect.getOwnPropertyDescriptor(target, propKey) 获取对象的属性的描述对象 相当于Object.getOwnPropertyDescriptor()
* Reflect.isExtensible(target) 检查对象是否可扩展 相当于Object.isExtensible
* Reflect.preventExtensible(target) 将对象设置为不可以扩展 相当于Object.preventExtensible
* Reflect.ownKeys(target) 返回对象的所有属性
* ...

## Reflect.apply(func, this, args)
调用对象的 apply方法
```javascript
// 调用对象的 apply方法
// old 
console.log.apply(console, ['name']); //name
// now
let s = Reflect.apply(console.log, console, ['name']); //name
```

## Reflect.get(target, name, receiver)
获取对象属性并返回对应的值，不存在则返回`undefined`
```javascript
// target 必须是对象 
console.log(Reflect.get(console, 'log')); //ƒ log() { [native code] }
```

## Reflect.has(target, name)
检查对象是否存在某个属性,存在返回`true`否则返回`false`
```javascript
console.log(Reflect.has(console, 'log')); //true
console.log(Reflect.has(console, 'getName')); //false
```

## Reflect.setPrototypeOf(target, prototype)
设置对象的原型对象,`target`必须是对象，如果设置失败会返回`false`
```javascript
// old
let o = {};
let o1 = {};
o1.prototype = {
  getName() {
    console.log('name')
  }
}
Object.setPrototypeOf(o, o1.prototype);
o.getName(); // name


// now
let o = {};
let o1 = {};
o1.prototype = {
  getName() {
    console.log('name')
  }
}
Reflect.setPrototypeOf(o, o1.prototype);
o.getName(); // name

Reflect.setPrototypeOf(null, {})// 报错

Reflect.setPrototypeOf(Object.freeze({}), null); //冻结对象不能修改 返回 false
```