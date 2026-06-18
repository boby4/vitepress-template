<template>
  <div class="ai-chat">
    <div class="chat-header">
      <h1 class="chat-title">
        <span class="chat-icon">🤖</span>
        AI 对话
      </h1>
      <p class="chat-subtitle">基于 DeepSeek-V3 大模型</p>
    </div>

    <div class="chat-messages" ref="msgContainer">
      <div v-if="!hasMessages" class="chat-empty">
        <div class="empty-icon">💬</div>
        <p>输入问题，开始与 AI 对话</p>
      </div>
      <div v-else class="chat-result" v-html="formattedResult"></div>
    </div>

    <div class="chat-input">
      <input
        v-model="inputVal"
        @keydown.enter="sendMsg"
        type="text"
        placeholder="输入你想问的问题..."
        :disabled="btnDisable"
      />
      <button @click="sendMsg" :disabled="btnDisable" class="send-btn">
        <span v-if="btnDisable" class="sending-dot"></span>
        <span v-else>发送</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { marked } from 'marked'

const result = ref('')
const inputVal = ref('')
const btnDisable = ref(false)
const msgContainer = ref(null)

const DEEPSEEK_KEY = import.meta.env.VITE_DEEPSEEK_KEY || ''
const DEEPSEEK_URL = 'https://api.deepseek.com/v1/chat/completions'

const hasMessages = computed(() => result.value.length > 0)

const formattedResult = computed(() => {
  return marked(result.value, { breaks: true })
})

const scrollToBottom = () => {
  nextTick(() => {
    if (msgContainer.value) {
      msgContainer.value.scrollTop = msgContainer.value.scrollHeight
    }
  })
}

const sendMsg = async () => {
  if (!inputVal.value.trim()) return
  btnDisable.value = true
  result.value = ''

  try {
    const res = await fetch(DEEPSEEK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: inputVal.value }],
        temperature: 0.7,
        max_tokens: 2048,
        stream: false
      })
    })

    const data = await res.json()

    if (data.error) {
      result.value = `> ⚠️ 错误：${data.error.message}`
    } else if (data.choices?.[0]?.message?.content) {
      result.value = data.choices[0].message.content
      scrollToBottom()
    } else {
      result.value = '> ⚠️ 响应格式异常，请重试'
    }
  } catch {
    result.value = '> ⚠️ 请求失败，请检查网络'
  }

  btnDisable.value = false
  inputVal.value = ''
  scrollToBottom()
}
</script>

<style scoped>
.ai-chat {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 4rem);
  background: #0a0a0a;
}

.chat-header {
  text-align: center;
  padding: 32px 24px 20px;
  flex-shrink: 0;
}

.chat-title {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 28px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.chat-icon {
  font-size: 28px;
}

.chat-subtitle {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.4);
  margin: 0;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 0 24px 20px;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
}

.chat-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: rgba(255, 255, 255, 0.3);
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.chat-result {
  line-height: 1.8;
  font-size: 15px;
  color: rgba(255, 255, 255, 0.75);
  word-break: break-word;
}

.chat-result :deep(h1),
.chat-result :deep(h2),
.chat-result :deep(h3) {
  color: #fff;
  margin: 1.5em 0 0.8em;
  padding-bottom: 0.3em;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.chat-result :deep(pre) {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  padding: 16px;
  overflow-x: auto;
}

.chat-result :deep(code) {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 13px;
}

.chat-result :deep(code:not(pre code)) {
  background: rgba(59, 130, 246, 0.12);
  color: #93c5fd;
  padding: 2px 6px;
  border-radius: 4px;
}

.chat-result :deep(blockquote) {
  border-left: 3px solid rgba(139, 92, 246, 0.5);
  margin: 1em 0;
  padding: 8px 16px;
  background: rgba(139, 92, 246, 0.05);
  border-radius: 0 6px 6px 0;
}

.chat-result :deep(ul),
.chat-result :deep(ol) {
  padding-left: 24px;
}

.chat-result :deep(li) {
  margin: 6px 0;
}

.chat-result :deep(a) {
  color: #8b5cf6;
}

.chat-result :deep(table) {
  border-collapse: collapse;
  margin: 1em 0;
}

.chat-result :deep(th),
.chat-result :deep(td) {
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 8px 12px;
  text-align: left;
}

.chat-result :deep(th) {
  background: rgba(255, 255, 255, 0.03);
}

/* Input area */
.chat-input {
  flex-shrink: 0;
  padding: 16px 24px 24px;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  gap: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.chat-input input {
  flex: 1;
  height: 46px;
  padding: 0 16px;
  font-size: 15px;
  color: #fff;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  outline: none;
  transition: border-color 0.2s;
  font-family: inherit;
}

.chat-input input:focus {
  border-color: rgba(139, 92, 246, 0.4);
}

.chat-input input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

.chat-input input:disabled {
  opacity: 0.5;
}

.send-btn {
  height: 46px;
  min-width: 80px;
  padding: 0 20px;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.15s;
  font-family: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
}

.send-btn:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-1px);
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.sending-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #fff;
  animation: pulse-dot 0.8s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}
</style>
