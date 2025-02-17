<template>
    <div class="detection-page">
      <!-- 搜索框 -->
<!--      <div class="search-box">-->
<!--        <div class="search-icon">-->
<!--          <Icon icon="mdi:magnify" />-->
<!--        </div>-->
<!--        <input-->
<!--          type="text"-->
<!--          class="search-input"-->
<!--          placeholder=""-->
<!--        />-->
<!--      </div>-->
  
      <!-- 标签切换区域 -->
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
  
      <!-- 内容显示区域 -->
      <div class="content-area">
        <component :is="currentTabComponent" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { Icon } from '@iconify/vue'; // 引入 Iconify 图标组件
  import DataView from './DataView.vue'; // 数据页面
  import MonitorView from './MonitorView.vue'; // 监控页面
  import InspectionView from './InspectionView.vue'; // 专检页面
  
  const title = '养殖检测'; // 页面标题
  
  // 标签数据
  const tabs = ['数据', '监控', '专检'];
  const activeTab = ref(0); // 当前选中的标签
  
  // 切换标签
  const changeTab = (index) => {
    activeTab.value = index;
  };
  
  // 动态加载对应的组件
  const currentTabComponent = computed(() => {
    switch (activeTab.value) {
      case 0:
        return DataView;
      case 1:
        return MonitorView;
      case 2:
        return InspectionView;
      default:
        return DataView;
    }
  });
  </script>
  
  <style scoped>
  .detection-page {
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
  
  /* 标签切换区域样式 */
  .tab-container {
    display: flex;
    background-color: black;
    border-radius: 12px;
    padding: 8px;
    margin-top: 16px;
    width: 70%;
    height: 14px;
    align-items: center;
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
  
  /* 内容显示区域样式 */
  .content-area {
    margin-top: 16px;
    /* padding: 16px; */
    border-radius: 12px;
    background-color: rgb(237, 250, 255);
  }
  </style>