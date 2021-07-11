// 函数式编程

// 非函数式实现求和
let a = 1;
let b = 2;
let sum = a + b;
console.log(sum);

// 函数式实现
function Sum(a, b) {
    return a + b;
}
console.log(Sum(1,2));

function sum1(a, b) {
    return function () {
        return a + b;
    }
}

let s1 = sum1(1,2)
console.log(s1);

let arr = [1,2,3,4,5,6];
arr.forEach(item => {
    console.log(item);
})

function ajax(data, callback) {
    // ....
    // 模拟请求数据返回成功
    let res = {
        status: 200,
        data: data
    }
    callback(res);
}
ajax({name: 'js'}, function (res) {
    console.log(res);
})

// 函数作为返回值
function createSumFun () {
    return function (a, b) {
        return a + b;
    }
}
console.log(createSumFun()(1,2))

function once (fn) {
    if (typeof fn !== 'function') {
        throw Error(`${fn} must be a function`);
    }
    let isDone = false;
    return function () {
        if (!isDone) {
            isDone = true;
            return fn.apply(this, arguments);
        }
    }
}

let click = once(function (a) {
    console.log(`提交了${a}次`);
});
click(1);
click(2);
click(3);

let arr2 = [1,2,3,4,5];
for (let index = 0; index < arr2.length; index++) {
    console.log(arr2[index]);
}

arr2.forEach(function (item){
    console.log(item);
})

function ForEach(arr, fn) {
    let index = 0;
    let len = arr.length;
    while(index < len) {
        fn.call(this, arr[index]);
        index++;
    }
}

console.log('----------------------');
ForEach(arr2, item => {
    console.log(item);
})


// map
function map(array, fn) {
    let newArray = [];
    for (let item of array) {
        newArray.push(fn(item));
    }
    return newArray;
}
// let arr4 = [1,2,3,4,5];
// console.log(map(arr4, item => {
//     return item * item;
// })); //[ 1, 4, 9, 16, 25 ]
// console.log(arr4);

function some(array, fn) {
    let res = false;
    for (let item of array) {
        res = fn(item);
        if (res) {
            break;
        }
    }
    return res;
}

let arr4 = [10,2,3,1,3];
console.log(some(arr4, item => {
    return item > 0;
})); //true
console.log(some(arr4, item => {
    return item > 11;
})); //false