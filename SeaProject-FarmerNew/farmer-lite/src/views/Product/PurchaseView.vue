<template>
  <div class="product-view">
    <!-- 搜索框 -->
    <div class="search-box">
      <div class="search-icon">
        <Icon icon="mdi:magnify" />
      </div>
      <input type="text" class="search-input" placeholder="搜索商品" v-model="searchQuery" @input="filterProducts" />
    </div>

    <div class="product-list">
      <div v-for="(product, index) in filteredProductList" :key="index"
        :class="['product-item', { 'product-item-even': index % 2 === 1 }]" @click="goToProductDetail(index)">
        <!-- 商品图片 -->
        <div class="product-image">
          <img :src="product.image" :alt="product.name" />
        </div>
        <div class="product-info">
          <div class="product-name">{{ product.name }}</div>
          <div class="product-evaluation">
            <div
              :class="['evaluation-circle', product.evaluation === '优秀' ? 'evaluation-excellent' : 'evaluation-good']">
              检
            </div>
            <div :class="['evaluation-strip', product.evaluation === '优秀' ? 'evaluation-excellent' : 'evaluation-good']">
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
      </button>
    </div>

    <!-- AI采购助手按钮 -->
    <div class="ai-assistant-btn" @click="toggleAssistant">
      <Icon icon="mdi:robot" width="1.5em" height="1.5em" />
    </div>

    <!-- AI采购助手面板 -->
    <transition name="fade">
      <div v-if="showAssistant" class="ai-assistant-panel">
        <div class="panel-header">
          <h3>
            <span v-if="userStore.isWholesalers2">AI 智能导购</span>
            <span v-else-if="userStore.isCustomer">AI 省钱助手</span>
            <span v-else-if="userStore.isWholesalers">AI 采购助手</span>
          </h3>
          <button class="close-btn" @click="showAssistant = false">
            <Icon icon="mdi:close" />
          </button>
        </div>
        <div class="panel-content">
          <div v-if="isLoading" class="loading-state">
            <div class="loading-animation">
              <div class="dot"></div>
              <div class="dot"></div>
              <div class="dot"></div>
            </div>
            <span>{{ userStore.isWholesalers ? '正在分析采购数据...' : '正在分析优惠信息...' }}</span>
          </div>
          <div v-else class="recommendations">
            <div 
              v-for="(item, index) in recommendations" 
              :key="index" 
              class="recommendation-item"
              :class="{ 
                'best-deal': item.isBestDeal,
                'special-offer': item.isSpecialOffer 
              }"
            >
              <div class="item-header">
                <Icon :icon="getFishIcon(item.type)" class="fish-icon" />
                <h4>{{ item.type }}</h4>
                <div v-if="!userStore.isWholesalers" class="price-tags">
                  <span class="current-price">{{ item.currentPrice }}</span>
                  <span v-if="item.originalPrice" class="original-price">{{ item.originalPrice }}</span>
                </div>
              </div>
              <div class="item-content">
                <template v-if="userStore.isWholesalers">
                  <p><span class="highlight">推荐采购量:</span> {{ item.amount }}</p>
                  <p><span class="highlight">近期趋势:</span> {{ item.trend }}</p>
                  <p><span class="highlight">推荐理由:</span> {{ item.reason }}</p>
                </template>
                <template v-else>
                  <p><span class="highlight">价格趋势:</span> {{ item.trend }} <span class="discount">{{ item.discount }}</span></p>
                  <p><span class="highlight">推荐理由:</span> {{ item.reason }}</p>
                  <p v-if="item.isBestDeal" class="best-deal-tag">本周最划算</p>
                  <p v-if="item.isSpecialOffer" class="special-offer-tag">限时特惠</p>
                </template>
              </div>
              <div class="trend-chart">
                <div 
                  class="chart-bar" 
                  v-for="(value, i) in item.trendData" 
                  :key="i" 
                  :style="{ height: `${value}%` }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { Icon } from '@iconify/vue'; // 引入 Iconify 图标组件
import { useRouter } from "vue-router";
import { useProducts } from '../../composables/useProducts.js';
import { useUserStore } from '../../stores/userStore.js';

const { productList } = useProducts();

const searchQuery = ref(''); // 搜索输入框的值
const filteredProductList = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return productList.filter(product =>
    product.name.toLowerCase().includes(query)
  );
});

// 过滤商品列表
const filterProducts = () => {
  const query = searchQuery.value.toLowerCase();
  filteredProductList.value = productList.value.filter((product) => {
    const name = product.name.toLowerCase();
    return name.includes(query);
  });
};
const router = useRouter(); // 初始化 router
// 跳转到商品详情页的方法
const goToProductDetail = (index) => {
  const productId = filteredProductList.value[index].id;
  router.push({ name: 'ProductDetail', params: { id: productId } });
};

const addToCart = () => {
  const btn = document.querySelector('.add-product-button')
  router.push('/cart')
}

// AI助手相关状态
const showAssistant = ref(false);
const isLoading = ref(false);
const recommendations = ref([]);
const userStore = useUserStore();

// 获取鱼类图标
const getFishIcon = (type) => {
  const icons = {
    '鲈鱼': 'mdi:fish',
    '鲤鱼': 'mdi:fish',
    '草鱼': 'mdi:fish',
    '鲫鱼': 'mdi:fish',
    '默认': 'mdi:fish'
  };
  return icons[type] || icons['默认'];
};

// 切换助手面板
const toggleAssistant = () => {
  showAssistant.value = !showAssistant.value;
  if (showAssistant.value && recommendations.value.length === 0) {
    fetchRecommendations();
  }
};

