# 【详解】MySQL主从复制配置，一次性搞定读写分离！

> 本文将详细介绍MySQL主从复制的配置过程，包括主库配置、从库配置、主从同步状态监控等内容，帮助你轻松实现数据库的读写分离。

## 一、主从复制简介

MySQL主从复制是一个异步的复制过程，通过它可以让一台MySQL服务器（从库）的数据与另一台MySQL服务器（主库）的数据保持同步。

### 1.1 主从复制的优势
1. 实现读写分离，提升系统性能
2. 数据备份，提高数据安全性
3. 高可用性，故障快速切换
4. 便于数据分析和报表生成

## 二、环境准备

### 2.1 服务器规划
- 主库：192.168.1.100
- 从库：192.168.1.101

### 2.2 MySQL版本
- MySQL 8.0及以上版本

## 三、主库配置

### 3.1 修改主库配置文件
```bash
# 编辑my.cnf文件
vim /etc/my.cnf

# 添加以下配置
[mysqld]
# 服务器唯一ID
server-id=1
# 开启二进制日志
log-bin=mysql-bin
# 需要同步的数据库
binlog-do-db=your_database
# 不需要同步的数据库
binlog-ignore-db=mysql
binlog-ignore-db=information_schema
binlog-ignore-db=performance_schema
```

### 3.2 创建复制用户
```sql
-- 创建用户并授权
CREATE USER 'repl'@'192.168.1.%' IDENTIFIED BY 'password';
GRANT REPLICATION SLAVE ON *.* TO 'repl'@'192.168.1.%';
FLUSH PRIVILEGES;

-- 查看主库状态
SHOW MASTER STATUS;
```

## 四、从库配置

### 4.1 修改从库配置文件
```bash
# 编辑my.cnf文件
vim /etc/my.cnf

# 添加以下配置
[mysqld]
# 服务器唯一ID，与主库不同
server-id=2
# 开启中继日志
relay-log=mysql-relay
```

### 4.2 配置主从关系
```sql
STOP SLAVE;

CHANGE MASTER TO
    MASTER_HOST='192.168.1.100',
    MASTER_USER='repl',
    MASTER_PASSWORD='password',
    MASTER_LOG_FILE='mysql-bin.000001',  -- 使用SHOW MASTER STATUS查看到的值
    MASTER_LOG_POS=123;                  -- 使用SHOW MASTER STATUS查看到的值

START SLAVE;
```

## 五、验证主从同步

### 5.1 查看从库状态
```sql
SHOW SLAVE STATUS\G

-- 检查以下两项是否都为Yes
-- Slave_IO_Running: Yes
-- Slave_SQL_Running: Yes
```

### 5.2 测试主从同步
```sql
-- 在主库执行
CREATE DATABASE test;
CREATE TABLE test.users (
    id INT PRIMARY KEY,
    name VARCHAR(50)
);
INSERT INTO test.users VALUES (1, 'test');

-- 在从库查看
SELECT * FROM test.users;
```

## 六、常见问题处理

### 6.1 同步失败处理
```sql
-- 查看详细错误信息
SHOW SLAVE STATUS\G

-- 常见解决方案
-- 1. 跳过错误
SET GLOBAL SQL_SLAVE_SKIP_COUNTER = 1;
START SLAVE;

-- 2. 重置从库
STOP SLAVE;
RESET SLAVE;
START SLAVE;
```

### 6.2 数据不一致处理
1. 使用pt-table-checksum工具检查数据一致性
2. 使用pt-table-sync工具修复不一致数据

## 七、性能优化建议

1. 合理设置binlog格式
```sql
SET GLOBAL binlog_format = 'ROW';
```

2. 配置从库并行复制
```ini
slave_parallel_workers = 4
slave_parallel_type = LOGICAL_CLOCK
```

3. 设置半同步复制提高数据安全性
```sql
-- 主库安装插件
INSTALL PLUGIN rpl_semi_sync_master SONAME 'semisync_master.so';
SET GLOBAL rpl_semi_sync_master_enabled = 1;

-- 从库安装插件
INSTALL PLUGIN rpl_semi_sync_slave SONAME 'semisync_slave.so';
SET GLOBAL rpl_semi_sync_slave_enabled = 1;
```

## 八、监控和维护

### 8.1 关键监控指标
1. 主从延迟时间
```sql
SHOW SLAVE STATUS\G
-- 查看 Seconds_Behind_Master 值
```

2. 复制线程状态
3. 主从数据一致性

### 8.2 定期维护任务
1. 检查主从状态
2. 验证数据一致性
3. 清理旧的二进制日志
```sql
PURGE BINARY LOGS BEFORE DATE(NOW() - INTERVAL 7 DAY);
```

## 九、总结

通过本文的配置步骤，你应该已经成功搭建了MySQL主从复制环境。记住以下要点：
1. 主从配置前要做好规划
2. 定期检查主从状态
3. 做好监控和维护工作
4. 重要操作前要先备份数据

如果你在配置过程中遇到问题，欢迎在评论区讨论！
