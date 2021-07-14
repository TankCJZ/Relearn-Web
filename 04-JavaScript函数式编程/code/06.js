let count = 20;
function checkSize(num) {
    return num > count;
}

console.log(checkSize(10))

console.log('-----------改造成纯函数----------');
// 改造成纯函数
function checkSize2(num, count) {
    return num > count;
}

console.log(checkSize2(10))

console.log('-----------柯里化----------');

function checkSize3(count) {
    return function (num) {
        return num > count;
    }
}
const checkSize4 = count => (num => num > count);
let c = checkSize3(20);
console.log(c(10));
console.log(checkSize3(20)(10));

const _ = require('lodash');
function sum(a, b, c) {
    return a + b + c;
}
let currySum = _.curry(sum);
console.log(currySum(1,2,3)); //6
console.log(currySum(1)(2,3)); //6
console.log(currySum(1,2)(3)); //6

console.log('---------------柯里化应用---------------------')

// 定义一个根据正在匹配的字符串的函数 纯函数
function match(reg, str) {
    return str.match(reg);
}

// 柯里化macth函数
const curryMatch = _.curry(match);
// 匹配数字的函数
const hasNumber = curryMatch(/\d+/g);
// 匹配空格的函数
const hasSpace = curryMatch(/\s+/g);
// 测试
console.log(hasNumber('hello12')); // ['12']
console.log(hasNumber('hello wrld')); //null
console.log(hasSpace('hello12')); // null
console.log(hasSpace('hello wrld')); //[' ']

console.log('---------------柯里化应用2---------------------')
// _.curry 可以直接传递一个函数
// 柯里化 filter
const filter = _.curry((fn, arr) => arr.filter(fn));
// 找出数组中是否有包含数字的项
const filterNumber = filter(hasNumber);
// 找出数组中是否有包含空格的项
const filterSpace = filter(hasSpace);

console.log(filterNumber(['1', 'a', 'b'])); //[ '1' ]
console.log(filterSpace(['1', ' ', 'b'])); //[ ' ' ]

console.log('---------------实现柯里化---------------------')
function curry(fn) {
    return function curried(...args) {
        // 如果传递的参数 小于 总共参数数量 则会返回一个 新的带剩余参数的函数并且返回函数结果
        if (args.length < fn.length) {
            // 返回一个新的函数 
            return function () {
                // 函数需要返回所有参数的最终执行结果
                return curried(...args.concat(Array.from(arguments)));
            }
        }
        // 否则的话就直接返回函数执行结果
        return fn(...args);
    }
}