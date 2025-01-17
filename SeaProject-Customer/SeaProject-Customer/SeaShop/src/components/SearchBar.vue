<template>
    <div class="search-container">
      <el-input
        v-model="searchText"
        placeholder="请输入搜索内容"
        class="search-input"
        clearable
      >
        <template #prepend>
          <el-select
            v-model="sortType"
            placeholder="排序"
            style="width: 110px"
            @change="handleSearch"
          >
            <el-option
              v-for="item in sortOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template>
        <template #append>
          <el-button
            :icon="Search"
            @click="handleSearch"
            class="search-button"
          />
        </template>
      </el-input>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { Search } from '@element-plus/icons-vue'
  
  const searchText = ref('')
  const sortType = ref('')
  const sortOptions = ref([
    { value: 'distance', label: '距离' },
    { value: 'price', label: '价格' },
    { value: 'sales', label: '销量' }
  ])
  
  const emit = defineEmits(['search'])
  
  const handleSearch = () => {
    emit('search', {
      text: searchText.value,
      sort: sortType.value
    })
  }
  </script>
  
  <style scoped>
  .search-container {
    margin-bottom: 24px;
    max-width: 800px; /* 增加最大宽度 */
    margin: 0 auto; /* 居中 */
  }
  
  .search-input {
    width: 100%;
  }
  
  移除搜索按钮的边框和背景
  :deep(.search-button) {
    border: none;
    background: none;
    padding: 0 12px;
  }
  
  /* 使输入框和按钮视觉上更统一
  :deep(.el-input-group__append) {
    background-color: transparent;
    border: none;
    padding: 0;
  } */
  
  /* :deep(.el-input-group__prepend) {
    background-color: transparent;
    border: none;
    padding: 0 12px;
  } */
  
  /* :deep(.el-input__inner) {
    border-radius: 20px;
    padding-left: 16px;
    padding-right: 16px;
  } */
  
  /* 使整个搜索框看起来更统一 */
  /* :deep(.el-input-group) {
    border-radius: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border: 1px solid #dcdfe6;
  } */
  
  :deep(.el-input-group:hover) {
    border-color: #409EFF;
  }
  </style>