# Linux 实战：MySQL 8.0 安装配置完全指南

> 导读：详细介绍如何在 Linux 系统上安装和配置 MySQL 8.0 数据库
> 目标：
> 1. 掌握 MySQL 8.0 的安装方法
> 2. 学会基本的安全配置
> 3. 了解常见问题的解决方案
> 特点：包含完整的安装步骤、安全配置和性能优化建议

## 背景
MySQL 是世界上最受欢迎的开源数据库之一，本文将详细介绍如何在 Linux 系统上安装和配置 MySQL 8.0，并提供最佳实践建议。

## 一、环境准备

### 1.1 系统要求
- Linux 操作系统（Ubuntu/Debian 或 CentOS）
- 最小 2GB RAM
- 10GB 可用磁盘空间
- root 或 sudo 权限

### 1.2 卸载旧版本（如有）
```bash
# Ubuntu/Debian
$ sudo apt remove mysql-server mysql-client mysql-common
$ sudo apt autoremove
$ sudo apt autoclean

# CentOS
$ sudo yum remove mysql mysql-server mysql-libs mysql-common
$ sudo rm -rf /var/lib/mysql
$ sudo rm -rf /etc/my.cnf
```

## 二、安装 MySQL

### 2.1 Ubuntu/Debian 安装

```bash
# 更新软件包列表
$ sudo apt update

# 安装 MySQL
$ sudo apt install mysql-server

# 查看安装状态
$ sudo systemctl status mysql
● mysql.service - MySQL Community Server
     Loaded: loaded (/lib/systemd/system/mysql.service; enabled; vendor preset: enabled)
     Active: active (running)
```

### 2.2 CentOS 安装

```bash
# 添加 MySQL 仓库
$ sudo rpm -Uvh https://repo.mysql.com/mysql80-community-release-el7-3.noarch.rpm

# 安装 MySQL
$ sudo yum install mysql-server

# 启动 MySQL
$ sudo systemctl start mysqld
$ sudo systemctl enable mysqld

# 查看初始密码
$ sudo grep 'temporary password' /var/log/mysqld.log
```

## 三、安全配置

### 3.1 运行安全脚本

```bash
$ sudo mysql_secure_installation

# 按提示完成以下设置：
# 1. 设置 root 密码强度
# 2. 修改 root 密码
# 3. 删除匿名用户
# 4. 禁止 root 远程登录
# 5. 删除测试数据库
# 6. 重新加载权限表
```

### 3.2 创建新用户和数据库

```bash
# 登录 MySQL
$ mysql -u root -p

# 创建新用户
mysql> CREATE USER 'myuser'@'localhost' IDENTIFIED BY 'MyPass123!';

# 创建数据库
mysql> CREATE DATABASE mydb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# 授权
mysql> GRANT ALL PRIVILEGES ON mydb.* TO 'myuser'@'localhost';
mysql> FLUSH PRIVILEGES;
```

## 四、配置优化

### 4.1 修改配置文件

```bash
$ sudo vim /etc/mysql/mysql.conf.d/mysqld.cnf
```

添加以下优化配置：
```ini
[mysqld]
# 字符集
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci

# InnoDB 配置
innodb_buffer_pool_size = 1G
innodb_log_file_size = 256M
innodb_flush_log_at_trx_commit = 2

# 连接数
max_connections = 1000

# 查询缓存
query_cache_size = 64M
query_cache_type = 1
```

### 4.2 重启服务

```bash
$ sudo systemctl restart mysql
```

## 五、常见问题解决

### 5.1 无法启动服务
```bash
# 检查错误日志
$ sudo tail -f /var/log/mysql/error.log

# 检查权限
$ sudo chown -R mysql:mysql /var/lib/mysql
$ sudo chmod -R 755 /var/lib/mysql
```

### 5.2 密码策略问题
```sql
# 修改密码策略
mysql> SET GLOBAL validate_password.policy = LOW;
mysql> SET GLOBAL validate_password.length = 6;

# 修改用户密码
mysql> ALTER USER 'user'@'localhost' IDENTIFIED BY 'newpass';
```

### 5.3 远程连接问题
```sql
# 允许远程连接
mysql> CREATE USER 'remote'@'%' IDENTIFIED BY 'password';
mysql> GRANT ALL PRIVILEGES ON *.* TO 'remote'@'%';
mysql> FLUSH PRIVILEGES;

# 修改监听地址
$ sudo vim /etc/mysql/mysql.conf.d/mysqld.cnf
bind-address = 0.0.0.0
```

## 六、常用命令

```bash
# 服务管理
$ sudo systemctl start mysql    # 启动服务
$ sudo systemctl stop mysql     # 停止服务
$ sudo systemctl restart mysql  # 重启服务
$ sudo systemctl status mysql   # 查看状态

# 登录 MySQL
$ mysql -u root -p             # root 登录
$ mysql -u user -p dbname      # 普通用户登录

# 数据库备份
$ mysqldump -u root -p dbname > backup.sql    # 备份数据库
$ mysql -u root -p dbname < backup.sql        # 恢复数据库
```

## 总结

本文要点回顾：
1. 详细介绍了 MySQL 8.0 在不同 Linux 发行版上的安装方法
2. 提供了基本的安全配置步骤
3. 介绍了常见性能优化配置
4. 解决了常见问题

进阶建议：
- 学习 MySQL 主从复制配置
- 掌握数据库备份和恢复
- 了解性能监控和优化
- 研究高可用方案

相关资源：
- [MySQL 官方文档](https://dev.mysql.com/doc/)
- [MySQL 性能优化指南](https://dev.mysql.com/doc/refman/8.0/en/optimization.html)
- [MySQL 安全指南](https://dev.mysql.com/doc/refman/8.0/en/security.html)
