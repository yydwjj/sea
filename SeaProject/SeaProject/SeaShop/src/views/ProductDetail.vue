<template>
    <div class="product-detail-container">
      <el-card>
        <!-- 商品图片 -->
        <div class="product-image-container">
          <el-image 
            :src="product.image" 
            fit="cover" 
            class="product-image"
          />
        </div>
  
        <!-- 商品基本信息 -->
        <div class="product-info-section">
          <h1 class="product-title">{{ product.title }}</h1>
          <div class="price-section">
            <span class="price">¥ 128.00</span>
            <span class="unit">/ 500g</span>
          </div>
          <el-descriptions :column="1" border class="product-details">
            <el-descriptions-item label="产地">浙江舟山</el-descriptions-item>
            <el-descriptions-item label="规格">500g/只</el-descriptions-item>
            <el-descriptions-item label="养殖方式">深海网箱养殖</el-descriptions-item>
            <el-descriptions-item label="捕捞时间">24小时内</el-descriptions-item>
          </el-descriptions>
        </div>
  
        <!-- 水质报告 -->
        <div class="water-quality-section">
          <h2 class="section-title">养殖区域水质报告</h2>
          <el-descriptions :column="1" class="quality-details">
            <el-descriptions-item label="水质等级">
              <el-tag type="success">一级</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="检测机构">
                清渔监测中心
            </el-descriptions-item>
            <el-descriptions-item label="检测时间">
              2023-09-15
            </el-descriptions-item>
            <el-descriptions-item label="主要指标">
              <el-progress 
                :percentage="98" 
                status="success" 
                :show-text="false"
              />
              <div class="indicator-list">
                <span>溶解氧：8.2mg/L</span>
                <span>PH值：7.6</span>
                <span>氨氮：0.02mg/L</span>
              </div>
            </el-descriptions-item>
          </el-descriptions>
          <div class="certification-badge">
            <el-image 
              src="https://yydwjj.github.io/map/renzheng.png" 
              fit="contain"
              class="certificate-image"
            />
            <span class="certificate-text">健康指标认证</span>
          </div>
        </div>
      </el-card>
    </div>
  </template>
  
 <script setup>
    import { ref, onMounted } from 'vue'
    import { useRoute } from 'vue-router'

    const route = useRoute()
    const product = ref({
    id: 1,
    image: 'https://rjt666.github.io/sea/home1.jpg',
    title: '青蟹'
    })

    onMounted(() => {
    // 这里可以添加获取商品详情的逻辑
    console.log('当前商品ID:', route.params.id)
    })
  </script>
  
  <style scoped>
  .product-detail-container {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .product-image-container {
    margin-bottom: 30px;
  }
  
  .product-image {
    width: 100%;
    height: 300%;
    border-radius: 4px;
  }
  
  .product-info-section {
    margin-bottom: 40px;
    font-size: 18px;
  }
  
  .product-title {
    font-size: 28px;
    margin-bottom: 20px;
  }
  
  .price-section {
    margin-bottom: 25px;
  }
  
  .price {
    font-size: 32px;
    color: #f56c6c;
    font-weight: bold;
  }
  
  .unit {
    font-size: 16px;
    color: #999;
    margin-left: 8px;
  }
  
  .product-details {
    margin-top: 20px;
  }
  
  .water-quality-section {
    padding: 20px;
    /* background-color: #f5f7fa; */
    border-radius: 4px;
  }
  
  .section-title {
    font-size: 22px;
    margin-bottom: 20px;
  }
  
  .quality-details {
    margin-bottom: 20px;
  }
  
  .certification-badge {
    text-align: center;
    padding: 20px;
  }
  
  .certificate-image {
    width: 80px;
    height: 80px;
  }
  
  .certificate-text {
    display: block;
    margin-top: 10px;
    font-size: 14px;
    color: #67c23a;
  }
  
  .indicator-list {
    margin-top: 10px;
    font-size: 12px;
    color: #666;
  }
  </style>