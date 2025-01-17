<template>
    <div class="product-detail-container">
      <!-- 返回按钮 -->
      <el-button
        type="text"
        class="back-button"
        @click="handleBack"
      >
        <el-icon><ArrowLeft /></el-icon>
        返回
      </el-button>
  
      <!-- 顶部图片区域 -->
      <div class="product-image-container">
        <el-image
          :src="product.image"
          fit="cover"
          class="main-image"
        />
      </div>
  
      <!-- 中部信息区域 -->
      <div class="product-info-container">
        <div class="product-name-price">
          <div class="product-name">{{ product.name }}</div>
          <div class="product-price">{{ product.price }}</div>
        </div>
        <div class="promotion-address">
          <div class="promotion">{{ product.promotion }}</div>
          <div class="address">{{ product.address }}</div>
        </div>
      </div>
  
      <!-- 底部按钮栏 -->
      <div class="action-buttons">
        <el-button type="primary" class="buy-now">立即购买</el-button>
        <el-button type="success" class="add-to-cart">加入购物车</el-button>
        <el-button type="warning" class="favorite">收藏</el-button>
      </div>
    </div>
</template>
  
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft } from '@element-plus/icons-vue'

const router = useRouter()

// 固定商品数据
const product = ref({
  image: 'https://rjt666.github.io/sea/longxia.jpg',
  name: '活龙虾一只',
  price: '￥268',
  promotion: '满199减50',
  address: '距离您家3公里'
})

const handleBack = () => {
  router.go(-1)
}
</script>
  
<style scoped>
  .product-detail-container {
    position: relative;
    padding-top: 60px;
    min-height: 100vh;
  }
  
  .back-button {
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 1;
    padding: 8px 12px;
    font-size: 14px;
    color: #409EFF;
  }
  
  .back-button:hover {
    background-color: #f5f7fa;
  }
  
  .product-image-container {
    width: 100%;
    height: 300px;
    overflow: hidden;
  }
  
  .main-image {
    width: 100%;
    height: 100%;
  }
  
  .product-info-container {
    padding: 20px;
  }
  
  .product-name-price {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }
  
  .product-name {
    font-size: 20px;
    font-weight: bold;
  }
  
  .product-price {
    font-size: 24px;
    color: #f56c6c;
  }
  
  .promotion-address {
    display: flex;
    justify-content: space-between;
    color: #666;
    font-size: 14px;
  }
  
  .action-buttons {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    padding: 10px;
    background-color: #fff;
    box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.1);
  }
  
  .action-buttons .el-button {
    flex: 1;
    margin: 0 5px;
  }
  
  .buy-now {
    background-color: #409EFF;
    border-color: #409EFF;
  }
  
  .add-to-cart {
    background-color: #67C23A;
    border-color: #67C23A;
  }
  
  .favorite {
    background-color: #E6A23C;
    border-color: #E6A23C;
  }
</style>