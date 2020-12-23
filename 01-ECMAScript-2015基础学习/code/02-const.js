// const
// 1.const 不能先定义后修改
// const name;
// name = 1; //Missing initializer in const declaration

// 2.const 定义后不能修改指向的内存地址，可以修改内存的值
const o = {};
o.name = 'zhangsan';
console.log(o); //{ name: 'zhangsan' }
// o = {}; //重新定义会使用新的内存地址 //Assignment to constant variable.

// 3.最佳实践 不使用var 使用let 和 const， let遵循先定义后使用原则，const 的使用取决你是否需要修改