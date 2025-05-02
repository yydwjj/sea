<template>
  <div class="monitor-container">
    <div class="header">
      <span class="date">{{ currentDate }}</span>
      <button class="history-button" @click="showHistory =!showHistory">历史记录</button>
    </div>
    <div v-if="!showHistory" class="video-list">
      <img src="../assets/inspect (1).jpg" alt="专检" />
      <img src="../assets/inspect (3).jpg" alt="专检" />
      <img src="../assets/inspect (2).jpg" alt="专检" />
    </div>
    <div v-if="showHistory" class="history-content">
      <!-- 这里可以进一步添加历史记录的具体展示逻辑，目前只是简单占位 -->
      <p v-if="loading">加载中...</p>
      <p v-else-if="error">{{ error }}</p>
      <pre v-else>{{ apiData }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getTestData } from '../api.js';

// 当前日期
const currentDate = ref('2025/3/4');
// 是否显示历史记录
const showHistory = ref(false);
// 存储 API 数据
const apiData = ref(null);
// 加载状态
const loading = ref(true);
// 错误信息
const error = ref(null);

const fetchData = async () => {
  try {
    const response = await getTestData();
    apiData.value = response.data;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.monitor-container {
  text-align: center;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.date {
  background-color: rgb(50, 161, 218);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 1px 7px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

.history-button {
  background-color: rgb(50, 161, 218);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 1px 7px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

.video-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.video-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.video-name {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}

.video-img {
  width: 300px;
  height: 200px;
  object-fit: cover;
}

.history-content {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.monitor-img {
  margin-top: 20px;
  max-width: 100%;
  height: auto;
}
</style>