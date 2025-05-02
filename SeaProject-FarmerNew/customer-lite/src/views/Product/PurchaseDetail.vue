<template>
  <div class="product-detail">
    <!-- 返回按钮 -->
    <div class="back-button" @click="goBack">
      <Icon icon="material-symbols:chevron-left-rounded" width="4em" height="4em" />
      <!-- <span><</span> -->
    </div>
    <!-- 商品图片 -->
    <div class="product-image-large">
      <img :src="currentProduct.image" :alt="currentProduct.name" />
    </div>
    <!-- 商品信息 -->
    <div class="product-info-detail">
      <div class="product-price">￥{{ currentProduct.price }}</div>
      <div class="product-name">{{ currentProduct.name }}</div>
      <div class="product-evaluation" @click="gotosee">
        <!-- <Icon icon="akar-icons:heart" width="2em" height="2em" /> -->
        <svg t="1740031146812" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="10492" width="128" height="128">
          <path
            d="M511.928 256.181A214.74 214.74 0 0 1 850.99 431.22c0 91.576-54.337 175.327-116.934 238.069-53.033 53.178-128.815 107.515-200.684 131.423l-17.823 5.94a10.578 10.578 0 0 1-7.1 0l-17.823-5.94c-72.449-23.908-147.651-78.245-200.684-131.423-62.597-62.742-116.934-146.348-116.934-238.07a214.74 214.74 0 0 1 339.063-175.037z m0 59.843a169.532 169.532 0 0 0-293.855 115.92c0 78.824 50.135 152.288 103.747 206.046 47.962 48.106 117.948 98.82 183.008 120.555l7.1 2.319 7.1-2.319c64.914-21.734 135.045-72.45 183.007-120.555 53.612-53.758 103.747-127.367 103.747-206.047a169.532 169.532 0 0 0-293.854-115.919z"
            fill="#32A890" p-id="10493"></path>
          <path
            d="M636.25 284.436a146.927 146.927 0 0 1 146.928 146.928c0 135.625-170.4 271.54-271.25 305.157-101.43-33.617-271.251-169.532-271.251-305.157a146.927 146.927 0 0 1 271.25-78.39 146.783 146.783 0 0 1 124.324-68.538z"
            fill="#E5F8F6" p-id="10494"></path>
        </svg>

        <span class="evalutation-title">健康评级</span>
        <div>{{ currentProduct.evaluation }}</div>
        <Icon icon="akar-icons:chevron-right" width="2em" height="2em" style="position: absolute;right: 18px;" />
      </div>
      <div class="product-tags">
        <span v-for="tag in currentProduct.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
      <!-- <div class="product-description">{{ currentProduct.description }}</div> -->
      <div class="user-reviews">
        <!-- <div class="review-title">用户评价（{{ currentProduct.reviews.length }}）</div> -->
        <div class="review-title-container" @click="goToReviews">
          <div class="review-title">评价（15）</div>
          <div class="review-rate">好评率 {{ currentProduct.reviewRate }}% ></div>
        </div>
        <div class="review-item" v-for="(review, index) in currentProduct.reviews" :key="index">
          <div class="reviewer">{{ review.reviewer }}</div>
          <div class="purchase-quantity">购买数量：{{ review.purchaseQuantity }} {{ currentProduct.unit }}</div>
          <div class="review-content">{{ review.content }}</div>
          <div v-if="review.image" class="review-image">
            <img :src="review.image" :alt="review.reviewer" />
          </div>
        </div>
      </div>
    </div>
    <!-- 交互按钮 -->
    <div class="action-buttons">
      <button class="chat-button" @click="chatWithSeller">
        <Icon icon="akar-icons:chat-dots" width="2em" height="2em" />
        <span>聊一聊</span>
      </button>
      <button class="call-button" @click="callSeller">
        <Icon icon="akar-icons:phone" width="2em" height="2em" />
        <span>打电话</span>
      </button>
      <button class="add-to-cart-button" @click="addToCart">
        <!-- <Icon icon="material-symbols:shopping-cart-outline" width="2em" height="2em" /> -->
        <span>加入采购车</span>
      </button>
      <button class="buy-now-button" @click="buyNow">
        <!-- <Icon icon="mdi:cart-plus" /> -->
        <span>立即购买</span>
      </button>
    </div>
    <!-- 新增电话弹窗 -->
    <div v-if="showPhonePopup" class="phone-popup">
      <div class="popup-mask" @click.self="closePopup"></div>
      <div class="popup-content">
        <div class="phone-header">
          <h3>商家联系电话</h3>
          <Icon icon="akar-icons:phone" width="1.2em" height="1.2em" />
        </div>
        <div class="phone-number">123 8888 6666</div>
        <div class="popup-buttons">
          <a class="call-btn" href="tel:12388886666">
            <Icon icon="akar-icons:phone" width="1.2em" height="1.2em" />
            立即拨打
          </a>
          <button class="cancel-btn" @click="closePopup">取消</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Icon } from '@iconify/vue'; // 引入 Iconify 图标组件

