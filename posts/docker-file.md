---
date: 2023-10-08
title: Dockerfile 示例
tags:
- Dockerfile
description: 前后端 Dockerfile 配置文件示例。
---

# 前后端 Dockerfile 示例

## Java 应用

在项目根目录创建 Dockerfile 文件，并填充以下内容。

```Dockerfile
# 以此镜像为基础镜像
FROM java:8-jdk-alpine

ENV NACOS_ENV prod

# 设置工作目录
WORKDIR /app

# 复制JAR包到工作目录
COPY customer-web/target/paas.jar /app/paas.jar
COPY userWeb/user-web/target/user-web.jar /app/user-web.jar
COPY operate/operate-admin/target/admin.jar /app/admin.jar
COPY deploy/start.sh /app/start.sh

# 配置加速镜像
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories
# 下载缺少的镜像
RUN apk add --update font-adobe-100dpi ttf-dejavu fontconfig

# 分配文件夹权限
RUN chmod +x /app/start.sh

# 配置时区
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN echo "Asia/Shanghai" > /etc/timezone
# 暴露端口
EXPOSE 10050 10090 10030

ENTRYPOINT ["sh", "/app/start.sh", "$NACOS_ENV"]
```

同在根目录下创建 deploy/start.sh 启动脚本

```bash deploy/start.sh
#!/bin/sh
# 启动下列 jar 包
nohup java -jar /app/paas.jar --spring.profiles.active=$1 > paas.log 2>&1 &
nohup java -jar /app/user-web.jar --spring.profiles.active=$1 > user-web.log 2>&1 &
nohup java -jar /app/admin.jar --spring.profiles.active=$1 > admin.log 2>&1 &

# 让容器保持启动
while [[ true ]]; do
    sleep 1
done
```

## 前端 应用

在项目根目录创建 Dockerfile 文件，并填充以下内容。

```Dockerfile
# 以此镜像为基础镜像
FROM nginx:stable-alpine

ENV nginx
# 设置工作目录
WORKDIR /usr/share/nginx/html
# 复制前端文件夹到工作目录
COPY dist .
# 复制nginx配置文件
COPY deploy/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 443
```

同在根目录下创建 deploy/default.conf 配置文件

```nginx
server{
 listen 80;
 rewrite  ^(.*)$  https://$host$1  permanent;
}

server{
 listen 443 ssl http2;
 server_name frontend;
 # 域名配置
 ssl_certificate      cert/danmi.com.crt;
 ssl_certificate_key  cert/danmi.com.key;
 ssl_session_cache    shared:SSL:10m;
 ssl_session_timeout  5m;
 ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;
 ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
 ssl_prefer_server_ciphers  on;
 root /usr/share/nginx/html; # 替换至前端部署目录

 location / {
  try_files $uri $uri/ /index.html;
 }

 # 反向代理至用户中心API
 location ^~ /api/{
  proxy_pass http://api:9110/; # 替换至服务URL
  proxy_set_header   Host $host;
  proxy_set_header   X-Real-IP $remote_addr;
  proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header   X-Forwarded-Host $server_name;
 }
}

```

<Comment />
