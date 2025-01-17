<template>
  <div class="cart-container">
    <!-- 顶部栏 -->
    <div class="cart-header">
      <el-button type="text" @click="goBack">
        <el-icon><ArrowLeft /></el-icon>
      </el-button>
      <h2>购物车</h2>
      <el-button type="text" @click="toggleEditMode">
        {{ isEditMode ? '完成' : '编辑' }}
      </el-button>
    </div>

    <!-- 商品列表 -->
    <div class="product-list">
      <div class="product-card">
        <el-checkbox v-model="selectedProducts" :label="product.id" />
        <img
          src="https://rjt666.github.io/sea/caoyu.jpg"
          alt="草鱼"
          class="product-image"
        />
        <div class="product-info">
          <div class="product-name">草鱼</div>
          <div class="product-price">单价：￥35.6</div>
          <div class="product-actions">
            <el-input-number
              v-model="product.quantity"
              :min="1"
              :max="10"
              size="small"
            />
            <el-button
              v-if="isEditMode"
              type="danger"
              size="small"
              @click="removeProduct(product.id)"
            >
              删除
            </el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部栏 -->
    <div class="cart-footer">
      <div class="footer-content">
        <el-checkbox v-model="selectAll">全选</el-checkbox>
        <div class="price-info">
          <div class="total-price">合计：￥{{ totalPrice.toFixed(2) }}</div>
          <div class="discount">优惠：满100减10</div>
        </div>
        <el-button type="primary" class="checkout-btn">去结算</el-button>
      </div>
    </div>

    <!-- 空购物车状态 -->
    <el-empty v-if="!products.length" description="购物车空空如也">
      <el-button type="primary" @click="goShopping">去逛逛</el-button>
    </el-empty>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ArrowLeft } from '@element-plus/icons-vue'

const isEditMode = ref(false)
const selectAll = ref(false)
const selectedProducts = ref([])

const product = ref({
  id: 1,
  name: '草鱼',
  price: 35.6,
  quantity: 2,
  image: 'https://example.com/grass-carp.jpg'
})

const products = ref([product.value])

// 计算总价
const totalPrice = computed(() => {
  return products.value.reduce((total, product) => {
    if (selectedProducts.value.includes(product.id)) {
      return total + product.price * product.quantity
    }
    return total
  }, 0)
})

// 切换编辑模式
const toggleEditMode = () => {
  isEditMode.value = !isEditMode.value
}

// 删除商品
const removeProduct = (id) => {
  products.value = products.value.filter(product => product.id !== id)
}

// 返回上一页
const goBack = () => {
  console.log('返回上一页')
}

// 去购物
const goShopping = () => {
  console.log('去购物')
}
</script>

<style scoped>
.cart-container {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px); /* 减去导航栏高度 */
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px; /* 减少上下内边距 */
  background-color: white;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  flex-shrink: 0; /* 防止header被压缩 */
}

.cart-header h2 {
  font-size: 16px; /* 减小字体大小 */
  margin: 0;
  white-space: nowrap; /* 防止文字换行 */
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px; /* 限制标题最大宽度 */
}

.product-list {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
}

.product-card {
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
}

.product-image {
  width: 80px;
  height: 80px;
  margin: 0 16px;
  border-radius: 8px;
  object-fit: cover;
}

.product-info {
  flex: 1;
}

.product-name {
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.product-price {
  font-size: 14px;
  color: #666;
  margin: 8px 0;
}

.product-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.cart-footer {
  padding: 16px;
  background-color: white;
  box-shadow: 0 -2px 12px 0 rgba(0, 0, 0, 0.1);
  flex-shrink: 0; /* 防止footer被压缩 */
}

.footer-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.price-info {
  flex: 1;
  margin: 0 16px;
}

.total-price {
  font-size: 16px;
  font-weight: 500;
  color: var(--primary-color);
}

.discount {
  font-size: 12px;
  color: #666;
}

.checkout-btn {
  width: 120px;
}

.el-empty {
  margin-top: 40px;
}
</style>