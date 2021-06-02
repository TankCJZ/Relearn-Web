# 事件循环与消息队列
事件循环 `EventLoop` 和消息队列 `Queue` 是 `JavaScript` 语言中非常重要的知识。
`JavaScript` 语言就采用这种机制，来解决单线程运行带来的一些堵塞问题。

## 运行时
`JavaScript` 的运行时包含三大块: **调用栈**,**消息队列**,**事件循环**
* 调用栈是 `JavaScript` 执行函数调用组成，当执行一个函数调用会被压入栈中执行完成后出栈
* 消息队列 是 `JavaScript` 中待处理的消息队列，每个消息会关联一个回调函数，当 调用栈执行完成后，会将该队列最开始进入(先进先出)的消息关联函数,压入栈中执行并且出栈。
* 事件循环 负责监听消息队列是否有可执行关联函数，并且在调用栈为空的时候压入栈中执行，当一个消息处理完成后才会处理下一个消息

## 流程图
![消息队列](./img/The_Javascript_Runtime_Environment_Example.svg)  
图片来自 `MDN`

## 调用栈
栈（先进后出）的数据结构，`JavaScript` 遇到函数执行就压入栈，如下：
```javascript
function f1() {
    console.log('f1')
}
function f2() {
    console.log('f2');
    f3();
}
function f3() {
    console.log('f3')
}
f1();
```
![调用栈](./img/12.png)   
![调用栈](./img/13.png)   
![调用栈](./img/14.png)   
![调用栈](./img/15.png)   
![调用栈](./img/16.png)   