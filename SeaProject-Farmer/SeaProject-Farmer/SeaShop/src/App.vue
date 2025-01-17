<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<script >
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs' // 中文语言包
import HomeView from "./views/HomeView.vue";

export default {
  components: {
    HomeView
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 750px; /* 移动端常见最大宽度 */
  margin: 0 auto;
  height: 100vh;
}

/* 全局样式调整 */
.el-menu {
  border-right: none !important;
}

/* 移动端适配 */
@media screen and (max-width: 750px) {
  html {
    font-size: 14px;
  }
}
</style>