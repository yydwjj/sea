<template>
    <div class="recipe-container">
      <!-- 搜索栏 -->
      <div class="search-bar">
        <el-input
          v-model="searchText"
          placeholder="搜索菜谱"
          class="search-input"
          clearable
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
      </div>
  
      <!-- 分类标签 -->
      <div class="category-tags">
        <el-scrollbar>
          <div class="tags-container">
            <el-tag
              v-for="(tag, index) in tags"
              :key="index"
              :type="activeTag === tag ? 'primary' : 'info'"
              @click="handleTagClick(tag)"
            >
              {{ tag }}
            </el-tag>
          </div>
        </el-scrollbar>
      </div>
  
      <!-- 菜谱列表 -->
      <div class="recipe-list">
        <el-card
          v-for="recipe in filteredRecipes"
          :key="recipe.id"
          class="recipe-card"
        >
          <div class="recipe-content">
            <img :src="recipe.image" class="recipe-image" />
            <div class="recipe-info">
              <h3>{{ recipe.title }}</h3>
              <div class="stats">
                <span><el-icon><Star /></el-icon> {{ recipe.likes }}</span>
                <span><el-icon><ChatDotRound /></el-icon> {{ recipe.comments }}</span>
              </div>
              <div class="author">
                <el-avatar :src="recipe.author.avatar" size="small" />
                <span>{{ recipe.author.name }}</span>
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import { Search, Star, ChatDotRound } from '@element-plus/icons-vue'
  
  // 数据
  const searchText = ref('')
  const activeTag = ref('全部')
  
  const tags = ref(['全部', '家常菜', '烘焙', '快手菜', '减肥餐', '早餐'])
//   const recipes = ref([
//     // 示例数据
//     {
//       id: 1,
//       title: '红烧肉',
//       image: 'https://via.placeholder.com/100',
//       likes: 128,
//       comments: 56,
//       author: {
//         name: '美食达人',
//         avatar: 'https://via.placeholder.com/40'
//       }
//     }
//     // 更多菜谱数据...
//   ])

  const recipes = ref([
    {
        id: 1,
        title: '清蒸鲈鱼',
        likes: 128,
        comments: 56,
        author: {
        name: '美食达人',
        avatar: 'https://rjt666.github.io/sea/meishidaren.jpg'
        },
        category: ['鱼类', '清蒸', '中式', '家常菜', '初级'],
        image: 'https://rjt666.github.io/sea/qingzhengluyu.jpg',
        description: '清蒸鲈鱼是一道经典的中式家常菜，鲜嫩多汁，简单易做。'
    },
    {
        id: 2,
        title: '香煎三文鱼',
        likes: 98,
        comments: 45,
        author: {
        name: '西餐大厨',
        avatar: 'https://rjt666.github.io/sea/xicandachu.jpg'
        },
        category: ['鱼类', '煎炸', '西式', '健康餐', '中级'],
        image: 'https://rjt666.github.io/sea/xiangjiansanwenyu.jpg',
        description: '香煎三文鱼外酥里嫩，搭配柠檬汁，口感清新。'
    },
    {
        id: 3,
        title: '蒜蓉粉丝蒸扇贝',
        likes: 112,
        comments: 67,
        author: {
        name: '海鲜爱好者',
        avatar: 'https://rjt666.github.io/sea/haixianaihaozhe.jpg'
        },
        category: ['贝类', '清蒸', '中式', '宴客菜', '中级'],
        image: 'https://rjt666.github.io/sea/suanrongshanbei.jpg',
        description: '蒜蓉粉丝蒸扇贝，鲜香四溢，适合宴客。'
    },
    {
        id: 4,
        title: '泰式酸辣虾',
        likes: 85,
        comments: 32,
        author: {
        name: '东南亚美食家',
        avatar: 'https://rjt666.github.io/sea/dongnanyameishijia.png'
        },
        category: ['虾类', '凉拌', '东南亚风味', '快手菜', '初级'],
        image: 'https://rjt666.github.io/sea/taishisuanlaxia.jpg',
        description: '泰式酸辣虾，酸辣开胃，适合夏天食用。'
    },
    {
        id: 5,
        title: '红烧鲍鱼',
        likes: 143,
        comments: 78,
        author: {
        name: '传统美食家',
        avatar: 'https://rjt666.github.io/sea/chuantongmeishijia.jpg'
        },
        category: ['其他', '红烧', '中式', '宴客菜', '高级'],
        image: 'https://rjt666.github.io/sea/hongshaobaoyu.jpg',
        description: '红烧鲍鱼，口感软糯，味道浓郁，适合节日宴请。'
    }
    ]);
  
  // 计算属性
  const filteredRecipes = computed(() => {
    return recipes.value.filter(recipe => {
      const matchesSearch = recipe.title.includes(searchText.value)
      const matchesTag = activeTag.value === '全部' || 
        recipe.tags?.includes(activeTag.value)
      return matchesSearch && matchesTag
    })
  })
  
  // 方法
  const handleTagClick = (tag) => {
    activeTag.value = tag
  }
  </script>

  <style scoped>
  .recipe-container {
    padding: 16px;
  }
  
  .search-bar {
    margin-bottom: 16px;
  }
  
  .category-tags {
    margin-bottom: 16px;
  }
  
  .tags-container {
    display: flex;
    gap: 8px;
    padding-bottom: 8px;
  }
  
  .recipe-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .recipe-card {
    cursor: pointer;
  }
  
  .recipe-content {
    display: flex;
    gap: 12px;
  }
  
  .recipe-image {
    width: 80px;
    height: 80px;
    border-radius: 8px;
    object-fit: cover;
  }
  
  .recipe-info {
    flex: 1;
  }
  
  .stats {
    display: flex;
    gap: 12px;
    margin: 4px 0;
    color: #666;
    font-size: 14px;
  }
  
  .author {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 4px;
  }
  </style>