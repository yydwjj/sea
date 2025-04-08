<template>
    <div class="page-container">
      <header class="page-header">
        <button class="back-button" @click="goBack">←</button>
      </header>
      
      <div class="settings-container">
        <div class="user-profile">
          <div class="avatar-container">
            <div class="avatar">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
          </div>
          <div class="device-title">{{ device.name }}</div>
        </div>
  
        <div class="card settings-card">
          <!-- Device name setting -->
          <div class="setting-item" @click="editSetting('name')">
            <div class="setting-label">修改名称</div>
            <div class="setting-value-container">
              <span class="setting-value">{{ device.name }}</span>
              <span class="setting-value-arrow">›</span>
            </div>
          </div>
          
          <!-- Divider -->
          <div class="divider"></div>
          
          <!-- Device model -->
          <div class="setting-item">
            <div class="setting-label">设备型号</div>
            <div class="setting-value-container">
              <span class="setting-value">{{ device.model }}</span>
            </div>
          </div>
          
          <!-- Divider -->
          <div class="divider"></div>
          
          <!-- User management -->
          <div class="setting-item" @click="editSetting('users')">
            <div class="setting-label">用户管理</div>
            <div class="setting-value-container">
              <span class="setting-value">{{ device.userCount || 2 }}</span>
              <span class="setting-value-arrow">›</span>
            </div>
          </div>
          
          <!-- Divider -->
          <div class="divider"></div>
          
          <!-- Share device -->
          <div class="setting-item" @click="editSetting('share')">
            <div class="setting-label">分享设备</div>
            <div class="setting-value-container">
              <svg class="qr-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
              <span class="setting-value-arrow">›</span>
            </div>
          </div>
          
          <!-- Divider -->
          <div class="divider"></div>
          
          <!-- Child lock toggle -->
          <div class="setting-item">
            <div class="setting-label">童锁</div>
            <div class="setting-value-container">
              <label class="toggle">
                <input type="checkbox" v-model="device.locked">
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
          
          <!-- Divider -->
          <div class="divider"></div>
          
          <!-- Terms of use -->
          <div class="setting-item" @click="editSetting('terms')">
            <div class="setting-label">使用条款</div>
            <div class="setting-value-container">
              <span class="setting-value-arrow">›</span>
            </div>
          </div>
          
          <!-- Divider -->
          <div class="divider"></div>
          
          <!-- Binding time -->
          <div class="setting-item">
            <div class="setting-label">绑定时间</div>
            <div class="setting-value-container">
              <span class="setting-value">{{ device.bindTime }}</span>
            </div>
          </div>
        </div>
        
        <!-- Unbind button -->
        <button class="button button-danger" @click="unbindDevice">解除绑定</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  
  const router = useRouter()
  const route = useRoute()
  const deviceId = route.params.id
  
  // Default device data
  const device = ref({
    id: deviceId,
    name: `${deviceId}号试用设备`,
    model: 'WP4244',
    userCount: 2,
    locked: false,
    bindTime: '2023.12.02'
  })
  
  // Go back to devices list
  const goBack = () => {
    router.push({ name: 'Profile' })
  }
  
  // Edit a setting
  const editSetting = (setting) => {
    alert(`Editing ${setting} for device ${device.value.name}`)
  }
  
  // Unbind the device
  const unbindDevice = () => {
    if (confirm(`确定要解除绑定 ${device.value.name} 吗？`)) {
      router.push({ name: 'Profile' })
    }
  }
  
  onMounted(() => {
    setTimeout(() => {
      // API call simulation
    }, 300)
  })
  </script>
  
  <style scoped>
  .page-container {
    background-color: #e6f7ff;
    padding-bottom: 20px;
    min-height: 100vh;
  }
  
  .back-button {
    position: absolute;
    top: 9px;
    left: 7px;
    background-color: rgb(108 201 249);
    color: white;
    border: none;
    padding: 2px 10px;
    border-radius: 12px;
    z-index: 10;
  }
  
  .user-profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
    padding-top: 20px;
  }
  
  .avatar-container {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: #a5d6a7;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .avatar {
    width: 60px;
    height: 60px;
    color: #333;
  }
  
  .device-title {
    font-size: 18px;
    font-weight: 500;
    background-color: #333;
    color: white;
    padding: 6px 16px;
    border-radius: 20px;
  }
  
  .settings-container {
    display: flex;
    flex-direction: column;
    padding: 0 16px;
  }
  
  .settings-card {
    margin-bottom: 16px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 0 16px;
    background-color: white;
  }
  
  .setting-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0;
    cursor: pointer;
  }
  
  .setting-label {
    font-size: 16px;
    color: #333;
  }
  
  .setting-value-container {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .setting-value {
    font-size: 16px;
    color: #666;
  }
  
  .divider {
    height: 1px;
    background-color: rgba(0, 0, 0, 0.1);
    margin: 0 -16px;
  }
  
  .qr-icon {
    color: #1976d2;
  }
  
  /* Toggle switch styles */
  .toggle {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 24px;
  }
  
  .setting-value-arrow {
    color: #1976d2;
    font-size: 18px;
    font-weight: bold;
  }
  
  .toggle input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .toggle-slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #e0e0e0;
    transition: .4s;
    border-radius: 24px;
  }
  
  .toggle-slider:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }
  
  input:checked + .toggle-slider {
    background-color: #1976d2;
  }
  
  input:checked + .toggle-slider:before {
    transform: translateX(26px);
  }
  
  .button-danger {
    background-color: white;
    color: #1976d2;
    border: 1px solid #1976d2;
    border-radius: 8px;
    padding: 12px 0;
    width: 100%;
    font-weight: 500;
    font-size: 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }
  
  .button-danger:hover {
    background-color: #f5f5f5;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  </style>