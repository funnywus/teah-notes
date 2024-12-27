# Linux Nginx 配置 SSL 证书：从入门到实践

> 导读：本文详细介绍如何在 Linux 系统中为 Nginx 配置 SSL 证书，实现 HTTPS 安全访问
> 目标：
> 1. 了解 SSL 证书的基本概念
> 2. 掌握 Nginx SSL 证书配置方法
> 3. 学会处理常见配置问题
> 特点：步骤清晰，实用性强

## 一、SSL 证书准备

### 1.1 获取 SSL 证书
有以下几种方式：
1. 使用免费的 Let's Encrypt 证书
2. 购买商业 SSL 证书
3. 自签名证书（仅用于测试）

以 Let's Encrypt 为例：
```bash
# 安装 certbot
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx

# 获取证书
sudo certbot --nginx -d your-domain.com
```

### 1.2 证书文件说明
获取到的证书通常包含：
- `fullchain.pem`：完整的证书链
- `privkey.pem`：私钥文件

## 二、配置步骤

### 2.1 基础配置
编辑 Nginx 配置文件：
```bash
sudo vim /etc/nginx/conf.d/default.conf
```

添加 SSL 配置：
```nginx
server {
    listen 443 ssl;
    server_name your-domain.com;

    # SSL 证书配置
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    # SSL 协议配置
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

    # SSL 会话配置
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:50m;
    ssl_session_tickets off;

    # HSTS 配置（可选）
    add_header Strict-Transport-Security "max-age=63072000" always;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }
}

# HTTP 重定向到 HTTPS
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}
```

### 2.2 验证配置
```bash
# 检查配置是否正确
sudo nginx -t

# 重启 Nginx
sudo systemctl restart nginx
```

## 三、安全优化

### 3.1 配置 SSL 安全头
```nginx
# 添加安全响应头
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
```

### 3.2 启用 OCSP Stapling
```nginx
# 开启 OCSP Stapling
ssl_stapling on;
ssl_stapling_verify on;
resolver 8.8.8.8 8.8.4.4 valid=300s;
resolver_timeout 5s;
```

## 四、常见问题解决

### 问题1：证书过期
解决方法：
```bash
# 手动更新证书
sudo certbot renew

# 设置自动更新（推荐）
sudo certbot renew --dry-run
sudo crontab -e
# 添加定时任务：每天凌晨 3 点检查更新
0 3 * * * /usr/bin/certbot renew --quiet
```

### 问题2：SSL 配置测试
使用在线工具测试：
1. SSL Labs（https://www.ssllabs.com/ssltest/）
2. Security Headers（https://securityheaders.com/）

## 总结

通过本文的配置步骤，我们实现了：
- Nginx SSL 证书的安装和配置
- HTTPS 的安全访问
- SSL 安全优化
- 证书自动更新

配置 SSL 证书不仅能提高网站的安全性，还能提升搜索引擎排名和用户信任度。建议定期检查证书状态，确保证书不会过期。
