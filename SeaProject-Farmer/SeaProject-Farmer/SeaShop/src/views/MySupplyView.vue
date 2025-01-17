<template>
  <div class="supply-container">
    <!-- 返回按钮 -->
    <el-button
      type="text"
      class="back-button"
      @click="handleBack"
    >
      <el-icon><ArrowLeft /></el-icon>
      返回
    </el-button>
    
    <!-- 信息展板 -->
    <div class="info-panel">
      <div class="info-card">
        <div class="info-content">
          <div class="info-value">123 人</div>
          <div class="info-label">今日进店</div>
        </div>
      </div>
      <div class="info-card">
        <div class="info-content">
          <div class="info-value">98 人</div>
          <div class="info-label">昨日进店</div>
        </div>
      </div>
      <div class="info-card">
        <div class="info-content">
          <div class="info-value">4567</div>
          <div class="info-label">平均曝光</div>
        </div>
      </div>
    </div>

    <!-- 卡片切换页 -->
    <div class="tab-container">
      <el-tabs v-model="activeTab" class="product-tabs">
        <el-tab-pane label="上市中" name="onSale">
          <product-list :products="onSaleProducts" />
        </el-tab-pane>
        <el-tab-pane label="已下架" name="offSale">
          <product-list :products="offSaleProducts" />
        </el-tab-pane>
        <el-tab-pane label="待修改" name="pending">
          <product-list :products="pendingProducts" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft } from '@element-plus/icons-vue'
import ProductList from './ProductList.vue'

const router = useRouter()
const activeTab = ref('onSale')

const handleBack = () => {
  router.go(-1) // 返回上一页
}

// 模拟数据
const onSaleProducts = ref([
  {
    id: 1,
    image: 'https://rjt666.github.io/sea/dazhaxie.jpg',
    name: '优质大闸蟹',
    price: '88元/斤',
    status: '正常',
    exposure: 1234,
    views: 567,
    monitoring: true
  },
  {
    id: 2,
    image: 'https://rjt666.github.io/sea/huoxia.jpg',
    name: '新鲜海虾',
    price: '68元/斤',
    status: '正常',
    exposure: 987,
    views: 321,
    monitoring: true
  },
  {
    id: 3,
    image: 'https://rjt666.github.io/sea/shenhaiyu.jpg',
    name: '深海鱼',
    price: '128元/斤',
    status: '正常',
    exposure: 456,
    views: 234,
    monitoring: false
  },
  {
    id: 4,
    image: 'https://rjt666.github.io/sea/baoyu.png',
    name: '鲍鱼',
    price: '288元/斤',
    status: '正常',
    exposure: 789,
    views: 345,
    monitoring: true
  }
])

const offSaleProducts = ref([
  {
    id: 5,
    image: 'https://rjt666.github.io/sea/longxia.jpg',
    name: '龙虾',
    price: '388元/斤',
    status: '已下架',
    exposure: 123,
    views: 45,
    monitoring: false
  },
  {
    id: 6,
    image: 'https://rjt666.github.io/sea/haishen.jpg',
    name: '海参',
    price: '188元/斤',
    status: '已下架',
    exposure: 234,
    views: 56,
    monitoring: false
  }
])

const pendingProducts = ref([
  {
    id: 7,
    image: 'https://rjt666.github.io/sea/shanbei.jpg',
    name: '扇贝',
    price: '78元/斤',
    status: '待修改',
    exposure: 345,
    views: 67,
    monitoring: false
  },
  {
    id: 8,
    image: 'https://rjt666.github.io/sea/haidan.jpg',
    name: '海胆',
    price: '158元/斤',
    status: '待修改',
    exposure: 456,
    views: 78,
    monitoring: false
  }
])

</script>

<style scoped>
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

.supply-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 20px;
  position: relative;
  padding-top: 60px; /* 为返回按钮留出空间 */
}

/* 信息展板 */
.info-panel {
  display: flex;
  gap: 15px;
  padding: 10px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.info-card {
  flex: 1;
  padding: 12px;
  border-radius: 6px;
  background-color: #f5f7fa;
}

.info-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.info-value {
  font-size: 16px;
  font-weight: bold;
  color: #409EFF;
}

.info-label {
  font-size: 12px;
  color: #909399;
}

/* 卡片切换页 */
.tab-container {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
}

/* 响应式布局 */
@media (max-width: 768px) {
  .info-panel {
    flex-direction: row;
    gap: 8px;
  }
  
  .info-card {
    padding: 8px;
  }
}
</style>