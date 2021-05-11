// const obj = {
//     name: 'js',
//     value: 'es2017',
// };
// console.log(Object.values(obj));

// console.log(Object.keys(obj));

// console.log(Object.entries(obj));

// let a = new Map(Object.entries(obj))
// console.log(a.get('name'));

// const o = {
//     name: 'js',
//     age: 'es2017',
//     get fullname() {
//         return this.name + this.age;
//     }
// }
// const o2 = Object.assign({}, o);

// o2.name = 'javascript';
// console.log(o2.fullname);

// const descriptor = Object.getOwnPropertyDescriptors(o);
// const o2 = Object.defineProperties({}, descriptor);
// console.log(o2); //

// const o2 = Object.create(
//     Object.getPrototypeOf(o),
//     Object.getOwnPropertyDescriptors(o)
//   );

//   o2.name = 'javascript';
// console.log(o2, o2.fullname);

const str1 = '5';
console.log(str1.padStart(2, '0'));

const date = {
    year: 2021,
    month: 5,
    day: 11,
}
console.log(`${date.year}/${String(date.month).padStart(2, 0)}/${date.day}`);

function foo1() {
    return new Promise((resolve, reject) => {
        console.log('foo1');
        resolve();
    })
}

async function foo2() {
    console.log('foo2');
}

async function main() {
    await foo1();
    await foo2();
}
main();