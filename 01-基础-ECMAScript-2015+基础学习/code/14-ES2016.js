const arr = [1, 2, 3, null, undefined, NaN];
// console.log(arr.includes(1));

// console.log(arr.includes(null));
// console.log(arr.includes(undefined));

// indexOf()
// console.log(arr.indexOf(1) > -1);
// console.log(arr.indexOf(NaN));

// console.log('12311212'.includes(123)); //true
// console.log(arr.indexOf(NaN) > -1); //false

// console.log('JavaScript'.includes('Ja')); //true
// console.log('JavaScript'.includes('ja')); //true

function foo(a) {
    console.log([].includes.call(arguments, 'js'));
}

foo('js');

console.log(Math.pow(2, 10));

console.log(2 ** 10);