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
    <!-- 第三个模块：ai模块   -->


  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import { useUserStore } from '../stores/userStore';
import data1 from '../assets/data2.jpg';
import data2 from '../assets/data2.jpg';
import { Icon } from '@iconify/vue';

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
const selectedDate = ref('2025-02-16');
const today = computed(() => isFamer.value ? '2025-02-16' : '2025-02-16');
const maxDate = computed(() => today.value);
const minDate = computed(() => isFamer.value ? '2025-02-16' : '2025-02-10');
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
   AI建议模块
================================ */
// 新增的AI建议相关状态
const isLoading = ref(false)
const errorMessage = ref('')
const suggestion = ref('')
const suggestText = ref(null)
const isExpanded = ref(true);
const isFavorite = ref(false);
const expandedItems = ref([]);
const shouldShowToggle = computed(() => suggestion.value.length > 200);

// 模拟调用DeepSeek API（实际使用时替换为真实API调用）
const generateSuggestion = async () => {
  try {
    isLoading.value = true;
    errorMessage.value = '';
    suggestion.value = '';

    // 调用模拟API
    const mockResponse = await mockDeepSeekApiCall();

    // 处理流式输出
    for await (const char of mockResponse.stream()) {
      suggestion.value += char;

      // 自动滚动到底部
      if (suggestText.value) {
        suggestText.value.scrollTop = suggestText.value.scrollHeight;
      }
    }
  } catch (error) {
    errorMessage.value = '生成建议失败，请稍后重试';
    console.error('模拟API错误:', error);
  } finally {
    isLoading.value = false;
  }
}

