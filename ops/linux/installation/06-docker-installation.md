# Linux 实战：Docker 最新版安装指南

> 导读：详细介绍如何在 Linux 系统上安装和配置 Docker
> 目标：
> 1. 掌握 Docker 的安装方法
> 2. 了解基本的配置和优化
> 3. 学会常用的管理命令
> 特点：包含官方安装源配置、镜像加速和权限配置

## 背景
Docker 作为容器化技术的标准，已经成为开发和部署应用程序的必备工具。本文将详细介绍如何在 Linux 系统上安装和配置 Docker。

## 一、环境准备

### 1.1 系统要求
- Linux 操作系统（Ubuntu/Debian 或 CentOS）
- 64 位系统
- 内核版本 3.10 以上
- root 或 sudo 权限

### 1.2 检查并卸载旧版本

Ubuntu/Debian：
```bash
# 检查已安装的版本
$ docker --version

# 卸载旧版本
$ sudo apt remove docker docker-engine docker.io containerd runc
```

CentOS：
```bash
# 卸载旧版本
$ sudo yum remove docker docker-common docker-selinux docker-engine
```

## 二、安装 Docker

### 2.1 Ubuntu/Debian 安装

```bash
# 更新软件包索引
$ sudo apt update

# 安装必要的依赖
$ sudo apt install apt-transport-https ca-certificates curl software-properties-common gnupg

# 添加 Docker 的官方 GPG 密钥
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# 设置稳定版仓库
$ echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 安装 Docker
$ sudo apt update
$ sudo apt install docker-ce docker-ce-cli containerd.io

# 启动 Docker
$ sudo systemctl start docker
$ sudo systemctl enable docker
```

### 2.2 CentOS 安装

```bash
# 安装必要的依赖
$ sudo yum install -y yum-utils device-mapper-persistent-data lvm2

# 添加 Docker 仓库
$ sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

# 安装 Docker
$ sudo yum install docker-ce docker-ce-cli containerd.io

# 启动 Docker
$ sudo systemctl start docker
$ sudo systemctl enable docker
```

## 三、配置 Docker

### 3.1 配置镜像加速

```bash
$ sudo mkdir -p /etc/docker
$ sudo vim /etc/docker/daemon.json
```

添加以下内容：
```json
{
  "registry-mirrors": [
    "https://hub-mirror.c.163.com",
    "https://mirror.baidubce.com",
    "https://registry.docker-cn.com"
  ]
}
```

```bash
# 重启 Docker
$ sudo systemctl daemon-reload
$ sudo systemctl restart docker
```

### 3.2 用户权限配置

```bash
# 创建 docker 用户组
$ sudo groupadd docker

# 将当前用户加入 docker 组
$ sudo usermod -aG docker $USER

# 重新登录以生效
$ newgrp docker
```

## 四、验证安装

```bash
# 检查 Docker 版本
$ docker version

# 运行测试容器
$ docker run hello-world

# 查看 Docker 信息
$ docker info
```

## 五、基本优化

### 5.1 系统优化

```bash
# 开启 IPv4 转发
$ sudo sysctl -w net.ipv4.ip_forward=1

# 配置 iptables
$ sudo update-alternatives --set iptables /usr/sbin/iptables-legacy
$ sudo update-alternatives --set ip6tables /usr/sbin/ip6tables-legacy
```

### 5.2 Docker 优化

```bash
$ sudo vim /etc/docker/daemon.json
```

添加以下配置：
```json
{
  "storage-driver": "overlay2",
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "100m",
    "max-file": "3"
  },
  "default-ulimits": {
    "nofile": {
      "Name": "nofile",
      "Hard": 64000,
      "Soft": 64000
    }
  }
}
```

## 六、常用命令

```bash
# 镜像管理
$ docker images              # 列出本地镜像
$ docker pull image_name    # 拉取镜像
$ docker rmi image_name     # 删除镜像

# 容器管理
$ docker ps                 # 查看运行中的容器
$ docker ps -a              # 查看所有容器
$ docker start container    # 启动容器
$ docker stop container     # 停止容器
$ docker rm container       # 删除容器

# 系统管理
$ docker system df          # 查看磁盘使用情况
$ docker system prune       # 清理未使用的资源
```

## 七、常见问题

### 7.1 启动失败
```bash
# 检查服务状态
$ sudo systemctl status docker

# 查看日志
$ sudo journalctl -u docker.service
```

### 7.2 权限问题
```bash
# 检查用户组
$ groups $USER

# 重新加入 docker 组
$ sudo usermod -aG docker $USER
```

## 总结

本文要点回顾：
1. 介绍了 Docker 在不同 Linux 发行版上的安装方法
2. 提供了基本的配置和优化步骤
3. 说明了用户权限配置方法
4. 列举了常用的 Docker 命令

进阶建议：
- 学习 Docker Compose 的使用
- 了解 Docker 网络配置
- 掌握 Docker 数据卷管理
- 研究 Docker Swarm 集群

相关资源：
- [Docker 官方文档](https://docs.docker.com/)
- [Docker Hub](https://hub.docker.com/)
- [Docker Compose 文档](https://docs.docker.com/compose/)
