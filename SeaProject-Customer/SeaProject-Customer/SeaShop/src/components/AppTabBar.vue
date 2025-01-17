<template>
  <div class="tab-bar">
    <router-link 
      v-for="tab in tabs" 
      :key="tab.path" 
      :to="tab.path"
      class="tab-item"
      active-class="active"
    >
      <el-icon :size="20">
        <component :is="tab.icon" />
      </el-icon>
      <span class="tab-label">{{ tab.label }}</span>
    </router-link>
  </div>
</template>
  
<script>
import {
  House,
  ChatLineRound,
  ShoppingCart,
  User
} from '@element-plus/icons-vue'

  export default {
    data() {
      return {
        tabs: [
        { path: '/home', label: '首页', icon: House },
        // 修改社区为消息
        { path: '/community', label: '消息', icon: ChatLineRound },
        { path: '/cart', label: '购物车', icon: ShoppingCart },
        { path: '/profile', label: '我的', icon: User }
        ]
      }
    }
  }
</script>
  
<style scoped>
  .tab-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-around;
    background: #fff;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
    padding: 8px 0;
    z-index: 100;
  }
  
  .tab-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: #666;
    font-size: 12px;
    gap: 4px;
  }
  .active {
    color: #409EFF;
  }
  .tab-label {
    font-size: 12px;
  }
</style>