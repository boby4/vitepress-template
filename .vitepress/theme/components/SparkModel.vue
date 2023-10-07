<template>
  <div class="chat_container">
    <div class="bto" @click="toggleRobot">
      <i class="iconfont jiqiren"></i>
    </div>
    <transition name="slide-up">
      <div class="chat_main" v-if="isRobotVisible">
        <div class="header">
          <i class="iconfont jiqiren"></i>
          <div>星火认知大模型</div>
        </div>
        <div id="results">
          <textarea id="result" v-model="sparkResult" readonly></textarea>
        </div>
        <div id="sendVal">
          <input
            v-model="inputVal"
            @keydown.enter="sendMsg"
            type="text"
            id="question"
            placeholder="输入你想问的问题"
          />
          <button @click.stop="sendMsg" id="btn" :disabled="btnDisable">
            <i class="iconfont chat"></i>发送
          </button>
        </div>
      </div>
    </transition>
  </div>
  <Message ref="notification" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as base64 from 'base-64'
import CryptoJs from 'crypto-js'

let isRobotVisible = ref(false)
let btnDisable = ref(false)

const toggleRobot = () => {
  isRobotVisible.value = !isRobotVisible.value
}

const sparkResult = ref('')
const inputVal = ref('')
const notification = ref('')
const requestObj = {
  APPID: '6d3b1171',
  APISecret: 'OWVjYWVmNmRjZGUxNzM3ZjI0MDUxNDA4',
  APIKey: 'cb7d4dd17aca7142c6aa785e5a8e51d0',
  Uid: 'xzm',
  sparkResult: '',
}

// 发送消息
const sendMsg = async () => {
  console.log(notification)
  if (!inputVal.value)
    return notification.value.show({
      message: '请输入你的问题',
      duration: 3000,
      type: 'warning',
    })
  btnDisable.value = true
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
    // console.log('收到消息！！',data);
    requestObj.sparkResult += data.payload.choices.text[0].content
    if (data.header.code !== 0) {
      console.log('出错了', data.header.code, ':', data.header.message)
      notification.value.show({
        message: '连接出错！',
        duration: 3000,
        type: 'warning',
      })
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
  socket.addEventListener('error', (event) => {
    notification.value.show({
      message: '连接发送错误！！',
      duration: 3000,
      type: 'warning',
    })
  })
}
// 鉴权url地址
const getWebsocketUrl = () => {
  return new Promise((resovle, reject) => {
    // let url = "wss://spark-api.xf-yun.com/v1.1/chat";
    let url = 'wss://spark-api.xf-yun.com/v2.1/chat'
    let host = 'spark-api.xf-yun.com'
    let apiKeyName = 'api_key'
    let date = new Date().toGMTString()
    let algorithm = 'hmac-sha256'
    let headers = 'host date request-line'
    // let signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v1.1/chat HTTP/1.1`;
    let signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v2.1/chat HTTP/1.1`
    let signatureSha = CryptoJs.HmacSHA256(
      signatureOrigin,
      requestObj.APISecret
    )
    let signature = CryptoJs.enc.Base64.stringify(signatureSha)
    let authorizationOrigin = `${apiKeyName}="${requestObj.APIKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`
    let authorization = base64.encode(authorizationOrigin)
    // 将空格编码
    url = `${url}?authorization=${authorization}&date=${encodeURI(
      date
    )}&host=${host}`
    resovle(url)
  })
}
const addMsgToTextarea = (text) => {
  sparkResult.value = text
}
</script>

<style lang="scss">
@import url('../style/iconfont.css');

.chat_container {
  .bto {
    margin: 0.3rem;
    position: fixed;
    bottom: 5%;
    right: 5px;
    background: white;
    border-radius: 100px !important;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2) !important;
    height: 4rem !important;
    width: 4rem !important;
    z-index: 1000 !important;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    z-index: 2;
    cursor: pointer;
    i {
      font-size: 4rem;
      text-align: center;
      line-height: 4rem;
    }
  }
  .chat_main {
    box-shadow: 0 5px 40px rgba(0, 0, 0, 0.16) !important;
    font-size: 0.85rem;
    background: #f4f6fb;
    z-index: 3;
    position: fixed;
    color: #4c4948;
    bottom: 9rem;
    right: 1rem;
    width: 25%;
    border-radius: 1.1rem;
    transition: all 0.3s;
  }

  .slide-up-enter-active, .slide-up-leave-active {
    transition: transform 0.3s ease-in-out;
  }
  .slide-up-enter, .slide-up-leave-to {
    transform: translateY(100%);
  }

  @media screen and (max-width: 900px) {
    .chat_main {
      width: 100%;
      right: 0;
    }
  }

  .header {
    display: flex;
    align-items: center;
    padding: 1.3rem;
    background: #fff;
    border-radius: 1rem 1rem 0 0;
    box-shadow: 0 0.2rem 0.5rem -0.5rem rgba(50, 50, 93, 0.08),
      0 0.1rem 0.2rem -0.3rem rgba(50, 50, 93, 0.04);
    i {
      font-size: 1.3rem;
      margin-right: 0.3rem;
    }
  }

  #results {
    height: 20rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #result {
    width: 100%;
    height: 100%;
    padding: 0.5rem;
    background-color: #f4f6fb;
    white-space: pre-line;
    font-size: 0.9rem;
    resize: none;
    outline: none;
  }

  #sendVal {
    display: flex;
    align-items: center;
    padding: 8px 16px;
    bottom: 0;
    background: #f7f7f7;
    border-radius: 0 0 1rem 1rem;
  }

  #question {
    flex-grow: 1;
    padding: 5px;
    outline: none;
    background: #fff;
    width: 100%;
    height: 32px;
    outline: none;
    font-size: 13px;
  }

  #btn {
    width: 100px;
    height: 32px;
    margin-left: 10px;
    background-color: #5d7cff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.8rem;
    transition: background-color 0.3s ease;
    i {
      font-size: 0.8rem;
      margin-right: 0.2rem;
    }
  }

  #btn:hover {
    background-color: #4a6cd4;
  }
}
</style>
