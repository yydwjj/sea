<template>
  <div class="profile-view">
    <!-- 主页面 -->
    <div v-if="!currentPage">
      <!-- 顶部区域 -->
      <div class="top-section">
        <div class="avatar-container">
          <img src="../assets/avatar.png" alt="头像" class="avatar" />
        </div>
        <div class="user-name">XXXXXXX养殖户</div>
      </div>

      <!-- 中间区域 -->
      <div class="middle-section">
        <img src="../assets/profile.png" alt="养殖环境" class="banner-image" />
      </div>

      <!-- 底部功能区 -->
      <div class="bottom-section">
        <div class="function-grid">
          <div v-for="(func, index) in functions" :key="index" class="function-item" @click="showPage(func.label)">
            <Icon :icon="func.icon" class="function-icon" />
            <div class="function-label">{{ func.label }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 子页面 -->
    <div v-else>
      <button class="back-button" @click="goBack">返回</button>
      <component :is="currentPage"></component>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'; // 引入 Iconify 图标组件
import { ref } from 'vue';

// 引入子页面组件
import OrderManagement from './OrderManagement.vue';
import SalesRecord from './SalesRecord.vue';
import PaidPromotion from './PaidPromotion.vue';
import Message from './Message.vue';

// 功能数据
const functions = [
  { icon: 'mdi:cart', label: '订单管理' },
  { icon: 'mdi:chart-line', label: '销售记录' },
  { icon: 'mdi:bullhorn', label: '付费推广' },
  { icon: 'mdi:message', label: '消息' },
  { icon: 'mdi:headset', label: '我的客服' },
  { icon: 'mdi:cog', label: '我的设置' },
];

// 当前显示的页面
const currentPage = ref(null);

const showPage = (label) => {
  switch (label) {
    case '订单管理':
      currentPage.value = OrderManagement;
      break;
    case '销售记录':
      currentPage.value = SalesRecord;
      break;
    case '付费推广':
      currentPage.value = PaidPromotion;
      break;
    case '消息':
      currentPage.value = Message;
      break;
    default:
      break;
  }
};

const goBack = () => {
  currentPage.value = null;
};
</script>

<style scoped>
.profile-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(236,247,253);
  padding: 16px;
  min-height: 100vh;
}

/* 顶部区域 */
.top-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 24px;
  width: 100%;
  background-color: rgb(249, 255, 255);
  background: linear-gradient(to bottom , rgb(236,247,253)30%, rgb(249, 255, 255)30%);
}

.avatar-container {
  width: 100px;
  height: 100px;
  border-radius: 50%; /* 圆形头像 */
  overflow: hidden;
  margin-bottom: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 阴影效果 */
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 图片按比例填充 */
}

.user-name {
  background-color: #333; /* 深色背景 */
  color: white; /* 白色文字 */
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
}

/* 中间区域 */
.middle-section {
  width: 100%;
  max-width: 800px;
  padding-bottom: 24px;
  background-color: rgb(249, 255, 255);
}

.banner-image {
  width: 100%;
  height: auto;
  border-radius: 12px; /* 圆角 */
}

/* 底部功能区 */
.bottom-section {
  width: 100%;
  max-width: 600px; /* 限制最大宽度 */
  background-color: rgb(249, 255, 255);
}

.function-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 两行三列 */
  gap: 16px;
}

.function-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color:rgb(249,255,255);
  padding: 16px;
  border-radius: 12px;
  cursor: pointer;
}

.function-icon {
  font-size: 32px;
  color: white;
  background: rgb(52, 160, 222);
  padding: 10px;
  border-radius: 50px;
  margin-bottom: 8px;
}

.function-label {
  font-size: 14px;
  font-weight: 600;
  color: black; /* 黑色文字 */
  text-align: center;
}

.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s ease-in-out;
  background-color: rgb(50, 161, 218);
    color: white;
    border: none;
    border-radius: 12px;
    /* padding: 8px 16px; */
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s;
}

.back-button:hover {
  background-color: #0056b3;
}
</style>