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

      <!-- 广告轮播 -->
      <div class="section">
        <el-carousel height="200px" indicator-position="outside">
          <el-carousel-item v-for="(item, index) in ads" :key="index">
            <img :src="item.image" class="carousel-image" />
          </el-carousel-item>
        </el-carousel>
      </div>

      <!-- 双栏内容区 -->
      <div class="dual-column-section">
        <!-- 左侧：附近商家推荐 -->
        <div class="left-column">
          <h2 class="section-title">附近商家推荐</h2>
          <div class="store-list">
            <div 
              v-for="(store, index) in nearbyStores" 
              :key="index" 
              class="store-item"
              @click="goToMerchantList()"
            >
              <img :src="store.image" class="store-image" />
              <div class="store-info">
                <h3>{{ store.name }}</h3>
                <p>{{ store.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧：菜谱分享 -->
        <div class="right-column">
          <h2 class="section-title">菜谱分享</h2>
          <div class="recipe-list">
            <div 
              v-for="(recipe, index) in recipes" 
              :key="index" 
              class="recipe-item"
              @click="goToRecipeList()"
            >
              <img :src="recipe.image" class="recipe-image" />
              <div class="recipe-info">
                <h3>{{ recipe.title }}</h3>
                <p>{{ recipe.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
<script setup>
  import { ref } from 'vue'
  import { Search } from '@element-plus/icons-vue'
  import { useRouter } from 'vue-router'
  
  // 搜索文本
  const searchText = ref('')
  
  // 广告数据
  const ads = ref([
    {
      image: 'https://rjt666.github.io/sea/cur-home1.jpg'
    },
    {
      image: 'https://rjt666.github.io/sea/cur-home2.jpg'
    }
  ])

  // 附近商家数据
  const nearbyStores = ref([
    {
      image: 'https://rjt666.github.io/sea/seastar.jpg',
      name: '海洋之星',
      description: '建设自1980...'
    },
    // ...更多商家数据
  ])

  // 菜谱数据
  const recipes = ref([
    {
      image: 'https://rjt666.github.io/sea/qingzhengluyu.jpg',
      title: '清蒸鲈鱼',
      description: '清蒸鲈鱼是...'
    },
    // ...更多菜谱数据
  ])

  const router = useRouter()

  // 修改跳转方法
  const goToMerchantList = () => {
    router.push({ name: 'MerchantList' })
  }

  const goToRecipeList = () => {
    router.push({ name: 'RecipeList' })
  }
</script>
<script setup>

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
  }
  
  .news-item p {
    color: #666;
    font-size: 14px;
  }
  .dual-column-section {
    display: flex;
    gap: 24px;
    margin-top: 24px;
  }

  .left-column,
  .right-column {
    flex: 1;
  }

  .store-list,
  .recipe-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .store-item,
  .recipe-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    background-color: #f5f7fa;
    border-radius: 4px;
  }

  .store-image,
  .recipe-image {
    width: 80px;
    height: 80px;
    border-radius: 4px;
    object-fit: cover;
  }

  .store-info h3,
  .recipe-info h3 {
    margin-bottom: 4px;
    font-size: 16px;
    color: #333;
  }

  .store-info p,
  .recipe-info p {
    font-size: 14px;
    color: #666;
  }
</style>