import p1 from '../../assets/p (1).jpg'
import p2 from '../../assets/p (2).jpg'
import p3 from '../../assets/p (3).jpg'
import p4 from '../../assets/p (4).jpg'
import p5 from '../../assets/p (5).jpg'
import p6 from '../../assets/p (6).jpg'
import p7 from '../../assets/p (7).jpg'
import p8 from '../../assets/p (8).jpg'
import p9 from '../../assets/p (9).jpg'
import p10 from '../../assets/p (10).jpg'
import p11 from '../../assets/p (11).jpg'
import p12 from '../../assets/p (12).jpg'
import p13 from '../../assets/p (13).jpg'
import p14 from '../../assets/p (14).jpg'

const route = useRoute();
const router = useRouter();
const currentProduct = ref({});

// 模拟商品详细信息，这里假设商品列表中的商品有更详细的信息
const productDetails = [
  {
    id: 1,
    image: p1,
    name: '鳜鱼',
    price: '22.8 / 斤',
    evaluation: '优秀',
    tags: ['可溯源', '品质保证', '实时监控'],
    description: '鳜鱼肉质鲜嫩，适合清蒸或红烧。',
    reviews: [
      {
        reviewer: '王**',
        purchaseQuantity: 2,
        content: '鳜鱼很新鲜，清蒸后味道特别鲜美，以后就认准这家了。',
        image: '',
        unit: '斤'
      },
      {
        reviewer: '刘**',
        purchaseQuantity: 3,
        content: '用来做酸菜鱼，鱼肉嫩滑，刺也比较少，非常满意。',
        image: '',
        unit: '斤'
      },
      {
        reviewer: '陈**',
        purchaseQuantity: 1,
        content: '鱼的品质很好，活蹦乱跳的，到家还很新鲜。',
        image: '',
        unit: '斤'
      },
      {
        reviewer: '杨**',
        purchaseQuantity: 4,
        content: '性价比很高，做出来的红烧鳜鱼色香味俱全。',
        image: '',
        unit: '斤'
      }
    ],
    reviewRate: Math.floor(Math.random() * 11) + 90
  },
  {
    id: 2,
    image: p2,
    name: '鲈鱼',
    price: '17.1 / 斤',
    evaluation: '良好',
    tags: ['可溯源', '品质保证', '实时监控'],
    description: '鲈鱼经济实惠，适合做鱼汤。',
    reviews: [
      {
        reviewer: '吴**',
        purchaseQuantity: 2,
        content: '用鲈鱼熬的汤很鲜美，而且价格实惠，会回购。',
        image: '',
        unit: '斤'
      },
      {
        reviewer: '张**',
        purchaseQuantity: 3,
        content: '鱼很新鲜，处理得也很干净，好评。',
        image: '',
        unit: '斤'
      },
      {
        reviewer: '徐**',
        purchaseQuantity: 1,
        content: '这个价格能买到这么新鲜的鲈鱼，很值。',
        image: '',
        unit: '斤'
      },
      {
        reviewer: '胡**',
        purchaseQuantity: 2,
        content: '做了剁椒鲈鱼头，味道很不错。',
        image: '',
        unit: '斤'
      }
    ],
    reviewRate: Math.floor(Math.random() * 11) + 90
  },
  {
    id: 3,
    image: p3,
    name: '鳙鱼',
    price: '19.96 / 斤',
    evaluation: '优秀',
    tags: ['可溯源', '品质保证', '实时监控'],
    description: '鳙鱼鱼头大，适合做鱼头汤。',
    reviews: [
      {
        reviewer: '朱**',
        purchaseQuantity: 2,
        content: '鳙鱼的鱼头很大，熬的汤奶白鲜香，太好喝了。',
        image: '',
        unit: '斤'
      },
      {
        reviewer: '林**',
        purchaseQuantity: 3,
        content: '鱼很新鲜，肉质也很嫩，以后会常买。',
        image: '',
        unit: '斤'
      },
      {
        reviewer: '何**',
        purchaseQuantity: 1,
        content: '鳙鱼品质很好，做出来的菜味道超棒。',
        image: '',
        unit: '斤'
      },
      {
        reviewer: '郭**',
        purchaseQuantity: 2,
        content: '鱼头炖豆腐，味道绝了，值得推荐。',
        image: '',
        unit: '斤'
      }
    ],
    reviewRate: Math.floor(Math.random() * 11) + 90
  },
  {
    id: 4,
    image: p4,
    name: '鲤鱼',
    price: '25.67 / 斤',
    evaluation: '优秀',
    tags: ['可溯源', '品质保证', '实时监控'],
    description: '鲤鱼肉质紧实，红烧味道佳。',
    reviews: [
      {
        reviewer: '马**',
        purchaseQuantity: 2,
        content: '鲤鱼很新鲜，红烧之后色香味俱全，太好吃了。',
        image: '',
        unit: '斤'
      },
      {
        reviewer: '罗**',
        purchaseQuantity: 3,
        content: '鱼的品质不错，刺处理得也很干净，满意。',
        image: '',
        unit: '斤'
      },
      {
        reviewer: '梁**',
        purchaseQuantity: 1,
        content: '用来做糖醋鲤鱼，味道正宗，会再来。',
        image: '',
        unit: '斤'
      },
      {
        reviewer: '宋**',
        purchaseQuantity: 2,
        content: '鲤鱼肉质紧实，很有嚼劲，推荐。',
        image: '',
        unit: '斤'
      }
    ],
    reviewRate: Math.floor(Math.random() * 11) + 90
  },
  {
    id: 5,
    image: p5,
    name: '鲫鱼',
    price: '28.51 / 斤',
    evaluation: '优秀',
    tags: ['可溯源', '品质保证', '实时监控'],
    description: '鲫鱼营养丰富，适合炖汤。',
    reviews: [
      {
        reviewer: '郑**',
        purchaseQuantity: 2,
        content: '鲫鱼很新鲜，熬的汤奶白浓稠，营养又好喝。',
        image: '',
        unit: '斤'
      },
      {
        reviewer: '谢**',
        purchaseQuantity: 3,
        content: '鱼的品质很好，用来给宝宝做辅食很合适。',
        image: '',
        unit: '斤'
      },
      {
        reviewer: '韩**',
        purchaseQuantity: 1,
        content: '鲫鱼炖汤很鲜美，以后会经常买。',
        image: '',
        unit: '斤'
      },
      {
        reviewer: '唐**',
        purchaseQuantity: 2,
        content: '这个鲫鱼炖汤太绝了，味道超赞。',
        image: '',
        unit: '斤'
      }
    ],
    reviewRate: Math.floor(Math.random() * 11) + 90
  },
  {
    id: 6,
    image: p6,
    name: '鲶鱼',
    price: '26.57 / 斤',
    evaluation: '良好',
    tags: ['可溯源', '品质保证', '实时监控'],
    description: '鲶鱼肉质滑嫩，红烧最佳。',
    reviews: [
      {
        reviewer: '冯**',
        purchaseQuantity: 2,
        content: '鲶鱼很新鲜，红烧之后味道很棒，肉质滑嫩。',
        image: '',
        unit: '斤'
      },
      {
        reviewer: '于**',
        purchaseQuantity: 3,
        content: '鱼处理得很干净，做出来的菜味道不错。',
        image: '',
        unit: '斤'
      },
      {
        reviewer: '董**',
        purchaseQuantity: 1,
        content: '鲶鱼的品质还可以，价格也实惠。',
        image: '',
        unit: '斤'
      },
      {
        reviewer: '萧**',
        purchaseQuantity: 2,
        content: '用来做鲶鱼煲，味道很赞，值得一试。',
        image: '',
        unit: '斤'
      }
    ],
    reviewRate: Math.floor(Math.random() * 11) + 90
  },
  {
    id: 7,
    image: p7,
    name: '青虾',
    price: '57.02 / 斤',
    evaluation: '优秀',
    tags: ['可溯源', '品质保证', '实时监控'],
    description: '青虾肉质清甜，适合白灼。',
    reviews: [
      {
        reviewer: '程**',
        purchaseQuantity: 2,
        content: '青虾很新鲜，白灼之后虾肉清甜，太好吃了。',
        image: '',
        unit: '斤'
      },
      {
        reviewer: '曹**',
        purchaseQuantity: 3,
        content: '虾的品质很好，个头也很大，满意。',
        image: '',
        unit: '斤'
      },
      {
        reviewer: '袁**',
        purchaseQuantity: 1,
        content: '青虾很干净，没有异味，会回购。',
        image: '',
        unit: '斤'
      },
      {
        reviewer: '邓**',
        purchaseQuantity: 2,
        content: '做了油爆虾，味道超赞，虾肉Q弹。',
        image: '',
        unit: '斤'
      }
    ],
    reviewRate: Math.floor(Math.random() * 11) + 90
  },
  {
    id: 8,
    image: p8,
    name: '河虾',
    price: '71.28 / 斤',
    evaluation: '优秀',
    tags: ['可溯源', '品质保证', '实时监控'],
    description: '河虾鲜香弹牙，烹饪多样。',
    reviews: [
      {
        reviewer: '许**',
        purchaseQuantity: 2,
        content: '河虾很新鲜，不管是白灼还是椒盐都好吃。',
        image: '',
        unit: '斤'
      },
      {
        reviewer: '傅**',
        purchaseQuantity: 3,
        content: '虾的个头均匀，肉质弹牙，品质不错。',
        image: '',
        unit: '斤'
      },
      {
        reviewer: '沈**',
        purchaseQuantity: 1,
        content: '河虾很干净，没有泥沙，值得购买。',
        image: '',
        unit: '斤'
      },
      {
        reviewer: '曾**',
        purchaseQuantity: 2,
        content: '做了蒜蓉粉丝蒸虾，味道超棒，虾很新鲜。',
        image: '',
        unit: '斤'
      }
    ],
    reviewRate: Math.floor(Math.random() * 11) + 90
  },
  {
    id: 9,
    image: p9,
    name: '淡水小龙虾',
    price: '52.27 / 斤',
    evaluation: '优秀',
    tags: ['可溯源', '品质保证', '实时监控'],
    description: '小龙虾肉质饱满，麻辣过瘾。',
    reviews: [
      {
        reviewer: '彭**',
        purchaseQuantity: 2,
        content: '小龙虾很新鲜，肉质饱满，麻辣口味超赞。',
        image: '',
        unit: '斤'
      },
      {
        reviewer: '吕**',
        purchaseQuantity: 3,
        content: '虾处理得很干净，虾腮很白，好评。',
        image: '',
        unit: '斤'
      },
      {
        reviewer: '苏**',
        purchaseQuantity: 1,
        content: '小龙虾个头很大，味道也不错，会再来。',
        image: '',
        unit: '斤'
      },
      {
        reviewer: '卢**',
        purchaseQuantity: 2,
        content: '做了十三香小龙虾，味道太绝了，推荐。',
        image: '',
        unit: '斤'
      }
    ],
    reviewRate: Math.floor(Math.random() * 11) + 90
  },
  {
    id: 10,
    image: p10,
    name: '河蟹',
    price: '114.048 / 斤',
    evaluation: '优秀',
    tags: ['可溯源', '品质保证', '实时监控'],
    description: '河蟹膏满黄肥，营养丰富。',
    reviews: [
      {
        reviewer: '蒋**',
        purchaseQuantity: 2,
        content: '河蟹很新鲜，膏满黄肥，味道鲜美，太好吃了。',
        image: '',
        unit: '斤'
      },
      {
        reviewer: '蔡**',
        purchaseQuantity: 3,
        content: '螃蟹的品质很好，包装也很用心，满意。',
        image: '',
        unit: '斤'
      },
      {
        reviewer: '贾**',
        purchaseQuantity: 1,
        content: '河蟹到家还是活蹦乱跳的，很新鲜，会回购。',
        image: '',
        unit: '斤'
      },
      {
        reviewer: '丁**',
        purchaseQuantity: 2,
        content: '做了清蒸河蟹，原汁原味，太赞了。',
        image: '',
        unit: '斤'
      }
    ],
    reviewRate: Math.floor(Math.random() * 11) + 90
  },
  {
    id: 11,
    image: p11,
    name: '大闸蟹',
    price: '142.56 / 斤',
    evaluation: '优秀',
    tags: ['可溯源', '品质保证', '实时监控'],
    description: '大闸蟹肉质鲜美，适合清蒸。',
    reviews: [
      {
        reviewer: '魏**',
        purchaseQuantity: 2,
        content: '大闸蟹很新鲜，清蒸后蟹黄饱满，味道超棒。',
        image: '',
        unit: '斤'
      },
      {
        reviewer: '薛**',
        purchaseQuantity: 3,
        content: '螃蟹的品质没得说，个头也很大，满意。',
        image: '',
        unit: '斤'
      },
      {
        reviewer: '叶**',
        purchaseQuantity: 1,
        content: '大闸蟹包装精美，到家还是活的，会再来。',
        image: '',
        unit: '斤'
      },
      {
        reviewer: '阎**',
        purchaseQuantity: 2,
        content: '做了香辣蟹，味道也很不错，蟹肉很嫩。',
        image: '',
        unit: '斤'
      }
    ],
    reviewRate: Math.floor(Math.random() * 11) + 90
  },
  {
    id: 12,
    image: p12,
    name: '蛤蜊',
    price: '22.8 / 斤',
    evaluation: '良好',
    tags: ['可溯源', '品质保证', '实时监控'],
    description: '蛤蜊肉质肥美，爆炒鲜香。',
    reviews: [
      {
        reviewer: '余**',
        purchaseQuantity: 2,
        content: '蛤蜊很新鲜，爆炒之后味道鲜香，很下饭。',
        image: '',
        unit: '斤'
      },
      {
        reviewer: '潘**',
        purchaseQuantity: 3,
        content: '蛤蜊处理得很干净，没有沙子，好评。',
        image: '',
        unit: '斤'
      },
      {
        reviewer: '杜**',
        purchaseQuantity: 1,
        content: '这个价格能买到这么新鲜的蛤蜊，很划算。',
        image: '',
        unit: '斤'
      },
      {
        reviewer: '戴**',
        purchaseQuantity: 2,
        content: '做了蛤蜊蒸蛋，味道超赞，蛤蜊很肥美。',
        image: '',
        unit: '斤'
      }
    ],
    reviewRate: Math.floor(Math.random() * 11) + 90
  },
  {
    id: 13,
    image: p13,
    name: '黄鳝',
    price: '66.53 / 斤',
    evaluation: '优秀',
    tags: ['可溯源', '品质保证', '实时监控'],
    description: '黄鳝肉质鲜嫩，滋补佳品。',
    reviews: [
      {
        reviewer: '夏**',
        purchaseQuantity: 2,
        content: '黄鳝很新鲜，肉质鲜嫩，做出来的菜味道很棒。',
        image: '',
        unit: '斤'
      },
      {
        reviewer: '钟**',
        purchaseQuantity: 3,
        content: '鳝鱼处理得很干净，没有腥味，满意。',
        image: '',
        unit: '斤'
      },
      {
        reviewer: '汪**',
        purchaseQuantity: 1,
        content: '黄鳝是滋补的好食材，品质不错，会回购。',
        image: '',
        unit: '斤'
      },
      {
        reviewer: '田**',
        purchaseQuantity: 2,
        content: '做了红烧黄鳝，味道超赞，很下饭。',
        image: '',
        unit: '斤'
      }
    ],
    reviewRate: Math.floor(Math.random() * 11) + 90
  },
  {
    id: 14,
    image: p14,
    name: '泥鳅',
    price: '38.02 / 斤',
    evaluation: '良好',
    tags: ['可溯源', '品质保证', '实时监控'],
    description: '泥鳅肉质细嫩，营养丰富。',
    reviews: [
      {
        reviewer: '任**',
        purchaseQuantity: 2,
        content: '泥鳅很新鲜，肉质细嫩，煲汤很鲜美。',
        image: '',
        unit: '斤'
      },
      {
        reviewer: '姜**',
        purchaseQuantity: 3,
        content: '泥鳅处理得很干净，没有异味，好评。',
        image: '',
        unit: '斤'
      },
      {
        reviewer: '范**',
        purchaseQuantity: 1,
        content: '这个价格能买到这么新鲜的泥鳅，很值。',
        image: '',
        unit: '斤'
      },
      {
        reviewer: '方**',
        purchaseQuantity: 2,
        content: '做了泥鳅钻豆腐，味道很独特，推荐。',
        image: '',
        unit: '斤'
      }
    ],
    reviewRate: Math.floor(Math.random() * 11) + 90
  }
];

