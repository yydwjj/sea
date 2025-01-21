<template>
    <div class="water-quality-container">
      <el-card>
        <template #header>
          <h2>水质指数计算</h2>
        </template>
        
        <el-form :model="form" label-width="120px">
          <el-form-item label="DO">
            <el-input-number v-model="form.DO" :min="0" :step="0.1" />
          </el-form-item>
          <el-form-item label="BOD">
            <el-input-number v-model="form.BOD" :min="0" :step="0.1" />
          </el-form-item>
          <el-form-item label="NH4">
            <el-input-number v-model="form.NH4" :min="0" :step="0.1" />
          </el-form-item>
          <el-form-item label="TP">
            <el-input-number v-model="form.TP" :min="0" :step="0.1" />
          </el-form-item>
          <el-form-item label="石油类">
            <el-input-number v-model="form.oil" :min="0" :step="0.1" />
          </el-form-item>
          
          <el-form-item>
            <el-button type="primary" @click="calculateWQIS">计算</el-button>
          </el-form-item>
        </el-form>
  
        <el-result v-if="result" icon="success" title="计算结果">
            <template #extra>
                <p>水质指数 (WQIS): {{ result.wqis.toFixed(4) }}</p>
                
                <!-- 水质建议 -->
                <el-alert 
                    :title="result.advice.title"
                    :type="result.advice.type"
                    :description="result.advice.description"
                    show-icon
                    class="advice-container"
                />

                <!-- 详细权重表格 -->
                <el-descriptions :column="1" border>
                    <el-descriptions-item 
                    v-for="(weight, index) in result.weights" 
                    :key="index"
                    :label="`${['DO', 'BOD', 'NH4', 'TP', '石油类'][index]} 权重`"
                    >
                    {{ weight.toFixed(4) }}
                    </el-descriptions-item>
                </el-descriptions>
            </template>
        </el-result>
      </el-card>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const form = ref({
    DO: 0,
    BOD: 0,
    NH4: 0,
    TP: 0,
    oil: 0
  })

  const result = ref(null)
  
  const getWaterQualityAdvice = (wqis) => {
    if (wqis < 0.3) {
        return {
        title: '水质优秀',
        type: 'success',
        description: '当前水质状况非常好，建议继续保持。可以适当增加水生生物养殖密度。'
        }
    } else if (wqis < 0.6) {
        return {
        title: '水质良好',
        type: 'info',
        description: '水质状况良好，但部分指标需要关注。建议定期监测，注意控制污染源。'
        }
    } else if (wqis < 0.8) {
        return {
        title: '水质一般',
        type: 'warning',
        description: '水质状况一般，存在一定污染风险。建议加强水质管理，减少污染物排放。'
        }
    } else {
        return {
        title: '水质较差',
        type: 'error',
        description: '水质状况较差，存在严重污染风险。建议立即采取措施改善水质，排查污染源。'
        }
    }
    }

  const calculateWQIS = () => {
    const data = Object.values(form.value)
    
    // 1. 数据标准化（极差标准化）
    const normalizedData = data.map(value => value / 100)
    
    // 2. 计算指标比重
    const sum = normalizedData.reduce((acc, val) => acc + val, 0)
    const p = normalizedData.map(value => value / sum)
    
    // 3. 计算信息熵
    const k = 1 / Math.log(normalizedData.length)
    const E = p.map(pj => -k * pj * Math.log(pj))
    
    // 4. 计算信息效用值
    const d = E.map(ej => 1 - ej)
    
    // 5. 计算权重
    const sumD = d.reduce((acc, val) => acc + val, 0)
    const weights = d.map(dj => dj / sumD)
    
    // 6. 计算水质指数
    const wqis = normalizedData.reduce((acc, val, index) => 
        acc + val * weights[index], 0)
    
    result.value = {
        wqis,
        weights,
        advice: getWaterQualityAdvice(wqis)
    }
    }
  </script>
  
  <style scoped>
  .water-quality-container {
    max-width: 800px;
    margin: 20px auto;
  }
  .advice-container {
    margin: 20px 0;
    }
  </style>