// Functor
class Functor {
    static of(value) {
        return new Functor(value);
    }
    constructor(value) {
        this._value = value;
    }
    map(fn) {
        return new Functor(fn(this._value))
    }
}

let res = Functor.of(10)
    .map(v => v + 10) // 10 + 10 = 20
    .map(v => v * 10) // 20 * 10 = 200
console.log(res); //Functor { _value: 200 }