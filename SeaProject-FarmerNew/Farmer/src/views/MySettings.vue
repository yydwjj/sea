<template>
  <div class="settings-view">
    <h2 class="settings-title">设置</h2>
    <div class="setting-option" @click="switchToCustomer">
      <div class="option-icon">
        <Icon icon="mdi:account" />
      </div>
      <div class="option-label">切换到顾客端</div>
    </div>
    <div class="setting-option" @click="switchToWholesaler">
      <div class="option-icon">
        <Icon icon="mdi:briefcase" />
      </div>
      <div class="option-label">切换到批发商端</div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';
import { ref } from 'vue';

// 这里可以添加实际的切换逻辑，比如向后台发送请求或者改变应用的状态
// 目前只是简单的控制台输出
const switchToCustomer = () => {
  console.log('已切换到顾客端');
};

const switchToWholesaler = () => {
  console.log('已切换到批发商端');
};
</script>

<style scoped>
.settings-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  background-color: rgb(236, 247, 253);
  min-height: 100vh;
}

.settings-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 24px;
}

.setting-option {
  display: flex;
  align-items: center;
  background-color: rgb(249, 255, 255);
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 16px;
  cursor: pointer;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
}

.setting-option:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.option-icon {
  font-size: 32px;
  color: rgb(50, 161, 218);
  margin-right: 16px;
}

.option-label {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}
</style>