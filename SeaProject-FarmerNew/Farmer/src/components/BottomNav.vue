<template>
    <div class="bottom-nav">
      <div
        v-for="(nav, index) in navList"
        :key="index"
        :class="['nav-item', { active: activeIndex === index }]"
        @click="changeNav(nav.path)"
      >
        <div class="nav-icon">
          <Icon :icon="nav.icon" />
        </div>
        <div class="nav-text">{{ nav.text }}</div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import { useRouter, useRoute } from 'vue-router'; // 引入路由相关方法
  import { Icon } from '@iconify/vue'; // 引入 Iconify 组件
  
  const router = useRouter(); // 获取路由实例
  const route = useRoute(); // 获取当前路由信息
  
  // 导航数据
  const navList = [
    { text: '养殖监测', icon: 'bx:cctv', path: '/detection' }, // 监控图标
    { text: '商品发布', icon: 'mdi:plus-circle-outline', path: '/product' }, // 圆圈加号图标
    { text: '社群分享', icon: 'mdi:message-outline', path: '/community' }, // 聊天气泡图标
    { text: '我的信息', icon: 'mdi:account-outline', path: '/profile' }, // 用户图标
  ];
  
  const activeIndex = ref(0);
  
  // 监听路由变化，更新 activeIndex
  watch(
    () => route.path,
    (newPath) => {
      const index = navList.findIndex((nav) => nav.path === newPath);
      if (index !== -1) {
        activeIndex.value = index;
      }
    },
    { immediate: true }
  );
  
  // 切换导航
  const changeNav = (path) => {
    router.push(path); // 跳转到对应路由
  };
  </script>
  
  <style scoped>
  .bottom-nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    background-color: white;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    height: 100%;
  }
  
  .nav-icon {
    width: 50px;
    height: 33px;
    border-radius: 13px;
  }
  
  .nav-text {
    font-size: 12px;
    color: black;
    font-weight: 600;
  }
  
  .nav-item.active .nav-icon {
    background-color: rgb(65, 179, 241);
  }
  
  .nav-icon svg {
    width: 100%;
    height: 100%;
  }
  </style>