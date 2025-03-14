<template>
  <div class="chats_container">
    <div class="chat_main">
      <!-- <div class="header">
        <div>
          <i class="iconfont jiqiren" style="font-size: 16px"></i>星火认知大模型
        </div>
      </div> -->
      <div id="results">
        <div id="result" v-html="formattedResult"></div>
      </div>
    </div>
  </div>
  <div id="sendVal">
    <input
      v-model="inputVal"
      @keydown.enter="sendMsg"
      type="text"
      id="question"
      placeholder="输入你想问的问题"
    />
    <button v-if="!btnDisable" @click.stop="sendMsg" id="btn">
      <i class="iconfont chat"></i>发送
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import * as base64 from 'base-64'
import CryptoJs from 'crypto-js'
import { marked } from 'marked'

let isRobotVisible = ref(false)
let btnDisable = ref(false)

const toggleRobot = () => {
  isRobotVisible.value = !isRobotVisible.value
}

const formattedResult = computed(() => {
  return marked(sparkResult.value, { breaks: true })
})

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
          domain: '4.0Ultra',
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
    requestObj.sparkResult = '\n\n' + requestObj.sparkResult
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
    let url = 'wss://spark-api.xf-yun.com/v4.0/chat'
    let host = 'spark-api.xf-yun.com'
    let apiKeyName = 'api_key'
    let date = new Date().toGMTString()
    let algorithm = 'hmac-sha256'
    let headers = 'host date request-line'
    // let signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v1.1/chat HTTP/1.1`;
    let signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v4.0/chat HTTP/1.1`
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

<style lang="scss" scoped>
@import url('../style/iconfont.css');

.message {
  display: flex;
  margin: 1rem 0;
  &.user {
    justify-content: flex-end;
    .message-content {
      background: #007bff;
      color: white;
    }
  }
  &.assistant {
    justify-content: flex-start;
    .message-content {
      background: #f1f3f5;
    }
  }
}

.message-content {
  max-width: 80%;
  padding: 1rem 1.2rem;
  border-radius: 1rem;
  line-height: 1.6;
  pre {
    white-space: pre-wrap;
    background: rgba(0, 0, 0, 0.1);
    padding: 0.8rem;
    border-radius: 0.5rem;
  }
  code {
    font-family: monospace;
    background: rgba(0, 0, 0, 0.1);
    padding: 0.2em 0.4em;
  }
}

.chats_container {
  width: 100%;
  position: absolute;
  .chat_main {
    background: #fff;
  }
  #results {
    height: 60vh;
    padding: 1rem;
    overflow-y: auto;
  }
  #result {
    line-height: 1.6;
    font-size: 15px;

    /* 新增标题样式 */
    h1,
    h2,
    h3 {
      margin: 1.5em 0 1em;
      color: #2c3e50;
      border-bottom: 1px solid #eee;
      padding-bottom: 0.3em;
    }
    h1 {
      font-size: 1.8em;
    }
    h2 {
      font-size: 1.6em;
    }
    h3 {
      font-size: 1.4em;
    }

    /* 优化代码块样式 */
    pre {
      background: #f8f9fa;
      padding: 1.2rem;
      border-radius: 8px;
      border: 1px solid #e9ecef;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      overflow-x: auto;
      code {
        background: transparent;
        padding: 0;
        font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo,
          monospace;
        font-size: 0.9em;
        line-height: 1.6;
        color: #364149;
      }
    }

    /* 优化行内代码 */
    code:not(pre code) {
      background: rgba(175, 184, 193, 0.2);
      color: #eb5757;
      padding: 0.2em 0.4em;
      border-radius: 4px;
      border: 1px solid rgba(175, 184, 193, 0.2);
    }

    /* 优化引用块 */
    blockquote {
      border-left: 4px solid #5d7cff;
      margin: 1.5em 0;
      padding: 0.8em 1.2em;
      background: #f8f9ff;
      color: #4a5568;
      border-radius: 0 4px 4px 0;
      p {
        margin: 0;
      }
    }
    /* 优化列表样式 */
    ul,
    ol {
      padding-left: 2em;
      margin: 1em 0;
      li {
        margin: 0.5em 0;
        &::marker {
          color: #5d7cff;
        }
      }
    }
  }
}
#sendVal {
  position: fixed;
  width: 96%;
  left: 2%;
  padding: 1.5rem;
  bottom: 180px;
  /* 新增弹性布局 */
  display: flex;
  gap: 12px;
}

#question {
  /* 输入框样式优化 */
  flex: 1;
  height: 48px;
  padding: 12px 16px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 16px;
  line-height: 1.5;
  transition: all 0.3s ease;
  
  /* 浏览器兼容性处理 */
  -webkit-appearance: none;
  -moz-appearance: none;
  box-sizing: border-box;
  
  &:focus {
    border-color: #5d7cff;
    box-shadow: 0 0 0 3px rgba(93, 124, 255, 0.15);
    outline: none;
  }
  &::placeholder {
    color: #adb5bd;
  }
}

#btn {
  /* 按钮适配新高度 */
  height: 48px;
  width: 100px;
  position: static;  // 移除绝对定位
  background-color: #5d7cff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: background-color 0.3s ease;
  i {
    font-size: 16px;
  }
}

#btn:hover {
  background-color: #4a6cd4;
}
</style>
