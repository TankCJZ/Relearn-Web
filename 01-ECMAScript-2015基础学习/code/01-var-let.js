// var let 块级作用域
for (var i=0; i<3; i++) {
  for (var i=0; i<3; i++) {
    console.log('1=>', i);
  } 
}
// 0 1 2

for (let i=0; i<3; i++) {
  for (let i=0; i<3; i++) {
    console.log('2=>', i);
  } 
}
// 0 1 2
// 0 1 2
// 0 1 2

var elements = [{}, {}, {}];

// 作用域提升
for (var i=0; i<elements.length; i++) {
  elements[i].onClick = function () {
    console.log('3=>', i);
  }
}

elements[0].onClick(); //3
elements[1].onClick(); //3
elements[2].onClick(); //3

// 使用闭包或者let 创建一个块级作用域
for (var i=0; i<elements.length; i++) {
  (function (i) {
    elements[i].onClick = function () {
      console.log('4=>', i);
    }
  })(i)
}

elements[0].onClick(); //0
elements[1].onClick(); //1
elements[2].onClick(); //2


// 变量提升
console.log(a); //undefined
var a = 'name';

// 为什么在ES6中 官方不直接修复var 的问题而是引入新的let呢？应该需要兼容之前代码，如果修复var之前的代码就会出问题
