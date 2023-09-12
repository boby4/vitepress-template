---
date: 2023-09-11
title: 一个非常实用的内网穿透工具
tags:
- 部署
- 内网穿透
description: 不用部署服务器，直接让别人访问在你电脑上运行的网站和服务，即使是网络小白也能快上手，可以用于项目展示，前后端联调等。
---

# 一个非常实用的内网穿透工具

不用部署服务器，直接让别人访问在你电脑上运行的网站和服务，网络小白也可以很快上手。

## 内网穿透的可以干什么

* 远程访问和控制：
你可以通过内网穿透来访问和控制家庭或办公室网络中的计算机、服务器、路由器等设备，无论你身在何处。这对于远程技术支持、文件访问和设备管理非常有用。

* 本地Web开发测试：
内网穿透可用于本地Web开发和测试。你可以将本地Web服务器暴露到互联网上，以便客户、合作者或测试人员可以查看和测试你的网站或应用程序。

* 内网设备远程访问：
你可以让外部用户通过互联网访问你内部网络的设备，例如监控摄像头、智能家居设备、打印机等。这使得你可以从任何地方访问和控制这些设备。

* 局域网游戏和应用：
内网穿透可以用于在局域网中玩多人游戏或运行多人应用程序，使玩家可以通过互联网连接到局域网游戏服务器或应用程序。

* 文件共享：
你可以使用内网穿透来共享文件和文档，让远程用户或团队成员可以访问并下载这些文件，而不必物理地传递文件或使用电子邮件附件。

* IoT设备远程管理：
如果你拥有物联网（IoT）设备，你可以通过内网穿透来远程管理这些设备，包括升级固件、修改设置或监控传感器数据。

* 内部网站或应用程序访问：
你可以使用内网穿透来让外部用户访问内部网站、应用程序或服务，以便与客户、合作伙伴或供应商共享信息。

## Ngrok工具

一个开源的内网穿透工具，它允许你将本地Web服务器暴露到互联网上，以便你可以从任何地方访问

* 官网地址

```url
https://www.ngrok.com/
```

* 访问官网，使用Github或者邮箱注册登录，然后根据自己的操作系统选择一个压缩包下载，这里我选择的是Windows的压缩包

<a data-fancybox="gallery" href="https://ice.frostsky.com/2023/09/12/73764732ec057156c33e968ba5f3de3f.png" data-caption="ngrok下载">
<img src="https://ice.frostsky.com/2023/09/12/73764732ec057156c33e968ba5f3de3f.png"/>
</a>

* 解压缩之后得到一个.exe的程序，双击运行

<a data-fancybox="gallery" href="https://ice.frostsky.com/2023/09/12/a6f7c85a79975c2a7fb98af8910f509d.png" data-caption="ngrok.exe">
<img src="https://ice.frostsky.com/2023/09/12/a6f7c85a79975c2a7fb98af8910f509d.png"/>
</a>

<a data-fancybox="gallery" href="https://ice.frostsky.com/2023/09/12/fa3d052289127b7937d18643fb2c7a8b.png" data-caption="ngrok.exe">
<img src="https://ice.frostsky.com/2023/09/12/fa3d052289127b7937d18643fb2c7a8b.png"/>
</a>

* 在刚才执行完的程序后面继续执行 ngrok 命令添加你的 authtoken，进行账户连接

<a data-fancybox="gallery" href="https://ice.frostsky.com/2023/09/12/bc79ba7dd7fc43d4cb74f1b2745c3bba.png" data-caption="ngrok.exe">
<img src="https://ice.frostsky.com/2023/09/12/bc79ba7dd7fc43d4cb74f1b2745c3bba.png"/>
</a>

<a data-fancybox="gallery" href="https://ice.frostsky.com/2023/09/12/c0460ca18cbdbe266e2940f4f65ff895.png" data-caption="ngrok.exe">
<img src="https://ice.frostsky.com/2023/09/12/c0460ca18cbdbe266e2940f4f65ff895.png"/>
</a>

* 到这里所有的配置都已经完成了，接下来继续执行下面的命令就可以启动内网穿透服务了

```bash
# 这个端口号自己定义，尽量避开常用接口，避免接口占用
ngrok http 5173
```

* Ngrok 就自动为我们生成了一个Https的域名，复制这个域名打开就可以访问你的电脑启动的项目了

<a data-fancybox="gallery" href="https://ice.frostsky.com/2023/09/12/01e3ee05b75fb081d661a0b68de3f487.png" data-caption="ngrok">
<img src="https://ice.frostsky.com/2023/09/12/01e3ee05b75fb081d661a0b68de3f487.png"/>
</a>

<a data-fancybox="gallery" href="https://ice.frostsky.com/2023/09/12/0c9617f6f3e25efc7c4f76931a6af0b9.png" data-caption="ngrok启动">
<img src="https://ice.frostsky.com/2023/09/12/0c9617f6f3e25efc7c4f76931a6af0b9.png"/>
</a>

* 由于每次重启Ngrok都会给我们分配一个随机key的域名，我们可以在Cloud Edge菜单下的Domains里面新增一个免费的固定域名，我这里改成5173启动

<a data-fancybox="gallery" href="https://ice.frostsky.com/2023/09/12/498b596468272411919f83cf143de9cb.png" data-caption="ngrok固定域名">
<img src="https://ice.frostsky.com/2023/09/12/498b596468272411919f83cf143de9cb.png"/>
</a>

* 复制命令在之前的程序下执行，就可以看到我们配置的固定域名了，这里默认的80端口是可以修改的，改成你需要的项目端口即可

<a data-fancybox="gallery" href="https://ice.frostsky.com/2023/09/12/7d2f8eb9e48da009d259f324ea192e90.png" data-caption="ngrok固定域名">
<img src="https://ice.frostsky.com/2023/09/12/7d2f8eb9e48da009d259f324ea192e90.png"/>
</a>

* 复制域名到浏览器打开就可以看到你的项目啦。

<a data-fancybox="gallery" href="https://ice.frostsky.com/2023/09/12/d134f8116e2df2b450abcd17e1fb428d.png" data-caption="ngrok固定域名页面">
<img src="https://ice.frostsky.com/2023/09/12/d134f8116e2df2b450abcd17e1fb428d.png"/>
</a>

<Fancybox />
<Comment />