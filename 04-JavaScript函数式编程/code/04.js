// 纯函数
let arr = [1,2,3,4,5,6];
// console.log(arr.map(item => item * 2));
// console.log(arr.map(item => item * 2));
// console.log(arr.map(item => item * 2));
// console.log(arr);


console.log('--------------纯函数--------------');
console.log(arr.splice(0, 1));
console.log(arr.splice(0, 1));
console.log(arr.splice(0, 1));
console.log(arr)

console.log('-------------实现带缓存功能的函数---------------');

// 实现带缓存功能的函数
function memoize(fn) {
    let cache = new Map();
    return function () {
        let key = JSON.stringify(arguments);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const res = fn.apply(fn, arguments);
        cache.set(key, res);
    }
}

// 测试
function sum(a, b) {
    console.log('执行了sum函数')
    return a + b;
}

let sumMemoize = memoize(sum);
sumMemoize(1,2); // 执行了sum函数
sumMemoize(1,2); // 
sumMemoize(1,2); //