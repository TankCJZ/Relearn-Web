function createObj(o1, o2) {
    o1.o2 = o2;
    o2.o1 = o1;

    return {
        obj1: o1,
        obj2: o2,
    }
}
let obj = createObj({name: 'o1'}, {name: 'o2'});
delete obj.obj1
delete obj.obj2.o1;
console.log(obj.obj2);