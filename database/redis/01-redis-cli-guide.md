# Redis 命令行实战：从入门到精通

> 导读：掌握 Redis 命令行操作是每个后端开发者的必备技能
> 目标：1. 熟练使用常用 Redis 命令 2. 理解数据类型操作 3. 掌握运维相关命令
> 特点：实用性强，案例丰富，包含性能优化建议

## 一、基础连接

### 1.1 连接命令
```bash
# 本地连接
$ redis-cli
127.0.0.1:6379>

# 远程连接
$ redis-cli -h 192.168.1.100 -p 6379 -a mypassword
192.168.1.100:6379>

# 带数据库编号的连接
$ redis-cli -n 1
127.0.0.1:6379[1]>
```

 说明：
- `-h`：指定主机名
- `-p`：指定端口号
- `-a`：指定密码
- `-n`：指定数据库编号

### 1.2 数据库切换
```bash
# 切换到指定数据库
127.0.0.1:6379> SELECT 1
OK

# 查看当前数据库 key 数量
127.0.0.1:6379[1]> DBSIZE
(integer) 5

# 清空当前数据库
127.0.0.1:6379[1]> FLUSHDB
OK

# 清空所有数据库
127.0.0.1:6379[1]> FLUSHALL
OK
```

## 二、数据操作命令

### 2.1 键值操作
```bash
# 设置键值
127.0.0.1:6379> SET username "john"
OK

# 获取值
127.0.0.1:6379> GET username
"john"

# 删除键
127.0.0.1:6379> DEL username
(integer) 1

# 检查键是否存在
127.0.0.1:6379> EXISTS username
(integer) 0

# 设置过期时间（秒）
127.0.0.1:6379> SET loginToken "abc123"
OK
127.0.0.1:6379> EXPIRE loginToken 3600
(integer) 1
```

### 2.2 批量操作
```bash
# 批量设置键值
127.0.0.1:6379> MSET key1 "value1" key2 "value2"
OK

# 批量获取值
127.0.0.1:6379> MGET key1 key2
1) "value1"
2) "value2"

# 批量删除
127.0.0.1:6379> DEL key1 key2
(integer) 2
```

## 三、数据类型操作

### 3.1 字符串（String）
```bash
# 设置值
127.0.0.1:6379> SET user:1:name "John"
OK

# 递增
127.0.0.1:6379> SET counter 1
OK
127.0.0.1:6379> INCR counter
(integer) 2
127.0.0.1:6379> INCR counter
(integer) 3

# 设置过期时间
127.0.0.1:6379> SETEX session:token 3600 "user123"
OK
```

 应用场景：
- 计数器
- 分布式锁
- 缓存数据

### 3.2 列表（List）
```bash
# 左侧添加
127.0.0.1:6379> LPUSH notifications "新消息1"
(integer) 1
127.0.0.1:6379> LPUSH notifications "新消息2"
(integer) 2

# 右侧添加
127.0.0.1:6379> RPUSH tasks "任务1"
(integer) 1

# 查看列表
127.0.0.1:6379> LRANGE notifications 0 -1
1) "新消息2"
2) "新消息1"

# 移除元素
127.0.0.1:6379> LPOP notifications
"新消息2"
```

### 3.3 集合（Set）
```bash
# 添加成员
127.0.0.1:6379> SADD users "user1" "user2" "user3"
(integer) 3

# 查看所有成员
127.0.0.1:6379> SMEMBERS users
1) "user1"
2) "user2"
3) "user3"

# 判断是否存在
127.0.0.1:6379> SISMEMBER users "user1"
(integer) 1

# 计算交集
127.0.0.1:6379> SADD group1 "user1" "user2"
(integer) 2
127.0.0.1:6379> SADD group2 "user2" "user3"
(integer) 2
127.0.0.1:6379> SINTER group1 group2
1) "user2"
```

### 3.4 有序集合（Sorted Set）
```bash
# 添加成员和分数
127.0.0.1:6379> ZADD leaderboard 100 "player1" 85 "player2" 95 "player3"
(integer) 3

# 查看排名（从低到高）
127.0.0.1:6379> ZRANK leaderboard "player1"
(integer) 2

# 查看分数
127.0.0.1:6379> ZSCORE leaderboard "player1"
"100"

# 查看排行榜（从高到低）
127.0.0.1:6379> ZREVRANGE leaderboard 0 -1 WITHSCORES
1) "player1"
2) "100"
3) "player3"
4) "95"
5) "player2"
6) "85"
```

### 3.5 哈希（Hash）
```bash
# 设置字段值
127.0.0.1:6379> HSET user:1 name "John" age "25" city "New York"
(integer) 3

# 获取字段值
127.0.0.1:6379> HGET user:1 name
"John"

# 获取所有字段和值
127.0.0.1:6379> HGETALL user:1
1) "name"
2) "John"
3) "age"
4) "25"
5) "city"
6) "New York"
```

## 四、运维命令

### 4.1 服务器信息
```bash
# 查看服务器信息
127.0.0.1:6379> INFO
# Server
redis_version:6.2.6
redis_git_sha1:00000000
redis_git_dirty:0
redis_build_id:c6f3693d1aced7d9
redis_mode:standalone
...

# 查看内存使用
127.0.0.1:6379> INFO memory
# Memory
used_memory:1015544
used_memory_human:991.74K
used_memory_rss:3874816
used_memory_rss_human:3.69M
...

# 查看客户端连接
127.0.0.1:6379> CLIENT LIST
id=3 addr=127.0.0.1:52431 name= age=855 idle=0 flags=N db=0 sub=0 psub=0 multi=-1 qbuf=26 qbuf-free=32742 argv-mem=10 obl=0 oll=0 omem=0 tot-mem=61466 events=r cmd=client
```

### 4.2 性能监控
```bash
# 监控命令执行
127.0.0.1:6379> MONITOR
OK

# 查看慢查询日志
127.0.0.1:6379> SLOWLOG GET
1) 1) (integer) 1643723400
   2) (integer) 1000
   3) 1) "GET"
      2) "key"

# 重置慢查询日志
127.0.0.1:6379> SLOWLOG RESET
OK
```

 注意事项：
- MONITOR 命令在生产环境谨慎使用
- 及时清理慢查询日志
- 注意内存使用情况

## 五、性能优化建议

### 5.1 键值设计
- 使用合理的键名前缀
- 避免过长的键名
- 注意过期时间设置

### 5.2 命令使用
- 优先使用批量命令
- 避免使用耗时命令
- 合理使用管道技术

### 5.3 内存优化
- 及时清理过期数据
- 使用合适的数据结构
- 注意内存碎片率

## 总结

 本文要点回顾：
1. Redis 基础连接和数据库操作
2. 五种数据类型的常用命令
3. 运维相关的重要命令
4. 性能优化的关键建议

 进阶建议：
- 学习 Redis 集群命令
- 掌握 Redis 事务操作
- 了解 Redis 持久化机制

 相关资源：
- [Redis 官方文档](https://redis.io/documentation)
- [Redis 命令参考](https://redis.io/commands)

 欢迎在评论区分享你的 Redis 使用经验！
 关注我，获取更多后端技术干货~
