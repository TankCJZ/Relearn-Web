
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

# Reflect 静态类
Reflect有和和Proxy一样为了可以操作对象而提供的一个新API
* 