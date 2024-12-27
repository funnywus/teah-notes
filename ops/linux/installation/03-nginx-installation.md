# Linux 实战：手把手教你安装 Nginx 服务器

> 导读：快速掌握在 Linux 系统上安装和配置 Nginx 的方法
> 目标：
> 1. 使用包管理器快速安装 Nginx
> 2. 通过源码编译安装 Nginx 并自定义功能
> 特点：包含两种主流 Linux 发行版的详细安装步骤，配置过程清晰明了

## 背景
在实际开发中，我们经常需要搭建 Web 服务器来部署网站或作为反向代理。Nginx 因其高性能和稳定性，成为了最受欢迎的选择之一。本文将详细介绍如何在 Linux 系统上安装和配置 Nginx。

## 一、环境准备

### 1.1 系统要求
- Linux 操作系统（Ubuntu/Debian 或 CentOS）
- root 权限或 sudo 权限
- 基本的命令行操作知识

### 1.2 安装方式对比
- 包管理器安装：简单快速，适合新手
- 源码安装：可自定义功能，适合高级用户

## 二、包管理器安装（推荐）

### 2.1 Ubuntu/Debian 系统

```bash
# 更新系统包
$ sudo apt update

# 安装 Nginx
$ sudo apt install nginx

# 启动并设置开机自启
$ sudo systemctl start nginx
$ sudo systemctl enable nginx

# 验证安装
$ nginx -v
nginx version: nginx/1.18.0 (Ubuntu)
```

### 2.2 CentOS 系统

```bash
# 安装 EPEL 仓库
$ sudo yum install epel-release

# 安装 Nginx
$ sudo yum install nginx

# 启动并设置开机自启
$ sudo systemctl start nginx
$ sudo systemctl enable nginx

# 验证安装
$ nginx -v
nginx version: nginx/1.20.1
```

## 三、源码编译安装

### 3.1 安装编译依赖

Ubuntu/Debian 系统：
```bash
$ sudo apt update
$ sudo apt install build-essential libpcre3 libpcre3-dev zlib1g zlib1g-dev openssl libssl-dev
```

CentOS 系统：
```bash
$ sudo yum groupinstall "Development Tools"
$ sudo yum install pcre pcre-devel zlib zlib-devel openssl openssl-devel
```

### 3.2 下载并编译 Nginx

```bash
# 下载源码
$ wget https://nginx.org/download/nginx-1.24.0.tar.gz
$ tar -zxvf nginx-1.24.0.tar.gz
$ cd nginx-1.24.0

# 配置编译选项
$ ./configure --prefix=/usr/local/nginx \
    --with-http_ssl_module \
    --with-http_v2_module

# 编译安装
$ make && sudo make install

# 创建软链接
$ sudo ln -s /usr/local/nginx/sbin/nginx /usr/bin/nginx
```

### 3.3 配置系统服务

```bash
# 创建服务文件
$ sudo vim /etc/systemd/system/nginx.service
```

添加以下内容：
```ini
[Unit]
Description=nginx
After=network.target

[Service]
Type=forking
ExecStart=/usr/local/nginx/sbin/nginx
ExecReload=/usr/local/nginx/sbin/nginx -s reload
ExecStop=/usr/local/nginx/sbin/nginx -s stop

[Install]
WantedBy=multi-user.target
```

启动服务：
```bash
$ sudo systemctl daemon-reload
$ sudo systemctl start nginx
$ sudo systemctl enable nginx
```

## 四、验证安装

```bash
# 查看 Nginx 版本
$ nginx -v

# 检查配置文件语法
$ nginx -t

# 访问测试
$ curl http://localhost
```

## 五、常用命令速查

```bash
# 启动 Nginx
$ sudo systemctl start nginx

# 停止 Nginx
$ sudo systemctl stop nginx

# 重启 Nginx
$ sudo systemctl restart nginx

# 重新加载配置
$ sudo systemctl reload nginx
```

## 总结

本文要点回顾：
1. 介绍了两种 Nginx 安装方式：包管理器安装和源码编译安装
2. 详细说明了在 Ubuntu 和 CentOS 系统上的安装步骤
3. 提供了基本的服务管理命令

进阶建议：
- 了解 Nginx 的配置文件结构和语法
- 学习配置虚拟主机和反向代理
- 掌握 SSL 证书配置方法

相关资源：
- [Nginx 官方文档](http://nginx.org/en/docs/)
- [Nginx 新手指南](http://nginx.org/en/docs/beginners_guide.html)
