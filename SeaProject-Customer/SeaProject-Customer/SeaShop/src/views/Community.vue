<template>
  <div class="community-container">
    <el-tabs v-model="activeTab" class="community-tabs">
      <!-- 关注标签页 -->
      <el-tab-pane label="关注" name="follow">
        <div class="tab-content">
          <!-- <search-bar @search="handleFollowSearch" /> -->
          <!-- 关注内容区域 -->
          <div class="content-area">
            <el-empty
              v-if="!hasFollowData"
              description="暂无关注"
              class="empty-container"
            >
              <template #image>
                <el-icon :size="60" color="var(--primary-color)">
                  <User />
                </el-icon>
              </template>
            </el-empty>
          </div>
        </div>
      </el-tab-pane>

      <!-- 消息标签页 -->
      <el-tab-pane label="消息" name="message">
        <div class="tab-content">
          <!-- <search-bar @search="handleMessageSearch" /> -->
          <!-- 消息内容区域 -->
          <div class="content-area">
            <el-empty
              v-if="!hasMessageData"
              description="暂无消息"
              class="empty-container"
            >
              <template #image>
                <el-icon :size="60">
                  <ChatLineRound />
                </el-icon>
              </template>
            </el-empty>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
  import { ref,onMounted } from 'vue'
  import SearchBar from '@/components/SearchBar.vue'
  import { User, ChatLineRound,Star,StarFilled } from '@element-plus/icons-vue'
  import * as echarts from 'echarts'

  const activeTab = ref('follow')
  const hasFollowData = ref(false) // 假设当前没有关注数据
  const hasMessageData = ref(false) // 假设当前没有消息数据

  // 处理不同标签页的搜索
  const handleFollowSearch = (searchParams) => {
    console.log('关注搜索:', searchParams)
    // 这里处理关注页面的搜索逻辑
  }

  const handleMessageSearch = (searchParams) => {
    console.log('消息搜索:', searchParams)
    // 这里处理消息页面的搜索逻辑
  }
</script>

<style scoped>
  .community-container {
    padding: 16px;
  }

  .community-tabs {
    margin-top: 16px;
  }

  .tab-content {
    padding: 16px;
  }

  .content-area {
    margin-top: 16px;
  }

  .empty-container {
    margin-top: 40px;
    padding: 40px 0;
    background-color: #f8f8f8;
    border-radius: 8px;
  }

  :deep(.el-empty__description) {
    margin-top: 16px;
    font-size: 16px;
    color: #666;
  }
</style>
<style scoped>
  .data-module,
  .pk-module {
    margin-top: 24px;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

  .product-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }

  .product-name {
    margin: 0;
    font-size: 18px;
    color: #333;
  }

  .charts-container {
  display: flex;
  gap: 20px;
  margin-top: 16px;
}

.chart-wrapper {
  flex: 1;
  background-color: #f8f8f8;
  border-radius: 8px;
  padding: 12px;
}

.chart-wrapper h4 {
  margin: 0 0 8px 0;
  font-size: 14px;
  color: #666;
}

.chart {
  height: 120px;
}

  .pk-module {
    margin-top: 32px;
  }

  .pk-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 40px;
    margin-top: 20px;
  }

  .supplier-select {
    flex: 1;
    max-width: 300px;
  }

  .vs {
    font-size: 20px;
    color: #666;
    padding: 0 20px;
  }
</style>

<style scoped>
.community-container {
  padding: 16px;
}

.community-tabs {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 16px;
}

:deep(.el-tabs__item) {
  color: #666;
  font-weight: 500;
}

:deep(.el-tabs__item.is-active) {
  color: var(--primary-color);
}

:deep(.el-tabs__active-bar) {
  background-color: var(--primary-color);
}

.tab-content {
  padding: 16px;
}

.content-area {
  margin-top: 16px;
}

.empty-container {
  margin-top: 40px;
  padding: 40px 0;
  background-color: var(--primary-light);
  border-radius: 8px;
}

:deep(.el-empty__description) {
  margin-top: 16px;
  font-size: 16px;
  color: var(--primary-color);
}

/* 图表样式 */
.charts-container {
  display: flex;
  gap: 20px;
  margin-top: 16px;
}

.chart-wrapper {
  flex: 1;
  background-color: var(--primary-light);
  border-radius: 8px;
  padding: 12px;
}

.chart-wrapper h4 {
  margin: 0 0 8px 0;
  font-size: 14px;
  color: var(--primary-color);
}

.chart {
  height: 120px;
}
</style>