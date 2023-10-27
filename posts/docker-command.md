---
date: 2023-10-20
title: Docker常用命令
tags:
- Docker
description: Docker提供了很多功能和选项，可以根据需要使用不同的命令来管理容器化应用程序，整理了一下docker的常用命令。
---

# Docker常用命令

Docker提供了很多功能和选项，可以根据需要使用不同的命令来管理容器化应用程序，整理了一下docker的常用命令。


查看完整的Docker命令列表以及各个命令的选项和用法

```bash
docker --help
```

查看docker环境信息

```bash
docker info
```

查看docker版本信息

```bash
#docker -v
docker version
```

在Docker Hub或其他镜像仓库中搜索容器镜像

```bash
docker search <image>[:<tag>]
# 例如搜索nginx镜像
docker search nginx
```

从Docker Hub或其他镜像仓库中拉取镜像。

```bash
docker pull <image>[:<tag>]
# 例如拉取nginx镜像
docker pull nginx
```

推送镜像到镜像仓库

```bash
docker push <image>[:<tag>]
# 例如推送nginx镜像
docker push nginx
```

基于Dockerfile构建镜像

```bash
docker build -t <image>[:<tag>] .
# 例如你的镜像名称为my-blog
docker build -t my-blog .
```

列出本地镜像

```bash
docker images
```

创建并启动容器
```bash
docker run <image>[:<tag>]
# 例如后台启动名称为xzm-blog端口为8080镜像名为xzm-blog-image的容器
docker run -d -p 8080:80 --name xzm-blog xzm-blog-image
# 或者
docker run -d --name xzm-blog 8080:80 -p xzm-blog-image
```

查看运行中的容器

```bash
docker ps
```

停止运行中的容器

```bash
docker stop <container>
# 例如停止名称为xzm-blog的容器
docker stop xzm-blog
```

重启容器

```bash
docker restart <container>
# 例如重启名称为xzm-blog的容器
docker restart xzm-blog
```

删除容器

```bash
docker rm <container>
# 例如删除名称为xzm-blog的容器
docker rm xzm-blog
```

查看容器日志

```bash
docker logs <container>
# 例如查看名称为xzm-blog的容器日志
docker logs xzm-blog
```

以上，够用！

<Comment />
