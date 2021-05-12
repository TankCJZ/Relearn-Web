// const obj = {
//     a: 1,
//     b: 2,
//     c: 3,
// }
// const { a, ...o } = obj;
// // console.log(a, o);

// function main({ a, ...o }) {
//     // console.log(a, o);
// }
// main(obj)

let person = {
    name: 'js',
};
let a = {
    width: 12,
    height: 20,
    person,
};
// 拷贝
let cloneA = {  ...a };
person.name = 'es';
console.log(cloneA, a);

console.log(/java.script/s.test('java\nscript'))