<template>
    <div class="home-container">
      <!-- 搜索栏 -->
      <div class="search-bar">
        <el-input
          v-model="searchText"
          placeholder="请输入搜索内容"
          class="search-input"
        >
          <template #append>
            <el-button :icon="Search" />
          </template>
        </el-input>
      </div>
  
      <!-- 热门商品推荐轮播 -->
      <div class="section">
        <h2 class="section-title">热门商品推荐</h2>
        <el-carousel height="200px" indicator-position="outside">
          <el-carousel-item v-for="(item, index) in hotProducts" :key="index">
            <router-link v-if="index === 0" :to="`/product/${item.id}`">
              <img :src="item.image" class="carousel-image" />
            </router-link>
            <img :src="item.image" class="carousel-image" />
            <div class="carousel-caption">{{ item.title }}</div>
          </el-carousel-item>
        </el-carousel>
      </div>
  
      <!-- 行业动态资讯轮播 -->
      <div class="section">
        <h2 class="section-title">行业动态资讯</h2>
        <el-carousel height="150px" type="card">
          <el-carousel-item v-for="(item, index) in industryNews" :key="index">
            <div class="news-item">
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { Search } from '@element-plus/icons-vue'
  
  // 搜索文本
  const searchText = ref('')
  
  // 热门商品数据
  const hotProducts = ref([
    {
      id: 1, 
      image: 'https://rjt666.github.io/sea/home1.jpg',
      title: '青蟹'
    },
    {
      image: 'https://rjt666.github.io/sea/home2.jpg',
      title: '虾蛄'
    },
    {
      image: 'https://rjt666.github.io/sea/home3.jpg',
      title: '扇贝'
    }
  ])
  
  // 行业动态数据
  const industryNews = ref([
    {
      title: '预测报告',
      description: '中国水产行业发展现状分析与投资前景预测...'
    },
    {
      title: '行业动态',
      description: '预见2024：《2024年中国水产养殖行业全景图谱...'
    },
    {
      title: '洞察',
      description: '2023-2024年中国水产行业现状及消费趋势洞察报告...'
    }
  ])
 
 
 </script>
  
  <style scoped>
  .home-container {
    padding: 16px;
  }
  
  .search-bar {
    margin-bottom: 24px;
  }
  
  .search-input {
    width: 100%;
  }
  
  .section {
    margin-bottom: 32px;
  }
  
  .section-title {
    font-size: 18px;
    margin-bottom: 16px;
    color: #333;
  }
  
  .carousel-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .carousel-caption {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 8px;
    text-align: center;
    font-size: 16px;
  }
  
  .news-item {
    padding: 20px;
    background-color: #f5f7fa;
    height: 100%;
    border-radius: 4px;
  }
  
  .news-item h3 {
    margin-bottom: 8px;
    color: #333;
    font-size: 18px;
  }
  
  .news-item p {
    color: #666;
    font-size: 14px;
  }
  </style>