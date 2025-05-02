<template>
  <div v-if="shouldShow" class="bottom-nav">
    <div class="bottom-nav">
      <div
          v-for="(nav, index) in navList"
          :key="index"
          :class="['nav-item', { active: activeIndex === index }]"
          @click="changeNav(nav.path)"
      >
        <div class="nav-icon">
          <Icon :icon="nav.icon" width="2em" height="2em"/>
        </div>
        <div class="nav-text">{{ nav.text }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, watch, computed} from 'vue';
import {useRouter, useRoute} from 'vue-router';
import {Icon} from '@iconify/vue';
import {useUserStore} from '../stores/userStore'; // 引入全局状态

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

// 新增：判断是否显示底部导航
const shouldShow = computed(() => {
  return route.path !== '/mysettings'
});

// 根据 isCustomer 动态生成导航数据
const navList = computed(() => {
  if (userStore.isFamer) {
    return [
        //水质监测 鱼群监控 专检报告
      {text: '水质检测', icon: 'bx:cctv', path: '/DataView'},
      {text: '鱼群监控', icon: 'flowbite:fish-outline', path: '/MonitorView'},
      {text: '专检报告', icon: 'material-symbols:lab-profile-outline', path: '/InspectionView'},
      {text: '社群分享', icon: 'mdi:message-outline', path: '/community'},
      {text: '我的信息', icon: 'mdi:account-outline', path: '/profile'},
    ]
  } else if (userStore.isWholesalers) {
    return [
      {text: '商品采购', icon: 'material-symbols:storefront-outline', path: '/purchase'},
      {text: '商品发布', icon: 'mdi:plus-circle-outline', path: '/product'},
      {text: '社群分享', icon: 'mdi:message-outline', path: '/community'},
      {text: '我的信息', icon: 'mdi:account-outline', path: '/profile'},
    ]
  } else if (userStore.isCustomer) {
    return [
      {text: '首页', icon: 'ci:house-01', path: '/home'}, //home需要创建
      {text: '商品采购', icon: 'material-symbols:storefront-outline', path: '/purchase'},
      {text: '社群分享', icon: 'mdi:message-outline', path: '/community'},
      {text: '我的信息', icon: 'mdi:account-outline', path: '/profile'},
    ]
  }
});

const activeIndex = ref(0);

// 监听路由变化，更新 activeIndex
watch(
    () => route.path,
    (newPath) => {
      const index = navList.value.findIndex((nav) => nav.path === newPath);
      if (index !== -1) {
        activeIndex.value = index;
      }
    },
    {immediate: true}
);

// 切换导航
const changeNav = (path) => {
  router.push(path);
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