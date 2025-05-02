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
          <button class="edit-btn" @click="toggleEdit">
            <Icon icon="mdi:pencil" width="1.2em" />
          </button>
        </div>
        <div class="detail" v-if="!isEditing">
          <!-- 上海市浦东新区张江高科技园区XX路XX号 -->
          {{ newAddress }}
        </div>
        <div class="edit-form" v-else>
          <textarea v-model="newAddress" placeholder="请输入新的收货地址" rows="3"></textarea>
          <div class="form-actions">
            <button class="cancel-btn" @click="cancelEdit">取消</button>
            <button class="save-btn" @click="saveAddress">保存</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 动态订单 -->
    <div class="products-section">
      <div class="section-title">采购清单</div>
      <div class="product-item" v-for="item in cartItems" :key="item.id">
        <img :src="item.image" class="product-image" />
        <div class="product-info">
          <h3>{{ item.name }}</h3>
          <div class="spec">
            <span>￥{{ item.price }} / 斤</span>
            <div class="quantity-control">
              <button @click="decrement(item)">-</button>
              <input type="number" v-model.number="item.quantity" @change="validateQuantity(item)"
                @blur="updateCartStorage" class="quantity-input" min="1">
              <button @click="increment(item)">+</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 提交订单 -->
    <div class="submit-section">
      <button class="submit-btn" @click="handleSubmit">
        提交订单（￥{{ totalPrice.toFixed(2) }}）
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';  // 添加这行
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'; // 引入 Iconify 图标组件
import { useUserStore } from '../../stores/userStore';

import p1 from '../../assets/p (1).jpg'
import p2 from '../../assets/p (2).jpg'
import p3 from '../../assets/p (3).jpg'
import p4 from '../../assets/p (4).jpg'
import p5 from '../../assets/p (5).jpg'
import p6 from '../../assets/p (6).jpg'
import p7 from '../../assets/p (7).jpg'
import p8 from '../../assets/p (8).jpg'
import p9 from '../../assets/p (9).jpg'
import p10 from '../../assets/p (10).jpg'
import p11 from '../../assets/p (11).jpg'
import p12 from '../../assets/p (12).jpg'
import p13 from '../../assets/p (13).jpg'
import p14 from '../../assets/p (14).jpg'

const router = useRouter();
const cartItems = ref([]);
// const totalPrice = ref(0);
const userStore = useUserStore();

const isEditing = ref(false);
const newAddress = ref('上海市浦东新区张江高科技园区XX路XX号');

const toggleEdit = () => {
  isEditing.value = !isEditing.value;
};

const saveAddress = () => {
  // 简单保存到newAddress中
  if (newAddress.value.trim() === '') {
    alert('地址不能为空');
    return;
  }
  // 如果需要，可以在这里添加保存到数据库或本地存储的逻辑
  console.log('新地址已保存:', newAddress.value);
  isEditing.value = false;
};

const cancelEdit = () => {
  isEditing.value = false;
  newAddress.value = '上海市浦东新区张江高科技园区XX路XX号';
};
// 修改后的脚本部分
const increment = (item) => {
  item.quantity++;
  updateCartStorage();
};

// 脚本部分修改
const decrement = (item) => {
  if (item.quantity > 1) {
    item.quantity--
    updateCartStorage()
  } else {
    if (confirm('是否要移除此商品？')) {
      removeFromCart(item)
    }
  }
}

const removeFromCart = (item) => {
  // 从购物车列表移除
  cartItems.value = cartItems.value.filter(i => i.id !== item.id)

  // 更新本地存储
  const cart = JSON.parse(localStorage.getItem('cart')) || {}
  delete cart[item.id]
  localStorage.setItem('cart', JSON.stringify(cart))
}

const validateQuantity = (item) => {
  // 处理非法输入
  if (isNaN(item.quantity) || item.quantity < 1) {
    item.quantity = 1
  }

  // 自动删除零值商品
  if (item.quantity <= 0) {
    removeFromCart(item)
    return
  }

  updateCartStorage()
}

