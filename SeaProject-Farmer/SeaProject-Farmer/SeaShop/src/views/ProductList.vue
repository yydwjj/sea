<template>
  <div class="product-container">
    <div class="product-list">
      <div
        v-for="product in products"
        :key="product.id"
        class="product-card"
        @click="goToProductDetail"
      >
        <el-card>
          <div class="product-header">
            <div class="product-info">
              <el-image
                :src="product.image"
                fit="cover"
                class="product-image"
              />
              <div class="product-details">
                <div class="product-name">{{ product.name }}</div>
                <div class="product-price">{{ product.price }}</div>
              </div>
            </div>
            <el-button type="primary" size="small">编辑</el-button>
          </div>
          <div class="product-actions">
            <el-button size="small">检测度</el-button>
            <el-button size="small">视觉监控</el-button>
            <el-button size="small">浏览曝光</el-button>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { useRouter } from 'vue-router'
  defineProps({
    products: {
      type: Array,
      required: true
    }
  })
const router = useRouter()

const goToProductDetail = (productId) => {
  router.push({ name: 'ProductDetail', params: { id: productId } })
}
</script>
  
<style scoped>
  .product-container {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  
  /* 数据面板 */
  .data-panel {
    display: flex;
    gap: 20px;
  }
  
  .data-card {
    flex: 1;
    background-color: #fff;
    border-radius: 8px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  
  .data-value {
    font-size: 24px;
    font-weight: bold;
    color: #409EFF;
    margin-bottom: 8px;
  }
  
  .data-label {
    font-size: 14px;
    color: #909399;
  }
  
  /* 商品列表 */
  .product-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }
  
  .product-card {
    width: 100%;
    cursor: pointer;
  }

  .product-card:hover {
    transform: translateY(-2px);
    transition: transform 0.2s ease;
  }
  
  .product-image {
    width: 100%;
    height: 150px;
    border-radius: 4px;
  }
  
  .product-info {
    padding: 10px 0;
  }
  
  .product-name {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 8px;
  }
  
  .product-price {
    color: #f56c6c;
    font-size: 14px;
    margin-bottom: 12px;
  }
  
  .product-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .product-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.product-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.product-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.product-image {
  width: 80px;
  height: 80px;
  border-radius: 4px;
}

.product-actions {
  display: flex;
  justify-content: space-between;
  gap: 8px;
}
  
  /* 响应式布局 */
  @media (max-width: 768px) {
    .data-panel {
      flex-direction: column;
    }
  
    .product-list {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
  }
</style>