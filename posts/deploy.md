---
date: 2023-09-01
title: 前端项目部署学习
tags:
- 部署
- vue
description: 静态网站部署-Docker部署-CI/CD自动化部署
---

# 前端项目部署学习

## 什么是DevOps

DevOps 就是开发（Development）+ 测试（QuantityAssurance）+运维（Operations）。指的是一种思想、是一种重视 `Dev` 开发人员和 `Ops` 运维人员之间沟通、协作的流程。通过自动化的软件交付，使软件的构建，测试，发布更加的快捷、稳定、可靠。

## 静态网站部署

* 跳板机（Jump Server）

也称堡垒机，是一类可作为跳板批量操作远程设备的网络设备，是系统管理员或运维人员常用的操作平台之一，用于安全访问服务器。

* 服务器

用于存放和运行生产文件的主机

* 部署脚本（nginx）

一份Nginx 配置文件，用于管理静态文件、反向代理、负载均衡等作用

```nginx
server {
    # 指定服务器监听的端口
    listen 80;
    # 这是服务器名，用于解析HTTP请求中的主机名，这里未给出具体的值，表示使用请求中的主机名
    # server_name test.***.com;
    # 这是重定向规则，将所有HTTP请求重定向到HTTPS协议，并保留原始请求路径
    # rewrite  ^(.*)$  https://$host$1  permanent;
    # 指定服务器文件根目录，即静态文件存放的位置
    root /usr/share/nginx/html; # 替换至前端部署目录
    # 设置客户端请求体最大大小，单位为字节
    client_max_body_size  100m;
    # 定义请求路径匹配规则，匹配所有请求路径
    location / {
        # try_files指令会尝试找到并返回文件，优先尝试真实路径，然后是URI路径，最后是/index.html
        try_files $uri $uri/ /index.html;
    }
    # 定义路径匹配规则，匹配以/api/开头的请求路径
    # 反向代理api
    location ^~ /api/{
        # 设置代理服务器地址和端口
        proxy_pass http://; # 替换至服务URL
        # 设置代理服务器请求头，将请求的主机名、真实IP、代理添加的X-Forwarded-For头和X-Forwarded-Host头传递给后端服务器
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Host $server_name;
    }
}
```

* 前端将打包后的静态文件 和nginx 配置交给运维，运维去机器上更新服务

## 什么是Docker

Docker是一种开源的应用容器引擎，它让开发者可以打包他们的应用以及依赖包到一个可移植的镜像中，然后发布到任何流行的Linux或Windows操作系统的机器上，也可以实现虚拟化。Docker能够将应用程序和基础设施层隔离，并且能将基础设施当作程序一样进行管理，从而有助于更快地交付应用。使用Docker能够更快地打包、测试和部署应用程序，并可以缩短从编写到部署运行代码的周期。

* 容器和镜像

容器（Container）是一种轻量级的、可移植的技术，它可以打包、分发和运行应用程序。容器提供了一种方式，使得应用程序及其依赖项能够被隔离并在不同的平台上运行。容器提供了一个独立的环境，其中包含了运行应用程序所需的所有资源和应用程序本身。在容器中，所有的应用程序组件都被打包成一个独立的单元，这使得应用程序可以在任何支持容器运行的环境中无缝地运行。

镜像（Image）是容器的静态文件，它包含了运行某个应用程序所需的所有文件和资源。镜像可以被看作是容器的“只读模板”，它包含了运行应用程序所需的所有文件、库、依赖项等。镜像由一系列层构成，每个层包含了构建镜像所需的一个或多个文件。在构建容器时，可以使用一个预先构建的镜像作为起点，然后根据需要添加或修改文件，以创建新的容器。

## Vue Docker 部署的详细流程

* 创建文件夹，并进入到该文件夹，例如创建一个名为 my_vue 的文件夹，然后进入该文件夹：

```bash
mkdir my_vue && cd my_vue
```

* 创建 Dockerfile 文件，并打开该文件，写入以下内容：

