<template>
    <div class="my-page-container">
         <!-- 返回按钮 -->
    <el-button
        type="text"
        class="back-button"
        @click="handleBack"
        >
        <el-icon><ArrowLeft /></el-icon>
        返回
    </el-button>
      <!-- 第一行 -->
      <div class="top-row">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-value">123</div>
            <div class="stat-label">我的客户</div>
          </div>
        </el-card>
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-value">￥12,345</div>
            <div class="stat-label">我的收益</div>
          </div>
        </el-card>
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-value">98%</div>
            <div class="stat-label">金属出服务</div>
          </div>
        </el-card>
      </div>
  
      <!-- 第二行 -->
      <div class="middle-row">
        <el-card class="order-card">
          <div class="order-content">
            <div class="order-value">56</div>
            <div class="order-label">我的订单</div>
          </div>
        </el-card>
        <el-card class="order-card">
          <div class="order-content">
            <div class="order-value">12</div>
            <div class="order-label">代发货</div>
          </div>
        </el-card>
        <el-card class="order-card">
          <div class="order-content">
            <div class="order-value">44</div>
            <div class="order-label">已发货</div>
          </div>
        </el-card>
      </div>
  
      <!-- 第三部分 -->
      <div class="todo-section">
        <el-card>
          <div class="todo-header">我的待办</div>
          <div class="todo-list">
            <div
              v-for="(item, index) in todos"
              :key="index"
              class="todo-item"
            >
              <div class="todo-index">{{ index + 1 }}.</div>
              <div class="todo-text">{{ item }}</div>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </template>
  
  <script setup>
    import { ref } from 'vue' 
    import { useRouter } from 'vue-router'
    import { ArrowLeft } from '@element-plus/icons-vue'

    const router = useRouter()

  const todos = ref([
    '处理新订单',
    '联系供应商确认发货',
    '更新库存信息',
    '回复客户咨询',
    '准备月度报告'
  ])
  const handleBack = () => {
        router.go(-1)
    }
  </script>
  
  <style scoped>
  .my-page-container {
    padding: 20px;
  }
  
  .top-row,
  .middle-row {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
  }
  
  /* 通用卡片样式 */
    .stat-card,
    .order-card {
    flex: 1;
    min-width: 120px; /* 设置最小宽度 */
    max-width: 200px; /* 设置最大宽度 */
    text-align: center;
    margin: 0 8px; /* 调整间距 */
    }

    /* 内容区域 */
    .stat-content,
    .order-content {
    padding: 16px;
    }

    /* 数值样式 */
    .stat-value,
    .order-value {
    font-size: 20px;
    font-weight: bold;
    color: #409EFF;
    margin-bottom: 8px;
    white-space: nowrap; /* 防止换行 */
    overflow: hidden;
    text-overflow: ellipsis; /* 超出显示省略号 */
    }

    /* 标签样式 */
    .stat-label,
    .order-label {
    font-size: 14px;
    color: #666;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* 最多显示两行 */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.4;
    }
  
  .todo-section {
    margin-top: 20px;
  }
  
  .todo-header {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 16px;
  }
  
  .todo-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .todo-item {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .todo-index {
    color: #409EFF;
    font-weight: bold;
  }
  
  .todo-text {
    flex: 1;
  }

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

.my-page-container {
  position: relative;
  padding-top: 60px; /* 为返回按钮留出空间 */
  padding-bottom: 20px;
}

/* 响应式布局 */
@media (max-width: 768px) {
  .top-row,
  .middle-row {
    flex-wrap: wrap;
    gap: 12px;
  }

  .stat-card,
  .order-card {
    flex: 1 1 1 45%; /* 每行显示两个 */
    min-width: auto;
    margin: 0;
  }

  .stat-value,
  .order-value {
    font-size: 18px;
  }

  .stat-label,
  .order-label {
    font-size: 13px;
  }
}


  </style>