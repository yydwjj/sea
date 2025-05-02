<template>
  <div class="page-container">
    <button class="back-button" @click="goBack">
      <Icon icon="material-symbols:chevron-left-rounded" width="2em" />
    </button>
    <div class="header">
      <h1>我的顾客</h1>
      <p class="subtitle">管理您的顾客信息</p>
    </div>

    <div class="content">
      <div class="search-bar">
        <input type="text" placeholder="搜索顾客..." />
        <button class="search-btn">
          <Icon icon="mdi:magnify" width="1.2em" />
        </button>
      </div>

      <!-- <div class="customer-list">
        <div class="customer-card" v-for="i in 5" :key="i">
          <div class="avatar">
            <Icon icon="mdi:account-circle" width="3em" />
          </div>
          <div class="info">
            <h3>顾客 {{ i }}</h3>
            <p>最近购买：2023-10-0{{ i }}</p>
            <p>累计消费：￥{{ 1000 * i }}</p>
          </div>
          <button class="detail-btn">
            查看详情
            <Icon icon="mdi:chevron-right" width="1.2em" />
          </button>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';

const router = useRouter();

const goBack = () => {
  router.back();
};
</script>

<style scoped>
.page-container {
  padding: 20px;
  position: relative;
  background: #f5f7fa;
  min-height: 100vh;
}

.header {
  text-align: center;
  margin: 40px 0;
}

.header h1 {
  font-size: 2.2em;
  color: #2c3e50;
  margin-bottom: 8px;
}

.header .subtitle {
  color: #7f8c8d;
  font-size: 1.1em;
}

.content {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.search-bar {
  display: flex;
  margin-bottom: 30px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.search-bar input {
  flex: 1;
  padding: 12px 16px;
  border: none;
  border-radius: 8px 0 0 8px;
  font-size: 1em;
}

.search-bar input:focus {
  outline: none;
}

.search-btn {
  padding: 0 20px;
  background: #50b7eb;
  color: white;
  border: none;
  border-radius: 0 8px 8px 0;
  cursor: pointer;
  transition: background 0.2s;
}

.search-btn:hover {
  background: #3fa3d6;
}

.customer-list {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.customer-card {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #eee;
  transition: background 0.2s;
}

.customer-card:hover {
  background: #f9f9f9;
}

.customer-card:last-child {
  border-bottom: none;
}

.avatar {
  margin-right: 16px;
  color: #50b7eb;
}

.info {
  flex: 1;
}

.info h3 {
  margin: 0 0 4px;
  color: #2c3e50;
}

.info p {
  margin: 4px 0;
  color: #7f8c8d;
  font-size: 0.9em;
}

.detail-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #50b7eb;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background 0.2s;
}

.detail-btn:hover {
  background: #3fa3d6;
}

.back-button {
  position: fixed;
  left: 20px;
  top: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: #eee9e954;
  border-radius: 12px;
  height: 40px;
  width: 40px;
  border: none;
  z-index: 100;
}

.back-button:hover {
  background-color: #eee9e9;
}
</style>