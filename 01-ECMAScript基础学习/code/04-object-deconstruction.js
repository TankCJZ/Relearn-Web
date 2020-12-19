// 对象的解构
// 1.只能按对象的属性来解构，不能自定义属性
const obj = {name: 'zero', age: 12};
let { name } = obj;
console.log(name); //zero

// 2.默认值 属性不存在可以设置默认值
let { sex = 12 } = obj;
console.log(sex); //12

// 3.不能重复定义
// let name = 'ss';
// let { name } = obj;
// console.log(name)

// 4.解构重命名
let { name: nickName} = obj;
console.log(nickName); //zero

// 5.重命名加设置默认值
let { name1: nickName1 = 'name1'} = obj;
console.log(nickName1); //name1

// 6.全部获取 rest
let { age, ...rest } = obj;
console.log(age, rest); //12 { name: 'zero' }