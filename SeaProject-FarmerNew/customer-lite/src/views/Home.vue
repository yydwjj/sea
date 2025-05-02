<template>
  <div class="home-container">
    <!-- 问候部分 -->
    <section class="greeting-section">
      <div class="greeting-text">
        <h1 class="greeting">Hello,</h1>
        <div class="username">Aloonhghy</div>
      </div>
      <div class="avatar-wrapper">
        <div class="avatar-placeholder">
          <img class="avatar-placeholder" src="../assets/user1.png" alt="消费者头像">
        </div>
      </div>
    </section>

    <!-- 位置选择栏 -->
    <section class="location-section">
      <div class="location-selector" @click="showLocationPicker = true">
        <div class="location-icon">
          <Icon icon="mdi:map-marker" width="1.5em" />
        </div>
        <div class="location-text">
          {{ currentLocation || '请选择店铺' }}
        </div>
      </div>
    </section>

    <!-- 店铺选择弹窗 -->
    <div v-if="showLocationPicker" class="location-picker-overlay" @click.self="showLocationPicker = false">
      <div class="location-picker">
        <h3>选择店铺</h3>
        <div class="location-options">
          <div
            v-for="(location, index) in locationOptions"
            :key="index"
            class="location-option"
            :class="{ disabled: location.disabled }"
            @click="selectLocation(location)"
          >
            {{ location.name }}
            <span v-if="location.disabled" class="hint"></span>
          </div>
        </div>
      </div>
    </div>

    <!-- 轮播图部分 -->
    <section class="carousel-section">
      <Swiper
          :modules="[Autoplay, Pagination]"
          :pagination="{
            clickable: true,
            el: '.custom-pagination',
            type: 'bullets' // 改为圆点类型
          }"
          :autoplay="{
            delay: 3000,
            pauseOnMouseEnter: true
          }"
          class="swiper-container"
      >
        <SwiperSlide v-for="(img, index) in carouselImages" :key="index">
          <img
              :src="img.src"
              :alt="img.alt"
              @click="gotoProduct(img.targetId)"
              class="slide-image">
        </SwiperSlide>

        <div class ="custom-pagination"></div>
      </Swiper>
    </section>

    <!-- 商品分类 -->
    <section class="category-section">
      <h3 class="category-title">商品分类</h3>
      <div class="category-grid">
        <div
            v-for="(category, index) in categories"
            :key="index"
            class="category-item"
            @click="goToPurchase(category)"
        >
          <div class="category-image" >
            <img :src="category.img" :alt="category.name" >
          </div>
          <span class="category-name">{{ category.name }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay ,Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination'
import { useRouter, useRoute } from 'vue-router';
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

import fish1 from '../assets/p (1).jpg'
import fish2 from '../assets/p (2).jpg'
import fish3 from '../assets/p (5).jpg'
import fish4 from '../assets/p (3).jpg'

import l1 from '../assets/l (1).png'
import l2 from '../assets/l (2).jpg'
import l3 from '../assets/l (3).png'


const carouselImages = [
  { src: l1, alt: '轮播图1', targetId: 1 },
  { src: l2, alt: '轮播图2', targetId: 2 },
  { src: l3, alt: '轮播图3', targetId: 5 }
]

const categories = [
  { name: '鳜鱼' ,img :fish1 },
  { name: '鲈鱼', img :fish2},
  { name: '鲫鱼', img :fish3},
  { name: '其他类', img :fish4}
];
//鳜鱼、鲈鱼、鲫鱼

const router = useRouter();

const goToPurchase = (category) => {
  const routeMap = {
    '鳜鱼': '/c1',
    '鲈鱼': '/c2',
    '鲫鱼': '/c3',
    '其他类': '/c4'
  };

  if (routeMap[category.name]) {
    router.push(routeMap[category.name]);
  } else {
    console.warn('未定义的路由', category.name);
    router.push('/purchase'); // 可选的默认路由
  }
};

// 商品跳转方法
const gotoProduct = (index) => {
  router.push({
    path: `/product/${index}`,
    // 如果需要传递更多参数
    query: {
      from: 'home-carousel'
    }
  })
}

const showLocationPicker = ref(false);
const currentLocation = ref('');

const locationOptions = ref([
  { name: '未选择', value: '' },
  { name: '渔乐水产', value: '渔乐水产' },
  { name: '品鲜', value: '品鲜' },
  { name: '舌尖水产', value: '舌尖水产', disabled: true },
  { name: '玖九鲜', value: '玖九鲜', disabled: true }
]);

const selectLocation = (location) => {
  if (location.disabled) {
    alert('距离超出配送范围');
    return;
  }
  currentLocation.value = location.value;
  showLocationPicker.value = false;
};

</script>

<style scoped>
.home-container {
  background-color: rgb(237, 250, 255);
  min-height: 100vh;

}

/* 问候部分样式 */
.greeting-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 5px 20px 0 20px;
}