const updateCartStorage = () => {
  const cart = {}
  cartItems.value.forEach(item => {
    if (item.quantity >= 1) {
      cart[item.id] = item.quantity
    }
  })
  localStorage.setItem('cart', JSON.stringify(cart))
}
// 将总价改为计算属性
const totalPrice = computed(() => {
  return cartItems.value.reduce((sum, item) => {
    const price = Number(item.price);
    return sum + price * item.quantity;
  }, 0);
});
const getCartData = () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || {};

  const productList = [
    {
      id: 1,
      image: p1,
      name: '草鱼',
      price: '22.81',
      evaluation: '优秀'
    },
    {
      id: 2,
      image: p2,
      name: '鲢鱼',
      price: '17.1',
      evaluation: '良好'
    },
    {
      id: 3,
      image: p3,
      name: '鳙鱼',
      price: '19.96',
      evaluation: '优秀'
    },
    {
      id: 4,
      image: p4,
      name: '鲤鱼',
      price: '25.67',
      evaluation: '优秀'
    },
    {
      id: 5,
      image: p5,
      name: '鲫鱼',
      price: '28.51',
      evaluation: '优秀'
    },
    {
      id: 6,
      image: p6,
      name: '鲶鱼',
      price: '26.57',
      evaluation: '良好'
    },
    {
      id: 7,
      image: p7,
      name: '青虾',
      price: '57.02',
      evaluation: '优秀'
    },
    {
      id: 8,
      image: p8,
      name: '河虾',
      price: '71.28',
      evaluation: '优秀'
    },
    {
      id: 9,
      image: p9,
      name: '淡水小龙虾',
      price: '52.27',
      evaluation: '优秀'
    },
    {
      id: 10,
      image: p10,
      name: '河蟹',
      price: '114.05',
      evaluation: '优秀'
    },
    {
      id: 11,
      image: p11,
      name: '大闸蟹',
      price: '142.56',
      evaluation: '优秀'
    },
    {
      id: 12,
      image: p12,
      name: '蛤蜊',
      price: '22.81',
      evaluation: '良好'
    },
    {
      id: 13,
      image: p13,
      name: '黄鳝',
      price: '66.53',
      evaluation: '优秀'
    },
    {
      id: 14,
      image: p14,
      name: '泥鳅',
      price: '38.02',
      evaluation: '良好'
    }
  ];

  cartItems.value = Object.entries(cart).map(([id, quantity]) => {
    const product = productList.find(p => p.id === Number(id));
    return {
      ...product,
      quantity
    };
  });


};

const handleSubmit = () => {
  if (userStore.isWholesalers || userStore.isWholesalers2) {
    // 获取不达标商品列表
    const invalidItems = cartItems.value
      .filter(item => item.quantity < 100)
      .map(item => `${item.name}（当前：${item.quantity}件）`)
  
    const totalQuantity = cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
  
    // 组合提示信息
    const messages = []
    if (invalidItems.length > 0) {
      messages.push(`以下商品未达最低采购量：\n${invalidItems.join('\n')}`)
    }
    if (totalQuantity < 500) {
      messages.push(`当前总采购量：${totalQuantity}件 (要求≥500件)`)
    }
  
    if (messages.length > 0) {
      alert(`批发订单要求：\n\n${messages.join('\n\n')}`)
      return
    }
  }

  router.push('/order-result')
}
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
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
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
}

.submit-btn {
  width: 100%;
  padding: 15px;
  background: #50b7eb;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  transition: opacity 0.3s;
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.address-section {
  margin-bottom: 20px;
  padding: 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.contact {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.name {
  font-weight: bold;
}

.phone {
  color: #7f8c8d;
}

.edit-btn {
  margin-left: auto;
  background: none;
  border: none;
  cursor: pointer;
  color: #50b7eb;
  padding: 4px;
}

.edit-btn:hover {
  color: #3fa3d6;
}

.detail {
  color: #7f8c8d;
}

.edit-form {
  margin-top: 8px;
}

textarea {
  width: 93%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
  min-height: 80px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 8px;
}

.cancel-btn,
.save-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}

.cancel-btn {
  background: #f5f5f5;
  color: #666;
}

.cancel-btn:hover {
  background: #e0e0e0;
}

.save-btn {
  background: #50b7eb;
  color: white;
}

.save-btn:hover {
  background: #3fa3d6;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 8px;
}

.quantity-control button {
  padding: 4px 12px;
  border: 1px solid #ddd;
  border-radius: 20px;
  background-color: #f5f5f5;
  cursor: pointer;
  transition: all 0.2s;
}

.quantity-control button:hover {
  background-color: #50b7eb;
  color: white;
  border-color: #50b7eb;
}

.quantity {
  min-width: 20px;
  text-align: center;
}

.spec {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
}

/* 新增输入框样式 */
.quantity-input {
  width: 50px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 4px;
  -moz-appearance: textfield;
}

/* 隐藏数字输入框的上下箭头 */
.quantity-input::-webkit-outer-spin-button,
.quantity-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}




.quantity-control {
  display: flex;
  align-items: center;
  gap: 8px;
}

.quantity-control button {
  padding: 4px 12px;
  border: 1px solid #ddd;
  border-radius: 20px;
  background-color: #f5f5f5;
  cursor: pointer;
  transition: all 0.2s;
}
</style>