let name = Symbol('name');
module.exports = {
    [name]: 'zhangsan',
    getName() {
        return this[name]
    }
}