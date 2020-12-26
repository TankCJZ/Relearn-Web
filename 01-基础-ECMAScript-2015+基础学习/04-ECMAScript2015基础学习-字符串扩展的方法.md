
# 字符串新增的方法

## includes(searchString, [position])
方法用于判断一个字符串是否包含在另一个字符串中，根据情况返回 true 或 false。
```javascript
console.log('hello world'.includes('hello')); //true

// 可传入第二个参数，开始查找的位置。从第二个位置开始搜索
console.log('hello world'.includes('hello', 2)); //false
```

## startsWith(str, [position])
是否是指定的字符串开始,第二个参数可选支持传入查询的位置,默认0   
```javascript
let str = 'hello world';

console.log(str.startsWith('hello')); //true
```
## startsWith Polyfill
来自MDN
```javascript
if (!String.prototype.startsWith) {
    Object.defineProperty(String.prototype, 'startsWith', {
        value: function(search, rawPos) {
            var pos = rawPos > 0 ? rawPos|0 : 0;
            return this.substring(pos, pos + search.length) === search;
        }
    });
}
```

## endsWith(str, [length])
查询字符串是否已指定字符串结尾，可选参数长度   

## Polyfill endsWith
来自MDN
```javascript
if (!String.prototype.endsWith) {
	String.prototype.endsWith = function(search, this_len) {
		if (this_len === undefined || this_len > this.length) {
			this_len = this.length;
		}
		return this.substring(this_len - search.length, this_len) === search;
	};
}
```