// 模拟API响应数据
const mockDeepSeekApiCall = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const fullText = `根据当前水质数据(WQIS值: ${wqisValue.value})分析：
1. 溶解氧水平良好，建议保持当前曝气量
2. pH值略高，建议适量添加pH调节剂
3. 氨氮浓度在安全范围内，但需持续监测
4. 水温适宜当前养殖品种生长

近期建议：
- 未来3天内可进行适量换水(约20%)
- 建议在早晨6-8点投喂饲料
- 检查过滤系统是否正常运行`;

      // 返回一个可以逐个字符读取的生成器函数
      resolve({
        async *stream() {
          const chars = fullText.split('');
          const startTime = Date.now();
          const duration = 1500; // 剩余的1500ms内完成输出

          for (let i = 0; i < chars.length; i++) {
            yield chars[i];

            // 计算已用时间并动态调整间隔
            const elapsed = Date.now() - startTime;
            const remainingChars = chars.length - i - 1;
            if (remainingChars > 0) {
              const delay = Math.max(0, (duration - elapsed) / remainingChars);
              await new Promise(r => setTimeout(r, delay));
            }
          }
        }
      });
    }, 1500); // 初始延迟
  });
}
// 真实的deepseekapi调用
const callRealDeepSeekApi = async () => {
  try {
    const response = await fetch("https://api.deepseek.com", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer `
      },
      body: JSON.stringify({
        model: "deepseek-chat", // 根据API文档指定模型
        messages: [
          {
            role: "system",
            content: "你是一位水产养殖专家，请根据提供的水质数据给出专业建议。"
          },
          {
            role: "user",
            content: `请分析以下水质数据并给出养殖建议：
            WQIS值: ${wqisValue.value}
            详细数据: ${JSON.stringify(waterQualityData.value)}
            
            要求：
            1. 用中文回复
            2. 分点列出关键问题和建议
            3. 包含具体操作指导`
          }
        ],
        stream: true // 启用流式输出
      })
    })

    if (!response.ok) throw new Error(`API请求失败: ${response.status}`)

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let fullResponse = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const chunk = decoder.decode(value)
      // 处理流式数据（不同API返回格式可能不同）
      const lines = chunk.split('\n').filter(line => line.trim() !== '')

      for (const line of lines) {
        if (line.startsWith('data:') && !line.includes('[DONE]')) {
          const data = JSON.parse(line.replace('data: ', ''))
          if (data.choices && data.choices[0].delta.content) {
            fullResponse += data.choices[0].delta.content
            suggestion.value = fullResponse // 实时更新显示
          }
        }
      }
    }
  } catch (error) {
    errorMessage.value = `获取建议失败: ${error.message}`
    console.error('API调用错误:', error)
  } finally {
    isLoading.value = false
  }
}
// 格式化建议内容
const formattedSuggestions = computed(() => {
  if (!suggestion.value) return [];

  // 示例格式 - 实际应根据你的API返回数据结构调整
  return [

    {
      category: 'water',
      title: '水质优化建议',
      content: highlightKeywords('当前水质pH值偏高，建议在早晚时段增加换水量，每次换水不超过总量的20%。')
    },
    {
      category: 'feed',
      title: '投喂管理建议',
      content: highlightKeywords('根据当前水温，建议将每日投喂次数调整为3次，每次投喂量减少15%。')
    },
    {
      category: 'environment',
      title: '养殖环境建议',
      content: highlightKeywords('连续阴雨天气可能导致水温波动，建议使用遮阳网或温控措施稳定水温，减少鱼类应激。')
    },
    {
      category: 'glass',
      title: '水草管理建议',
      content: highlightKeywords('水草过度生长可能影响水体溶氧平衡，建议定期修剪，并适量投放草食性鱼类以维持生态平衡。')
    },
  ];
});

// 高亮关键词
const highlightKeywords = (text) => {
  const keywords = ['增加', '减少', '建议', '改善', '调整'];
  return text.replace(
    new RegExp(keywords.join('|'), 'g'),
    (match) => `<span class="highlight">${match}</span>`
  );
};

// 获取分类图标
const getCategoryIcon = (category) => {
  const icons = {
    water: 'mdi:water',
    feed: 'mdi:fish-food',
    health: 'mdi:medical-bag',
    environment: 'mdi:thermometer',
    glass: 'mdi:grass',
    ill: 'mdi:medical-bag',
    default: 'mdi:lightbulb'
  };
  return icons[category] || icons.default;
};

// 切换单项展开状态
const toggleItem = (index) => {
  const position = expandedItems.value.indexOf(index);
  if (position > -1) {
    expandedItems.value.splice(position, 1);
  } else {
    expandedItems.value.push(index);
  }
};

// 切换收藏状态
const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value;
  // 这里可以添加保存到本地存储的逻辑
};

// 分享功能
const shareSuggestion = () => {
  // 实际实现可以使用Web Share API或其他分享方式
  alert('分享功能已触发，实际应用中这里会调用分享接口');
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
  margin-bottom: 16px;
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

.date-picker {
  background-color: rgb(199, 230, 244);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  /* box-shadow: 7px 8px 7px 3px; */
}

/* 新增的AI建议模块样式 */
.suggest-module {
  background-color: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 7px 8px 2px 3px #c7e6f4;
}

.module-title {
  background-color: rgb(35, 125, 171);
  color: white;
  padding: 5px;
  border-radius: 8px;
  font-size: 11px;
  text-align: left;
  margin-bottom: 16px;
  /* height: 6px; */
  width: 25%;
  font-weight: 600;
  background-color: rgb(50, 161, 218);
  color: white;
  border: none;
  border-radius: 12px;
  /* padding: 8px 16px; */
  /* font-size: 14px; */
  /* font-weight: 600; */
  cursor: pointer;
  transition: background-color 0.3s;
}

.suggest-content {
  min-height: 150px;
  max-height: 300px;
  overflow-y: auto;
  padding: 12px;
  background-color: #f8f8f8;
  border-radius: 8px;
  margin-bottom: 16px;
  white-space: pre-wrap;
  border: 1px solid #c7e6f45c;

}

.suggest-text {
  line-height: 1.6;
  color: #333;
}

.loading-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #666;
}

.loading-dots {
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
}

.dot {
  width: 8px;
  height: 8px;
  margin: 0 4px;
  background-color: rgb(50, 161, 218);
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out both;
}

.dot:nth-child(1) {
  animation-delay: -0.32s;
}

.dot:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes bounce {

  0%,
  80%,
  100% {
    transform: scale(0);
  }

  40% {
    transform: scale(1);
  }
}

.error-message {
  color: #e74c3c;
  text-align: center;
  padding: 16px;
}

.generate-button {
  background-color: rgb(50 161 218);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
}

.generate-button:hover:not(:disabled) {
  background-color: rgb(35, 125, 171);
}

.generate-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

/* AI建议卡片样式 */
.ai-suggestion-card {
  /* background: #e6f2ff; */
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-top: 15px;
  margin-bottom: 60px;
  overflow: hidden;
  transition: all 0.3s ease;
  background-color: rgb(199, 230, 244);
  box-shadow: 7px 8px 7px 3px white;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: rgba(50, 161, 218, 0.1);
  border-bottom: 1px solid rgba(50, 161, 218, 0.2);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.header-icon {
  font-size: 1.2em;
  color: #32a1da;
}

.card-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.header-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  background: transparent;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s;
}

.action-btn:hover {
  background: rgba(0, 0, 0, 0.05);
}

.action-btn.favorite.active {
  color: #ff4081;
}

.action-btn.share {
  color: #32a1da;
}

.card-content {
  padding: 16px;
}

/* 加载状态样式 */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 20px 0;
  color: #666;
}

.loading-animation {
  display: flex;
  gap: 8px;
}

.loading-animation .dot {
  width: 8px;
  height: 8px;
  background: #32a1da;
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out;
}

.loading-animation .dot:nth-child(2) {
  animation-delay: 0.2s;
}

.loading-animation .dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes bounce {

  0%,
  80%,
  100% {
    transform: scale(0);
  }

  40% {
    transform: scale(1);
  }
}

/* 错误状态样式 */
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 20px 0;
  color: #f44336;
}

.error-icon {
  font-size: 2em;
}

.retry-btn {
  background: #32a1da;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
}

/* 建议内容样式 */
.suggestion-item {
  margin-bottom: 12px;
  border-radius: 8px;
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.suggestion-header {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  transition: background 0.2s;
}

.suggestion-header:hover {
  background: rgba(50, 161, 218, 0.05);
}

.category-icon {
  margin-right: 10px;
  color: #32a1da;
  font-size: 1.2em;
}

.suggestion-title {
  margin: 0;
  flex-grow: 1;
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.toggle-icon {
  color: #999;
  transition: transform 0.3s;
}

.suggestion-details {
  max-height: 0;
  overflow: hidden;
  padding: 0 16px;
  transition: all 0.3s ease;
  font-size: 13px;
  line-height: 1.6;
  color: #666;
}

.suggestion-details.expanded {
  max-height: 500px;
  padding: 0 16px 12px;
}

.highlight {
  color: #4CAF50;
  font-weight: 500;
}

/* 生成按钮样式 */
.generate-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px;
  background: #32a1da;
  color: white;
  border: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.generate-btn:hover:not(:disabled) {
  background: #2a8fc7;
}

.generate-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>