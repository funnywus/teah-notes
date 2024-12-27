# 【前端必备】ES6-ES13新特性完全指南，助你写出更优雅的JavaScript代码！

> 本文将详细介绍ECMAScript（ES6+）的重要特性，包括实用示例和最佳实践，帮助你掌握现代JavaScript开发技巧。

## 一、变量声明与解构

### 1.1 let和const
```javascript
// let：块级作用域
{
  let x = 10;
  // x只在这个块级作用域内有效
}

// const：常量声明
const PI = 3.14159;
const user = { name: 'John' };
user.name = 'Mike'; // 可以修改对象属性
```

### 1.2 解构赋值
```javascript
// 数组解构
const [a, b, ...rest] = [1, 2, 3, 4, 5];
console.log(a);    // 1
console.log(b);    // 2
console.log(rest); // [3, 4, 5]

// 对象解构
const { name, age, address: { city } = {} } = user;
console.log(name, age, city);

// 函数参数解构
function printUser({ name, age = 18 }) {
  console.log(`${name} is ${age} years old`);
}
```

## 二、字符串和模板字面量

### 2.1 模板字符串
```javascript
const name = 'John';
const greeting = `Hello, ${name}!
This is a multiline
string.`;

// 标签模板
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => 
    `${result}${str}${values[i] ? `<span>${values[i]}</span>` : ''}`
  , '');
}

const html = highlight`Hello ${name}!`;
```

### 2.2 字符串新方法
```javascript
const str = 'Hello, World!';

// 包含检查
console.log(str.includes('World'));  // true
console.log(str.startsWith('Hello')); // true
console.log(str.endsWith('!')); // true

// 重复字符串
console.log('ha'.repeat(3)); // 'hahaha'

// 填充字符串
console.log('5'.padStart(3, '0')); // '005'
console.log('5'.padEnd(3, '0')); // '500'
```

## 三、函数增强

### 3.1 箭头函数
```javascript
// 基本语法
const add = (a, b) => a + b;

// this绑定
const obj = {
  data: [],
  init() {
    // 箭头函数保持外部this
    fetch('/api/data')
      .then(response => response.json())
      .then(data => {
        this.data = data;
      });
  }
};
```

### 3.2 参数默认值
```javascript
function greet(name = 'Guest', greeting = `Hello`) {
  return `${greeting}, ${name}!`;
}

// 解构默认值
function fetchAPI({ url, method = 'GET', headers = {} } = {}) {
  // ...
}
```

## 四、对象和类

### 4.1 对象字面量增强
```javascript
const name = 'John';
const age = 30;

// 属性简写
const user = { name, age };

// 方法简写
const obj = {
  sayHi() {
    console.log('Hi!');
  },
  // 计算属性名
  [`prop_${age}`]: 123
};
```

### 4.2 类语法
```javascript
class Person {
  // 私有字段（ES2022）
  #privateField = 'private';
  
  // 构造函数
  constructor(name) {
    this.name = name;
  }
  
  // 实例方法
  sayHi() {
    console.log(`Hi, I'm ${this.name}`);
  }
  
  // 静态方法
  static create(name) {
    return new Person(name);
  }
  
  // getter/setter
  get upperName() {
    return this.name.toUpperCase();
  }
  
  set upperName(value) {
    this.name = value.toLowerCase();
  }
}

// 继承
class Employee extends Person {
  constructor(name, role) {
    super(name);
    this.role = role;
  }
}
```

## 五、新的数据结构

### 5.1 Map和Set
```javascript
// Map
const map = new Map();
map.set('key', 'value');
map.set(obj, 'value');

// Set
const set = new Set([1, 2, 2, 3]);
console.log([...set]); // [1, 2, 3]

// WeakMap和WeakSet
const weakMap = new WeakMap();
weakMap.set(obj, 'data');
```

### 5.2 Symbol
```javascript
const symbol = Symbol('description');
const obj = {
  [symbol]: 'value'
};

// 内置Symbol
const iterator = obj[Symbol.iterator];
const toStringTag = obj[Symbol.toStringTag];
```

## 六、异步编程

### 6.1 Promise
```javascript
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('data');
    }, 1000);
  });
}

// Promise链式调用
fetchData()
  .then(data => processData(data))
  .catch(error => console.error(error))
  .finally(() => console.log('Done'));

// Promise.all
Promise.all([fetch1(), fetch2()])
  .then(([result1, result2]) => {
    // 处理所有结果
  });

// Promise.race
Promise.race([fetch1(), fetch2()])
  .then(firstResult => {
    // 处理最快的结果
  });
```

### 6.2 async/await
```javascript
async function getData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

// 并行执行
async function parallel() {
  const [data1, data2] = await Promise.all([
    fetch('/api/1'),
    fetch('/api/2')
  ]);
}
```

## 七、模块系统

### 7.1 ES模块
```javascript
// 导出
export const name = 'John';
export function sayHi() {}
export default class User {}

// 导入
import User, { name, sayHi } from './user.js';
import * as userModule from './user.js';
```

## 八、新的API和语法

### 8.1 可选链操作符
```javascript
const user = {
  address: {
    street: 'Main St'
  }
};

// 安全访问嵌套属性
const street = user?.address?.street;
const zip = user?.address?.zip ?? '00000';
```

### 8.2 空值合并操作符
```javascript
const value = null;
const defaultValue = value ?? 'default';
```

### 8.3 BigInt
```javascript
const bigNumber = 9007199254740991n;
const result = bigNumber + 1n;
```

### 8.4 数组新方法
```javascript
// flat和flatMap
const arr = [1, [2, [3, 4]]];
console.log(arr.flat(2)); // [1, 2, 3, 4]

// at方法
const last = arr.at(-1);

// Array.from
const arrayFromMap = Array.from(map);
```

## 九、最佳实践

### 9.1 使用建议
1. 优先使用const，其次是let
2. 使用解构来简化代码
3. 使用箭头函数来保持this上下文
4. 使用async/await替代回调
5. 使用可选链和空值合并来简化判断

### 9.2 性能考虑
```javascript
// 优化解构
const { needed } = bigObject; // 只取需要的属性

// 优化循环
for (const item of items) {} // 替代forEach
```

## 总结

通过本文的学习，你应该掌握了：
1. 现代JavaScript的核心特性
2. 异步编程的最佳实践
3. 新的语法糖和API
4. 代码优化技巧

记住以下要点：
- 使用新特性提高代码可读性
- 注意浏览器兼容性
- 合理使用语法糖
- 保持代码简洁和可维护

如果你在使用这些特性时遇到问题，欢迎在评论区讨论！
