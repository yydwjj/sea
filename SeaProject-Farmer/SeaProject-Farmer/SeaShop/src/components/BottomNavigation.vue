<template>
    <el-footer class="bottom-nav">
      <div class="nav-menu">
        <div class="nav-item" @click="navigateTo('home')">
          <el-icon><HomeFilled /></el-icon>
          <span>首页</span>
        </div>
        <div class="nav-item" @click="navigateTo('shop')">
          <el-icon><ShoppingCart /></el-icon>
          <span>找平购商</span>
        </div>
        <div class="nav-item" @click="navigateTo('client')">
          <el-icon><User /></el-icon>
          <span>我的客户</span>
        </div>
        <div class="nav-item" @click="navigateTo('chat')">
          <el-icon><ChatDotRound /></el-icon>
          <span>聊生意</span>
        </div>
        <div class="nav-item" @click="navigateTo('profile')">
          <el-icon><UserFilled /></el-icon>
          <span>我的</span>
        </div>
      </div>
    </el-footer>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  import {
    HomeFilled,
    ShoppingCart,
    User,
    ChatDotRound,
    UserFilled
  } from '@element-plus/icons-vue'
  
  const router = useRouter()
  
  const navigateTo = (routeName) => {
    router.push({ name: routeName })
  }
  </script>
  
  <style scoped>
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  z-index: 1000;
  background-color: #409EFF;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

.nav-menu {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
}

.nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nav-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-item.active {
  background-color: rgba(255, 255, 255, 0.2);
}

.nav-item .el-icon {
  font-size: 20px;
  margin-bottom: 4px;
  transition: transform 0.2s ease;
}

.nav-item:hover .el-icon {
  transform: translateY(-2px);
}

.nav-item span {
  font-size: 12px;
  line-height: 1;
  transition: transform 0.2s ease;
}

.nav-item:hover span {
  transform: translateY(2px);
}
  </style>