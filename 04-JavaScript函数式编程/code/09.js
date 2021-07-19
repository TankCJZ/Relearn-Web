// MayBe
class MayBe {
    static of(value) {
        return new MayBe(value);
    }
    constructor(value) {
        this._value = value;
    }
    map(fn) {
        return this.isEmpty() ? MayBe.of(null) : MayBe.of(fn(this._value));
    }
    isEmpty() {
        return this._value === null || this._value === undefined || this._value === '';
    }
}

// 使用
let r = MayBe.of('javascript')
    .map(v => v.toUpperCase());

console.log(r); //MayBe { _value: 'JAVASCRIPT' }

// 非正常传值情况
let r1 = MayBe.of(null)
    .map(v => v.toUpperCase());

console.log(r1); //MayBe { _value: null }