onMounted(() => {
  const productId = Number(route.params.id); // 确保转换为数字
  const price = route.query.price; // 从query获取价格
  
  if (productId) {
    const product = productDetails.find(item => item.id === productId);
    if (product) {
      // 创建新对象以避免响应性问题
      currentProduct.value = { ...product };
      
      // 如果有传入价格，则更新
      if (price) {
        currentProduct.value.price = price; 
      }
    }
  }
});

const gotosee = () => {
  router.push({ name: 'DataView2C' });
}

// 返回按钮点击事件
const goBack = () => {
  router.back();
};

// 聊一聊按钮点击事件
const chatWithSeller = () => {
  router.push('/chat');
};

// 打电话按钮点击事件
// 新增弹窗状态控制
const showPhonePopup = ref(false);

const callSeller = () => {
  console.log('给卖家打电话');
  showPhonePopup.value = true;
};

const closePopup = () => {
  showPhonePopup.value = false;
};

const goToReviews = () => {
  const productId = route.params.id;
  router.push({
    name: 'Reviews',
    params: {
      productId: productId
    }
  },);
}

// 加入采购车逻辑增强
const addToCart = () => {
  // 获取当前商品id
  const productId = Number(route.params.id);

  // 弹出数量选择对话框
  const quantity = prompt(`请输入要购买的 ${currentProduct.value.name} 数量:`, '1');

  // 如果用户取消或输入无效值则返回
  if (!quantity || isNaN(quantity)) return;

  const quantityNum = parseInt(quantity);
  if (quantityNum <= 0) {
    window.alert('数量必须大于0');
    return;
  }

  // 从localStorage获取购物车数据
  let cart = JSON.parse(localStorage.getItem('cart')) || {};

  // 如果该商品已存在，增加数量，否则初始化为输入的数量
  if (cart[productId]) {
    cart[productId] = Number(cart[productId]) + quantityNum;
  } else {
    cart[productId] = quantityNum;
  }

  // 保存回localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  // 按钮动画反馈
  const btn = document.querySelector('.add-to-cart-button')
  btn.style.transform = 'scale(0.95)'
  setTimeout(() => {
    btn.style.transform = 'scale(1)'
  }, 100)

  window.alert(`成功添加 ${quantityNum} 件商品到采购车！`)
}

