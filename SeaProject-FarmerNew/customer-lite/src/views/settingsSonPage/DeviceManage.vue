<template>
    <div class="page-container">
  
      <header class="page-header">
        <h1 class="page-title">我的设备</h1>
      </header>
  
      <div class="devices-container">
        <!-- List of bound devices -->
        <div v-for="device in devices" :key="device.id" class="card device-card"
             :style="{ borderLeft: `4px solid ${device.color}` }"
             @click="goToSettings(device.id)">
          <div class="device-info">
            <h3>{{ device.name }}</h3>
            <p>{{ device.model }}</p>
          </div>
          <div class="device-status" :class="{ 'status-online': device.online }">
            {{ device.online ? '在线' : '离线' }}
          </div>
        </div>
  
        <!-- Bind device button -->
        <div class="bind-device-container" @click="bindNewDevice">
          <div class="bind-device-button">
            <div class="plus-icon">+</div>
            <div class="bind-text">绑定设备</div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  export default {
    setup () {
      const router = useRouter()
  
      const devices = ref([
        {
          id: '1',
          name: '1号试用设备',
          model: 'WP4244',
          online: true,
          bindTime: '2023.12.02',
          color: '#1976d2'
        }
      ])
  
      const goToSettings = (deviceId) => {
        router.push(`/settings/${deviceId}`)
    }
  
      const bindNewDevice = () => {
        const newId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        const colors = ['#1976d2', '#2196f3', '#03a9f4', '#00bcd4', '#009688'];
        devices.value.push({
          id: newId,
          name: `${newId}号设备`,
          model: 'WP4244',
          online: false,
          bindTime: new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.'),
          color: colors[Math.floor(Math.random() * colors.length)]
        })
      }
  
      return {
        devices,
        goToSettings,
        bindNewDevice
      }
    }
  }
  </script>
  
  <style scoped>
  .page-container {
    background-color: #e6f7ff;
    padding-bottom: 20px;
  }
  
  .tabs-container {
    display: flex;
    background-color: #000;
    border-radius: 20px;
    margin: 10px 20px;
    overflow: hidden;
  }
  
  .tab {
    flex: 1;
    text-align: center;
    padding: 8px 0;
    color: white;
    font-size: 14px;
    cursor: pointer;
  }
  
  .tab.active {
    background-color: #1976d2;
    border-radius: 20px;
  }
  
  .page-header {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .page-title {
    font-size: 24px;
    color: #333;
  }
  
  .devices-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    padding: 20px;
  }
  
  .card {
    border-radius: 8px;
    padding: 20px;
    width: 300px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .device-card {
    transition: all 0.3s ease;
    border-left: 4px solid #1976d2;
    background-color: white;
  }
  
  .device-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .device-info {
    flex: 1;
  }
  
  .device-info h3 {
    font-size: 18px;
    margin-bottom: 5px;
  }
  
  .device-info p {
    font-size: 14px;
    color: #777;
  }
  
  .device-status {
    padding: 8px 12px;
    border-radius: 20px;
    font-size: 12px;
    color: white;
    background-color: #aaa;
  }
  
  .device-status.status-online {
    background-color: #5cb85c;
  }
  
  .bind-device-container {
    width: 300px;
    cursor: pointer;
  }
  
  .bind-device-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    border-radius: 8px;
    background: linear-gradient(135deg, #1976d2, #03a9f4);
    color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }
  
  .bind-device-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
  
  .plus-icon {
    font-size: 30px;
    margin-bottom: 5px;
  }
  
  .bind-text {
    font-size: 16px;
  }
  </style>