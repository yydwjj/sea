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
<!--      <div class="chart-title">水质（指数）得分变化折线图</div>-->
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

// 固定历史数据
const historyData = {
  '2024-02-10': { values: [15, 8, 7.5, 2.5, 7, 0.4, 0.1, 0.08, 0.3, 3.5], wqis: 61 },
  '2024-02-11': { values: [14.5, 7.5, 7.4, 2.6, 6.8, 0.42, 0.12, 0.1, 0.35, 3.6], wqis: 64 },
  '2024-02-12': { values: [13.5, 8.5, 7.6, 2.7, 6.5, 0.44, 0.15, 0.12, 0.4, 3.7], wqis: 74 },
  '2024-02-13': { values: [12.5, 9, 7.3, 2.8, 6, 0.46, 0.18, 0.15, 0.45, 3.8], wqis: 81 },
  '2024-02-14': { values: [13, 8, 7.7, 2.9, 6.2, 0.48, 0.16, 0.13, 0.42, 3.9], wqis: 87 },
  '2024-02-15': { values: [14, 7, 7.8, 3, 6.7, 0.5, 0.14, 0.11, 0.38, 4], wqis: 90 },
  '2024-02-16': { values: [15, 6.5, 8.1, 2.8, 7.1, 0.45, 0.13, 0.09, 0.35, 3.7], wqis: 85 }, // 今天
};

// WQIS 值
const wqisValue = ref(85); // 默认 WQIS 值

// 日期选择器相关
const showDatePicker = ref(false);
const selectedDate = ref('');
const today = '2024-02-16'; // 固定今天为 2 月 16 日
const maxDate = ref(today); // 最大日期为今天
const minDate = ref('2024-02-10'); // 最小日期为 2 月 10 日

// 是否显示折线图
const showChart = ref(true); // 默认显示折线图

// 更新数据
const updateData = () => {
  const selectedData = historyData[selectedDate.value];
  if (selectedData) {
    // 更新水质数据
    waterQualityData.value.forEach((item, i) => {
      item.value = selectedData.values[i];
    });
    // 更新 WQIS 值
    wqisValue.value = selectedData.wqis;
  }
  // 只有在选择今天时显示折线图
  showChart.value = selectedDate.value === today;
};

// 显示今日数据
const showTodayData = () => {
  showDatePicker.value = false;
  selectedDate.value = today; // 设置为今天
  updateData(); // 更新数据
};

// 显示历史数据
const showHistoryData = () => {
  showDatePicker.value = true;
};

// 监听日期选择器的变化
watch(selectedDate, () => {
  updateData();
});

// 初始化时显示今天的数据
showTodayData();
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