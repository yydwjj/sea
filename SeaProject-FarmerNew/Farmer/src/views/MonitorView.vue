<template>
  <div class="monitor-container">
    <div class="header">
      <span class="date">{{ currentDate }}</span>
      <button class="history-button" @click="showHistory =!showHistory">历史记录</button>
    </div>
    <div v-if="!showHistory" class="video-list">
      <div v-for="(video, index) in videos" :key="index" class="video-item">
        <span class="video-name">水域{{ index + 1 }}</span>
        <video :src="video.src" alt="水域视频" class="video-img" />
      </div>
    </div>
    <div v-if="showHistory" class="history-content">
      <!-- 这里可以进一步添加历史记录的具体展示逻辑，目前只是简单占位 -->
      <p>历史记录内容待展示</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 当前日期
const currentDate = ref('2025/2/16');
// 是否显示历史记录
const showHistory = ref(false);
// 视频数据，src 后期可替换为实际视频路径或地址
const videos = ref([
  { src: 'https://yydwjj.github.io/-----/f1.mp4' },
  { src: 'https://yydwjj.github.io/-----/f2.mp4' }
]);
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