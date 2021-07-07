# TypeScript 类型系统下

## 接口
使用 `interface` 关键字来定义接口:
```typescript
// 定义一个 User 接口 包含 string 类型的属性 name 和 number 类型的 age 属性。
interface User {
    name: string,
    age: number,
}
```
在何时使用接口呢？例如我们有一个函数接收参数必须是一个 `User` 对象，如下
```typescript
// javascript 方式
function formatUser(user) {
  return `${user.name}-${user.age}`;
}

// 使用 typescript 接口方式, 会强制要求参数 user 对象必须包含接口 User 定义的属性
function formatUser1(user: User) {
  return `${user.name}-${user.age}`;
}

// good
formatUser1({name: 'ts', age : 12});
// 报错
formatUser1({name: 'ts', age : 12, size: 12});
// 报错
formatUser1({name: 'ts'});
```
> 接口作用是为了约束对象接口，一个对象使用某个接口，那么就必须实现该接口的属性

**接口可选成员**   
在成员中后面使用 `?` 可定义为可选成员
```typescript
interface User {
  name: string,
  age?: number,
}
function formatUser(user: User) {
  return `${user.name}-${user.age}`;
}
// 正确
formatUser({name: 'ts'});
```

**接口只读成员**  