## 类型申明
在开发中经常会使用到第三方模块，如果在 `TypeScript` 中引入了第三方模板，而第三方模板并没有通过 `TypeScript` 来编写，导致使用时候并不会有类型提示，也就不会有强类型的体验。
例如：
```typescript
// 提示错误：已声明“cameCase”，但从未读取其值。ts(6133)
import { camelCase } from 'lodash';
// 鼠标houver在 camelCase 不会有类型提示
const res = camelCase('helloword');
```
这时候我们就需要去申明类型了，使用关键字 `declare` 可以进行类型申明   
```typescript
declare function camelCase(str: string): string;
// 鼠标在hover到camelCase 函数上就会有相关的类型提示了
```
> 这种用法大部分场景就是需要兼容一些第三方未使用 `typescript` 编写的模块
通常大部分常用的模块都有会对于的类型申明文件，我们只需要安装好即可用   
例如鼠标hover到 `lodash` 上会提示 **尝试使用 `npm i --save-dev @types/lodash` (如果存在)，或者添加一个包含 `declare module 'lodash';` 的新声明(.d.ts)文件**
```typescript
// 安装 lodash 申明文件
npm i --save-dev @types/lodash
```
安装完成后就会有对于的类型提示了，不需要再 `declare` 申明了