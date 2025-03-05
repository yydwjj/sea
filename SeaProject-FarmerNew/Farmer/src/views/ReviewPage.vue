<template>
  <!-- 商品评价详情页 -->
  <div class="review-container">
    <!-- 导航栏 -->
    <div class="review-header">
      <div class="nav-back" @click="goBack">
        <Icon icon="material-symbols:chevron-left-rounded" width="2em" height="2em" />
      </div>
      <h2 class="header-title">商品评价（{{ totalComments }}）</h2>
    </div>

    <!-- 评价概览 -->
<!--    <div class="review-overview">-->
<!--      <div class="overview-left">-->
<!--        <div class="total-score">{{ averageRating }}</div>-->
<!--        <div class="score-text">综合评分</div>-->
<!--        <RateDisplay :rating="averageRating" />-->
<!--      </div>-->
<!--      <div class="overview-right">-->
<!--        <div class="score-item" v-for="(item, index) in ratingDistribution" :key="index">-->
<!--          <span class="score-label">{{ item.label }}</span>-->
<!--          <div class="progress-bar">-->
<!--            <div class="progress-inner" :style="{ width: item.percentage + '%' }"></div>-->
<!--          </div>-->
<!--          <span class="percentage">{{ item.percentage }}%</span>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->

    <!-- 筛选标签 -->
    <div class="filter-tags">
      <span
          v-for="tag in filterTags"
          :key="tag.value"
          :class="['tag', { 'active': activeFilter === tag.value }]"
          @click="toggleFilter(tag.value)"
      >
        {{ tag.label }}（{{ tag.count }}）
      </span>
    </div>

    <!-- 评价列表 -->
    <div class="comment-list">
      <div
          class="comment-item"
          v-for="(comment, index) in filteredComments"
          :key="index"
      >
        <div class="user-info">
          <div class="avatar">{{ comment.reviewer.slice(0, 2) }}</div>
          <div class="name-rating">
            <div class="username">{{ comment.reviewer }}</div>
            <RateDisplay :rating="comment.rating" />
          </div>
          <div class="comment-date">2024-03-15</div>
        </div>
        <div class="comment-content">
          {{ comment.content }}
          <div class="comment-images" v-if="comment.image">
            <img
                v-for="(img, imgIndex) in comment.image.split(',')"
                :key="imgIndex"
                :src="img"
                class="comment-img"
            />
          </div>
        </div>
        <div class="comment-actions">
          <span class="purchase-info">购买数量：{{ comment.purchaseQuantity }}{{ comment.unit }}</span>
          <div class="action-buttons">
            <button class="like-btn">
              <Icon icon="akar-icons:heart" /> {{ comment.likes }}
            </button>
<!--            <button class="reply-btn">回复</button>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'

import r1 from '../assets/r (1).jpg'
import r2 from '../assets/r (2).jpg'
import r3 from '../assets/r (3).jpg'
import r4 from '../assets/r (4).jpg'
import r5 from '../assets/r (5).jpg'

const router = useRouter()

// 模拟数据
const totalComments = ref(156)
const averageRating = ref(4.8)
const activeFilter = ref('all')

const filterTags = ref([
  { label: '全部', value: 'all', count: 156 },
  { label: '好评', value: 'good', count: 148 },
  { label: '中评', value: 'medium', count: 6 },
  { label: '差评', value: 'bad', count: 2 },
  { label: '有图', value: 'hasImage', count: 32 }
])

const ratingDistribution = ref([
  { label: '5星', percentage: 85 },
  { label: '4星', percentage: 12 },
  { label: '3星', percentage: 2 },
  { label: '2星', percentage: 0.8 },
  { label: '1星', percentage: 0.2 }
])

