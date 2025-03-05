<template>
  <div class="cart-container">
    <button class="back-btn" @click="router.back()">
      <Icon icon="material-symbols:chevron-left-rounded" width="2em" />
    </button>
    <div class="cart-header">
      <h2>采购车（2件）</h2>
      <div class="total-price">总计：￥158.00</div>
    </div>

    <div class="cart-items">
      <!-- 静态数据示例 -->
      <div class="cart-item">
        <img src="../assets/l (1).jpg" class="product-image" />
        <div class="product-info">
          <h3>大闸蟹</h3>
          <div class="price">￥45 / 斤 ×2</div>
        </div>
      </div>

      <div class="cart-item">
        <img src="../assets/p (8).jpg" class="product-image" />
        <div class="product-info">
          <h3>淡水小龙虾</h3>
          <div class="price">￥25 / 斤 ×3</div>
        </div>
      </div>
    </div>

    <button class="checkout-btn" @click="router.push('/checkout')">
      去结算（￥158.00）
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import {Icon} from "@iconify/vue";
const router = useRouter()
</script>

<style scoped>
.back-btn {
  position: absolute;
  left: 10px;
  top: 5px;
  display: flex;
  align-items: center;
  /* margin-bottom: 20px; */
  cursor: pointer;
  /* position: fixed; */
  /* left: 20px; */
  /* top: 20px; */
  /* background-color: #eee9e954; */
  /* padding: 10px; */
  border-radius: 12px;
  /* color: white; */
  height: 40px;
  width: 40px;
  border: none;
}
.cart-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.cart-items {
  margin-bottom: 30px;
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #eee;
  position: relative;
}

.product-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 15px;
}

.quantity-control {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.quantity-control button {
  width: 30px;
  height: 30px;
  border: 1px solid #ddd;
  background: #f5f5f5;
}

.quantity-control input {
  width: 50px;
  text-align: center;
  border: 1px solid #ddd;
  margin: 0 5px;
  padding: 5px;
}

.remove-btn {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 24px;
  color: #ff4757;
  background: none;
  border: none;
}

.checkout-btn {
  width: 100%;
  padding: 15px;
  background: #50b7eb;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
}
</style>