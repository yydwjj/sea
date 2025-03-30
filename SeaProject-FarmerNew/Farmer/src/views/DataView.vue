<template>
  <div class="data-view">
    <!-- 顶部按钮 -->
    <div class="button-container">
      <button class="tab-button" @click="showTodayData">今日指标</button>
      <button class="tab-button" @click="showHistoryData">历史记录</button>
    </div>

    <!-- 日期选择器 -->
    <div v-if="showDatePicker" class="date-picker">
      <label for="date">选择日期: </label>
      <input type="date" id="date" v-model="selectedDate" :max="maxDate" :min="minDate" />
    </div>

    <!-- 第一个模块：水质数据 -->
    <div class="data-module">
      <div class="data-grid">
        <div v-for="(item, index) in waterQualityData" :key="index" class="data-item">
          <span class="data-label">{{ item.label }}</span>
          <span class="data-value">{{ item.value }}</span>
          <span class="data-label"> {{ item.unit }}</span>
        </div>
      </div>
      <div class="wqis-value">
        WQIS值: <span class="data-value">{{ wqisValue }}</span>
      </div>
    </div>

    <!-- 第二个模块：折线图 -->
    <div class="chart-module" v-if="showChart">
      <div class="chart-image">
        <img :src="userImage" alt="折线图" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import { useUserStore } from '../stores/userStore';
import data1 from '../assets/data1.jpg';
import data2 from '../assets/data2.jpg';

/* ================================
   用户信息及图片相关
================================ */
const userStore = useUserStore();
const isFamer = computed(() => userStore.isFamer);
const isCustomer = computed(() => userStore.isCustomer);
const userImage = computed(() => isFamer.value ? data1 : data2);

/* ================================
   水质数据、配置及历史数据
================================ */
// 初始化水质数据（含标签和单位）
const initWaterQualityData = () => {
  const labels = ['温度', '叶绿素a', 'pH值', '总氮', '溶解氧', '总磷', '亚硝酸盐', '氨氮', '铵盐', '高锰酸钾'];
  const units = ['°C', 'μg/L', '', 'mg/L', 'mg/L', 'mg/L', 'mg/L', 'mg/L', 'mg/L', 'mg/L'];
  return labels.map((label, index) => ({
    label,
    value: 0,
    unit: units[index]
  }));
};

const waterQualityData = ref([]);
const wqisValue = ref(0);

// 历史数据（农户和客户共用，农户多了几天数据）
const historyData = {
  '2025-02-10': { values: [15, 8, 7.5, 2.5, 7, 0.4, 0.1, 0.08, 0.3, 3.5], wqis: 61.15 },
  '2025-02-11': { values: [14.5, 7.5, 7.4, 2.6, 6.8, 0.42, 0.12, 0.1, 0.35, 3.6], wqis: 64.89 },
  '2025-02-12': { values: [14, 7, 7.8, 3, 6.7, 0.5, 0.14, 0.11, 0.38, 4], wqis: 90.12 },
  '2025-02-13': { values: [12.5, 9, 7.3, 2.8, 6, 0.46, 0.18, 0.15, 0.45, 3.8], wqis: 81.15 },
  '2025-02-14': { values: [13.5, 8.5, 7.6, 2.7, 6.5, 0.44, 0.15, 0.12, 0.4, 3.7], wqis: 74.01 },
  '2025-02-15': { values: [13, 8, 7.7, 2.9, 6.2, 0.48, 0.16, 0.13, 0.42, 3.9], wqis: 87.12 },
  '2025-02-16': { values: [15, 6.5, 8.1, 2.8, 7.1, 0.45, 0.13, 0.09, 0.35, 3.7], wqis: 85.02 },
};

// 如果是农户，则额外包含特殊日期数据
const specialHistoryData = {
  ...historyData,
  '2025-03-24': { values: [19.5, 8.8, 9.6, 0.008, 0.08, 2.9, 1.1, 0.08, 0.01, 0.9], wqis: 94.98 },
  '2025-03-25': { values: [18.8, 8.5, 8.8, 0.02, 0.15, 4.5, 1.5, 0.12, 0.03, 1.2], wqis: 83.67 },
  '2025-03-26': { values: [19.2, 8.7, 9.5, 0.009, 0.09, 2.7, 1.2, 0.09, 0.01, 0.8], wqis: 94.12 },
};

