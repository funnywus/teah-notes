# 【Spring Boot教程】10分钟搭建你的第一个Spring Boot项目

> 本文将带你快速创建并运行一个Spring Boot项目，包含REST API的基本开发流程。

## 一、环境准备

### 1.1 安装必要软件
1. JDK 17+（推荐使用 JDK 17 LTS 版本）
2. Maven 3.6+
3. IDE（推荐使用 IntelliJ IDEA）

### 1.2 检查环境
```bash
# 检查Java版本
java -version

# 检查Maven版本
mvn -v
```

## 二、创建项目

### 2.1 使用Spring Initializr创建
1. 访问 https://start.spring.io/
2. 填写项目信息：
   ```properties
   Project：Maven
   Language：Java
   Spring Boot：3.2.1
   Group：com.example
   Artifact：demo
   Package name：com.example.demo
   Java：17
   ```
3. 添加依赖：
   - Spring Web
   - Spring Boot DevTools
   - Lombok

### 2.2 导入IDE
1. 解压下载的项目文件
2. 在IDEA中选择 File -> Open -> 选择项目文件夹
3. 等待Maven下载依赖

## 三、开发第一个API

### 3.1 创建控制器
```java
package com.example.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
    
    @GetMapping("/hello")
    public String hello() {
        return "Hello, Spring Boot!";
    }
}
```

### 3.2 配置应用
编辑 `src/main/resources/application.properties`：
```properties
# 服务器端口
server.port=8080
# 应用名称
spring.application.name=demo
```

### 3.3 运行应用
```bash
# 方式一：IDE运行
右键 DemoApplication.java -> Run

# 方式二：命令行运行
mvn spring-boot:run
```

### 3.4 测试API
```bash
# 使用curl测试
curl http://localhost:8080/hello

# 或直接浏览器访问
http://localhost:8080/hello
```

## 四、开发RESTful API

### 4.1 创建实体类
```java
package com.example.demo.entity;

import lombok.Data;

@Data
public class User {
    private Long id;
    private String name;
    private String email;
}
```

### 4.2 创建用户控制器
```java
package com.example.demo.controller;

import com.example.demo.entity.User;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    
    private List<User> users = new ArrayList<>();
    
    @GetMapping
    public List<User> getAllUsers() {
        return users;
    }
    
    @PostMapping
    public User createUser(@RequestBody User user) {
        users.add(user);
        return user;
    }
}
```

### 4.3 测试RESTful API
```bash
# 获取用户列表
curl http://localhost:8080/api/users

# 创建新用户
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com"}'
```

## 五、常见问题解决

### 5.1 端口占用
问题：启动时提示端口被占用
```
Web server failed to start. Port 8080 was already in use.
```

解决方案：
1. 修改配置文件中的端口
```properties
server.port=8081
```
2. 或终止占用端口的进程
```bash
# macOS/Linux
lsof -i :8080
kill -9 PID

# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

### 5.2 Java版本不匹配
问题：提示Java版本不匹配
```
Java version mismatch
```

解决方案：
1. 安装正确版本的JDK
2. 或修改pom.xml中的Java版本
```xml
<properties>
    <java.version>17</java.version>
</properties>
```

## 六、下一步学习
1. Spring Boot整合MySQL
2. Spring Boot整合MyBatis
3. Spring Boot安全认证
4. Spring Boot缓存处理
5. Spring Boot微服务开发

## 参考资料
- [Spring Boot官方文档](https://docs.spring.io/spring-boot/docs/current/reference/html/)
- [Spring Initializr](https://start.spring.io/)
- [Spring Boot Guides](https://spring.io/guides/gs/spring-boot/)
