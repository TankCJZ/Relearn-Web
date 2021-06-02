// console.log('task 1');
// for (let i = 0; i < 100000; i++) {
//     console.log('task 2'); //比较耗时的任务
// }
// console.log('task 3');

// console.log('start task');
// function foo() {
//     console.log('foo task');
// }
// function boo() {
//     console.log('boo task');
//     foo();
// }
// boo();
// console.log('end task');

console.log('start');
setTimeout(function timer1(){
    console.log('timer1');
}, 2000);
setTimeout(function timer2() {
    console.log('timer2');
    setTimeout(function timer3() {
        console.log('timer3');
    }, 1000)
}, 1000);
console.log('end');