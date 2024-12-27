# 【实战】Docker容器化部署最佳实践，从零到精通！

> 本文将详细介绍Docker容器化部署的完整流程，包括环境搭建、镜像制作、容器编排等实用技巧，帮助你快速掌握Docker部署技术。

## 一、Docker基础概念

Docker是一个开源的应用容器引擎，让开发者可以打包他们的应用以及依赖包到一个可移植的镜像中，然后发布到任何流行的Linux操作系统上。

### 1.1 Docker三要素
1. 镜像（Image）：容器的模板
2. 容器（Container）：镜像的运行实例
3. 仓库（Repository）：存储和分发镜像的服务器

## 二、环境准备

### 2.1 安装Docker

#### Ubuntu系统
```bash
# 卸载旧版本
sudo apt-get remove docker docker-engine docker.io containerd runc

# 更新apt包索引并安装依赖
sudo apt-get update
sudo apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# 添加Docker的官方GPG密钥
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# 设置稳定版仓库
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 安装Docker Engine
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io
```

#### CentOS系统
```bash
# 卸载旧版本
sudo yum remove docker \
                docker-client \
                docker-client-latest \
                docker-common \
                docker-latest \
                docker-latest-logrotate \
                docker-logrotate \
                docker-engine

# 安装必要的系统工具
sudo yum install -y yum-utils device-mapper-persistent-data lvm2

# 设置稳定版仓库
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

# 安装Docker Engine
sudo yum install -y docker-ce docker-ce-cli containerd.io
```

### 2.2 启动Docker服务
```bash
# 启动Docker服务
sudo systemctl start docker
sudo systemctl enable docker

# 验证安装
docker version
docker info

# 运行测试容器
sudo docker run hello-world
```

### 2.3 配置用户权限
```bash
# 创建docker用户组
sudo groupadd docker

# 将当前用户加入docker组
sudo usermod -aG docker $USER

# 重新登录或执行以下命令使权限生效
newgrp docker
```

### 2.4 配置镜像加速
1. 登录阿里云容器镜像服务：https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors
2. 获取你的专属加速器地址

```bash
# 创建或编辑 /etc/docker/daemon.json
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://你的专属加速器地址.mirror.aliyuncs.com"]
}
EOF

# 重启Docker服务
sudo systemctl daemon-reload
sudo systemctl restart docker

# 验证配置是否生效
docker info | grep "Registry Mirrors"
```

> 提示：阿里云镜像加速器是免费的，每个账号都有专属的加速器地址，访问速度更快，建议使用。

## 三、镜像管理实战

### 3.1 基本镜像操作
```bash
# 搜索镜像
docker search nginx

# 拉取镜像
docker pull nginx:latest

# 查看本地镜像
docker images

# 删除镜像
docker rmi nginx:latest
```

### 3.2 制作自定义镜像
```dockerfile
# 创建Dockerfile
FROM nginx:latest
COPY ./app /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
# 构建镜像
docker build -t my-nginx:v1 .

# 推送到镜像仓库
docker tag my-nginx:v1 username/my-nginx:v1
docker push username/my-nginx:v1
```

## 四、容器管理实战

### 4.1 容器基本操作
```bash
# 启动容器
docker run -d -p 80:80 --name mynginx nginx:latest

# 查看运行中的容器
docker ps

# 查看所有容器
docker ps -a

# 停止容器
docker stop mynginx

# 删除容器
docker rm mynginx
```

### 4.2 容器数据管理
```bash
# 创建数据卷
docker volume create mydata

# 使用数据卷
docker run -d -v mydata:/data nginx:latest

# 容器间数据共享
docker run -d --volumes-from container1 nginx:latest
```

## 五、Docker网络配置

### 5.1 网络模式
```bash
# 创建自定义网络
docker network create mynet

# 使用自定义网络启动容器
docker run -d --network mynet --name web nginx:latest

# 容器互联
docker network connect mynet container2
```

### 5.2 端口映射
```bash
# 单端口映射
docker run -d -p 8080:80 nginx:latest

# 多端口映射
docker run -d -p 8080:80 -p 443:443 nginx:latest
```

## 六、Docker Compose实战

### 6.1 安装Docker Compose
```bash
# 下载Docker Compose
curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# 添加执行权限
chmod +x /usr/local/bin/docker-compose
```

### 6.2 编写docker-compose.yml
```yaml
version: '3'
services:
  web:
    image: nginx:latest
    ports:
      - "80:80"
    volumes:
      - ./html:/usr/share/nginx/html
    networks:
      - webnet
  
  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: root123
    volumes:
      - dbdata:/var/lib/mysql
    networks:
      - webnet

networks:
  webnet:

volumes:
  dbdata:
```

### 6.3 使用Docker Compose
```bash
# 启动服务
docker-compose up -d

# 查看服务状态
docker-compose ps

# 停止服务
docker-compose down
```

## 七、生产环境最佳实践

### 7.1 安全性建议
1. 使用非root用户运行容器
```dockerfile
USER nginx
```

2. 限制容器资源使用
```bash
docker run -d --memory="512m" --cpus="1.0" nginx:latest
```

### 7.2 性能优化
1. 多阶段构建
```dockerfile
# 构建阶段
FROM node:14 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 运行阶段
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
```

2. 镜像优化
- 使用alpine基础镜像
- 合并RUN命令
- 清理不必要的文件

### 7.3 监控和日志
```bash
# 查看容器日志
docker logs -f container_name

# 查看容器资源使用
docker stats

# 容器健康检查
docker run -d --health-cmd="curl -f http://localhost/" nginx:latest
```

## 八、常见问题处理

### 8.1 容器无法启动
1. 检查端口占用
```bash
netstat -tunlp | grep 80
```

2. 检查日志
```bash
docker logs container_name
```

### 8.2 镜像构建失败
1. 检查Dockerfile语法
2. 确保构建上下文正确
3. 查看构建日志

## 九、总结

通过本文的学习，你应该掌握了：
1. Docker的基本概念和操作
2. 镜像的制作和管理
3. 容器的部署和维护
4. Docker Compose的使用
5. 生产环境的最佳实践

Docker的学习是一个循序渐进的过程，建议从基础开始，逐步实践。如果你在使用过程中遇到问题，欢迎在评论区讨论！