```dockerfile
# 使用官方提供的 Nginx 作为基础镜像
FROM nginx

# 将宿主机的 /var/run/docker.sock 连接到容器的 /var/run/docker.sock
VOLUME /var/run/docker.sock

# 将工作目录设置为 /app
WORKDIR /app

# 将当前目录的内容复制到容器的 /app 目录下
ADD . /app

# 修改容器内的默认网站根目录路径
RUN echo "server { listen 80; server_name localhost; root /usr/share/nginx/html; index index.html index.htm; try_files $uri $uri/ /index.html =404; location / { } location /doc { } location /api { } location = /50x.html { } }" > /etc/nginx/conf.d/default.conf

# 将主机上的 /etc/nginx/nginx.conf 文件复制到容器的 /etc/nginx/nginx.conf 文件
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

# 将主机上的 /etc/nginx/conf.d/default.conf 文件复制到容器的 /etc/nginx/conf.d/default.conf 文件
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
```

* 在与 Dockerfile 同一目录下创建一个名为 nginx 的文件夹，并在该文件夹中创建两个文件，分别是 nginx.conf 和 default.conf。

* 在 nginx 文件夹中创建 nginx.conf 文件，并写入以下内容：

```nginx
worker_processes 1;
events { worker_connections 1024; }
http { gzip on; gzip_types text/plain text/css text/xml application/xml application/json application/javascript; }
```

* 在 nginx 文件夹中创建 default.conf 文件，并写入以下内容：

```nginx
server { listen 80; server_name localhost; root /usr/share/nginx/html; index index.html index.htm; try_files $uri $uri/ /index.html =404; location / { } location /doc { } location /api { } location = /50x.html { } }
```

* 在与 Dockerfile 同一目录下创建一个名为 dist 的文件夹，并在该文件夹中打包 Vue 项目，例如使用 npm run build 命令进行打包。

* 在 Dockerfile 同级目录下执行以下命令构建 Docker 镜像：

```shell
docker run -d -p 80:80 my_vue
```

* 构建完成后，执行以下命令启动 Docker 容器：

```shell
docker run -d -p 80:80 my_vue
```

## 什么是CI/CD

CI/CD（持续集成和持续交付/部署）是一种软件开发流程模型，旨在通过自动化和持续性的构建、测试、部署和交付过程，来提高软件开发和发布的效率和质量。CI/CD的目标是缩短软件开发和发布的周期，降低开发和发布的成本和风险，以满足快速变化和不断迭代的业务需求。是一种通过在应用开发阶段引入自动化来频繁向客户交付应用的方法。

* 持续集成（Continuous Integration，CI）

开发人员将代码不断地提交到源代码管理系统中，该过程中，自动化的测试和构建工具会自动从源代码库中获取最新的代码，进行编译、测试、打包等操作，并生成相应的构建产物。

* 持续交付（Continuous Delivery，CD）

将构建产物部署到测试环境，进行测试和验证，最终生成可部署的产物。

* 持续部署（Continuous Deployment，CD）

将构建产物部署到生产环境，实现自动化的部署和发布，从而实现快速的交付和迭代。

## CI/CD的基本步骤

```
* 开发人员将代码提交到版本控制工具（如GitLab）。
* 版本控制工具通过安装的hook插件触发持续集成（CI）的构建任务。
* CI构建任务从版本控制工具中拉取代码，并执行自动化构建脚本。
* 构建成功后，将构建产物打包成Docker镜像。
* Docker镜像推送到Docker仓库（如Docker Hub、harbor企业私有仓库、registry私有仓库、阿里云个人私有仓库）。
* 根据配置的自动化部署任务，触发持续交付（CD）流程。
* CD流程从Docker仓库中拉取最新的Docker镜像，并部署到目标服务器上。
* 部署完成后，执行自动化测试（如果有的话）。
* 自动化测试通过后，将应用程序发布到生产环境。
* 根据配置的自动化监控和告警机制，对应用程序进行监控和维护。
```

## 关于 Jenkins

Jenkins是一个开源的自动化构建工具，用于监控持续性的构建和测试，以及部署和管理软件项目。它是一个跨平台的工具，可以在Windows、Linux和Mac OS等操作系统上运行。

Jenkins可以帮助开发人员自动化构建、测试和部署软件项目的整个流程，从而提高了开发效率和软件质量。Jenkins支持各种流行的构建工具和语言，如Maven、Gradle、Ant、Shell脚本等。

