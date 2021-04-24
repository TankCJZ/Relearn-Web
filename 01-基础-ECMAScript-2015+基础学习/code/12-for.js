const obj = {
    arr1: [1, 2, 4],
    arr2: ['name', 'age'],
    [Symbol.iterator]() {
        const arr = [].concat(this.arr1, this.arr2);
        let index = 0;
        return {
            next() {
                while (index < arr.length) {
                    return {
                        done: false,
                        value: arr[index++],
                    }
                }
                return {
                    done: true,
                    value: null,
                }
            }
        }
    }
};
// 非迭代器模式
for (const iterator of obj) {
    console.log(iterator);
}