// 立即购买逻辑增强
const buyNow = () => {
  // 获取当前商品id
  const productId = Number(route.params.id);

  // 弹出数量选择对话框
  const quantity = prompt(`请输入要购买的 ${currentProduct.value.name} 数量:`, '1');

  // 如果用户取消或输入无效值则返回
  if (!quantity || isNaN(quantity)) return;

  const quantityNum = parseInt(quantity);
  if (quantityNum <= 0) {
    window.alert('数量必须大于0');
    return;
  }
  // 从localStorage获取购物车数据
  let cart = JSON.parse(localStorage.getItem('cart')) || {};

  // 如果该商品已存在，数量+1，否则初始化为1
  if (cart[productId]) {
    cart[productId] = Number(cart[productId]) + quantityNum;
  } else {
    cart[productId] = quantityNum;
  }

  // 保存回localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  // 显示购买确认
  // const confirmed = confirm(`确认购买 ${currentProduct.value.name}？`)
  // window.alert(`成功添加 ${quantityNum} 件商品，请到采购车查看`)
  router.push('/checkout') // 直接跳转不处理数据
}
</script>

<style scoped>
.product-detail {
  /* padding: 20px; */
}

.back-button {
  display: flex;
  align-items: center;
  /* margin-bottom: 20px; */
  cursor: pointer;
  position: fixed;
  left: 20px;
  top: 20px;
  background-color: #eee9e954;
  /* padding: 10px; */
  border-radius: 12px;
  color: white;
  height: 40px;
  width: 40px;
}

