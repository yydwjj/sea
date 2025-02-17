<template>
  <div class="customer-service-view">
    <!-- 聊天记录区域 -->
    <div class="chat-history">
      <div
        v-for="(message, index) in chatMessages"
        :key="index"
        :class="['chat-message', message.sender === 'customer' ? 'customer' : '客服']"
      >
        <div class="message-content">{{ message.content }}</div>
      </div>
    </div>

    <!-- 输入框区域 -->
    <div class="input-area">
      <input
        type="text"
        class="input-field"
        placeholder="请输入您的问题"
        v-model="inputMessage"
        @keyup.enter="sendMessage"
      />
      <button class="send-button" @click="sendMessage">发送</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const inputMessage = ref('');
const chatMessages = ref([
  { sender: 'customer', content: '我想咨询如何申请质量检测。' },
  {
    sender: '客服',
    content: '您好，非常感谢您的咨询！如果您需要申请质量检测，您可以按照以下步骤进行操作……',
  },
]);

const sendMessage = () => {
  if (inputMessage.value.trim()) {
    // 添加用户发送的消息到聊天记录
    chatMessages.value.push({ sender: 'customer', content: inputMessage.value });

    // 模拟客服回复消息
    setTimeout(() => {
      const replyMessages = [
        '请您稍等，我这边帮您查询一下相关信息。',
        '针对您的问题，我已经记录下来了，会尽快给您回复。',
      ];
      const randomIndex = Math.floor(Math.random() * replyMessages.length);
      const reply = replyMessages[randomIndex];
      chatMessages.value.push({ sender: '客服', content: reply });
    }, 1000);

    inputMessage.value = '';
  }
};
</script>

<style scoped>
.customer-service-view {
  display: flex;
  flex-direction: column;
  height: 88vh;
  background-color: rgb(236, 247, 253);
  padding: 16px;
}

.chat-history {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  background-color: rgb(249, 255, 255);
  border-radius: 12px;
  margin-bottom: 16px;
}

.chat-message {
  margin-bottom: 16px;
}

.chat-message.customer {
  text-align: right;
}

.chat-message.客服 {
  text-align: left;
}

.message-content {
  display: inline-block;
  padding: 8px 16px;
  border-radius: 12px;
  max-width: 70%;
  background-color: antiquewhite;
  margin-bottom: 20px;
}

.chat-message.customer .message-content {
  background-color: rgb(50, 161, 218);
  color: white;
}

.chat-message.客服 .message-content {
  background-color: rgb(250,235,215);
  color: black;
}

.input-area {
  display: flex;
  align-items: center;
  background-color: rgb(249, 255, 255);
  border-radius: 12px;
  padding: 8px;
}

.input-field {
  flex: 1;
  border: none;
  background-color: transparent;
  outline: none;
  font-size: 14px;
  padding: 8px;
}

.send-button {
  background-color: rgb(50, 161, 218);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

.send-button:hover {
  background-color: rgb(35, 125, 171);
}
</style>