// 闭包

// function init() {
//     var name = "Mozilla"; // name 是一个被 init 创建的局部变量
//     function displayName() { // displayName() 是内部函数，一个闭包
//         console.log(name); // 使用了父函数中声明的变量
//     }
//     displayName();
// }
// init();

function makeFunc() {
    var name = "Mozilla";
    function displayName() {
        console.log(name);
    }
    return displayName;
}

var myFunc = makeFunc();
myFunc();

// 闭包的应用
// 1.计数器的应用
function createCounter(init) {
    let total = init;
    return function (count) {
        total += count;
        return total;
    }
}

let counter1 = createCounter(0);
let counter2 = createCounter(10);

console.log(counter1(1));
console.log(counter1(1));
console.log(counter1(1));

console.log(counter2(10));
console.log(counter2(10));
console.log(counter2(10));