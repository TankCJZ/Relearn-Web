const person = require('./11-moduleA');
let s1 = Symbol();

console.log(s1);

let s2 = Symbol('s2');
112
console.log(s2);

let s3 = Symbol.for('s3');
console.log(s3);

let o1 = {
    [Symbol()]: 'name',
}
console.log(o1)

console.log(person.getName())
console.log(person[Symbol('name')]);

let s4 = Symbol();
let s5 = Symbol();
console.log(s4 === s5); //false

let s6 = Symbol.for('s6');
let s7 = Symbol.for('s6');
console.log(s6 === s7); //false

let b1 = Symbol('b1');
let b2 = Symbol('b2');
console.log(b1 === b2); //false

let a6 = Symbol.for(true);
let a7 = Symbol.for('true');
console.log(a7 === a6); //true

console.log(JSON.stringify({[Symbol('key')]: 'value'}));

let obj = {};
console.log(obj.toString());
obj[Symbol.toStringTag] = 'obj';
console.log(obj.toString()); //[object obj]


let arr = {
    name: 'zhangsan',
    age: 12,
};
arr[Symbol.iterator] = function* () {
    yield 1;
    yield arr.name;
    yield arr.age;
}
console.log([...arr]);