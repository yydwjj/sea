<template>
  <div class="page-container">
    <button class="back-button" @click="goBack">
      <Icon icon="material-symbols:chevron-left-rounded" width="2em" />
    </button>
    
    <div class="header">
      <h1>顾客订单管理</h1>
      <p class="subtitle">查看和管理顾客订单</p>
    </div>

    <div class="content">
      <div class="filters">
        <div class="filter-group">
          <label>时间</label>
          <select>
            <option>最近7天</option>
            <option>最近30天</option>
            <option>自定义</option>
          </select>
        </div>
        <div class="filter-group">
          <label>状态：</label>
          <select>
            <option>全部</option>
            <option>待付款</option>
            <option>已发货</option>
            <option>已完成</option>
          </select>
        </div>
        <!-- <button class="filter-btn">
          <Icon icon="mdi:filter" width="1.2em" />
          筛选
        </button> -->
      </div>

      <div class="order-list">
        <!-- <div class="order-card" v-for="i in 5" :key="i">
          <div class="order-header">
            <span class="order-id">订单号：2023100{{ i }}</span>
            <span class="order-status" :class="getStatusClass(i)">{{ getStatusText(i) }}</span>
          </div>
          <div class="order-body">
            <div class="product-info">
              <img src="https://via.placeholder.com/80" alt="商品图片" class="product-image" />
              <div>
                <h3>商品名称 {{ i }}</h3>
                <p>数量：{{ i }}件</p>
                <p>单价：￥{{ 100 * i }}</p>
              </div>
            </div>
            <div class="order-details">
              <p>顾客：顾客 {{ i }}</p>
              <p>下单时间：2023-10-0{{ i }} 12:00</p>
              <p>总金额：￥{{ 100 * i }}</p>
            </div>
          </div>
          <div class="order-actions">
            <button class="action-btn view-detail">
              <Icon icon="mdi:eye" width="1.2em" />
              查看详情
            </button>
            <button class="action-btn process-order" v-if="i % 2 === 0">
              <Icon icon="mdi:check" width="1.2em" />
              处理订单
            </button>
          </div>
        </div> -->
      </div>
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

const getStatusText = (i) => {
  const status = ['待付款', '已发货', '已完成'];
  return status[i % status.length];
};

const getStatusClass = (i) => {
  const classes = ['pending', 'shipped', 'completed'];
  return classes[i % classes.length];
};
</script>

<style scoped>
.page-container {
  padding: 20px;
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
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.filters {
  display: flex;
  gap: 16px;
  margin-bottom: 30px;
  padding: 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-group label {
  color: #7f8c8d;
}

.filter-group select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #50b7eb;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}

.filter-btn:hover {
  background: #3fa3d6;
}

.order-list {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.order-card {
  padding: 16px;
  border-bottom: 1px solid #eee;
}

.order-card:last-child {
  border-bottom: none;
}

.order-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}

.order-id {
  color: #7f8c8d;
}

.order-status {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.9em;
}

.order-status.pending {
  background: #ffeb3b;
  color: #f57c00;
}

.order-status.shipped {
  background: #4caf50;
  color: white;
}

.order-status.completed {
  background: #2196f3;
  color: white;
}

.order-body {
  display: flex;
  gap: 20px;
  margin-bottom: 16px;
}

.product-info {
  display: flex;
  gap: 16px;
  flex: 1;
}

.product-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
}

.order-details {
  flex: 1;
  color: #7f8c8d;
}

.order-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s;
}

.view-detail {
  background: #50b7eb;
  color: white;
}

.view-detail:hover {
  background: #3fa3d6;
}

.process-order {
  background: #4caf50;
  color: white;
}

.process-order:hover {
  background: #43a047;
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