---
date: 2023-11-01
title: 前端接入科大讯飞星火认知大模型API
tags:
- 机器人
- Vue
description: vue3接入讯飞星火认知大模型，拥有跨领域的知识和语言理解能力，完成问答对话和文学创作等任务。持续从海量文本数据和大规模语法知识中学习进化，实现从提出问题、规划问题到解决问题的全流程闭环
---

# **前端接入科大讯飞星火认知大模型API**

讯飞星火认知大模型，拥有跨领域的知识和语言理解能力，完成问答对话和文学创作等任务。持续从海量文本数据和大规模语法知识中学习进化，实现从提出问题、规划问题到解决问题的全流程闭环。

## 先看效果

<a data-fancybox="gallery" href="https://i.mji.rip/2023/11/10/ba6f1bb3533f585f42155c887d70461b.png" data-caption="星火认知大模型">
    <img v-lazy="'https://i.mji.rip/2023/11/10/ba6f1bb3533f585f42155c887d70461b.png'"/>
</a>

## 接入流程

* 注册账号

讯飞开放平台官网：<a style="color:blue;" href="https://www.xfyun.cn/">https://www.xfyun.cn/</a>，具体怎么注册不赘述了，手机号邮箱绑定一下就完了。

* 获取APPID和API_KEY

<a data-fancybox="gallery" href="https://i.mji.rip/2023/11/10/4d0c2d795f8724a1a93fa884ee09f830.png" data-caption="控制台">
    <img v-lazy="'https://i.mji.rip/2023/11/10/4d0c2d795f8724a1a93fa884ee09f830.png'"/>
</a>

进入控制台去创建一个应用

<a data-fancybox="gallery" href="https://i.mji.rip/2023/11/10/74370ae229e9c24ded381d32d4fabd8a.png" data-caption="创建应用">
    <img v-lazy="'https://i.mji.rip/2023/11/10/74370ae229e9c24ded381d32d4fabd8a.png'"/>
</a>

<a data-fancybox="gallery" href="https://i.mji.rip/2023/11/10/78f94aee7db26b5101ed4970f20194f9.png" data-caption="我的应用">
    <img v-lazy="'https://i.mji.rip/2023/11/10/78f94aee7db26b5101ed4970f20194f9.png'"/>
</a>

点进去查看我能接入的哪些应用，然后点击星火认知大模型下面的星火大模型1.0/2.0/3.0，然后点击应用详情，就能看到APPID和API_KEY了。

<a data-fancybox="gallery" href="https://i.mji.rip/2023/11/10/1fe9af0f947809e1f3537b862346e582.png" data-caption="应用详情">
    <img v-lazy="'https://i.mji.rip/2023/11/10/1fe9af0f947809e1f3537b862346e582.png'"/>
</a>

* 接入SDK

我当时接的时候才更新到2.0，所以就直接用2.0的SDK了，现在已经更新到3.0了，可以直接选择3.0的套餐免费包个人认证版进行购买，有200万的免费tokens一年使用期，相当于是给你免费用一年的意思了，这里我们直接接入web API即可：

```js
ws(s)://spark-api.xf-yun.com/v2.1/chat
ws(s)://spark-api.xf-yun.com/v3.1/chat
```

3.1和2.1版本接入方式一致，看个人选择，推荐接最新的版本，功能肯定更强大，也修复了很多原有的bug。

* vue3接入示例

安装crypto-js,用来加密生成最终请求的鉴权url

```bash
npm install crypto-js --save
cnpm install crypto-js --save
yarn add crypto-js
```

鉴权url生成示例

