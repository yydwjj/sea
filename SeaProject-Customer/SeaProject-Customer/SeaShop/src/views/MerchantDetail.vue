<template>
    <div class="merchant-detail">
      <!-- 顶部栏 -->
      <div class="header">
        <el-button type="text" @click="router.back()">
          <el-icon>
            <ArrowLeft/>
          </el-icon>
        </el-button>
        <h1 class="title">{{ merchant.name }}</h1>
        <el-button type="text" @click="shareMerchant">
          <el-icon>
            <Share/>
          </el-icon>
        </el-button>
      </div>
  
      <!-- 商家信息 -->
      <div class="merchant-info">
        <img :src="merchant.image" class="merchant-image"/>
        <div class="info-content">
          <div class="rating-info">
            <el-rate v-model="merchant.rating" disabled/>
            <span>({{ merchant.reviews }}条评价)</span>
            <span class="distance">{{ merchant.distance }}km</span>
          </div>
          <div class="tags">
            <el-tag
                v-for="(tag, index) in merchant.tags"
                :key="index"
                type="info"
                size="small"
            >
              {{ tag }}
            </el-tag>
          </div>
          <div class="location">
            <el-icon>
              <Location/>
            </el-icon>
            <span>{{ merchant.address }}</span>
          </div>
          <div class="business-hours">
            <el-icon>
              <Clock/>
            </el-icon>
            <span>营业时间：{{ merchant.businessHours }}</span>
          </div>
        </div>
      </div>
  
      <!-- 商品列表 -->
      <div class="product-list">
        <h2 class="section-title">今日水产</h2>
        <div class="products">
          <div
              v-for="(product, index) in products"
              :key="index"
              class="product-card"
          >
            <img :src="product.image" class="product-image"/>
            <div class="product-info">
              <h3>{{ product.name }}</h3>
              <p class="spec">规格：{{ product.spec }}</p>
              <p class="price">¥{{ product.price }}</p>
              <el-button type="primary" size="small" @click="addToCart(product)">
                购买
              </el-button>
            </div>
          </div>
        </div>
      </div>
  
  
      <div class="environment-section">
        <h2 class="section-title">环境检测</h2>
  
        <!-- 监控视频区域 -->
        <div class="monitor-video">
          <video controls width="100%" poster="https://via.placeholder.com/400x200?text=监控视频">
            <source src="" type="video/mp4">
            您的浏览器不支持视频播放
          </video>
          <p class="video-description">实时养殖环境监控</p>
        </div>
  
        <!-- 水质报告 -->
        <div class="water-quality">
          <h3 class="sub-title">水质报告</h3>
          <div class="chart-container">
            <!-- 今日水质 -->
            <div class="chart">
              <h4>今日水质</h4>
              <el-progress
                  :percentage="85"
                  color="#409EFF"
                  :stroke-width="16"
              />
              <div class="chart-details">
                <span>PH值：7.2</span>
                <span>溶解氧：6.8mg/L</span>
              </div>
            </div>
  
            <!-- 本周趋势 -->
            <div class="chart">
              <h4>本周趋势</h4>
              <el-progress
                  :percentage="90"
                  color="#409EFF"
                  :stroke-width="16"
              />
              <div class="chart-details">
                <span>平均PH值：7.1</span>
                <span>平均溶解氧：6.9mg/L</span>
              </div>
            </div>
  
            <!-- 本月趋势 -->
            <div class="chart">
              <h4>本月趋势</h4>
              <el-progress
                  :percentage="88"
                  color="#409EFF"
                  :stroke-width="16"
              />
              <div class="chart-details">
                <span>平均PH值：7.0</span>
                <span>平均溶解氧：6.7mg/L</span>
              </div>
            </div>
          </div>
        </div>
  
        <!-- 商家介绍 -->
        <div class="merchant-intro">
          <h2 class="section-title">商家介绍</h2>
          <p class="description">{{ merchant.description }}</p>
          <div class="certifications">
            <el-tag
                v-for="(cert, index) in merchant.certifications"
                :key="index"
                type="success"
                size="small"
            >
              {{ cert }}
            </el-tag>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import {ref} from 'vue'
  import {useRouter} from 'vue-router'
  import {ArrowLeft, Share, Location, Clock} from '@element-plus/icons-vue'
  
  const router = useRouter()
  
  const merchant = ref({
    id: 3,
    name: '小渔夫个体户',
    image: 'https://rjt666.github.io/sea/merchant3.jpg',
    rating: 4.2,
    reviews: 102,
    distance: 2.5,
    address: 'XX市XX区XX路XX号',
    businessHours: '09:00 - 18:00',
    tags: ['有机认证', '养殖场直供', '家庭采购'],
    description: '我们是一家专注于提供新鲜优质水产品的个体商户，所有产品均为当日捕捞，保证新鲜。',
    certifications: ['有机认证', '绿色食品认证']
  })
  
  const products = ref([
    {
      id: 1,
      name: '新鲜鲈鱼',
      image: 'https://rjt666.github.io/sea/luyu.jpg',
      spec: '500g/条',
      price: 38.8
    },
    {
      id: 2,
      name: '活虾',
      image: 'https://rjt666.github.io/sea/huoxia.jpg',
      spec: '500g/份',
      price: 58.0
    }
  ])
  
  const shareMerchant = () => {
    // 分享逻辑
    console.log('分享商家')
  }
  
  const addToCart = (product) => {
    // 加入购物车逻辑
    console.log('加入购物车', product)
  }
  </script>
  
  <style scoped>
  .merchant-detail {
    padding: 16px;
  }
  
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }
  
  .title {
    font-size: 18px;
    margin: 0;
  }
  
  .merchant-info {
    margin-bottom: 24px;
  }
  
  .merchant-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 12px;
  }
  
  .info-content {
    padding: 0 8px;
  }
  
  .rating-info {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
  }
  
  .distance {
    color: #666;
  }
  
  .tags {
    display: flex;
    gap: 8px;
    margin: 8px 0;
  }
  
  .location,
  .business-hours {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #666;
    margin: 4px 0;
  }
  
  .section-title {
    font-size: 16px;
    margin: 16px 0;
  }
  
  .product-list {
    margin-bottom: 24px;
  }
  
  .product-card {
    display: flex;
    gap: 12px;
    padding: 12px;
    background-color: #f5f7fa;
    border-radius: 8px;
    margin-bottom: 12px;
  }
  
  .product-image {
    width: 80px;
    height: 80px;
    border-radius: 8px;
    object-fit: cover;
  }
  
  .product-info {
    flex: 1;
  }
  
  .spec {
    color: #666;
    font-size: 14px;
    margin: 4px 0;
  }
  
  .price {
    color: #ff6600;
    font-size: 16px;
    margin: 8px 0;
  }
  
  .merchant-intro {
    margin-bottom: 24px;
  }
  
  .description {
    color: #333;
    line-height: 1.6;
    margin-bottom: 12px;
  }
  
  .certifications {
    display: flex;
    gap: 8px;
  }
  
  /* 添加新的样式 */
  .environment-section {
    margin-bottom: 24px;
  }
  
  .monitor-video {
    margin-bottom: 24px;
  }
  
  .video-description {
    text-align: center;
    color: #666;
    margin-top: 8px;
  }
  
  .water-quality {
    background-color: #f5f7fa;
    padding: 16px;
    border-radius: 8px;
  }
  
  .sub-title {
    font-size: 16px;
    margin-bottom: 16px;
  }
  
  .chart-container {
    display: grid;
    gap: 16px;
  }
  
  .chart {
    background-color: white;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .chart h4 {
    margin: 0 0 8px 0;
    font-size: 14px;
  }
  
  .chart p {
    margin: 8px 0 0 0;
    color: #666;
    font-size: 12px;
  }
  .chart-details {
    font-size: 12px;
  }
  </style>