<template>
  <div class="customer-service-view">
    <!-- 顶部返回栏 -->
    <div class="chat-header">
      <button class="back-button" @click="goBack">←</button>
      <div class="seller-info">
        <h3>与卖家对话</h3>
<!--        <span>卖家在线状态：在线</span>-->
      </div>
    </div>

    <!-- 聊天记录区域 -->
    <div class="chat-history">
      <div
          v-for="(message, index) in chatMessages"
          :key="index"
          :class="['chat-message', message.sender === 'customer' ? 'customer' : 'seller']"
      >
        <div class="message-content">{{ message.content }}</div>
        <div class="message-time">{{ formatTime(message.time) }}</div>
      </div>
    </div>

    <!-- 输入框区域 -->
    <div class="input-area">
      <input
          type="text"
          class="input-field"
          placeholder="请输入消息..."
          v-model="inputMessage"
          @keyup.enter="sendMessage"
      />
      <button class="send-button" @click="sendMessage">发送</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const inputMessage = ref('');
const chatMessages = ref([]);

// 初始化示例消息
onMounted(() => {
  chatMessages.value = [
    {
      sender: 'seller',
      content: '您好，有什么可以帮您？',
      time: new Date().getTime() - 3600000
    },
    {
      sender: 'customer',
      content: '这款商品还有货吗？',
      time: new Date().getTime() - 1800000
    }
  ];
});

const sendMessage = () => {
  if (inputMessage.value.trim()) {
    // 添加用户消息
    chatMessages.value.push({
      sender: 'customer',
      content: inputMessage.value,
      time: new Date().getTime()
    });

    // 模拟卖家回复
    setTimeout(() => {
      chatMessages.value.push({
        sender: 'seller',
        content: '正在为您查询库存...',
        time: new Date().getTime()
      });
    }, 1500);

    inputMessage.value = '';
  }
};

const goBack = () => {
  router.go(-1);
};

// 时间格式化
const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });
};
</script>

<style scoped>
/* 整体容器 */
.customer-service-view {
  display: flex;
  flex-direction: column;
  height: 90vh;
  background-color: rgb(236, 247, 253); /* 浅蓝背景 */
  padding: 16px;
}

/* 聊天头部 */
.chat-header {
  display: flex;
  align-items: center;
  padding: 9px;
  background-color: rgb(249, 255, 255); /* 极浅蓝白 */
  border-radius: 12px;
  margin-bottom: 16px;
  box-shadow: 0 2px 4px rgba(50, 161, 218, 0.1); /* 主色投影 */
}

/* 聊天记录区域 */
.chat-history {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  background-color: rgb(249, 255, 255); /* 极浅蓝白 */
  border-radius: 12px;
  margin-bottom: 16px;
}

/* 消息通用样式 */
.chat-message {
  margin-bottom: 16px;
}

/* 用户消息对齐 */
.chat-message.customer {
  text-align: right;
}

/* 卖家消息对齐 */
.chat-message.seller {
  text-align: left;
}

/* 消息内容气泡 */
.message-content {
  display: inline-block;
  padding: 8px 16px;
  border-radius: 12px;
  max-width: 70%;
  margin-bottom: 8px;
}

/* 用户消息气泡 */
.chat-message.customer .message-content {
  background-color: rgb(50, 161, 218); /* 主色蓝 */
  color: white;
}

/* 卖家消息气泡 */
.chat-message.seller .message-content {
  background-color: rgb(225, 240, 250); /* 浅蓝灰 */
  color: rgb(35, 125, 171); /* 深蓝文字 */
}

/* 消息时间样式 */
.message-time {
  font-size: 12px;
  color: rgb(120, 170, 200); /* 中间蓝 */
  margin-top: 4px;
}

/* 输入区域 */
.input-area {
  display: flex;
  align-items: center;
  background-color: rgb(249, 255, 255); /* 极浅蓝白 */
  border-radius: 12px;
  padding: 8px;
}

/* 输入框 */
.input-field {
  flex: 1;
  border: none;
  background-color: transparent;
  outline: none;
  font-size: 14px;
  padding: 8px;
  color: rgb(35, 125, 171); /* 深蓝文字 */
}

/* 发送按钮 */
.send-button {
  background-color: rgb(50, 161, 218); /* 主色蓝 */
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
  background-color: rgb(35, 125, 171); /* 深蓝悬停 */
}

/* 返回按钮 */
.back-button {
  background: none;
  border: none;
  font-size: 24px;
  margin-right: 15px;
  cursor: pointer;
  color: rgb(50, 161, 218); /* 主色蓝 */
}

/* 卖家信息 */
.seller-info h3 {
  color: rgb(35, 125, 171); /* 深蓝标题 */
}
</style>