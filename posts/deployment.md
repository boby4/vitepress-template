---
date: 2023-10-25
title: 基于Centos部署Vue+Nginx+Docker的前端项目
tags:
- 部署
- Nginx
- Docker
description: 搞了一台腾讯云的测试服务器，基于CentOS 7系统，记录一下部署Vue+Nginx+Docker的前端项目的过程。
---

## 基于Centos部署Vue+Nginx+Docker的前端项目

搞了一台腾讯云的测试服务器，基于CentOS 7系统，记录一下部署Vue+Nginx+Docker的前端项目的过程。反正也不要钱，随便玩哈哈哈。

## 本地打包项目

我的项目是vitepress+vue3+vite，打包命令如下：

```bash
npm run build
```

打包完成后，会生成一个dist文件夹，里面就是打包好的静态文件。

<a data-fancybox="gallery" href="https://i.mji.rip/2023/10/27/1bf60ce10dc295b6cbd113a37ad26032.png" data-caption="静态文件">
<img v-lazy="'https://i.mji.rip/2023/10/27/1bf60ce10dc295b6cbd113a37ad26032.png'"/>
</a>

建一个Dockfile文件用于指 Docker引擎如何构建一个特定的容器镜像，文件内容你可以先编写好，后面和dist文件一起上传到服务器，在服务器上面编辑也可以

```bash
FROM nginx:stable-alpine
COPY dist/  /usr/share/nginx/html/
COPY default.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80 443
```

再建一个default.conf文件用于配置nginx反向代理服务器，内容如下：

```bash
server {
  listen       80;
  server_name  localhost;

  location / {
    root   /usr/share/nginx/html;
    index  index.html index.htm;
  }
}
```

## 在服务器上安装Docker

按照顺序去安装就好

```bash
yum install -y yum-utils  device-mapper-persistent-data  lvm2
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
yum makecache fast yum -y install docker-ce
# 启动docker
systemctl start docker
```

使用命令查看docker的版本号

```bash
docker -v
```

有版本号说明docker已经安装完成

<a data-fancybox="gallery" href="https://i.mji.rip/2023/10/27/d1ce91b43593240f0322c09b9f2a140c.png" data-caption="docker版本号">
<img v-lazy="'https://i.mji.rip/2023/10/27/d1ce91b43593240f0322c09b9f2a140c.png'"/>
</a>

## 安装Nginx

* 查找Docker镜像仓库中Nginx的可用版本

```bash
docker search nginx
```

* 安装Nginx

```bash
docker pull nginx:latest
```

* 下载成功后使用docker images命令查看本地镜像，可以看到刚刚下载的Nginx镜像

<a data-fancybox="gallery" href="https://i.mji.rip/2023/10/27/00db1839f1669019e81de903c792b97a.png" data-caption="安装Nginx">
<img v-lazy="'https://i.mji.rip/2023/10/27/00db1839f1669019e81de903c792b97a.png'"/>
</a>

## 上传文件到服务器

创建一个文件夹把dist文件夹和刚才建的Dockerfile和default.conf文件放进去，压缩，然后上传到服务器

<a data-fancybox="gallery" href="https://i.mji.rip/2023/10/27/f6d1863ce3507923b594fe1c70b7fc4f.png" data-caption="上传项目文件">
<img v-lazy="'https://i.mji.rip/2023/10/27/f6d1863ce3507923b594fe1c70b7fc4f.png'"/>
</a>

解压缩文件

<a data-fancybox="gallery" href="https://i.mji.rip/2023/10/27/140f948be7f6090dd6f5ecf83acb000e.png" data-caption="上传项目文件">
<img v-lazy="'https://i.mji.rip/2023/10/27/140f948be7f6090dd6f5ecf83acb000e.png'"/>
</a>

## 使用Docker创建镜像，这里使用xzm-blog作为镜像名

```bash
docker build -t xzm-blog .
```

<a data-fancybox="gallery" href="https://i.mji.rip/2023/10/27/fae248f59efb505f2de000766e52bf05.png" data-caption="创建镜像">
<img v-lazy="'https://i.mji.rip/2023/10/27/fae248f59efb505f2de000766e52bf05.png'"/>
</a>

## 创建容器

```bash
docker run -d -p 8084:80 --name xzm-blog xzm-blog
# 或者
docker run -d --name xzm-blog -p 8084:80 xzm-blog
```

--name后面是容器名称
-p后面是将本地的8084端口映射到容器内部的80端口，也就是将ng的80端口映射到服务器的8084端口
最后一个xzm-blog是刚才创建的镜像名

* 查看运行中的容器

<a data-fancybox="gallery" href="https://i.mji.rip/2023/10/27/5372c9f0ca9fdd9e0ebe2e4849a266a0.png" data-caption="容器">
<img v-lazy="'https://i.mji.rip/2023/10/27/5372c9f0ca9fdd9e0ebe2e4849a266a0.png'"/>
</a>

最后打开浏览器输入你的服务器IP:8084，就可以看到你的项目了，我这里端口默认80了。

<a data-fancybox="gallery" href="https://i.mji.rip/2023/10/27/ee2c3233ab58332f6d4bb135fcd4f4de.png" data-caption="网站预览">
<img v-lazy="'https://i.mji.rip/2023/10/27/ee2c3233ab58332f6d4bb135fcd4f4de.png'"/>
</a>

部署完成！

<Fancybox />
<Comment />
