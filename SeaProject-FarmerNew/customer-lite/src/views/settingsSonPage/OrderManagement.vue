<template>
  <div class="settings-view">
    <h2 class="settings-title">订单</h2>
    <template v-if="userStore.isFamer">
    <div class="setting-option" @click="router.push({ name: 'MyCustomers' })">
      <div class="option-icon">
        <Icon icon="mdi:account-group" />
      </div>
      <div class="option-label">我的顾客</div>
    </div>
    <div class="setting-option" @click="router.push({ name: 'CustomerOrders' })">
      <div class="option-icon">
        <Icon icon="mdi:clipboard-list" />
      </div>
      <div class="option-label">顾客订单</div>
    </div>
  </template>
  <template v-else>
    <div class="setting-option" @click="router.push({ name: 'PendingPayment' })">
      <div class="option-icon">
        <Icon icon="mdi:cash-clock" />
      </div>
      <div class="option-label">待付款</div>
    </div>
    <div class="setting-option" @click="router.push({ name: 'PendingShipment' })">
      <div class="option-icon">
        <Icon icon="mdi:package-variant-closed" />
      </div>
      <div class="option-label">待发货</div>
    </div>
    <div class="setting-option" @click="router.push({ name: 'PendingReceipt' })">
      <div class="option-icon">
        <Icon icon="mdi:truck-delivery" />
      </div>
      <div class="option-label">待收货</div>
    </div>
    <div class="setting-option" @click="router.push({ name: 'PendingReview' })">
      <div class="option-icon">
        <Icon icon="mdi:comment-text-outline" />
      </div>
      <div class="option-label">待评价</div>
    </div>
    <div class="setting-option" @click="router.push({ name: 'RefundService' })">
      <div class="option-icon">
        <Icon icon="mdi:shield-refresh" />
      </div>
      <div class="option-label">退款售后</div>
    </div>
  </template>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';
import { useUserStore } from '../../stores/userStore.js';
import { useRouter, useRoute } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();
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
  width: 140%;
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