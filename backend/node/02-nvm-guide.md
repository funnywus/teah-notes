# 【实用工具】NVM (Node Version Manager) 安装和使用指南

> 本文将介绍如何在Windows和macOS系统上安装和使用NVM，通过它可以方便地管理多个Node.js版本。包括安装配置、版本切换、常见问题解决等实用技巧。

## 一、Windows安装指南

### 1.1 下载安装包
1. 访问 [nvm-windows releases](https://github.com/coreybutler/nvm-windows/releases)
2. 下载最新版本的 `nvm-setup.exe`

### 1.2 安装步骤
1. 运行 `nvm-setup.exe`
2. 按照安装向导完成安装
3. 安装完成后，打开新的命令提示符验证安装：
```bash
nvm version
```

### 1.3 环境变量配置
安装程序会自动配置环境变量，但如果遇到问题，请检查以下环境变量：
- `NVM_HOME`: NVM安装路径
- `NVM_SYMLINK`: Node.js符号链接路径
- 确保这些路径已添加到 `PATH` 环境变量中

## 二、macOS安装指南

### 2.1 安装方法
macOS可以通过以下两种方式安装：

1. 使用curl安装：
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

2. 使用wget安装：
```bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

### 2.2 配置环境变量
安装后需要配置环境变量，根据你使用的shell添加以下配置：

对于bash用户（~/.bashrc）：
```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

对于zsh用户（~/.zshrc）：
```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

## 三、NVM常用命令

### 3.1 版本管理
1. 查看可用的Node.js版本：
```bash
nvm list available  # Windows
nvm ls-remote      # macOS
```

2. 安装指定版本的Node.js：
```bash
nvm install 16.15.0  # 安装指定版本
nvm install latest   # 安装最新版本
```

3. 切换Node.js版本：
```bash
nvm use 16.15.0
```

4. 查看已安装的版本：
```bash
nvm list    # Windows
nvm ls      # macOS
```

5. 设置默认版本：
```bash
nvm alias default 16.15.0
```

## 四、常见问题解决

### 4.1 Windows常见问题
1. 安装失败
   - 确保以管理员身份运行安装程序
   - 临时关闭杀毒软件
   - 确保已卸载现有的Node.js

2. 命令未找到
   - 检查环境变量配置
   - 重新打开命令提示符

### 4.2 macOS常见问题
1. 安装后命令不可用
   - 确保已正确配置环境变量
   - 重新打开终端或运行 `source ~/.bashrc` 或 `source ~/.zshrc`

2. 权限问题
   - 使用 `sudo` 运行命令
   - 检查目录权限

## 五、最佳实践

### 5.1 项目版本管理
1. 使用 `.nvmrc` 文件指定项目Node.js版本
2. 在项目根目录创建 `.nvmrc` 文件：
```bash
echo "16.15.0" > .nvmrc
```

### 5.2 自动切换版本
进入项目目录时自动切换到对应的Node.js版本：
```bash
nvm use
```

## 六、总结

NVM是一个强大的Node.js版本管理工具，通过它可以轻松管理多个Node.js版本。虽然Windows和macOS的安装过程有所不同，但基本使用命令是一致的。掌握NVM的使用可以让开发者更好地处理不同项目的Node.js版本依赖问题。
