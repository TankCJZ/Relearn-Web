# Class 类
通过`class`定义一个类，也可以叫做`function`的语法糖

## 基本使用
```javascript
// old
function Person(name) {
  this.name = name;
}
Person.prototype.toString = function () {
  console.log(this.name)
}
let p = new Person('tom'); //tom
p.toString(); //string=> tom

// now
class Person {
  constructor(name) {
    this.name = name;
  }
  toString() {
    console.log('string=>', this.name)
  }
}
let p = new Person('tom');
p.toString(); //string=> tom
```

## 获取实例属性 get
```javascript
class Person {
  get name() {
    return 'tom'
  }
}
let p = new Person()
p.name; //tom
```

## 静态属性(提案)
`static`可以给属性或者方法设置未静态
```javascript
class Person {
  static name = 'tom';
  static getName() {
    console.log('static getName'); 
  }
}
Person.name; //tom
Person.getName(); //static getName
```

## 私有属性(提案)
```javascript
class Person {
  #name = 'private a';
  get name() {
    return this.#name;
  }
}
new Person().name; //private a
```

## 继承 `extends`
使用关键字`extends`实现类之间的继承
```javascript
// old 组合继承
function Person(name) {
  this.name = name;
}
function Child(name, age) {
  Person.call(this, name);
  this.age = age;
}
new Child('tom', 12); //Child {name: "tom", age: 12}

// now
class Person {
  constructor(name) {
    this.name = name;
  }
}
class Child extends Person {
  constructor(name, age) {
    super(name);
    this.age = age;
  }
}
new Child('tom', 20);
```

## new.target
在构造函数判断是否是通过`new`或者`Reflect.constructor`创建
```javascript
// old
function Person(name) {
  if (new.target === Person) {
    this.name = name;
  } else {
    console.log('请使用new创建实例化函数')
  }
}
Person('name'); //请使用new创建实例化函数
new Person('tom'); //Person {name: "tom"}

// now 
class Person {
  constructor(name) {
    console.log(new.target === Person); //true
    this.name = name;
  }
}
new Person();

```
**如果是子类继承Person 则new.target是返回子类的**
```javascript
class Person {
  constructor(name) {
    console.log(new.target === Person); //false
    this.name = name;
  }
}
class Child extends Person {

}
new Child();
```
> 该方法可以用来限制 必须 继承才能创建类
