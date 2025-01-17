<template>
    <div class="merchant-container">
      <!-- 顶部栏 -->
      <div class="header">
        <el-input
          v-model="searchText"
          placeholder="搜索商家"
          class="search-input"
          clearable
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
        <div class="header-actions">
          <el-button type="text" @click="showFilter = true">
            <el-icon><Filter /></el-icon>
            筛选
          </el-button>
          <el-button type="text" @click="toggleMapView">
            <el-icon><MapLocation /></el-icon>
            地图
          </el-button>
        </div>
      </div>
  
      <!-- 筛选栏 -->
      <div class="filter-bar">
        <el-scrollbar>
          <div class="filter-tags">
            <el-tag
              v-for="(tag, index) in tags"
              :key="index"
              :type="activeTag === tag ? 'primary' : 'info'"
              @click="handleTagClick(tag)"
            >
              {{ tag }}
            </el-tag>
          </div>
        </el-scrollbar>
        <el-dropdown trigger="click" @command="handleSort">
          <el-button type="text">
            {{ sortOptions.find(opt => opt.value === sortBy)?.label }}
            <el-icon><ArrowDown /></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="option in sortOptions"
                :key="option.value"
                :command="option.value"
              >
                {{ option.label }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
  
      <!-- 商家列表 -->
      <div class="merchant-list">
        <el-card
          v-for="merchant in filteredMerchants"
          :key="merchant.id"
          class="merchant-card"
          @click="goToMerchantDetail()"
        >
          <div class="merchant-content">
            <img :src="merchant.image" class="merchant-image" />
            <div class="merchant-info">
              <h3>{{ merchant.name }}</h3>
              <div class="rating">
                <el-rate
                  v-model="merchant.rating"
                  disabled
                  show-score
                  text-color="#ff9900"
                />
                <span>({{ merchant.reviews }})</span>
              </div>
              <div class="distance">{{ merchant.distance }} km</div>
              <div class="tags">
                <el-tag
                  v-for="(tag, index) in merchant.tags"
                  :key="index"
                  type="info"
                  size="small"
                >
                  {{ tag }}
                </el-tag>
              </div>
            </div>
          </div>
        </el-card>
      </div>
  
      <!-- 筛选弹窗 -->
      <el-drawer v-model="showFilter" title="筛选条件" size="80%">
        <!-- 筛选内容 -->
      </el-drawer>
    </div>
  </template>
  
<script setup>
  import { ref, computed } from 'vue'
  import {
    Search,
    Filter,
    MapLocation,
    ArrowDown
  } from '@element-plus/icons-vue'
    import { useRouter } from 'vue-router'

// 获取router实例
const router = useRouter()
  
  // 数据
  const searchText = ref('')
  const activeTag = ref('全部')
  const sortBy = ref('distance')
  const showFilter = ref(false)
  const isMapView = ref(false)
  
  const tags = ref(['全部', '养殖场直供', '批发商', '合作社', '个体户'])
  const sortOptions = ref([
    { label: '距离最近', value: 'distance' },
    { label: '评分最高', value: 'rating' },
    { label: '销量最多', value: 'sales' }
  ])

  const goToMerchantDetail = () => {
    router.push({ name: 'MerchantDetail' })
}
  
  const merchants = ref([
    // 示例数据
    {
        id: 1,
        name: "海洋之星养殖场",
        image: 'https://rjt666.github.io/sea/seastar.jpg',
        rating: 4.7,
        reviews: 256,
        distance: 5.8,
        tags: ["养殖场直供", "鲜活水产", "有机认证"]
    },
    {
        id: 2,
        name: "渔乡水产合作社",
        image: 'https://rjt666.github.io/sea/merchant2.jpg',
        rating: 4.4,
        reviews: 189,
        distance: 3.2,
        tags: ["合作社", "批量采购", "绿色认证"]
    },
    {
        id: 3,
        name: "小渔夫个体户",
        image: 'https://rjt666.github.io/sea/merchant3.jpg',
        rating: 4.2,
        reviews: 102,
        distance: 2.5,
        tags: ["个体户", "现货供应", "家庭采购"]
    }
    // 更多商家数据...
  ])
  
  // 计算属性
  const filteredMerchants = computed(() => {
    return merchants.value.filter(merchant => {
      const matchesSearch = merchant.name.includes(searchText.value)
      const matchesTag = activeTag.value === '全部' || 
        merchant.tags.includes(activeTag.value)
      return matchesSearch && matchesTag
    }).sort((a, b) => {
      if (sortBy.value === 'distance') return a.distance - b.distance
      if (sortBy.value === 'rating') return b.rating - a.rating
      return b.sales - a.sales
    })
  })
  
  // 方法
  const handleTagClick = (tag) => {
    activeTag.value = tag
  }
  
  const handleSort = (command) => {
    sortBy.value = command
  }
  
  const toggleMapView = () => {
    isMapView.value = !isMapView.value
    // 这里可以添加地图视图的切换逻辑
  }
</script>

<style scoped>
  .merchant-container {
    padding: 16px;
  }
  
  .header {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
  }
  
  .search-input {
    flex: 1;
  }
  
  .header-actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .filter-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }
  
  .filter-tags {
    display: flex;
    gap: 8px;
    overflow-x: auto;
  }
  
  .merchant-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .merchant-card {
    cursor: pointer;
  }
  
  .merchant-content {
    display: flex;
    gap: 12px;
  }
  
  .merchant-image {
    width: 80px;
    height: 80px;
    border-radius: 8px;
    object-fit: cover;
  }
  
  .merchant-info {
    flex: 1;
  }
  
  .rating {
    display: flex;
    align-items: center;
    gap: 4px;
    margin: 4px 0;
  }
  
  .distance {
    color: #666;
    font-size: 14px;
    margin: 4px 0;
  }
  
  .tags {
    display: flex;
    gap: 4px;
    margin-top: 4px;
  }
</style>