<template>
  <div class="benefit-view">
    <!-- 返回按钮 -->
    <div class="back-button" @click="goBack">
      <Icon icon="material-symbols:chevron-left-rounded" width="2em" />
    </div>

    <h2 class="benefit-title">我的权益</h2>

    <!-- 权益卡片容器 -->
    <div class="benefit-cards">
      <!-- 单个权益卡片 -->
      <div
          v-for="(benefit, index) in benefits"
          :key="index"
          class="benefit-card"
      >
        <!-- 卡片上半部分 -->
        <div class="card-header">
          <img
              :src="benefit.icon"
              class="header-icon"
              :alt="benefit.title"
          >
          <span class="header-title">{{ benefit.title }}</span>
        </div>

        <!-- 卡片下半部分 -->
        <div class="card-content">
          <div class="price">￥{{ benefit.price }}</div>
          <div class="valid-date">{{ benefit.expireDate }}到期</div>
          <button class="use-button">使用</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';

import c1 from '../assets/c (1).jpg'
import c2 from '../assets/c (2).jpg'
import c3 from '../assets/c (3).jpg'
import c4 from '../assets/c (4).jpg'
import c5 from '../assets/c (5).jpg'

const router = useRouter();

// 模拟权益数据
const benefits = ref([
  {
    title: '鱼类购物券',
    icon: c3, // 替换实际图标路径
    price: '50',
    expireDate: '2024-12-31'
  },
  {
    title: '甲壳类购物券',
    icon: c4, // 替换实际图标路径
    price: '9',
    expireDate: '2025-12-31'
  },
  {
    title: '贝类购物券',
    icon: c1, // 替换实际图标路径
    price: '7',
    expireDate: '2024-06-30'
  },
  {
    title: '藻类购物券',
    icon: c2, // 替换实际图标路径
    price: '19',
    expireDate: '2025-12-31'
  },
  {
    title: '鱼类购物券',
    icon: c3, // 替换实际图标路径
    price: '25',
    expireDate: '2025-12-31'
  },
]);

const goBack = () => {
  router.go(-1);
};
</script>

<style scoped>
.benefit-view {
  background-color: rgb(236, 247, 253);
  min-height: 100vh;
  padding: 20px;
}

.back-button {
  position: absolute;
  left: 15px;
  top: 15px;
  color: rgb(50, 161, 218);
  cursor: pointer;
}

.benefit-title {
  text-align: center;
  font-size: 24px;
  color: rgb(48, 107, 158);
  margin: 40px 0 20px;
}

.benefit-cards {
  display: flex;
  flex-direction: column;
  gap: 25px;
  max-width: 600px;
  margin: 0 auto;
}

/*.benefit-card {
  background: white;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}*/

.card-header {
  display: flex;
  align-items: center;
  /*margin-bottom: 15px;*/
}

.header-icon {
  width: 24px;
  height: 24px;
  margin-right: 10px;
  border-radius: 50%;
}

.header-title {
  font-size: 18px;
  color: rgb(28, 158, 218);
  font-weight: 600;
}

.card-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgb(249, 255, 255);
  border-radius: 8px;
  padding: 12px;
  height: 55px;
  width: 100%;
  box-shadow: inset -5px 0px 0 rgb(163, 224, 252);
}

.price {
  color: rgb(0, 173, 249);
  font-weight: bold;
  flex: 1;
  font-size: 26px;
}

.valid-date {
  color: rgb(159, 160, 161);
  font-size: 12px;
  flex: 2;
  padding-left: 15px;
}

.use-button {
  background: rgb(50, 161, 218);
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 20px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s;
}

.use-button:hover {
  background: rgb(35, 125, 171);
}
</style>