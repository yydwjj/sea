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
    <div class="chart-module">
      <div class="chart-title">水质（指数）得分变化折线图</div>
      <div class="chart-image">
        <img src="../assets/data1.png" alt="折线图" />
      </div>
      <div class="chart-caption">水质（指数）得分变化折线图</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

// 水质数据
const waterQualityData = ref([
  { label: '温度', value: '15', unit: '°C' },
  { label: '叶绿素a', value: '2.5', unit: 'μg/L' },
  { label: 'PH值', value: '7.2', unit: '' },
  { label: '总氮', value: '1.8', unit: 'mg/L' },
  { label: '溶解氧', value: '6.5', unit: 'mg/L' },
  { label: '总磷', value: '0.3', unit: 'mg/L' },
  { label: '亚硝酸盐', value: '0.02', unit: 'mg/L' },
  { label: '氨氮', value: '0.1', unit: 'mg/L' },
  { label: '铵盐', value: '0.05', unit: 'mg/L' },
  { label: '高锰酸钾', value: '4.0', unit: 'mg/L' },
]);

// 历史数据
const historyData = [
  [14.5, 7.5, 7.4, 2.6, 6.8, 0.42, 0.12, 0.1, 0.35, 3.6], // 第 1 天
  [13.5, 8.5, 7.6, 2.7, 6.5, 0.44, 0.15, 0.12, 0.4, 3.7], // 第 2 天
  [12.5, 9, 7.3, 2.8, 6, 0.46, 0.18, 0.15, 0.45, 3.8],     // 第 3 天
  [13, 8, 7.7, 2.9, 6.2, 0.48, 0.16, 0.13, 0.42, 3.9],    // 第 4 天
  [14, 7, 7.8, 3, 6.7, 0.5, 0.14, 0.11, 0.38, 4],         // 第 5 天
];

// WQIS 值
const wqisValues = [61, 64, 74, 81, 87]; // 第 1 天到第 5 天的 WQIS 值

// WQIS 值
const wqisValue = ref(85); // 默认 WQIS 值

// 日期选择器相关
const showDatePicker = ref(false);
const selectedDate = ref('');
const today = new Date(); // 动态获取当前日期
const maxDate = ref(today.toISOString().split('T')[0]); // 最大日期为今天
const minDate = ref(new Date(today.setDate(today.getDate() - 4)).toISOString().split('T')[0]); // 最小日期为 5 天前

// 计算选择的日期对应的数据索引
const selectedIndex = computed(() => {
  if (!selectedDate.value) return -1; // 如果没有选择日期，返回 -1
  const date = new Date(selectedDate.value);
  const diffInDays = Math.floor((new Date() - date) / (1000 * 60 * 60 * 24)); // 动态计算日期差
  return diffInDays;
});

// 更新数据
const updateData = () => {
  const index = selectedIndex.value;
  if (index >= 0 && index < historyData.length) {
    const data = historyData[index];
    waterQualityData.value.forEach((item, i) => {
      item.value = data[i];
    });
        // 更新 WQIS 值
        wqisValue.value = wqisValues[index];
  }
};

// 显示今日数据
const showTodayData = () => {
  showDatePicker.value = false;
  waterQualityData.value = [
    { label: '温度', value: '15', unit: '°C' },
    { label: '叶绿素a', value: '2.5', unit: 'μg/L' },
    { label: 'PH值', value: '7.2', unit: '' },
    { label: '总氮', value: '1.8', unit: 'mg/L' },
    { label: '溶解氧', value: '6.5', unit: 'mg/L' },
    { label: '总磷', value: '0.3', unit: 'mg/L' },
    { label: '亚硝酸盐', value: '0.02', unit: 'mg/L' },
    { label: '氨氮', value: '0.1', unit: 'mg/L' },
    { label: '铵盐', value: '0.05', unit: 'mg/L' },
    { label: '高锰酸钾', value: '4.0', unit: 'mg/L' },
  ];
   // 重置 WQIS 值为默认值
   wqisValue.value = 85;
};

// 显示历史数据
const showHistoryData = () => {
  showDatePicker.value = true;
};

// 监听日期选择器的变化
watch(selectedDate, () => {
  updateData();
});
</script>
  
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
    padding: 16px;
    margin-bottom: 16px;
    box-shadow: 7px 8px 7px 3px white;
  }
  
  .data-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  
  .data-item {
    display: flex;
    justify-content: space-between;
    padding: 8px;
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
    font-size: 8px;
    text-align: left;
    margin-bottom: 16px;
    height: 6px;
    width: 33%;
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