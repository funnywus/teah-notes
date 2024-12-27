# Linux 实战：Redis 7.0 安装和配置详解

> 导读：从零开始在 Linux 系统上安装和配置 Redis 7.0
> 目标：
> 1. 掌握 Redis 的安装方法
> 2. 学会基本的安全配置
> 3. 了解性能优化技巧
> 特点：包含源码编译安装、安全配置和集群部署说明

## 背景
Redis 是一个高性能的键值对数据库，广泛用于缓存、消息队列等场景。本文将详细介绍如何在 Linux 系统上安装和配置 Redis 7.0。

## 一、环境准备

### 1.1 系统要求
- Linux 操作系统（Ubuntu/Debian 或 CentOS）
- 最小 2GB RAM
- root 或 sudo 权限

### 1.2 安装依赖

Ubuntu/Debian：
```bash
$ sudo apt update
$ sudo apt install build-essential tcl
```

CentOS：
```bash
$ sudo yum groupinstall "Development Tools"
$ sudo yum install tcl
```

## 二、安装方式

### 2.1 包管理器安装（简单）

Ubuntu/Debian：
```bash
# 安装 Redis
$ sudo apt install redis-server

# 启动服务
$ sudo systemctl start redis-server
$ sudo systemctl enable redis-server

# 检查状态
$ sudo systemctl status redis-server
● redis-server.service - Advanced key-value store
     Loaded: loaded
     Active: active (running)
```

CentOS：
```bash
# 安装 EPEL 仓库
$ sudo yum install epel-release

# 安装 Redis
$ sudo yum install redis

# 启动服务
$ sudo systemctl start redis
$ sudo systemctl enable redis
```

### 2.2 源码编译安装（推荐）

```bash
# 下载源码
$ wget https://download.redis.io/releases/redis-7.0.0.tar.gz
$ tar xzf redis-7.0.0.tar.gz
$ cd redis-7.0.0

# 编译安装
$ make
$ sudo make install

# 创建配置目录
$ sudo mkdir /etc/redis
$ sudo mkdir /var/redis

# 复制配置文件
$ sudo cp redis.conf /etc/redis/redis.conf
```

### 2.3 创建系统服务

```bash
$ sudo vim /etc/systemd/system/redis.service
```

添加以下内容：
```ini
[Unit]
Description=Redis In-Memory Data Store
After=network.target

[Service]
Type=forking
ExecStart=/usr/local/bin/redis-server /etc/redis/redis.conf
ExecStop=/usr/local/bin/redis-cli shutdown
Restart=always

[Install]
WantedBy=multi-user.target
```

```bash
# 启动服务
$ sudo systemctl daemon-reload
$ sudo systemctl start redis
$ sudo systemctl enable redis
```

## 三、基础配置

### 3.1 修改配置文件

```bash
$ sudo vim /etc/redis/redis.conf
```

重要配置项：
```conf
# 监听地址
bind 127.0.0.1

# 端口
port 6379

# 守护进程模式
daemonize yes

# 密码认证
requirepass your_strong_password

# 最大内存
maxmemory 2gb

# 内存策略
maxmemory-policy allkeys-lru

# 持久化配置
appendonly yes
appendfilename "appendonly.aof"
```

### 3.2 配置说明

1. **bind**：限制访问IP
2. **requirepass**：设置访问密码
3. **maxmemory**：限制最大内存使用
4. **maxmemory-policy**：内存淘汰策略
5. **appendonly**：开启 AOF 持久化

## 四、安全配置

### 4.1 基本安全设置

```bash
# 设置密码
$ redis-cli
127.0.0.1:6379> CONFIG SET requirepass "your_strong_password"
OK

# 禁用危险命令
rename-command FLUSHALL ""
rename-command FLUSHDB ""
rename-command CONFIG ""
```

### 4.2 防火墙配置

Ubuntu：
```bash
$ sudo ufw allow 6379/tcp
```

CentOS：
```bash
$ sudo firewall-cmd --permanent --add-port=6379/tcp
$ sudo firewall-cmd --reload
```

## 五、性能优化

### 5.1 系统优化

```bash
# 设置系统参数
$ sudo sysctl -w vm.overcommit_memory=1
$ sudo sysctl -w net.core.somaxconn=512
```

### 5.2 Redis 优化

```conf
# 持久化优化
save 900 1
save 300 10
save 60 10000

# 内存优化
maxmemory-samples 10
activerehashing yes

# 网络优化
tcp-keepalive 300
timeout 0
```

## 六、常用命令

```bash
# 服务管理
$ sudo systemctl start redis    # 启动
$ sudo systemctl stop redis     # 停止
$ sudo systemctl restart redis  # 重启
$ sudo systemctl status redis   # 状态

# Redis 客户端
$ redis-cli                     # 连接本地
$ redis-cli -h host -p port -a password  # 远程连接

# 基本操作
$ redis-cli ping                # 测试连接
$ redis-cli info                # 服务信息
$ redis-cli monitor            # 监控命令
```

## 总结

本文要点回顾：
1. 介绍了 Redis 在 Linux 上的多种安装方式
2. 提供了基本的安全配置步骤
3. 说明了性能优化的方法
4. 列举了常用的管理命令

进阶建议：
- 学习 Redis 集群配置
- 掌握数据备份和恢复
- 了解主从复制配置
- 研究哨兵模式部署

相关资源：
- [Redis 官方文档](https://redis.io/documentation)
- [Redis 命令参考](https://redis.io/commands)
- [Redis 安全指南](https://redis.io/topics/security)
