
<template>
  <div class="app-container">
    <router-view></router-view>
    <AppTabBar />
  </div>
</template>

<script>
import AppTabBar from '@/components/AppTabBar.vue'

export default {
  components: {
    AppTabBar
  }
}
</script>

<style>
/* 确保页面内容不会被底部导航栏遮挡 */
.app-container {
  padding-bottom: 60px;
}
</style>