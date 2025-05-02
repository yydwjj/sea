<template>
  <div class="monitor-container">
    <div class="header">
      <span class="date">{{ currentDate }}</span>
      <div class="header-buttons">
        <button class="history-button" @click="showHistory =!showHistory">历史记录</button>
      </div>
    </div>
    <div v-if="!showHistory" class="video-list">
      <div v-for="(video, index) in videos" :key="index" class="video-item">
        <span class="video-name">水域{{ index + 1 }}</span>
        <video :src="video.src" alt="水域视频" class="video-img" controls autoplay/>

        <!-- <div class="video-wrapper">
          <video 
            :src="video.src" 
            id="video"
            type="application/x-mpegURL"
            class="video-img" 
            autoplay 
            playsinline
            muted
            @waiting="handleVideoEvent($event, index)"
            @playing="handleVideoEvent($event, index)"
            @error="handleVideoEvent($event, index)"
            @ended="handleVideoEvent($event, index)"
          />
          优化后的加载状态提示 
          <transition name="fade">
            <div v-if="video.isLoading" class="loading-indicator">
              <div class="loader">
                <div class="dot-flashing"></div>
              </div>
              <span>加载中</span>
            </div>
          </transition>
          
           优化后的错误提示 
          <transition name="fade">
            <div v-if="video.hasError" class="error-indicator">
              <Icon icon="mdi:alert-circle" width="1.5em" height="1.5em" />
              <span>加载失败</span>
              <button @click="refreshVideo" class="retry-btn">
                <Icon icon="mdi:refresh" width="1em" height="1em" />
                重试
              </button>
            </div>
          </transition>
        </div> -->
        <!-- <button class="refresh-button" @click="refreshVideo">
          <Icon icon="mdi:refresh" width="1.2em" height="1.2em" />
          获取最新数据
        </button> -->
      </div>
      <!-- 第三个模块：ai模块   -->
      <div class="ai-suggestion-card" :class="{ 'expanded': isExpanded }">
        <div class="card-header">
          <div class="header-left">
            <Icon icon="mdi:robot" class="header-icon" />
            <h3 class="card-title">AI养殖建议</h3>
            <button v-if="shouldShowToggle" class="toggle-btn" @click="isExpanded = !isExpanded">
              <Icon :icon="isExpanded ? 'mdi:chevron-up' : 'mdi:chevron-down'" />
            </button>
          </div>
          <div class="header-actions">
            <button class="action-btn favorite" :class="{ 'active': isFavorite }" @click="toggleFavorite" title="收藏建议">
              <Icon :icon="isFavorite ? 'mdi:heart' : 'mdi:heart-outline'" />
            </button>
            <button class="action-btn share" @click="shareSuggestion" title="分享建议">
              <Icon icon="mdi:share-variant" />
            </button>
          </div>
        </div>

        <div class="card-content">
          <div v-if="isLoading" class="loading-state">
            <div class="loading-animation">
              <div class="dot"></div>
              <div class="dot"></div>
              <div class="dot"></div>
            </div>
            <span>AI正在分析数据并生成建议...</span>
          </div>

          <div v-else-if="errorMessage" class="error-state">
            <Icon icon="mdi:alert-circle" class="error-icon" />
            <p>{{ errorMessage }}</p>
            <button class="retry-btn" @click="generateSuggestion">重试</button>
          </div>

          <div v-else class="suggestion-content">
            <div v-for="(item, index) in formattedSuggestions" :key="index" class="suggestion-item">
              <div class="suggestion-header" @click="toggleItem(index)">
                <Icon :icon="getCategoryIcon(item.category)" class="category-icon" />
                <h4 class="suggestion-title">{{ item.title }}</h4>
                <Icon :icon="expandedItems.includes(index) ? 'mdi:chevron-up' : 'mdi:chevron-down'" class="toggle-icon" />
              </div>
              <div class="suggestion-details" :class="{ 'expanded': expandedItems.includes(index) }"
                v-html="item.content"></div>
            </div>
          </div>
        </div>

        <button class="generate-btn" @click="generateSuggestion" :disabled="isLoading">
          <Icon icon="mdi:lightbulb-on" />
          {{ isLoading ? 'AI思考中...' : '获取最新建议' }}
        </button>
      </div>
    </div>
    <div v-if="showHistory" class="history-content">
      <p>历史记录内容待展示</p>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue';
import { computed, watch, onMounted, onBeforeUnmount } from 'vue';
import f1 from '../assets/f1.mp4'
import f2 from '../assets/f2.mp4'
import { Icon } from '@iconify/vue';
import { useUserStore } from '../stores/userStore'; 