.greeting-text .greeting {
  color: rgb(159, 160, 161);
  font-size: 24px;
  margin-bottom: 8px;
}

.greeting-text .username {
  color: #000;
  font-size: 32px;
  font-weight: 600;
}

.avatar-wrapper {
  width: 70px;
  height: 70px;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  background-color: #ddd;
  border-radius: 50%;
}

/* 轮播图部分 */
.carousel-section {
  background-color: rgb(199, 230, 244);
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/*.carousel-container {
  width: 100%;
  height: 220px;
  overflow: hidden;
  border-radius: 10px;
}

.slide-placeholder {
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}*/

.swiper-container {
  width: 100%;
  height: 220px;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}

.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* 自定义分页器样式 */
:deep(.swiper-pagination) {
  width: 8px;
  height: 8px;
  background: rgba(255, 255, 255, 0.5);
  opacity: 1;
  margin: 0 4px !important;
  position: absolute;
  bottom: 15px !important;
}
:deep(.swiper-pagination-progressbar) {
  height: 3px;
  background: rgba(255, 255, 255, 0.3);
}
:deep(.swiper-pagination-progressbar-fill) {
  background: rgb(50, 161, 218);
}
.custom-pagination {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}

/* 商品分类部分 */
.category-title {
  color: rgb(48, 107, 158);
  font-size: 22px;
  margin-bottom: 20px;
  text-align: center;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  border-radius: 20px;
  background-color: white;
  padding: 20px;
  margin: 0px 17px;
  box-shadow: rgb(199, 230, 244) 7px 20px;
}

.category-item {
  background: rgb(199, 230, 244);
  border-radius: 12px;
  padding: 15px;
  display: flex;
  align-items: center;
  box-shadow:0 2px 6px 2px rgba(0, 0, 0, 0.1);
}

.category-image {
  width: 60px;
  height: 60px;
  /*background-color: #e0f0ff;*/
  border-radius: 8px;
  margin-right: 15px;
}

.category-image img {
  width: 57px;
  height: 97%;
}

.category-name {
  color: rgb(50, 110, 161);
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
}

/* 响应式设计 */
@media (min-width: 768px) {
  .home-container {
    padding: 30px 15%;
  }

  .carousel-container {
    height: 250px;
  }

  .category-grid {
    gap: 20px;
  }
}
.location-section {
  margin: 20px 0;
  padding: 0 16px;
}

.location-selector {
  display: flex;
  align-items: center;
  padding: 12px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.location-icon {
  color: #50b7eb;
  margin-right: 8px;
}

.location-text {
  flex: 1;
  color: #7f8c8d;
}

.location-picker-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.location-picker {
  background: #fffffff0;
  width: 80%;
  max-width: 400px;
  border-radius: 8px;
  padding: 20px;
}

.location-picker h3 {
  margin-bottom: 16px;
  color: #2c3e50;
}

.location-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.location-option {
  padding: 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}

.location-option:not(.disabled):hover {
  background: #f5f5f5;
}

.location-option.disabled {
  color: #bdbdbd;
  cursor: not-allowed;
}

.hint {
  font-size: 0.8em;
  color: #f44336;
}
</style>