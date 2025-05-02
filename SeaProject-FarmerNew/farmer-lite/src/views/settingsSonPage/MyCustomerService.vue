<template>
  <div class="product-chat-view">
    <!-- 聊天头部 -->
    <div class="chat-header">
      <button class="back-button" @click="goBack">
        <Icon icon="material-symbols:chevron-left-rounded" width="1.5em"/>
      </button>
      <div class="seller-info">
        <h3>我的客服</h3>
        <span class="online-status">在线</span>
      </div>
    </div>

    <!-- 优化后的聊天区域 -->
    <div class="enhanced-chat-history">
      <div
          v-for="(message, index) in chatMessages"
          :key="index"
          :class="['chat-bubble', message.sender === 'customer' ? 'customer' : 'seller']"
      >
        <div class="bubble-content">
          {{ message.content }}
          <div class="message-time">{{ formatTime(message.timestamp) }}</div>
        </div>
      </div>
    </div>

    <!-- 增强的输入区域 -->
    <div class="enhanced-input-area">
      <input
          type="text"
          class="enhanced-input"
          placeholder="输入消息..."
          v-model="inputMessage"
          @keyup.enter="sendMessage"
      />
      <button class="enhanced-send-btn" @click="sendMessage">
        <Icon icon="akar-icons:arrow-up" width="1.2em"/>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const inputMessage = ref('');
const chatMessages = ref([
  {
    sender: 'seller',
    content: '您好！有什么可以帮助您？',
    timestamp: new Date().getTime() - 3600000
  },
  {
    sender: 'customer',
    content: '我想咨询一下xxx问题？',
    timestamp: new Date().getTime() - 1800000
  }
]);

// 消息时间格式化
const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

// 发送消息逻辑优化
const sendMessage = () => {
  if (inputMessage.value.trim()) {
    const newMessage = {
      sender: 'customer',
      content: inputMessage.value,
      timestamp: new Date().getTime()
    };

    chatMessages.value.push(newMessage);
    simulateSellerReply();
    inputMessage.value = '';
    scrollToBottom();
  }
};

// 模拟卖家回复
const simulateSellerReply = () => {
  setTimeout(() => {
    const replies = [
      '好的，我已经收到您的问题...',
      '已收到您的询问，稍后给您详细回复'
    ];
    const reply = {
      sender: 'seller',
      content: replies[Math.floor(Math.random() * replies.length)],
      timestamp: new Date().getTime()
    };
    chatMessages.value.push(reply);
    scrollToBottom();
  }, 1500);
};

// 自动滚动到底部
const scrollToBottom = () => {
  nextTick(() => {
    const container = document.querySelector('.enhanced-chat-history');
    container.scrollTop = container.scrollHeight;
  });
};

const goBack = () => router.go(-1);
</script>

<style scoped>
/* 优化后的聊天界面样式 */
.product-chat-view {
  height: 90vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #ecf7fd 0%, #f9ffff 100%);
}

.chat-header {
  display: flex;
  align-items: center;
  padding: 12px;
  background: rgba(249, 255, 255, 0.9);
  backdrop-filter: blur(5px);
  border-bottom: 1px solid rgba(50, 161, 218, 0.1);
}

.back-button {
  background: none;
  border: none;
  color: #32a1da;
  margin-right: 15px;
}

.seller-info h3 {
  color: #2d3748;
  margin: 0;
  font-size: 1.1em;
}

.online-status {
  color: #48bb78;
  font-size: 0.9em;
}

.enhanced-chat-history {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  background: rgba(249, 255, 255, 0.6);
}

.chat-bubble {
  margin: 12px 0;
  display: flex;
}

.chat-bubble.customer {
  justify-content: flex-end;
}

.chat-bubble.seller {
  justify-content: flex-start;
}

.bubble-content {
  max-width: 75%;
  padding: 12px 16px;
  border-radius: 18px;
  position: relative;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.chat-bubble.customer .bubble-content {
  background: #32a1da;
  color: white;
  border-radius: 18px 18px 4px 18px;
}

.chat-bubble.seller .bubble-content {
  background: #faf3e0;
  color: #2d3748;
  border-radius: 18px 18px 18px 4px;
}

.message-time {
  font-size: 0.75em;
  opacity: 0.8;
  margin-top: 6px;
}

.enhanced-input-area {
  display: flex;
  padding: 12px;
  background: rgba(249, 255, 255, 0.9);
  border-top: 1px solid #e2e8f0;
}

.enhanced-input {
  flex: 1;
  border: 2px solid #cbd5e0;
  border-radius: 24px;
  padding: 10px 20px;
  margin-right: 12px;
  transition: border-color 0.3s;
}

.enhanced-input:focus {
  border-color: #32a1da;
  outline: none;
}

.enhanced-send-btn {
  background: #32a1da;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: transform 0.2s;
}

.enhanced-send-btn:hover {
  transform: translateY(-2px);
}

/* 添加消息动画 */
@keyframes messageAppear {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.chat-bubble {
  animation: messageAppear 0.3s ease-out;
}
</style>