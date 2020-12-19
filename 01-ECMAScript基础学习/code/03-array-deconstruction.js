// 数组解构
let arr = [100, 200, 300];

// 1.获取所有的数据
let [name, age, sex] = arr;
console.log(name, age, sex); //100, 200, 300

// 2.只获取一个数据
let [, , a] = arr;
console.log(a); //300

// 3.获取剩余的数据 rest
let [s, ...rest] = arr;
console.log(rest); //[200, 300]

// 4.解构成员大于数组长度时候  不存在的下标的返回undefined
let [a1, a2, a3, a4] = arr;
console.log(a1, a2, a3, a4); //100 200 300 undefined

// 5.给提取的成员设置默认值
let [b1, b2, b3, b4 = 'none'] = arr;
console.log(b1, b2, b3, b4); //100 200 300 none


// 6.案例：拆分字符串
let [root, , path] = 'www/user/arr'.split('/');
console.log(root, path); //www arr