// 当前日期
const currentDate = ref(new Date().toISOString().split('T')[0]);
// 是否显示历史记录
const showHistory = ref(false);
// 视频数据
const videos = ref([
  { src: f1},
  { src: f2 },
]);

  // { 
  //   src: 'http://124.221.164.16:8081/video',
  //   // src: 'http://127.0.0.1:8081/video',
  //   isLoading: true,
  //   hasError: false,
  //   buffered: 0
  // }
// ]);



const refreshVideo = async () => {
  const videoIndex = 0; // 如果是多个视频，可以改为参数
  videos.value[videoIndex].isLoading = true;
  videos.value[videoIndex].hasError = false;
  
  try {
    const timestamp = new Date().getTime();
    videos.value[videoIndex].src = `http://124.221.164.16:8081/video?t=${timestamp}`;
    // videos.value[videoIndex].src = `http://127.0.0.1:8081/video?t=${timestamp}`;
    
    // 等待视频元素更新
    await nextTick();
  } catch (error) {
    videos.value[videoIndex].hasError = true;
    videos.value[videoIndex].isLoading = false;
    console.error('加载失败:', error);
  }
};

const handleVideoEvent = (event, index) => {
  const video = videos.value[index];
  switch(event.type) {
    case 'waiting':
      video.isLoading = true;
      break;
    case 'playing':
      video.isLoading = false;
      video.hasError = false;
      break;
    case 'error':
      video.isLoading = false;
      video.hasError = true;
      break;
    case 'ended':
      refreshVideo(); // 视频结束时自动刷新
      break;
  }
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
      const fullText = `根据当前水质数据分析：
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
        'Authorization': `Bearer sk-4bf9825a694542e29b2a0ba368e0cf1d`
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
      category: 'health',
      title: '鱼类健康建议',
      content: highlightKeywords('监测到氨氮值轻微升高，建议添加益生菌制剂改善水体环境。')
    },
    {
      category: 'ill',
      title: '疾病防控建议',
      content: highlightKeywords('近期鱼群摄食减少，部分鱼体出现轻微充血症状，建议加强监测，适量添加中草药制剂提高鱼体免疫力。')
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
</script>

<style scoped>
.monitor-container {
  text-align: center;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.header-buttons {
  display: flex;
  gap: 10px;
}

.refresh-button {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background-color: rgb(50, 161, 218);;
  color: white;
  cursor: pointer;
  border: none;
  border-radius: 12px;
  padding: 1px 7px;
  font-size: 14px;
  font-weight: 600;
  margin-top: 10px;
}

.refresh-button:hover {
  background-color: rgb(50, 161, 218);;
}
.date {
  background-color: rgb(50, 161, 218);
    color: white;
    border: none;
    border-radius: 12px;
    padding: 1px 7px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s;
}

.history-button {
  background-color: rgb(50, 161, 218);
    color: white;
    border: none;
    border-radius: 12px;
    padding: 1px 7px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s;
}

.video-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.video-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.video-name {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}
.video-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}
.video-img {
  width: 300px;
  height: 200px;
  object-fit: cover;
  background-color: #ccc;
}

.history-content {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.monitor-img {
  margin-top: 20px;
  max-width: 100%;
  height: auto;
}
.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  color: white;
}

.video-overlay.error {
  background: rgba(255, 0, 0, 0.3);
}

.loading-spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 4px solid white;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  margin-bottom: 10px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.buffer-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 2;
}

.loading-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
}

.error-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 0, 0, 0.3);
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
}

.error-text button {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 2px 8px;
  margin-left: 5px;
  border-radius: 3px;
  cursor: pointer;
}
/* 新增动画效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 优化加载指示器 */
.loading-indicator {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 15px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* 时尚的点状加载动画 */
.dot-flashing {
  position: relative;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #32a1da;
  color: #32a1da;
  animation: dotFlashing 1s infinite linear alternate;
  animation-delay: 0.5s;
  margin-bottom: 10px;
}

.dot-flashing::before,
.dot-flashing::after {
  content: "";
  display: inline-block;
  position: absolute;
  top: 0;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #32a1da;
  color: #32a1da;
}

.dot-flashing::before {
  left: -15px;
  animation: dotFlashing 1s infinite alternate;
  animation-delay: 0s;
}

.dot-flashing::after {
  left: 15px;
  animation: dotFlashing 1s infinite alternate;
  animation-delay: 1s;
}

@keyframes dotFlashing {
  0% {
    background-color: #32a1da;
  }
  50%,
  100% {
    background-color: rgba(50, 161, 218, 0.2);
  }
}

/* 优化错误提示 */
.error-indicator {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(214, 48, 49, 0.8);
  color: white;
  padding: 12px 18px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.retry-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}

.retry-btn:hover {
  background: rgba(255, 255, 255, 0.3);
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