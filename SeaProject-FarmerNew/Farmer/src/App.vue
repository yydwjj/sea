<script setup>
import BottomNav from './components/BottomNav.vue';
</script>

<template>
  <div>
    <router-view />
    <BottomNav />
  </div>
</template>

<style lang="scss">
body {
  font-family:"Microsoft YaHei",微软雅黑,"MicrosoftJhengHei",华文细黑,STHeiti,MingLiu;
}
</style>

