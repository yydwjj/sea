<template>
  <div class="cart-container">
    <button class="back-btn" @click="router.back()">
      <Icon icon="material-symbols:chevron-left-rounded" width="2em" />
    </button>
    <div class="cart-header">
      <h2>采购车（{{ totalQuantity }}件）</h2>
      <div class="total-price">总计：￥{{ totalPrice.toFixed(2) }}</div>
    </div>

    <div class="cart-items">
      <div class="cart-item" v-for="item in cartItems" :key="item.id">
        <img :src="item.image" class="product-image" />
        <div class="product-info">
          <h3>{{ item.name }}</h3>
          <div class="price">￥{{ item.price.split(' ')[0] }} / {{ item.price.split(' ')[2] }}</div>
          <div class="quantity-control">
            <button @click="updateQuantity(item.id, item.quantity - 1)" :disabled="item.quantity <= 1">-</button>
            <input type="number" v-model.number="item.quantity" min="1" @change="updateCart(item.id, item.quantity)" />
            <button @click="updateQuantity(item.id, item.quantity + 1)">+</button>
          </div>
        </div>
        <button class="remove-btn" @click="removeItem(item.id)">×</button>
      </div>
    </div>

    <button class="checkout-btn" @click="router.push('/checkout')">
      去结算（￥{{ totalPrice.toFixed(2) }}）
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';  // 添加这行
import { useRouter } from 'vue-router'
import {Icon} from "@iconify/vue";

import p1 from '../assets/p (1).jpg'
import p2 from '../assets/p (2).jpg'
import p3 from '../assets/p (3).jpg'
import p4 from '../assets/p (4).jpg'
import p5 from '../assets/p (5).jpg'
import p6 from '../assets/p (6).jpg'
import p7 from '../assets/p (7).jpg'
import p8 from '../assets/p (8).jpg'
import p9 from '../assets/p (9).jpg'
import p10 from '../assets/p (10).jpg'
import p11 from '../assets/p (11).jpg'
import p12 from '../assets/p (12).jpg'
import p13 from '../assets/p (13).jpg'
import p14 from '../assets/p (14).jpg'

const router = useRouter()


const cartItems = ref([]);
const totalPrice = ref(0);
const totalQuantity = ref(0);

const productList = ref([
{
    id: 1,
    image: p1,
    name: '草鱼',
    price: '22.81 / 斤',
    evaluation: '优秀'
},
{
    id: 2,
    image: p2,
    name: '鲢鱼',
    price: '17.1 / 斤',
    evaluation: '良好'
},
{
    id: 3,
    image: p3,
    name: '鳙鱼',
    price: '19.96 / 斤',
    evaluation: '优秀'
},
{
    id: 4,
    image: p4,
    name: '鲤鱼',
    price: '25.67 / 斤',
    evaluation: '优秀'
},
{
    id: 5,
    image: p5,
    name: '鲫鱼',
    price: '28.51 / 斤',
    evaluation: '优秀'
},
{
    id: 6,
    image: p6,
    name: '鲶鱼',
    price: '26.57 / 斤',
    evaluation: '良好'
},
{
    id: 7,
    image: p7,
    name: '青虾',
    price: '57.02 / 斤',
    evaluation: '优秀'
},
{
    id: 8,
    image: p8,
    name: '河虾',
    price: '71.28 / 斤',
    evaluation: '优秀'
},
{
    id: 9,
    image: p9,
    name: '淡水小龙虾',
    price: '52.27 / 斤',
    evaluation: '优秀'
},
{
    id: 10,
    image: p10,
    name: '河蟹',
    price: '114.05 / 斤',
    evaluation: '优秀'
},
{
    id: 11,
    image: p11,
    name: '大闸蟹',
    price: '142.56 / 斤',
    evaluation: '优秀'
},
{
    id: 12,
    image: p12,
    name: '蛤蜊',
    price: '22.81 / 斤',
    evaluation: '良好'
},
{
    id: 13,
    image: p13,
    name: '黄鳝',
    price: '66.53 / 斤',
    evaluation: '优秀'
},
{
    id: 14,
    image: p14,
    name: '泥鳅',
    price: '38.02 / 斤',
    evaluation: '良好'
}
]);

// 获取购物车数据
const getCartData = () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || {};
  cartItems.value = Object.entries(cart).map(([id, quantity]) => {
    const product = productList.value.find(p => p.id === Number(id));
    return {
      ...product,
      quantity
    };
  });
  
  // 计算总价和总数量
  totalPrice.value = cartItems.value.reduce((sum, item) => {
    const price = Number(item.price.split(' ')[0]);
    return sum + price * item.quantity;
  }, 0);
  
  totalQuantity.value = cartItems.value.reduce((sum, item) => sum + item.quantity, 0);
};

// 初始化时获取数据
onMounted(() => {
  getCartData();
});

// 添加以下方法
const updateQuantity = (id, newQuantity) => {
  if (newQuantity < 1) return;
  
  // 更新本地数据
  const item = cartItems.value.find(item => item.id === id);
  if (item) {
    item.quantity = newQuantity;
  }
  
  // 更新localStorage
  updateCart(id, newQuantity);
};

const updateCart = (id, quantity) => {
  const cart = JSON.parse(localStorage.getItem('cart')) || {};
  cart[id] = quantity;
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // 重新计算总价
  getCartData();
};

const removeItem = (id) => {
  const cart = JSON.parse(localStorage.getItem('cart')) || {};
  delete cart[id];
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // 重新获取数据
  getCartData();
};
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
  cursor: pointer;
  border-radius: 4px;
}

.quantity-control button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-control input {
  width: 50px;
  text-align: center;
  border: 1px solid #ddd;
  margin: 0 5px;
  padding: 5px;
  border-radius: 4px;
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
  cursor: pointer;
  padding: 5px;
}

.remove-btn:hover {
  color: #ff6b81;
}
</style>