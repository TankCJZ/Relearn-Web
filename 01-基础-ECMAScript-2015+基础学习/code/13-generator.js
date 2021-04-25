function * g() {
    console.log('g');
    return 123;
}
const result = g();
console.log(result);
console.log(result.next());
console.log(result.next());


console.log('================')
function * g2() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
}
const generator = g2();
console.log(generator.next());
console.log(generator.next());
console.log(generator.next())
console.log(generator.next())

console.log('一个生成器的实现=============');
function * createId() {
    let id = 1;
    while(true) {
        yield id++;
    }
}
const cid = createId();
console.log(cid.next());
console.log(cid.next());
console.log(cid.next());