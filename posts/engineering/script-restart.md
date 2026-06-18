---
date: 2024-03-15
title: 本地脚本执行构建推送Docker镜像并触发kuboard重启项目
tags:
- Docker
- 部署
description: Vue项目执行本地脚本，构建Docker镜像，推送镜像到Harbor仓库通过kuboard重启kubernetes部署流程小结。
---

# **本地脚本执行构建推送Docker镜像并触发kuboard重启项目**

因为公司的Jenkins构建起来巨慢，于是就抛弃了Jenkins，改用本地脚本构建推送Docker镜像到Harbor仓库，通过kuboard重启项目。构建+推送+重启基本不会超过两分钟，很丝滑。

## **构建Docker镜像**

安装Docker这种就不说了，官网去装，首先确保你当前的项目目录下有Dockerfile文件，该文件描述了如何构建你的Docker镜像。当你执行docker build命令时，Docker会从Dockerfile中读取指令，然后按照Dockerfile中的指令构建镜像。

```bash
# 指定基础镜像，1.21-alpine这个版本还蛮轻量的
FROM nginx:1.21-alpine
# 定义构建参数，在构建镜像时可以通过--build-arg标志来传递此参数的值
ARG NGINXENV
# 指定工作目录，说明接下来的COPY、ADD等指令都是在这个目录下执行
WORKDIR /usr/share/nginx/html
# 将dist目录下的文件复制到工作目录下
COPY dist .
# 在容器内创建一个cert目录，用于存放证书
RUN mkdir -p /etc/nginx/cert
# 将deploy/cert目录下的文件复制到/etc/nginx/cert目录下，存放证书和密钥
COPY deploy/cert /etc/nginx/cert
# 将deploy/${NGINXENV}.conf文件复制到/etc/nginx/conf.d/default.conf文件中，用于配置nginx，Nginx配置就不再赘述了
COPY deploy/${NGINXENV}.conf /etc/nginx/conf.d/default.conf

# 暴露80端口和443端口，你可以通过这两个端口来访问服务
EXPOSE 80 443
```

## **创建本地test.sh脚本**

```bash
# 设置Harbor仓库地址
HARBOR_REG='Harbor仓库地址'
# 设置镜像名称
IMAGE='镜像名称'
# 设置Harbor登录用户名
HARBOR_SECRET_USR='用户名'
# 设置Harbor登录密码
HARBOR_SECRET_PSW='登录密码'
# 设置部署环境，这里为测试环境
DEPLOY_ENV='test'

# 打印提示信息，表示开始进行项目构建
echo "项目构建"
# 删除已有的dist目录，确保构建产物是全新的
rm -rf ./dist
# 使用yarn工具执行构建命令
yarn run build

# 打印提示信息，表示开始构建Docker镜像
echo "build docker image"
# 使用Dockerfile构建镜像，并设置标签为指定的Harbor仓库地址、镜像名称和部署环境
docker build -t ${HARBOR_REG}/${IMAGE}:${DEPLOY_ENV} . --build-arg NGINXENV=${DEPLOY_ENV}

# 打印提示信息，表示开始推送镜像到Harbor仓库
echo "开始推送镜像"
# 使用Harbor的用户名和密码登录到Harbor仓库
docker login -u ${HARBOR_SECRET_USR} -p ${HARBOR_SECRET_PSW} http://${HARBOR_REG}
# 将构建好的镜像推送到Harbor仓库
docker push ${HARBOR_REG}/${IMAGE}:${DEPLOY_ENV}
# 打印提示信息，表示镜像推送结束
echo "推送结束"

# 使用curl命令向Kuboard发送PUT请求，请求体中包含重启Kubernetes部署的信息
curl -X PUT \
    # 设置请求的内容类型为YAML
    -H "Content-Type: application/yaml" \
    # 设置请求的Cookie，这里包含了Kuboard的用户名和访问密钥
    -H "Cookie: KuboardUsername=用户名; KuboardAccessKey=密钥" \
    # 设置请求体，指定要重启的Kubernetes部署的详细信息
    -d '{"kind":"deployments","namespace":"test","name":"项目名称"}' \
    # 设置请求的URL，指向Kuboard的API地址
    "http://API地址/kuboard-api/cluster/default/kind/CICDApi/admin/resource/restartWorkload"
```
## **执行test.sh脚本**

<a data-fancybox="gallery" href="https://img2.imgtp.com/2024/03/20/l6hTkO1S.png" data-caption="脚本执行">
    <img v-lazy="'https://img2.imgtp.com/2024/03/20/l6hTkO1S.png'"/>
</a>

<a data-fancybox="gallery" href="https://img2.imgtp.com/2024/03/20/fqpSKi4u.png" data-caption="脚本执行">
    <img v-lazy="'https://img2.imgtp.com/2024/03/20/fqpSKi4u.png'"/>
</a>


* 执行完成，上述脚本主要完成了以下几个步骤：

1. **环境变量设置**：定义了Harbor仓库地址、镜像名称、Harbor登录凭据以及部署环境变量。

2. **项目编译打包**：删除现有的dist目录，使用yarn run build命令进行前端项目的构建，确保生成的构建产物是最新的。

3. **Docker镜像构建**：使用docker build命令根据Dockerfile构建Docker镜像，并通过--build-arg传递构建参数NGINXENV给Dockerfile，以便根据环境定制Nginx配置。

4. **镜像推送**：使用docker login登录到Harbor仓库，并使用docker push命令将构建好的镜像推送到Harbor仓库中。

5. **重启Kubernetes部署**：通过curl命令向Kuboard发送PUT请求，请求体中包含重启指定Kubernetes部署的信息。Kuboard会根据请求中的kind、namespace和name字段找到对应的部署，并执行重启操作。

<Fancybox />
<Comment />