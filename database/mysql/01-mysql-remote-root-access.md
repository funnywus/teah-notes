# 【云服务器教程】3分钟搞定MySQL远程访问配置

> 本文将介绍如何在云服务器上快速配置MySQL远程访问权限，包含必要的安全设置。

## 一、配置云服务器（以阿里云为例）

1. 登录阿里云控制台
2. 配置安全组：开放3306端口
3. 配置防火墙：
```bash
# 开放3306端口
sudo firewall-cmd --permanent --add-port=3306/tcp
sudo firewall-cmd --reload
```

## 二、配置MySQL

### 2.1 登录MySQL
```bash
mysql -u root -p
```

### 2.2 创建远程访问用户
```sql
# 创建新用户（推荐）
CREATE USER 'remote_user'@'%' IDENTIFIED BY '你的密码';
GRANT ALL PRIVILEGES ON *.* TO 'remote_user'@'%';

# 或允许root远程访问
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '你的密码' WITH GRANT OPTION;

# 刷新权限
FLUSH PRIVILEGES;
```

### 2.3 修改MySQL配置
```bash
# CentOS
sudo vim /etc/my.cnf
# Ubuntu
sudo vim /etc/mysql/mysql.conf.d/mysqld.cnf
```

添加或修改以下内容：
```ini
[mysqld]
bind-address = 0.0.0.0
```

### 2.4 重启MySQL
```bash
sudo systemctl restart mysqld   # CentOS
# 或
sudo systemctl restart mysql    # Ubuntu
```

## 三、测试连接

```bash
# 从本地连接测试
mysql -h 云服务器公网IP -u remote_user -p
```

## 四、安全建议

1. 使用强密码
2. 只授权必要的数据库权限
3. 定期更新密码
4. 建议使用专用账号而不是root

## 参考资料
- MySQL官方文档：[https://dev.mysql.com/doc/](https://dev.mysql.com/doc/)