const dynamicHistoryData = computed(() => isFamer.value ? specialHistoryData : historyData);

// 波动配置，用于随机数据生成
const fluctuationConfig = {
  '温度': { min: 15, max: 19, base: 17, fluctuation: 0.1 },
  '叶绿素a': { min: 2, max: 6, base: 4, fluctuation: 0.1 },
  'pH值': { min: 7.5, max: 8.5, base: 8, fluctuation: 0.025 },
  '总氮': { min: 1.5, max: 2.5, base: 2, fluctuation: 0.025 },
  '溶解氧': { min: 7, max: 9, base: 8, fluctuation: 0.05 },
  '总磷': { min: 0.1, max: 0.3, base: 0.2, fluctuation: 0.005 },
  '亚硝酸盐': { min: 0.01, max: 0.1, base: 0.05, fluctuation: 0.002 },
  '氨氮': { min: 0.02, max: 0.1, base: 0.06, fluctuation: 0.002 },
  '铵盐': { min: 0.1, max: 0.3, base: 0.2, fluctuation: 0.005 },
  '高锰酸钾': { min: 1, max: 2, base: 1.5, fluctuation: 0.025 },
};

// 随机数生成：根据当前值或初始基值在一定波动范围内生成新值
const generateRandomValue = (label, currentValue = null) => {
  const config = fluctuationConfig[label];
  if (!config) return currentValue;
  const fluctuation = (Math.random() * 2 - 1) * config.fluctuation;
  let newValue = currentValue !== null
    ? currentValue + fluctuation
    : config.base + (Math.random() * 2 - 1) * config.fluctuation;
  newValue = Math.min(config.max, Math.max(config.min, newValue));
  return parseFloat(newValue.toFixed(2));
};

/* ================================
   日期选择及图表显示控制
================================ */
const showDatePicker = ref(false);
const selectedDate = ref('2025-03-27');
const today = computed(() => isFamer.value ? '2025-03-27' : '2025-02-16');
const maxDate = computed(() => today.value);
const minDate = computed(() => isFamer.value ? '2025-03-24' : '2025-02-10');
const showChart = ref(true);

/* ================================
   定时器和开关状态（API轮询）
================================ */
let dataInterval = null;
let apiInterval = null;
const switchFlag = ref(false);

// API轮询：每秒请求一次获取开关状态
const startApiPolling = () => {
  apiInterval = setInterval(async () => {
    try {
      const response = await fetch('http://124.221.164.16:8081/switch');
      const data = await response.json();
      switchFlag.value = data === true;
      updateData();
    } catch (error) {
      console.error('API请求失败:', error);
    }
  }, 1000);
};

/* ================================
   数据更新逻辑
================================ */
// 更新数据：特殊日期逻辑（动态波动）或历史数据加载
const updateData = () => {
  if (selectedDate.value === '2025-03-27') {
    // 特殊日期：如果开关关闭，则清空显示数据并隐藏图表
    if (!switchFlag.value) {
      waterQualityData.value.forEach(item => item.value = 0);
      wqisValue.value = 0;
      showChart.value = true;
      if (dataInterval) {
        clearInterval(dataInterval);
        dataInterval = null;
      }
      return;
    }
    // 开关开启时，初始化随机数据并启动动态波动
    waterQualityData.value.forEach(item => {
      item.value = generateRandomValue(item.label);
    });
    wqisValue.value = 91 + (Math.random() * 2 - 1) * 0.1;
    wqisValue.value = parseFloat(wqisValue.value.toFixed(2));

    if (dataInterval) clearInterval(dataInterval);
    const randomInterval = Math.random() * 900 + 1000;
    dataInterval = setInterval(() => {
      waterQualityData.value.forEach(item => {
        item.value = generateRandomValue(item.label, item.value);
        const fluctuation = (Math.random() * 2 - 1) * 0.1; // 波动范围 ±0.1
        let newValue = wqisValue.value + fluctuation;
        newValue = Math.min(88, Math.max(86, newValue)); // 钳制范围
        wqisValue.value = parseFloat(newValue.toFixed(2));
      });
    }, randomInterval);



    showChart.value = true;
  } else {
    // 历史数据加载
    const selectedData = dynamicHistoryData.value[selectedDate.value];
    if (selectedData) {
      waterQualityData.value.forEach((item, i) => {
        item.value = selectedData.values[i];
      });
      wqisValue.value = selectedData.wqis;
    }
    showChart.value = selectedDate.value === today.value;
    if (dataInterval) {
      clearInterval(dataInterval);
      dataInterval = null;
    }
  }
};

