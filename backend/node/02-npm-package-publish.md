# NPM 包发布实战：从零开始创建你的第一个 NPM 包

> 💡 导读：手把手教你如何创建、开发和发布一个 NPM 包
> 🎯 目标：1. 了解 NPM 包的基本结构 2. 掌握发布流程 3. 学会版本管理
> ⚡️ 特点：实操性强，包含完整的发布流程和最佳实践

## 一、前期准备

### 1.1 环境检查
```bash
# 检查 Node.js 版本
$ node -v
v16.15.0

# 检查 npm 版本
$ npm -v
8.5.5
```

### 1.2 NPM 账号准备
```bash
# 注册 NPM 账号（如果已有账号可跳过）
$ npm adduser
Username: your-username
Password: ********
Email: your-email@example.com
```

## 二、创建项目

### 2.1 初始化项目
```bash
# 创建项目目录
$ mkdir my-awesome-package
$ cd my-awesome-package

# 初始化 package.json
$ npm init
package name: (my-awesome-package)
version: (1.0.0)
description: My first npm package
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)

About to write to /path/to/my-awesome-package/package.json:
{
  "name": "my-awesome-package",
  "version": "1.0.0",
  "description": "My first npm package",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

### 2.2 项目结构
```bash
$ tree
.
├── README.md
├── package.json
├── src
│   └── index.js
├── test
│   └── index.test.js
└── .gitignore
```

## 三、开发包内容

### 3.1 创建主文件
```javascript
// src/index.js
class Calculator {
  add(a, b) {
    return a + b;
  }
  
  subtract(a, b) {
    return a - b;
  }
}

module.exports = Calculator;
```

### 3.2 添加测试
```javascript
// test/index.test.js
const Calculator = require('../src/index');
const assert = require('assert');

describe('Calculator', () => {
  const calc = new Calculator();
  
  it('should add two numbers correctly', () => {
    assert.equal(calc.add(2, 3), 5);
  });
  
  it('should subtract two numbers correctly', () => {
    assert.equal(calc.subtract(5, 2), 3);
  });
});
```

### 3.3 更新 package.json
```json
{
  "name": "my-awesome-package",
  "version": "1.0.0",
  "description": "A simple calculator package",
  "main": "src/index.js",
  "scripts": {
    "test": "mocha test/**/*.test.js"
  },
  "keywords": ["calculator", "math", "npm"],
  "author": "Your Name <your.email@example.com>",
  "license": "MIT",
  "devDependencies": {
    "mocha": "^9.1.3"
  }
}
```

## 四、发布准备

### 4.1 添加 .gitignore
```bash
# .gitignore
node_modules/
.DS_Store
*.log
```

### 4.2 创建 README.md
```markdown
# my-awesome-package

A simple calculator package for basic arithmetic operations.

## Installation

```bash
npm install my-awesome-package
```

## Usage

```javascript
const Calculator = require('my-awesome-package');
const calc = new Calculator();

console.log(calc.add(2, 3));      // 5
console.log(calc.subtract(5, 2)); // 3
```

## API

### add(a, b)
Returns the sum of two numbers.

### subtract(a, b)
Returns the difference between two numbers.

## License

MIT
```

## 五、发布流程

### 5.1 登录 NPM
```bash
# 确保已登录 NPM
$ npm whoami
your-username

# 如果未登录，执行登录
$ npm login
Username: your-username
Password: ********
Email: your-email@example.com
```

### 5.2 发布包
```bash
# 发布包
$ npm publish
npm notice
npm notice 📦  my-awesome-package@1.0.0
npm notice === Tarball Contents ===
npm notice 1.1kB package.json
npm notice 548B  README.md
npm notice 238B  src/index.js
npm notice 321B  test/index.test.js
npm notice === Tarball Details ===
npm notice name:          my-awesome-package
npm notice version:       1.0.0
npm notice filename:      my-awesome-package-1.0.0.tgz
npm notice package size:  1.5 kB
npm notice unpacked size: 2.2 kB
npm notice shasum:        a1b2c3d4e5f6...
npm notice integrity:     sha512-...
npm notice total files:   4
npm notice
+ my-awesome-package@1.0.0
```

## 六、版本管理

### 6.1 版本号规范
遵循语义化版本（Semantic Versioning）：
- 主版本号：不兼容的 API 修改
- 次版本号：向下兼容的功能性新增
- 修订号：向下兼容的问题修正

### 6.2 更新版本
```bash
# 升级补丁版本 1.0.0 -> 1.0.1
$ npm version patch
v1.0.1

# 升级小版本 1.0.1 -> 1.1.0
$ npm version minor
v1.1.0

# 升级大版本 1.1.0 -> 2.0.0
$ npm version major
v2.0.0
```

## 七、最佳实践

1. 📌 包名检查
```bash
# 检查包名是否可用
$ npm search my-awesome-package
```

2. 🔒 包的安全性
```bash
# 检查依赖安全性
$ npm audit
```

3. ⚡️ 发布前检查
```bash
# 本地测试安装
$ npm pack
$ npm install ./my-awesome-package-1.0.0.tgz
```

## 总结

📝 本文要点回顾：
1. NPM 包的创建和初始化
2. 包的开发和测试
3. 发布流程和版本管理
4. 最佳实践和注意事项

🌟 进阶建议：
- 添加持续集成（CI）
- 使用 TypeScript 开发
- 添加更多单元测试
- 完善文档和示例

🔗 相关资源：
- [NPM 官方文档](https://docs.npmjs.com/)
- [语义化版本](https://semver.org/)
- [Node.js 最佳实践](https://github.com/goldbergyoni/nodebestpractices)

💬 欢迎在评论区分享你的 NPM 包开发经验！
👉 关注我，获取更多 Node.js 技术干货~
