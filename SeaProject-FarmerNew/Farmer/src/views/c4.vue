<template>
  <div class="product-view">
    <!-- 搜索框 -->
    <div class="search-box">
      <div class="search-icon">
        <Icon icon="mdi:magnify" />
      </div>
      <input
          type="text"
          class="search-input"
          placeholder="搜索商品"
          v-model="searchQuery"
          @input="filterProducts"
      />
    </div>

    <div class="product-list">
      <div
          v-for="(product, index) in filteredProductList"
          :key="index"
          :class="['product-item', { 'product-item-even': index % 2 === 1 }]"
          @click="goToProductDetail(index)"
      >
        <!-- 商品图片 -->
        <div class="product-image">
          <img :src="product.image" :alt="product.name" />
        </div>
        <div class="product-info">
          <div class="product-name">{{ product.name }}</div>
          <div class="product-evaluation">
            <div
                :class="['evaluation-circle', product.evaluation === '优秀'? 'evaluation-excellent' : 'evaluation-good']"
            >
              检
            </div>
            <div
                :class="['evaluation-strip', product.evaluation === '优秀'? 'evaluation-excellent' : 'evaluation-good']"
            >
              {{ product.evaluation }}
            </div>
          </div>
          <div class="product-price">{{ product.price }}</div>
        </div>
      </div>
    </div>

    <!-- 购物车按钮 -->
    <div class="add-product-button-container">
      <button class="add-product-button" @click="addToCart">
        <Icon icon="material-symbols:shopping-cart-outline" width="2em" height="2em" />
        <!--          <span>购物车</span>-->
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue'; // 引入 Iconify 图标组件
import {useRouter} from "vue-router";
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
import algae from "../assets/algae.png";

const addToCart = () => {
    const btn = document.querySelector('.add-product-button')
    router.push('/cart')
  }

const searchQuery = ref(''); // 搜索输入框的值
const productList = ref([
  {
    id: 1,
    image: p1,
    name: '大闸蟹',
    price: '45 / 斤',
    evaluation: '良好' // 手动指定为优秀
  },
  {
    id: 2,
    image: p2,
    name: '鲫鱼',
    price: '15 / 斤',
    evaluation: '优秀' // 手动指定为良好
  },
  {
    id: 3,
    image: p3,
    name: '鲶鱼',
    price: '18 / 斤',
    evaluation: '优秀' // 手动指定为优秀
  },
  {
    id: 4,
    image: p4,
    name: '黄鳝',
    price: '30 / 斤',
    evaluation: '良好' // 手动指定为良好
  },
  {
    id: 5,
    image: p5,
    name: '中华草龟',
    price: '50 / 只',
    evaluation: '优秀' // 手动指定为优秀
  },
  {
    id: 6,
    image: algae,
    name: '小球藻',
    price: '20 / 斤',
    evaluation: '优秀' // 手动指定为良好
  },
  {
    id: 7,
    image: p7,
    name: '福寿螺（食用级）',
    price: '8 / 斤',
    evaluation: '优秀' // 手动指定为优秀
  },
  {
    id: 8,
    image: p8,
    name: '淡水小龙虾',
    price: '25 / 斤',
    evaluation: '优秀' // 手动指定为良好
  },
  {
    id: 9,
    image: p9,
    name: '白鲢鱼',
    price: '8 / 斤',
    evaluation: '优秀' // 手动指定为优秀
  },
  {
    id: 10,
    image: p10,
    name: '鳙鱼（胖头鱼）',
    price: '13 / 斤',
    evaluation: '良好' // 手动指定为良好
  }
]);
const filteredProductList = ref(productList.value);

// 过滤商品列表
const filterProducts = () => {
  let query = searchQuery.value.toLowerCase();
  if (query === '') {
    query = '藻';
  }
  filteredProductList.value = productList.value.filter((product) => {
    const name = product.name.toLowerCase();
    return name.includes(query);
  });
};
filterProducts();
const router = useRouter(); // 初始化 router
// 跳转到商品详情页的方法
const goToProductDetail = (index) => {
    const productId = filteredProductList.value[index].id;
    router.push({ name: 'ProductDetail', params: { id: productId } });
  };
</script>

<style scoped>
.product-view {
  padding: 16px;
  position: relative;
  margin-bottom: 40px;
}

/* 搜索框样式 */
.search-box {
  display: flex;
  align-items: center;
  border-radius: 12px;
  padding: 8px;
}

.search-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: rgb(50, 161, 218);
  margin-right: 8px;
}

.search-input {
  flex: 1;
  border: none;
  background-color: rgb(219, 245, 255);
  border-radius: 20px;
  /* background-color: transparent; */
  outline: none;
  font-size: 14px;
}

/* 商品列表样式 */
.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  background-color: rgb(237, 250, 255);
  padding: 5px;
  border-radius: 12px;
  justify-content: space-around;
}

.product-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border-radius: 12px;
  padding: 16px;
  width: calc(40% - 10px);
  box-shadow: 0 0 8px #0000001a;
}

.product-item-even {
  justify-content: flex-end;
}

.product-image {
  width: 100px; /* 固定宽度 */
  height: 100px; /* 固定高度 */
}

.product-image img {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  object-fit: cover; /* 图片按比例填充 */
}

.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.product-name {
  font-size: 16px;
  font-weight: bold;
  color: black;
  margin-bottom: 8px;
}

.product-evaluation {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.evaluation-circle {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 12px;
}

.evaluation-strip {
  height: 24px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 8px;
  font-size: 12px;
}

.evaluation-excellent {
  background-color: rgb(0,208,68);
}

.evaluation-excellent.evaluation-strip {
  background-color: rgb(212, 250, 111);
  color: rgb(36, 172, 4);
  height: 16px;
}

.evaluation-good {
  background-color: rgb(244, 188, 13);
}

.evaluation-good.evaluation-strip {
  background-color: rgb(253, 246, 113);
  color: rgb(242, 195, 26);
  height: 16px;
}

.product-price {
  font-size: 16px;
  color: red;
}
/* 添加商品按钮样式 */
.add-product-button-container {
  position: fixed;
  bottom: 80px;
  right: 32px;
}

.add-product-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgb(0,158,255);
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: white;

}
</style>