// 模拟获取推荐数据
const fetchRecommendations = () => {
  isLoading.value = true;
  setTimeout(() => {
    if (userStore.isWholesalers) {
      // 批发商推荐数据
      recommendations.value = [
        {
          type: '鲈鱼',
          amount: '50-70公斤',
          trend: '需求上升',
          reason: '近期市场价格稳定，养殖户供应充足',
          trendData: [30, 45, 60, 75, 65]
        },
        {
          type: '鲤鱼',
          amount: '30-50公斤',
          trend: '需求平稳',
          reason: '适合当前季节销售，库存周转快',
          trendData: [50, 55, 45, 60, 50]
        },
        {
          type: '草鱼',
          amount: '40-60公斤',
          trend: '需求增长',
          reason: '节日临近，传统菜品需求增加',
          trendData: [40, 50, 65, 70, 75]
        }
      ];
    } else {
      // 消费者推荐数据
      recommendations.value = [
        {
          type: '草鱼',
          currentPrice: '22.81 / 斤',
          originalPrice: '24.50 / 斤',
          trend: '价格下降',
          discount: '比上周降低7%',
          reason: '近期供应充足，价格处于低位',
          trendData: [80, 75, 70, 65, 60],
          isBestDeal: true
        },
        {
          type: '鲫鱼',
          currentPrice: '28.51 / 斤',
          originalPrice: '30.00 / 斤',
          trend: '价格平稳',
          discount: '与市场均价持平',
          reason: '品质稳定，性价比高',
          trendData: [50, 55, 50, 52, 50]
        },
        {
          type: '青虾',
          currentPrice: '57.02 / 斤',
          originalPrice: '71.28 / 斤',
          trend: '特惠促销',
          discount: '限时8折优惠',
          reason: '新货上市促销活动',
          trendData: [100, 90, 85, 80, 80],
          isSpecialOffer: true
        }
      ];
    }
    isLoading.value = false;
  }, 1000);
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
  width: 100px;
  /* 固定宽度 */
  height: 100px;
  /* 固定高度 */
}

.product-image img {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  object-fit: cover;
  /* 图片按比例填充 */
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
  background-color: rgb(0, 208, 68);
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
  background-color: rgb(0, 158, 255);
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: white;

}

/* AI助手按钮样式 */
.ai-assistant-btn {
  position: fixed;
  bottom: 140px;
  right: 32px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #00aaff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 170, 255, 0.3);
  transition: all 0.3s ease;
  z-index: 10;
}

.ai-assistant-btn:hover {
  transform: scale(1.1);
  background-color: #0095e0;
}

/* AI助手面板样式 */
.ai-assistant-panel {
  position: fixed;
  bottom: 200px;
  right: 32px;
  width: 320px;
  max-height: 500px;
  background-color: #ecf9fee6;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  overflow: hidden;
  z-index: 20;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: rgba(0, 170, 255, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.panel-header h3 {
  margin: 0;
  font-size: 18px;
  color: #333;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 4px;
}

.panel-content {
  padding: 16px;
  overflow-y: auto;
  max-height: 400px;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  color: #666;
}

.loading-animation {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.loading-animation .dot {
  width: 8px;
  height: 8px;
  background: #00aaff;
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out;
}

.loading-animation .dot:nth-child(2) {
  animation-delay: 0.2s;
}

.loading-animation .dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}

.recommendation-item {
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.recommendation-item:last-child {
  border-bottom: none;
}

.item-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.item-header h4 {
  margin: 0;
  font-size: 16px;
  color: #333;
}

.fish-icon {
  color: #00aaff;
}

.item-content {
  font-size: 13px;
  line-height: 1.6;
  color: #555;
}

.highlight {
  color: #4CAF50;
  font-weight: 600;
  font-size: 14px;
}

.trend-chart {
  display: flex;
  align-items: flex-end;
  height: 60px;
  gap: 6px;
  margin-top: 12px;
  padding: 8px 0;
}

.chart-bar {
  flex: 1;
  background: linear-gradient(to top, #00aaff, #66ccff);
  border-radius: 3px 3px 0 0;
  min-width: 8px;
  transition: height 0.5s ease;
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* 新增消费者专属样式 */
.price-tags {
  margin-left: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.current-price {
  color: #ff4081;
  font-weight: bold;
  font-size: 14px;
}

.original-price {
  color: #999;
  font-size: 12px;
  text-decoration: line-through;
}

.discount {
  color: #ff4081;
  font-weight: bold;
}

.best-deal {
  /* border-left: 4px solid #4CAF50; */
}

.special-offer {
  /* border-left: 4px solid #ff9800; */
}

.best-deal-tag {
  background-color: #4CAF50;
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  display: inline-block;
  margin-top: 4px;
}

.special-offer-tag {
  background-color: #ff9800;
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  display: inline-block;
  margin-top: 4px;
}


/* 批发商和消费者不同的面板颜色 */
.ai-assistant-panel {
  background-color: var(--panel-bg);
}

.ai-assistant-panel {
  --panel-bg: #ecf9fee6;
}

.ai-assistant-panel.consumer {
  --panel-bg: #fff0f5e6;
}

/* 根据用户类型切换面板样式 */
.ai-assistant-panel {
  background-color: var(--panel-bg);
}

.ai-assistant-panel {
  --panel-bg: #ecf9fee6;
}

.ai-assistant-panel.consumer {
  --panel-bg: #fff0f5e6;
}
</style>