.back-button span {
  margin-left: 10px;
}

.product-image-large {
  width: 100%;
  height: auto;
  margin-bottom: 20px;
}

.product-image-large img {
  width: 100%;
  border: 3px rgb(80, 183, 235) solid;
}

.product-info-detail {
  margin-bottom: 20px;
  padding: 0px 10px 0px 10px;
}

.product-name {
  font-size: 24px;
  margin-bottom: 10px;
}

.product-price {
  font-size: 22px;
  color: #f36538;
  margin-bottom: 10px;
  font-weight: 600;
}

.product-evaluation {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  background-color: rgb(215, 255, 225);
  height: 35px;
}

.product-evaluation svg {
  height: 20px;
  width: 20px;
}

.evaluation-circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 10px;
}

.evalutation-title {
  font-size: 18px;
  font-weight: 600;
  margin-right: 13px;
}

.product-evaluation div {
  color: rgb(94, 90, 90);
}

.evaluation-excellent {
  background-color: green;
}

.evaluation-good {
  background-color: blue;
}

.evaluation-strip {
  font-size: 16px;
}

.product-tags {
  margin-bottom: 10px;
}

.tag {
  display: inline-block;
  /* padding: 5px 10px; */
  background-color: rgb(249, 255, 255);
  color: #333;
  border: 1px #cbcbcb solid;
  /* border-radius: 5px; */
  margin-right: 10px;
  margin-bottom: 5px;
}

