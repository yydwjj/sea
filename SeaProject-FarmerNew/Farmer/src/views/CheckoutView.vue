<template>
  <div class="checkout-container">
    <div class="checkout-header">
      <button class="back-btn" @click="router.back()">
        <Icon icon="material-symbols:chevron-left-rounded" width="2em" />
      </button>
      <h2>确认订单</h2>
    </div>

    <!-- 静态地址 -->
    <div class="address-section">
      <div class="address-info">
        <div class="contact">
          <span class="name">张先生</span>
          <span class="phone">138****1234</span>
        </div>
        <div class="detail">上海市浦东新区张江高科技园区XX路XX号</div>
      </div>
    </div>

    <!-- 动态订单 -->
    <div class="products-section">
      <div class="section-title">采购清单</div>
      <div class="product-item" v-for="item in cartItems" :key="item.id">
        <img :src="item.image" class="product-image" />
        <div class="product-info">
          <h3>{{ item.name }}</h3>
          <div class="spec">￥{{ item.price }} / 斤 ×{{ item.quantity }}</div>
        </div>
      </div>
    </div>

    <!-- 提交订单 -->
    <div class="submit-section">
      <button class="submit-btn" @click="router.push('/order-result')">
        提交订单（￥{{ totalPrice.toFixed(2) }}）
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';  // 添加这行
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'; // 引入 Iconify 图标组件

import p1 from '../assets/p (11).jpg'
import p2 from '../assets/p (2).jpg'
import p3 from '../assets/p (3).jpg'
import p4 from '../assets/p (4).jpg'
import p5 from '../assets/p (5).jpg'
import p6 from '../assets/p (6).jpg'
import p7 from '../assets/p (7).jpg'
import p8 from '../assets/p (8).jpg'
import p9 from '../assets/p (9).jpg'
import p10 from '../assets/p (10).jpg'
import algae from '../assets/algae.png'



const router = useRouter();
const cartItems = ref([]);
const totalPrice = ref(0);

const getCartData = () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || {};
  
  const productList = [
  {
    id: 1,
    image: p1,
    name: '大闸蟹',
    price: '45 ',
    evaluation: '良好' // 手动指定为优秀
  },
  {
    id: 2,
    image: p2,
    name: '鲫鱼',
    price: '15',
    evaluation: '优秀' // 手动指定为良好
  },
  {
    id: 3,
    image: p3,
    name: '鲶鱼',
    price: '18',
    evaluation: '优秀' // 手动指定为优秀
  },
  {
    id: 4,
    image: p4,
    name: '黄鳝',
    price: '30',
    evaluation: '良好' // 手动指定为良好
  },
  {
    id: 5,
    image: p5,
    name: '中华草龟',
    price: '50 ',
    evaluation: '优秀' // 手动指定为优秀
  },
  {
    id: 6,
    image: algae,
    name: '小球藻',
    price: '20 ',
    evaluation: '优秀' // 手动指定为良好
  },
  {
    id: 7,
    image: p7,
    name: '福寿螺(食用)',
    price: '8 ',
    evaluation: '优秀' // 手动指定为优秀
  },
  {
    id: 8,
    image: p8,
    name: '淡水小龙虾',
    price: '25 ',
    evaluation: '优秀' // 手动指定为良好
  },
  {
    id: 9,
    image: p9,
    name: '白鲢鱼',
    price: '8 ',
    evaluation: '优秀' // 手动指定为优秀
  },
  {
    id: 10,
    image: p10,
    name: '鳙鱼（胖头鱼）',
    price: '13 ',
    evaluation: '良好' // 手动指定为良好
  }
];

  cartItems.value = Object.entries(cart).map(([id, quantity]) => {
    const product = productList.find(p => p.id === Number(id));
    return {
      ...product,
      quantity
    };
  });
  
  // 计算总价
  totalPrice.value = cartItems.value.reduce((sum, item) => {
    const price = Number(item.price);
    return sum + price * item.quantity;
  }, 0);
};

// 初始化时获取数据
onMounted(() => {
  getCartData();
});
</script>

<style scoped>
/* 保持原有样式不变 */
.checkout-container {
  padding: 20px;
  min-height: 100vh;
  background: #f5f5f5;
}

.checkout-header {
  display: flex;
  align-items: center;
  padding: 15px 0;
  position: relative;
}

.checkout-header h2 {
  flex: 1;
  text-align: center;
  font-size: 18px;
}

.back-btn {
  position: absolute;
  left: 0;
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

.address-section {
  background: white;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.contact {
  display: flex;
  gap: 15px;
  margin-bottom: 8px;
}

.phone {
  color: #666;
}

.add-address {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #50b7eb;
  padding: 15px 0;
}

.section-title {
  font-weight: 600;
  margin-bottom: 15px;
  padding-left: 10px;
  border-left: 4px solid #50b7eb;
}

.products-section {
  background: white;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
}

.product-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.product-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  margin-right: 15px;
}

.product-info {
  flex: 1;
}

.quantity {
  color: #666;
}

.payment-section {
  background: white;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
}

.payment-method {
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}

.method-icon {
  width: 30px;
  height: 30px;
  margin-right: 15px;
}

.check-wrapper {
  margin-left: auto;
}

.radio-placeholder {
  width: 20px;
  height: 20px;
  border: 1px solid #ddd;
  border-radius: 50%;
}

.summary-section {
  background: white;
  padding: 15px;
  border-radius: 8px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  color: #666;
}

.summary-item.total {
  font-weight: 600;
  color: #333;
}

.price {
  color: #f36538;
  font-size: 18px;
}

.submit-section {
  position: fixed;
  bottom: 51px;
  left: 0;
  right: 0;
  background: white;
  padding: 15px;
  box-shadow: 0 -2px 10px rgba(0,0,0,0.05);
}

.submit-btn {
  width: 100%;
  padding: 15px;
  background: #50b7eb;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 16px;
}
</style>