---
date: 2023-09-04
title: 总结了一些前端的规范
tags:
- 前端规范
description: 想要团队的代码风格统一、开发效率和质量高，规范是必不可少的，一个好的程序员肯定是要能书写可维护的代码，养成好习惯，是一个程序员的基本素养。
---

# 总结了一些前端的规范

想要团队的代码风格统一、开发效率和质量高，规范是必不可少的，一个好的程序员肯定是要能书写可维护的代码，养成好习惯，是一个程序员的基本素养。下面是我总结了一些前端项目开发的规范。

## Git规范

* git 提交流程图

<a data-fancybox="gallery" href="https://ice.frostsky.com/2023/09/04/de20addf4d478eaf82f167e7f7e7dfb3.png" data-caption="git 提交流程图">
<img v-lazy="'https://ice.frostsky.com/2023/09/04/de20addf4d478eaf82f167e7f7e7dfb3.png'"/>
</a>

* git commit(提交) 格式（type: 改动内容描述）

Commit Type 对应情况<br/>
    ■ feat: 新特性<br/>
    ■ fix: 修改问题<br/>
    ■ refactor: 代码重构<br/>
    ■ docs: 文档修改<br/>
    ■ style: 代码格式修改, 注意不是 css 修改<br/>
    ■ test: 测试用例修改<br/>
    ■ chore: 其他修改, 比如构建流程, 依赖管理

* git 常用命令

```bash
# 提交代码
git add .
git commit -m "feat: 提交代码"
# 拉取代码
git pull
git push
# 切换分支
git checkout 分支名
# 基于当前分支创建分支
git checkout -b 分支名
# 将分支合并入当前分支
git merge 分支名
# 将当前修改贮藏至暂存区，用于未修改完当前工作，需要临时切换分支工作。
git stash -u
# 将贮藏的内容释放出来，继续未完成的工作。
git stash pop
# 切换远程仓库地址
git remote set-url origin [新的地址]
```

## 代码规范

<a style="color:blue;" href="https://v2.cn.vuejs.org/v2/style-guide/index.html#%E4%BC%98%E5%85%88%E7%BA%A7-A-%E7%9A%84%E8%A7%84%E5%88%99%EF%BC%9A%E5%BF%85%E8%A6%81%E7%9A%84-%E8%A7%84%E9%81%BF%E9%94%99%E8%AF%AF">风格指南 — Vue.js (vuejs.org)</a>

## 样式使用规范

● 对element-ui组件的样式冲写、样式多用于不同组件的样式，需写到 公共样式 中，编写时保险起见少用 /deep/ 相关命名，并注意侵入性<br/>
● 组件中样式尽量不用scope，scope后索引元素较慢且样式不利复用等；<br/>
● 项目基本引用 公共 样式库（很好用的样式库<a style="color:blue;" href="https://www.tailwindcss.cn/">tailwindcss</a>），自定义变量、响应式设计、主题设置，简写样式，增加效率<br/>

## 代码部署规范

* 提测部署

1. 合并相关需部署代码至 test<br/>
2. 登陆 Jenkins 对应项目执行对 origin/test 构建并自动部署，提醒后端及测试发版完成，可发提测邮件<br/>

* 生产部署

1. 收到确认验收邮件，以及部署邮件<br/>
2. 合并 test分支 已验收的代码 至 prod分支<br/>
3. 由 prod分支 创建标签号<br/>
4. 登陆 Jenkins 对应项目执行对 标签号 执行构建<br/>
5. 发送 前端已构建邮件 至运维，抄送总监、产品、后端负责人，由运维执行部署<br/>
6. 跟进确认运维回复部署成功，前端检验。<br/>

## 私有源

* 上传包文件

```bash
// 设置镜像仓库
npm set registry 仓库地址
// 登录 输入账号/密码
npm adduser --registry 仓库地址
// 发布上传
npm publish
```

## 接口规范

<a data-fancybox="gallery" href="https://ice.frostsky.com/2023/09/04/4ba3851ac7a55cb744f953463ac8eab2.png" data-caption="前后端协定接口流程">
  <img v-lazy="'https://ice.frostsky.com/2023/09/04/4ba3851ac7a55cb744f953463ac8eab2.png'"/>
</a>

## 接口请求规范

* 统一请求方式：POST
* 统一定义接口路由规则[全小写，snake命名规则]

```bash
/[:业务]/[:子业务]/[:功能]

/customer/black/save
/customer/save
/customer/list
```

## [:功能]常见命名

| 路由名   | 功能 |     建议 |
| :----- | :--: | -------: |
查询类
| page |  带分页的数据列表  |
| list |  无分页的数据列表  |
| options |  枚举值，返回用于前端选项框 对应返回  |
| get-[配置] |  获取状态配置，字典配置  |
编辑类
| set-[配置] |  状态变更，字典配置变更  |
| save |  保存  |新增与编辑业务相近时可耦合成一个|
| create |  添加  |
| update |  修改  |
| remove |  删除/批量删除  |
| batch-[:功能] |  批处理  |
| import |  导入  |
| export |  导出  |
| export |  导出  |
| login |  登陆  |
| logout |  登出  |

## 统一定义接口返回规范

```bash
{
	"code": 200,
	"msg": "消息",
	"data": "结果集"
}

// page(分页)数据结果集
{
	"code": 200,
	"msg": "消息",
	"data": {
		"page": 1,
		"pageSize": 15,
		"total": 1000,
		"record":[]
	}

// list(列表)数据结果集
{
	"code": 200,
	"msg": "消息",
	"data": [...]
}

// option(枚举值) 简单 （可前端存储，后端调整时须前端同步）
{
	"code": 200,
	"msg": "消息",
	"data": {"label":"value"...}
}
```

<Fancybox />
<Comment />