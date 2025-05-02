<template>
  <div class="settings-view">
    <h2 class="settings-title">我的设置</h2>

    <div class="settings-section">
      <h3 class="section-title">通用设置</h3>
      <div class="setting-option" @click="toggleDarkMode">
        <div class="option-icon">
          <Icon icon="mdi:theme-light-dark" />
        </div>
        <div class="option-label">深色模式</div>
        <div class="option-value">{{ darkMode ? '开启' : '关闭' }}</div>
      </div>
      <div class="setting-option" @click="changeLanguage">
        <div class="option-icon">
          <Icon icon="mdi:translate" />
        </div>
        <div class="option-label">语言</div>
        <div class="option-value">简体中文</div>
      </div>
    </div>

    <div class="settings-section">
      <h3 class="section-title">通知设置</h3>
      <div class="setting-option" @click="toggleNotifications">
        <div class="option-icon">
          <Icon icon="mdi:bell" />
        </div>
        <div class="option-label">消息通知</div>
        <div class="option-value">{{ notificationsEnabled ? '开启' : '关闭' }}</div>
      </div>
      <div class="setting-option" @click="changeNotificationSound">
        <div class="option-icon">
          <Icon icon="mdi:music" />
        </div>
        <div class="option-label">通知音效</div>
        <div class="option-value">默认</div>
      </div>
    </div>

    <div class="settings-section">
      <h3 class="section-title">隐私与安全</h3>
      <div class="setting-option" @click="showPrivacyPolicy">
        <div class="option-icon">
          <Icon icon="mdi:shield-lock" />
        </div>
        <div class="option-label">隐私政策</div>
      </div>
      <div class="setting-option" @click="clearCache">
        <div class="option-icon">
          <Icon icon="mdi:trash-can" />
        </div>
        <div class="option-label">清除缓存</div>
      </div>
    </div>


  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';
import { ref } from 'vue';

// 状态管理
const darkMode = ref(false);
const notificationsEnabled = ref(true);

// 设置选项的方法
const toggleDarkMode = () => {
  darkMode.value = !darkMode.value;
  console.log('深色模式:', darkMode.value ? '开启' : '关闭');
};

const changeLanguage = () => {
  console.log('打开语言选择');
  window.alert("语言选择功能将在后续版本中提供");
};

const toggleNotifications = () => {
  notificationsEnabled.value = !notificationsEnabled.value;
  console.log('消息通知:', notificationsEnabled.value ? '开启' : '关闭');
};

const changeNotificationSound = () => {
  console.log('更改通知音效');
  window.alert("音效选择功能将在后续版本中提供");
};

const showPrivacyPolicy = () => {
  console.log('显示隐私政策');
  window.alert("隐私政策内容将在此显示");
};

const clearCache = () => {
  console.log('清除缓存');
  window.alert("缓存已清除");
};

const changePassword = () => {
  console.log('修改密码');
  window.alert("密码修改功能将在后续版本中提供");
};

const logout = () => {
  console.log('退出登录');
  window.alert("您已退出登录");
};

const checkUpdate = () => {
  console.log('检查更新');
  window.alert("当前已是最新版本");
};

const showAbout = () => {
  console.log('显示关于信息');
  window.alert("软件名称: 通用设置演示\n版本: 1.2.0\n© 2023 示例公司");
};
</script>

<style scoped>
.settings-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  background-color: rgb(236, 247, 253);
  min-height: 70vh;
  justify-content: flex-start;
  max-width: 90vw;
  box-shadow: rgb(236, 247, 253) 0px 20px 0 199px;
}

.settings-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 24px;
}

.settings-section {
  width: 100%;
  max-width: 400px;
  margin-bottom: 24px;
}

.section-title {
  font-size: 16px;
  color: #666;
  margin-bottom: 12px;
  padding-left: 8px;
}

.setting-option {
  display: flex;
  align-items: center;
  background-color: rgb(249, 255, 255);
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 12px;
  cursor: pointer;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
  justify-content: space-between;
}

.setting-option:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.option-icon {
  font-size: 24px;
  color: rgb(50, 161, 218);
  margin-right: 16px;
}

.option-label {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  flex-grow: 1;
}

.option-value {
  font-size: 14px;
  color: #666;
  margin-left: 8px;
}
</style>