Jenkins还提供了丰富的插件生态系统，可以扩展其功能和集成其他工具，如Git、SVN、Docker等。这些插件可以帮助开发人员更好地管理代码、配置构建任务、执行自动化测试等。

总之，Jenkins是一个功能强大、易于扩展的自动化构建工具，可以帮助开发人员实现持续集成和持续交付（CI/CD）的流程，从而提高软件开发的效率和质量。

* Jenkins Pipeline流水线脚本示例

```groovy
pipeline {
    agent any  // 在任何可用的代理节点上执行此Pipeline
    environment {
        HARBOR_REG = '******'  // 定义Harbor仓库的地址
        IMAGE = 'online/oa/frontend'  // 定义Docker镜像名称
        HARBOR_SECRET_USR='***'  // 定义Harbor登录用户名
        HARBOR_SECRET_PSW='***'  // 定义Harbor登录密码
    }
    parameters {
        gitParameter defaultValue: 'origin/test', name: 'BRANCH', type: 'PT_BRANCH', description: '分支'  // 定义Pipeline参数，用于选择Git分支
        choice(name: 'DEPLOY_ENV', choices: ["test",'dev'], description: '部署环境')  // 定义Pipeline参数，用于选择部署环境
    }
    stages {
        stage("fetch") {
            steps {
                echo "选择的分支${BRANCH} 部署到${DEPLOY_ENV}"  // 打印选择的分支和部署环境
                checkout([$class: 'GitSCM', branches: [[name: "$params.BRANCH"]], extensions: [], userRemoteConfigs: [[credentialsId: '47d4ffa6-1553-43f9-8cd6-9d47361df409', url: 'http://192.168.11.244:8929/frontend/********.git']]])  // 检出Git代码库的特定分支
            }
        }
        stage('build') {
            steps {
                withDockerContainer(image: "node:18.16.0-alpine", args: "-v npm_cache:/root/.npm") {
                    sh 'yarn setup --prefer-offline'  // 使用Docker容器运行命令来设置Yarn和构建前端应用程序
                    sh 'yarn build'  // 构建前端应用程序
                }
                echo "build docker image"  // 打印构建Docker镜像的消息
                sh "docker build -t ${HARBOR_REG}/${IMAGE}:${DEPLOY_ENV} . --build-arg NGINXENV=${DEPLOY_ENV}"  // 构建Docker镜像
            }
        }
        stage('push'){
            steps {
                sh 'echo "开始推送镜像"'  // 打印开始推送镜像的消息
                sh "docker login -u ${HARBOR_SECRET_USR} -p ${HARBOR_SECRET_PSW} http://${HARBOR_REG}"  // 使用Harbor凭据登录到Harbor仓库
                sh "docker push ${HARBOR_REG}/${IMAGE}:${DEPLOY_ENV}"  // 推送Docker镜像到Harbor仓库
                sh 'echo "推送结束"'  // 打印推送结束的消息
            }
        }
        stage('deploy'){
            steps {
                script {
                    if (params.DEPLOY_ENV == 'dev') {
                      // kubernetes操作
                        sh '''
                            curl -X PUT \
                            -H "Content-Type: application/yaml" \
                            -H "Cookie: KuboardUsername=admin; KuboardAccessKey=jszn2xmpt3fm.mn4xj5prrxa6yf427d78xwap2fjxfhy6" \
                            -d '{"kind":"deployments","namespace":"dev","name":"frontend"}' \
                            "http://192.168.11.131:30080/kuboard-api/cluster/default/kind/CICDApi/admin/resource/restartWorkload"
                        '''
                    } else {
                        sh '''
                            curl -X PUT \
                            -H "Content-Type: application/yaml" \
                            -H "Cookie: KuboardUsername=admin; KuboardAccessKey=jszn2xmpt3fm.mn4xj5prrxa6yf427d78xwap2fjxfhy6" \
                            -d '{"kind":"deployments","namespace":"test","name":"frontend"}' \
                            "http://192.168.11.131:30080/kuboard-api/cluster/default/kind/CICDApi/admin/resource/restartWorkload"
                        '''
                    }
                }
            }
        }
    }
}
```

That is all.

<Comment />
