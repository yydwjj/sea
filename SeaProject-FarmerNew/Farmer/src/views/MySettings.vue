<template>
  <div class="settings-view">
    <h2 class="settings-title">请选择端口</h2>
    <div class="setting-option" @click="switchToCustomer">
      <div class="option-icon">
        <Icon icon="mdi:account" />
      </div>
      <div class="option-label">切换到消费者端</div>
    </div>
    <div class="setting-option" @click="switchToWholesaler">
      <div class="option-icon">
        <Icon icon="mdi:briefcase" />
      </div>
      <div class="option-label">切换到批发商端</div>
    </div>
    <div class="setting-option" @click="switchToFamer">
      <div class="option-icon">
        <Icon icon="map:aquarium"/>
      </div>
      <div class="option-label">切换到养殖户端</div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';
import { useUserStore } from '../stores/userStore'; // 引入全局状态
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const switchToCustomer = () => {
  userStore.switchToCustomer();
  console.log('已切换到顾客端');
  router.push('/home'); // 跳转到/home
};

const switchToWholesaler = () => {
  userStore.switchToWholesaler();
  console.log('已切换到批发商端');
  window.alert("本程序为演示程序，实际批发商端需审核通过后才可进入")
  router.push('/purchase'); // 跳转到/purchase
};

const switchToFamer = () =>{
  userStore.switchToFamer();
  window.alert("本程序为演示程序，实际养殖户端需审核通过后才可进入")
  router.push('/detection'); // 跳转到/detection

}
</script>

<style scoped>
.settings-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  background-color: rgb(236, 247, 253);
  min-height: 70vh;
  justify-content: space-evenly;
  max-width: 90vw;
  box-shadow: rgb(236, 247, 253) 0px 20px 0 199px;
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
  width: 300px;
  max-width: 400px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
  justify-content: space-evenly;
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
  font-size: 17px;
  font-weight: 600;
  color: #333;
}
</style>