// 扩展后的评论数据
const comments = ref([
  // 原有4条保持不变
  {
    reviewer: '李**',
    purchaseQuantity: 3,
    content: '食材很新鲜，大小也合适，下次还会购买。物流速度超快！',
    image: r1,
    unit: '斤',
    rating: 5,
    likes: 12,
  },
  {
    reviewer: '王**',
    purchaseQuantity: 2,
    content: '包装有些破损，但商品质量还可以',
    image: '',
    unit: '斤',
    rating: 3,
    likes: 2
  },
  {
    reviewer: '张**',
    purchaseQuantity: 1,
    content: '收到的商品与描述不符',
    image: '',
    unit: '斤',
    rating: 1,
    likes: 0
  },
  {
    reviewer: '程**',
    purchaseQuantity: 5,
    content: '与描述一致，服务态度好，发货快，商品新鲜，认真负责。',
    image: r3,
    unit: '斤',
    rating: 4,
    likes: 8
  },

  // 新增8条
  {
    reviewer: '赵**',
    purchaseQuantity: 2,
    content: '螃蟹个头比预期的稍小，但活力十足值得肯定',
    image: r5,
    unit: '斤',
    rating: 4,
    likes: 6
  },
  {
    reviewer: '孙**',
    purchaseQuantity: 4,
    content: '冷冻包装专业，解冻后肉质依然紧实',
    image: r4,
    unit: '箱',
    rating: 5,
    likes: 15
  },
  {
    reviewer: '周**',
    purchaseQuantity: 1,
    content: '部分鱼鳞脱落影响品相，但口感不受影响',
    image: '',
    unit: '条',
    rating: 3,
    likes: 3
  },
  {
    reviewer: '吴**',
    purchaseQuantity: 3,
    content: '快递延误导致冰块融化，客服处理很及时',
    image: r2,
    unit: '盒',
    rating: 4,
    likes: 9
  },
  {
    reviewer: '徐**',
    purchaseQuantity: 2,
    content: '有明显土腥味，不适合清蒸做法',
    image: '',
    unit: '斤',
    rating: 2,
    likes: 1
  },
  {
    reviewer: '黄**',
    purchaseQuantity: 5,
    content: '批量采购价格优惠，供应商服务专业',
    image: r1,
    unit: '箱',
    rating: 5,
    likes: 20
  },
  {
    reviewer: '林**',
    purchaseQuantity: 1,
    content: '缺斤少两问题严重，已申请退货',
    image: r5,
    unit: '斤',
    rating: 1,
    likes: 0
  },
  {
    reviewer: '马**',
    purchaseQuantity: 2,
    content: '普通水准，没有特别惊喜但也没有问题',
    image: '',
    unit: '份',
    rating: 3,
    likes: 2
  }
]);

// 计算属性
const filteredComments = computed(() => {
  return comments.value.filter(comment => {
    switch(activeFilter.value) {
      case 'all':
        return true
      case 'hasImage':
        return comment.image
      case 'good': // 好评（4-5星）
        return comment.rating >= 4
      case 'medium': // 中评（3星）
        return comment.rating === 3
      case 'bad': // 差评（1-2星）
        return comment.rating <= 2
      default:
        return true
    }
  })
})

// 方法
const toggleFilter = (filter) => {
  activeFilter.value = filter
}

const goBack = () => {
  router.back()
}
</script>

<style scoped>
.review-container {
  background: #f5f5f5;
  min-height: 100vh;
}

/* 头部样式 */
.review-header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 50px;
  background: #fff;
  display: flex;
  align-items: center;
  padding: 0 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  z-index: 100;
}

.nav-back {
  color: #666;
  padding: 8px;
}

.header-title {
  font-size: 18px;
  margin-left: 15px;
}

/* 评分概览 */
.review-overview {
  margin-top: 50px;
  padding: 20px;
  background: #fff;
  display: flex;
}

.overview-left {
  width: 40%;
  text-align: center;
  border-right: 1px solid #eee;
}

.total-score {
  font-size: 32px;
  color: #ff5722;
  font-weight: bold;
}

.score-text {
  color: #666;
  margin: 8px 0;
}

.overview-right {
  width: 60%;
  padding-left: 20px;
}

.score-item {
  display: flex;
  align-items: center;
  margin: 8px 0;
}

.score-label {
  width: 40px;
  color: #666;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background: #eee;
  border-radius: 4px;
  margin: 0 10px;
}

.progress-inner {
  height: 100%;
  background: #ffb74d;
  border-radius: 4px;
}

.percentage {
  width: 40px;
  text-align: right;
  color: #666;
}

/* 筛选标签 */
.filter-tags {
  padding: 12px;
  background: #fff;
  margin-top: 50px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  padding: 6px 12px;
  border: 1px solid #eee;
  border-radius: 15px;
  font-size: 12px;
  color: #666;
}

.tag.active {
  background: #e3f2fd;
  border-color: #50b7eb;
  color: #50b7eb;
}

/* 评论列表 */
.comment-list {
  padding: 12px;
}

.comment-item {
  background: #fff;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background: #50b7eb;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
}

.name-rating {
  flex: 1;
}

.username {
  color: #333;
  font-weight: 500;
}

.comment-date {
  color: #999;
  font-size: 12px;
}

.comment-content {
  color: #333;
  line-height: 1.6;
}

.comment-images {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-top: 12px;
}

.comment-img {
  width: 100%;
  height: 100px;
  border-radius: 4px;
  object-fit: cover;
}

.comment-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  color: #999;
  font-size: 12px;
}

.action-buttons {
  display: flex;
  gap: 12px;
}

.like-btn, .reply-btn {
  border: 1px solid #eee;
  border-radius: 15px;
  padding: 4px 12px;
  background: #fff;
  display: flex;
  align-items: center;
  gap: 4px;
}

.reply-btn {
  color: #50b7eb;
  border-color: #50b7eb;
}
</style>