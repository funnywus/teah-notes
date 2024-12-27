# Tech Notes 📚

<div align="center">

![GitHub last commit](https://img.shields.io/github/last-commit/funnywus/tech-notes)
![GitHub stars](https://img.shields.io/github/stars/funnywus/tech-notes)
![GitHub forks](https://img.shields.io/github/forks/funnywus/tech-notes)
![GitHub issues](https://img.shields.io/github/issues/funnywus/tech-notes)
![License](https://img.shields.io/badge/license-MIT-blue)

📖 [在线文档](https://feiyu.ccrate.cc) | 💻 [GitHub](https://github.com/funnywus/tech-notes) | 📘 [Gitee](https://gitee.com/funnywuss/tech-notes)

</div>

> 🚀 一个精心整理的技术文档库，涵盖 AI、后端开发、数据库等多个领域的实践经验和解决方案。访问 [在线文档](https://feiyu.ccrate.cc) 获得最佳阅读体验。

## ✨ 特色

- 📖 **结构清晰** - 按技术领域分类整理，快速定位所需知识
- 🔍 **实用导向** - 每篇文档都来自实际开发经验，注重实践性
- 🌟 **持续更新** - 定期更新最新技术动态和最佳实践
- 🤝 **开源共享** - 欢迎贡献，打造优质的技术学习社区
- 🌍 **多平台同步** - GitHub 和 Gitee 双平台托管，方便不同地区用户访问
- 📱 **在线阅读** - 提供优化的在线阅读体验，支持搜索和导航

## 📂 项目结构

### 🤖 AI 开发
- OpenAI API 开发指南
  - API 密钥管理最佳实践
  - 模型调用示例
  - 常见问题解决方案
  
### 💻 后端开发
- **Java**
  - 深入理解 Java 锁机制
  - Spring Boot 快速启动指南
  - 性能优化实践
- **Node.js**
  - Node/NPM 环境配置精要
  - NPM 包开发与发布流程
  - NVM 版本管理技巧
- **Python**
  - Python 环境变量最佳实践
  - 开发环境配置指南

### 📊 数据库
- **MySQL**
  - 远程访问安全配置
  - 查询性能优化指南
  - 主从复制架构搭建
  - 备份恢复最佳实践

## 🚀 快速开始

本项目使用 VitePress 构建，确保你的本地环境满足以下要求：

### 📋 前置要求
- Node.js >= 18
- npm 或 yarn

### 🔧 安装步骤

1. 克隆仓库（选择一个）

```bash
# GitHub
git clone https://github.com/funnywus/tech-notes.git

# 或者 Gitee（国内用户推荐）
git clone https://gitee.com/funnywuss/tech-notes.git
```

```bash
cd tech-notes
```

2. 安装依赖
```bash
npm install
# 或
yarn install
```

3. 本地开发
```bash
npm run docs:dev
# 或
yarn docs:dev
```

4. 构建文档
```bash
npm run docs:build
# 或
yarn docs:build
```

现在打开 http://localhost:5173 就可以看到本地文档了！

## 贡献指南

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

## 提交规范

### Commit 信息格式
```
<type>(<scope>): <subject>
```

### Type 类型
- `feat` : 新功能
- `fix` : 修复 bug
- `docs` : 文档改变
- `style` : 代码格式改变
- `refactor` : 代码重构
- `perf` : 性能优化
- `test` : 添加测试
- `chore` : 构建过程或辅助工具的变动
- `revert` : 回退
- `build` : 打包

### 示例
```bash
feat(auth): add login functionality
fix(database): resolve connection timeout
docs(readme): update installation guide
style(lint): format code according to guidelines
```

### 分支管理
- `main`: 主分支，用于产品发布
- `develop`: 开发分支，用于功能集成
- `feature/*`: 功能分支，用于开发新特性
- `hotfix/*`: 修复分支，用于修复线上bug
- `release/*`: 发布分支，用于版本发布

### Pull Request 规范
1. PR 标题要简明扼要地描述改动
2. PR 描述要详细说明：
   - 改动的目的
   - 改动的内容
   - 测试情况
   - 相关的 issue 链接
3. 提交 PR 前：
   - 确保代码已经过格式化
   - 确保所有测试通过
   - 确保与目标分支同步最新代码

### Issue 规范
使用 Issue 模板，包含：
- Bug 报告
- 功能请求
- 文档改进
- 问题咨询

## 👤 关于作者

<div align="center">
  <table>
    <tr>
      <td align="center">
        <a href="https://github.com/funnywus">
          <img src="https://avatars.githubusercontent.com/u/funnywus" width="100px;" alt="头像"/>
          <br />
          <sub><b>飞羽</b></sub>
        </a>
        <br />
        <a href="https://feiyu.ccrate.cc" title="在线文档">📖</a>
        <a href="https://github.com/funnywus" title="GitHub">💻</a>
        <a href="https://gitee.com/funnywuss" title="Gitee">📘</a>
      </td>
    </tr>
  </table>
</div>

### 📮 联系方式

- 📝 博客：[https://feiyu.ccrate.cc](https://feiyu.ccrate.cc)
- 💻 GitHub：[https://github.com/funnywus](https://github.com/funnywus)
- 📘 Gitee：[https://gitee.com/funnywuss](https://gitee.com/funnywuss)

## 📄 License

MIT License - 详见 [LICENSE](LICENSE) 文件