/* ================================
   日期选择操作
================================ */
const showTodayData = () => {
  showDatePicker.value = false;
  selectedDate.value = today.value;
  updateData();
};

const showHistoryData = () => {
  showDatePicker.value = true;
};

/* ================================
   监听变化及生命周期管理
================================ */
// 监听日期变化
watch(selectedDate, updateData);

// 监听用户类型变化，重置数据及定时器
watch([isFamer, isCustomer], () => {
  if (dataInterval) {
    clearInterval(dataInterval);
    dataInterval = null;
  }
  waterQualityData.value = initWaterQualityData();
  showTodayData();
});

// 监听开关状态变化，开关关闭则停止动态波动
watch(switchFlag, (newVal) => {
  if (!newVal && dataInterval) {
    clearInterval(dataInterval);
    dataInterval = null;
  }
});

// 生命周期：组件挂载时初始化数据与启动轮询
onMounted(() => {
  waterQualityData.value = initWaterQualityData();
  showTodayData();
  startApiPolling();
});

// 组件卸载时清理所有定时器
onBeforeUnmount(() => {
  if (dataInterval) clearInterval(dataInterval);
  if (apiInterval) clearInterval(apiInterval);
});
</script>

<style scoped>
.date-picker {
  margin-top: 10px;
}
</style>

  <style scoped>
  .data-view {
    background-color: rgb(237, 250, 255);
    padding: 16px;

  }

  /* 顶部按钮样式 */
  .button-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    height: 24px;
  }

  .tab-button {
    background-color: rgb(50, 161, 218);
    color: white;
    border: none;
    border-radius: 12px;
    /* padding: 8px 16px;  */
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .tab-button:hover {
    background-color: rgb(35, 125, 171);
  }

  /* 第一个模块：水质数据 */
  .data-module {
    background-color: rgb(199, 230, 244);
    border-radius: 12px;
    padding: 12px 1px 13px 1px;
    margin-bottom: 16px;
    box-shadow: 7px 8px 7px 3px white;
  }

  .data-grid {
    display: grid;
    grid-template-columns: repeat(2, 50%);
    row-gap: 5px;
  }

  .data-item {
    display: flex;
    justify-content: space-between;
    padding: 8px 0px 8px 10px;
    /* background-color: white; */
    border-radius: 8px;
    align-items: center;
  }

  .data-label {
    font-size: 12px;
    width: 50px;
    color: #333;
    font-weight: 600;
  }

  .data-value {
    font-size: 14px;
    color: #333;
    background-color: white;
    padding: 4px 8px;
    border-radius: 4px;
  }

  .wqis-value {
    text-align: center;
    margin-top: 16px;
    font-size: 16px;
    color: #333;
  }

  .wqis-number {
    font-weight: bold;
    color: rgb(50, 161, 218);
  }

  /* 第二个模块：折线图 */
  .chart-module {
    background-color: white;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 60px;
    box-shadow: 7px 8px 2px 3px #c7e6f4;
  }

  .chart-title {
    background-color: rgb(35, 125, 171);
    color: white;
    padding: 7px;
    border-radius: 8px;
    font-size: 9px;
    text-align: left;
    margin-bottom: 16px;
    height: 6px;
    width: 25%;
    font-weight: 600;
  }

  .chart-image img {
    width: 100%;
    border-radius: 8px;
  }

  .chart-caption {
    text-align: center;
    margin-top: 8px;
    font-size: 14px;
    color: rgb(35, 125, 171);
  }

  .date-picker{
    background-color: rgb(199, 230, 244);
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 16px;
    /* box-shadow: 7px 8px 7px 3px; */
  }
  </style>