```js
const requestObj = {
  APPID: '你的appid',
  APISecret: '你的apisecret',
  APIKey: '你的apikey',
  Uid: 'xzm', // 说明下uid自己定，唯一就行
  sparkResult: '', // 这里放你获取到的结果
}

// 鉴权url地址
const getWebsocketUrl = () => {
  return new Promise((resovle, reject) => {
    // let url = "wss://spark-api.xf-yun.com/v1.1/chat";
    let url = 'wss://spark-api.xf-yun.com/v2.1/chat' // 可以改成2.1的接口
    let host = 'spark-api.xf-yun.com' // 主机地址
    let apiKeyName = 'api_key' // API密钥的参数名
    let date = new Date().toGMTString() // 当前时间的GMT字符串表示
    let algorithm = 'hmac-sha256'// 使用的哈希算法
    let headers = 'host date request-line' // 鉴权所需的头部信息
    // let signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v1.1/chat HTTP/1.1`;
    let signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v2.1/chat HTTP/1.1` // 构建用于生成签名的原始字符串
    // 加密方法
    let signatureSha = CryptoJs.HmacSHA256(
      signatureOrigin,
      requestObj.APISecret
    )
    // 生成的加密签名
    let signature = CryptoJs.enc.Base64.stringify(signatureSha)
    // 构建鉴权头部信息
    let authorizationOrigin = `${apiKeyName}="${requestObj.APIKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`
    let authorization = base64.encode(authorizationOrigin)
    // 构建最终的 WebSocket URL
    url = `${url}?authorization=${authorization}&date=${encodeURI(
      date
    )}&host=${host}`
    resovle(url)
  })
}
```

最关键的鉴权信息完成，接下来的就是利用websocket向api发送请求就可以了

```js
// 发送消息
const sendMsg = async () => {
  // 获取请求地址
  const myUrl = await getWebsocketUrl()
  // 获取输入框中的内容
  // 每次发送问题 都是一个新的websocket请求
  let socket = new WebSocket(myUrl)
  // 监听websocket的各阶段事件 并做相应处理
  socket.addEventListener('open', (event) => {
    console.log('开启连接！！', event)
    // 发送消息
    let params = {
      header: {
        app_id: requestObj.APPID,
        uid: requestObj.Uid,
      },
      parameter: {
        chat: {
          // "domain": "general",
          domain: 'generalv2',
          temperature: 0.5,
          max_tokens: 1024,
        },
      },
      payload: {
        message: {
          // 如果想获取结合上下文的回答，需要开发者每次将历史问答信息一起传给服务端，如下示例
          // 注意：text里面的所有content内容加一起的tokens需要控制在8192以内，开发者如有较长对话需求，需要适当裁剪历史信息
          text: [
            { role: 'user', content: inputVal.value }, //# 最新的一条问题，如无需上下文，可只传最新一条问题
          ],
        },
      },
    }
    socket.send(JSON.stringify(params))
  })
  socket.addEventListener('message', (event) => {
    let data = JSON.parse(event.data)
    console.log('收到消息！！', data)
    requestObj.sparkResult += data.payload.choices.text[0].content
    if (data.header.code !== 0) {
      console.log('出错了', data.header.code, ':', data.header.message)
      // 出错了"手动关闭连接"
      socket.close()
    }
    if (data.header.code === 0) {
      // 对话已经完成
      if (data.payload.choices.text && data.header.status === 2) {
        requestObj.sparkResult += data.payload.choices.text[0].content
        setTimeout(() => {
          // "对话完成，手动关闭连接"
          socket.close()
        }, 3000)
      }
    }
    addMsgToTextarea(requestObj.sparkResult)
  })
  socket.addEventListener('close', (event) => {
    inputVal.value = ''
    console.log('连接关闭！！', event)
    // 对话完成后socket会关闭，将聊天记录换行处理
    requestObj.sparkResult = requestObj.sparkResult + '\n\n'
    addMsgToTextarea(requestObj.sparkResult)
    btnDisable.value = false
    // 清空输入框
  })
  socket.addEventListener('error', (event) => {})
}

// 这就是我们最终获取到的结果，输出在我们的页面上即可
const addMsgToTextarea = (text) => {
  sparkResult.value = text
}
```

## 总结

这样我们就接入了星火大模型，实现了对话功能，easy，快点击右下角机器人按钮去使用吧！↬

<Fancybox />
<Comment />