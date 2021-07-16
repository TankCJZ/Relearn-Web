const _ = require('lodash');

// 定义三个函数
const reverse = array => array.reverse();
const first = array => array[0];
const upper = s => s.toUpperCase();

// 使用函数组合 先反转函数在取出第一个转为大小
// const flow = _.flow(reverse, first, upper);

const flow = compose(reverse, first, upper);
console.log(flow(['a', 'b', 'c'])); //C

console.log('---------------组合函数的实现---------------')
// 组合函数的实现
function compose(...args) {
    return v => {
        return args.reduce((res, fn) => {
            return fn(res);
        }, v)
    }
}

console.log('---------------结合律---------------')

// const res1 = _.flow(_.flow(_.reverse, _.first), _.toUpper)(['a', 'b', 'c']);
// const res2 = _.flow(_.reverse, _.flow(_.first, _.toUpper))(['a', 'b', 'c']);
// console.log(res1 === res2);

let res1 = _.flow(_.reverse, _.first, _.toUpper);


// 增加一个中间调试函数即可
const log = v => {
    console.log(v);
    // 需要返回当前参数给下一个函数执行
    return v;
}

// 柯里化
const trace = _.curry(function (name, v) {
    console.log(name, v)
    return v;
})


res1 = _.flow(_.reverse, trace('反转结果'), _.first, trace('first 结果'), _.toUpper); // [ 'c', 'b', 'a' ]  
console.log(res1(['a', 'b', 'c'])); //C 
