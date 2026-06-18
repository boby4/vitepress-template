---
date: 2023-08-18
title: 前端项目接入钉钉/企业微信群机器人API
tags:
- 机器人
- Vue
description: vue前端项目接入钉钉/企业微信群机器人API，实现接口调用机器人，随时在群里通知后端同事接口报错了
---

# **前端项目接入钉钉/企业微信群机器人API**

钉钉/企业微信接入机器人api，实现接口调用机器人，接口联调是有报错调用钉钉或者企微的群机器人可以随时在群里轰炸(@)后端同事，报错接口、报错内容、传参内容,请求头全都一目了然。

## **通过Webhook接入自定义服务**

### **企业微信**

* 打开所在的企微群-点击群管理-添加群机器人

<a data-fancybox="gallery" href="https://ice.frostsky.com/2023/08/23/7c9cf3f4e06b1802363e8c49c65dadb4.png" data-caption="企微群机器人">
    <img v-lazy="'https://ice.frostsky.com/2023/08/23/7c9cf3f4e06b1802363e8c49c65dadb4.png'"/>
</a>

**配置信息**默认即可

* 配置完毕后，点击完成，即可看到群机器人

* 点击群机器人，复制Webhook地址

<a data-fancybox="gallery" href="https://ice.frostsky.com/2023/08/23/8283a74beb8fce92b7431b693961f7cd.png" data-caption="自定义企微机器人">
    <img v-lazy="'https://ice.frostsky.com/2023/08/23/8283a74beb8fce92b7431b693961f7cd.png'"/>
</a>

可以看到企微把文档配置放到上面了，接下来就可以自定义你的机器人配置了，easy。

## **企微机器人js配置实现**

```javascript
/**
 * 企微机器人
 */
export function qwRobot(response: AxiosResponse) {
  // 非生产环境使用
  if (process.env.NODE_ENV !== "production") {
    const Notification = process.env.NODE_ENV === "development" ? require("element-ui").Notification : window.ELEMENT.Notification;
    const key = "******"; // 你自己的key
    let atMobiles = []; // 需要@的成员手机号
    let notice = Notification.warning({
      title: "接口报错: " + response.config.url,
      message: "是否推送到企业微信群?",
      offset: 200,
      onClick() {
        axios
          .post(`/qiwei-api?key=${key}`, {
            // 可以参考企微文档自定义配置，as u like。。
            msgtype: "markdown",
            markdown: {
              title: "接口报警",
              content: `# 接口报警 ${response.config.url} \n > 请求状态：${
                response.status
              } 当前环境：${response.config.baseURL} \n\n### 参数：\n\n${
                response.config.data
              } \n\n### 请求头： \n\n${Object.keys(response.headers).reduce(
                (res: string, key: string) =>
                  (res += `> ${key}: ${response.headers[key]}`),
                ""
              )} \n\n### 返回结果：\n\n \`\`\`${JSON.stringify(
                response.data
              )}\`\`\` \n ### 项目关联人：\n@${atMobiles.join(" @")}`,
            },
          })
          .then(() => {
            notice.close();
          });
      },
    });
  }
}
```

### **钉钉**

* 打开所在的钉钉群-点击群管理-机器人

<a data-fancybox="gallery" href="https://ice.frostsky.com/2023/08/23/eafe49a3be74f1c338c1e2f01e0e1f64.png" data-caption="群机器人">
    <img v-lazy="'https://ice.frostsky.com/2023/08/23/eafe49a3be74f1c338c1e2f01e0e1f64.png'"/>
</a>

* 添加自定义机器人

<a data-fancybox="gallery" href="https://ice.frostsky.com/2023/08/23/9d2096bb5288ff06e0885afc91a7e5cc.png" data-caption="自定义钉钉机器人">
    <img v-lazy="'https://ice.frostsky.com/2023/08/23/9d2096bb5288ff06e0885afc91a7e5cc.png'"/>
</a>

**配置信息** 基本默认就行，也可以自定义，ip白名单不配置则ip无限制

* 配置完毕后，点击完成，即可看到群机器人

* 获取Webhook地址

<a data-fancybox="gallery" href="https://ice.frostsky.com/2023/08/23/148c231f610ed5a68f1106a7b5e5d7dd.png" data-caption="获取钉钉Webhook">
    <img v-lazy="'https://ice.frostsky.com/2023/08/23/148c231f610ed5a68f1106a7b5e5d7dd.png'"/>
</a>

## **钉钉机器人js配置实现**

```javascript
/**
 * 钉钉机器人
 */
export function ddRobot(response: AxiosResponse) {
  // 生产环境下取消机器人告警
  if (process.env.NODE_ENV !== "production") {
    const Notification = process.env.NODE_ENV === "development" ? require("element-ui").Notification : window.ELEMENT.Notification;
    const accessToken = "*********"; // 获取webhook下的accessToken
    let atMobiles = []; // 需要@人的手机号
    let notice = Notification.warning({
      title: "接口报错: " + response.config.url,
      message: "是否Ding一下?",
      offset: 200,
      onClick() {
        axios
          .post(`/dingding-api?access_token=${accessToken}`, {
            // 钉钉机器人消息类型
            msgtype: "markdown",
            // 钉钉机器人消息内容
            markdown: {
              title: "接口报警",
              text: `# 接口报警 ${response.config.url} \n > 请求状态：${ response.status
              } 当前环境：${response.config.baseURL} \n\n### 参数：\n\n${
                response.config.data
              } \n\n### 请求头： \n\n${Object.keys(response.headers).reduce(
                (res: string, key: string) =>
                  (res += `> ${key}: ${response.headers[key]}`),
                ""
              )} \n\n### 返回结果：\n\n \`\`\`${JSON.stringify(
                response.data
              )}\`\`\` \n ### 项目关联人：\n@${atMobiles.join(" @")}`,
            },
            at: {
              atMobiles,
              isAtAll: false, // 是否@所有人
            },
          })
          .then(() => {
            notice.close();
          });
      },
    });
  }
}
```

<Fancybox />
<Comment />