.product-description {
  margin-bottom: 20px;
}

.user-reviews {
  margin-bottom: 90px;
  margin-top: 13px;
  /* box-shadow: 0px -10px #50b7eb40; */
  padding: 9px;
  border-top: 4px solid #50b7cd40;
}

.review-title-container {
  display: flex;
  justify-content: space-between;
}


.review-title {
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: 600;
}

.review-rate {
  font-size: 16px;
  color: #50b7eb;
  margin-bottom: 10px;
}

.review-item {
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  color: #666;
  border-bottom: 1px dotted #bbbdc5;
}

.reviewer {
  font-weight: bold;
  margin-bottom: 5px;
}

.purchase-quantity {
  margin-bottom: 5px;
}

.review-content {
  margin-bottom: 10px;
}

.review-image img {
  width: 100px;
  height: 100px;
}

.action-buttons {
  display: flex;
  position: fixed;
  bottom: 60px;
  background-color: white;
  border-top: 1px solid #0000002b;
  width: 100%;
  justify-content: center;
  align-items: center;
}

.action-buttons button {
  display: flex;
  padding: 10px 20px;
  border: none;
  /* border-radius: 5px; */
  cursor: pointer;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.chat-button {
  background-color: white;
  color: #818181;
}

.call-button {
  color: #818181;
  background-color: white;
}

.add-to-cart-button {
  background-color: rgb(80, 183, 235);
  color: white;
  border-radius: 20px 0 0 20px;
}

.buy-now-button {
  background-color: rgb(50, 161, 218);
  color: white;
  border-radius: 0 20px 20px 0;
}

/* 新增电话弹窗样式 */
.phone-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
}

.popup-mask {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.popup-content {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 89%;
  background: white;
  border-radius: 16px 16px 0 0;
  padding: 24px;
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }

  to {
    transform: translateY(0);
  }
}

.phone-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.phone-header h3 {
  color: rgb(50, 161, 218);
  font-size: 18px;
}

.phone-number {
  font-size: 28px;
  color: #333;
  text-align: center;
  margin: 24px 0;
  font-weight: bold;
}

.popup-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.call-btn {
  background: rgb(50, 161, 218);
  color: white;
  padding: 16px;
  border-radius: 8px;
  text-align: center;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.cancel-btn {
  background: #f5f5f5;
  color: #666;
  padding: 16px;
  border-radius: 8px;
  border: none;
  font-size: 16px;
}

/* 调整原有按钮样式保持统一 */
/*.call-button {
    background: rgb(50, 161, 218);
    color: white;
    display: flex;
    align-items: center;
    gap: 8px;
  }*/
</style>