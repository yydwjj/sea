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
        placeholder=""
      />
    </div>

    <!-- 标签栏 -->
    <div class="tab-container">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        :class="['tab-item', { active: activeTab === index }]"
        @click="changeTab(index)"
      >
        {{ tab }}
      </div>
    </div>

    <div class="product-list">
      <div v-for="(product, index) in productList" :key="index" class="product-item">
        <!-- 商品图片 -->
        <div class="product-image">
          <img :src="product.image" :alt="product.name" />
        </div>

        <!-- 商品信息 -->
        <div class="product-info">
          <div class="product-name">{{ product.name }}</div>
          <div class="product-price">{{ product.price }}</div>
          <div class="product-description">{{ product.description }}</div>
          <button class="edit-button">编辑</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue'; // 引入 Iconify 图标组件

// 标签数据
const tabs = ['已上架', '未上架'];
const activeTab = ref(0); // 当前选中的标签

// 切换标签
const changeTab = (index) => {
  activeTab.value = index;
  // 根据标签切换商品列表
  productList.value = index === 0 ? listedProducts : unlistedProducts;
};

// 商品数据
const listedProducts = [
  {
    image: 'https://yydwjj.github.io/-----/fish.png', // 鲈鱼图片
    name: '新鲜鲈鱼',
    price: '35 / 斤',
    description: '健脾养胃，营养丰富，适合清蒸或红烧。',
  },
  {
    image: 'https://yydwjj.github.io/-----/xie.png', // 大闸蟹图片
    name: '优质大闸蟹',
    price: '88 / 斤',
    description: '秋季美味，膏肥黄满，适合清蒸或香辣炒。',
  },
  {
    image: 'https://yydwjj.github.io/-----/xia.png', // 河虾图片
    name: '新鲜河虾',
    price: '56 / 斤',
    description: '新鲜河虾', // 无具体评价文字
  },
];

const unlistedProducts = [
  {
    image: 'https://yydwjj.github.io/-----/xia.png', // 河虾图片
    name: '新鲜河虾(秋季)',
    price: '30/ 斤',
    description: '', // 无具体评价文字
  },
  {
    image: 'https://yydwjj.github.io/-----/xia.png', // 河虾图片
    name: '新鲜河虾（冬季）',
    price: '25 / 斤',
    description: '', // 无具体评价文字
  },
];

const productList = ref(listedProducts); // 当前显示的商品列表
</script>

<style scoped>
.product-view {
  padding: 16px;
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

/* 标签栏样式 */
.tab-container {
  display: flex;
  background-color: black;
  border-radius: 12px;
  padding: 8px;
  margin-top: 16px;
  width: 45%;
  height: 14px;
  align-items: center;
  margin-bottom: 20px;
}

.tab-item {
  flex: 1;
  text-align: center;
  /* padding: 8px; */
  color: white;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s;
  font-size: 14px;
  font-weight: 700;
}

.tab-item.active {
  background-color: rgb(50, 161, 218);
}

/* 商品列表样式 */
.product-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.product-item {
  display: flex;
  background-color: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0px 0px 8px 18px rgb(199, 230, 244);
}

.product-image {
  width: 100px; /* 固定宽度 */
  height: 100px; /* 固定高度 */
  margin-right: 16px;
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
  justify-content: space-between;
}

.product-name {
  font-size: 16px;
  font-weight: bold;
  color: black;
}

.product-price {
  font-size: 16px;
  color: red;
  margin-top: 4px;
}

.product-description {
  font-size: 14px;
  color: gray;
  margin-top: 8px;
  height: 14px;
}

.edit-button {
  background-color: rgb(50, 161, 218);
  color: white;
  border: none;
  border-radius: 8px;
  /* padding: 8px 16px; */
  font-size: 14px;
  cursor: pointer;
  align-self: flex-start;
  margin-top: 8px;
}

.edit-button:hover {
  background-color: rgb(35, 125, 171);
}
</style>