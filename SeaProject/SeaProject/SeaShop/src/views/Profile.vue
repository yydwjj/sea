<template>
  <div class="profile-container">
    <!-- 第一部分：用户信息 -->
    <div class="user-info">
      <div class="avatar-section">
        <el-avatar :size="60" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
      </div>
      <div class="info-section">
        <div class="username">小明</div>
        <div class="address">美国纽约</div>
      </div>
      <div class="action-section">
        <el-button type="text" @click="goToCustomerService">
          <el-icon :size="20"><ChatDotRound /></el-icon>
          <span>客服</span>
        </el-button>
        <el-button type="text" @click="goToSettings">
          <el-icon :size="20"><Setting /></el-icon>
          <span>设置</span>
        </el-button>
      </div>
    </div>

    <!-- 第二部分：我的信息 -->
    <div class="section">
      <div class="section-header" @click="goToMyInfo">
        <span>我的信息</span>
        <el-icon><ArrowRight /></el-icon>
      </div>
    </div>

    <!-- 第三部分：我的订单 -->
    <div class="section">
      <div class="section-header">我的订单</div>
      <div class="order-status">
        <div v-for="item in orderStatus" :key="item.type" class="status-item">
          <el-icon :size="24"><component :is="item.icon" /></el-icon>
          <span>{{ item.label }}</span>
        </div>
      </div>
    </div>

    <!-- 第四部分：资质证明 -->
    <div class="section">
      <div class="section-header">资质证明</div>
      <div class="certificate-buttons">
        <div
          v-for="btn in certificateButtons"
          :key="btn.label"
          class="certificate-item"
          @click="handleCertificateAction(btn.action)"
        >
          <el-icon :size="24"><component :is="btn.icon" /></el-icon>
          <span>{{ btn.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref,onMounted } from 'vue'
  import {
    ChatDotRound,
    Setting,
    ArrowRight,
    Wallet,
    Document,
    Tickets,
    Money,
    Box,
    Van,
    Check,
    Close
  } from '@element-plus/icons-vue'

  // 订单状态
  const orderStatus = ref([
    { type: 'unpaid', label: '待付款', icon: Money },
    { type: 'unshipped', label: '待发货', icon: Box },
    { type: 'shipping', label: '运输中', icon: Van },
    { type: 'completed', label: '已完成', icon: Check },
    { type: 'cancelled', label: '已取消', icon: Close }
  ])

  // 资质证明按钮
  const certificateButtons = ref([
    { label: '证明申请', icon: Document, action: 'apply' },
    { label: '证明查询', icon: Tickets, action: 'query' },
    { label: '电子凭证', icon: Wallet, action: 'certificate' }
  ])

  // 导航方法
  const goToCustomerService = () => {
    console.log('跳转客服')
  }

  const goToSettings = () => {
    console.log('跳转设置')
  }

  const goToMyInfo = () => {
    console.log('跳转我的信息')
  }

  const handleCertificateAction = (action) => {
    console.log('资质证明操作:', action)
  }
  </script>

  <style scoped>
  .profile-container {
    padding: 16px;
  }

  .user-info {
    display: flex;
    align-items: center;
    padding: 16px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

  .avatar-section {
    margin-right: 16px;
  }

  .info-section {
    flex: 1;
  }

  .username {
    font-size: 18px;
    font-weight: 500;
    color: #333;
  }

  .address {
    font-size: 14px;
    color: #666;
    margin-top: 4px;
  }

  .action-section {
    display: flex;
    gap: 16px;
  }

  .section {
    margin-top: 16px;
    padding: 16px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    color: #333;
    padding-bottom: 16px;
    border-bottom: 1px solid #eee;
    cursor: pointer;
  }

  .order-status {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 16px;
    padding: 16px 0;
  }

  .status-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: #666;
    cursor: pointer;
  }

  .certificate-buttons {
    display: flex;
    gap: 16px;
    padding: 16px 0;
  }
  .certificate-buttons {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 16px 0;
}

.certificate-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 12px;
  border-radius: 8px;
  background-color: #f8f8f8;
  cursor: pointer;
  transition: all 0.2s;
}

.certificate-item:hover {
  background-color: #f0f0f0;
  transform: translateY(-2px);
}

.certificate-item span {
  font-size: 14px;
  color: #666;
}
</style>
<!-- 全局蓝色系的使用 -->
<style scoped>
/* 用户信息卡片 */
.user-info {
  border: 1px solid var(--primary-light);
  background-color: var(--primary-light);
}

/* 我的信息部分 */
.section-header {
  color: var(--primary-color);
}

/* 资质证明图标 */
.certificate-item {
  background-color: var(--primary-light);
}

.certificate-item:hover {
  background-color: var(--primary-color);
}

.certificate-item:hover span {
  color: white;
}
</style>