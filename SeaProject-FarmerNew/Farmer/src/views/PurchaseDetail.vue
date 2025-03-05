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
            <svg t="1740031146812" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10492" width="128" height="128"><path d="M511.928 256.181A214.74 214.74 0 0 1 850.99 431.22c0 91.576-54.337 175.327-116.934 238.069-53.033 53.178-128.815 107.515-200.684 131.423l-17.823 5.94a10.578 10.578 0 0 1-7.1 0l-17.823-5.94c-72.449-23.908-147.651-78.245-200.684-131.423-62.597-62.742-116.934-146.348-116.934-238.07a214.74 214.74 0 0 1 339.063-175.037z m0 59.843a169.532 169.532 0 0 0-293.855 115.92c0 78.824 50.135 152.288 103.747 206.046 47.962 48.106 117.948 98.82 183.008 120.555l7.1 2.319 7.1-2.319c64.914-21.734 135.045-72.45 183.007-120.555 53.612-53.758 103.747-127.367 103.747-206.047a169.532 169.532 0 0 0-293.854-115.919z" fill="#32A890" p-id="10493"></path><path d="M636.25 284.436a146.927 146.927 0 0 1 146.928 146.928c0 135.625-170.4 271.54-271.25 305.157-101.43-33.617-271.251-169.532-271.251-305.157a146.927 146.927 0 0 1 271.25-78.39 146.783 146.783 0 0 1 124.324-68.538z" fill="#E5F8F6" p-id="10494"></path></svg>

            <span class="evalutation-title">健康评级</span>
          <div>{{ currentProduct.evaluation }}</div>
          <Icon icon="akar-icons:chevron-right" width="2em" height="2em" style="position: absolute;right: 18px;"/>
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
  import p1 from '../assets/p (11).jpg'
  import p2 from '../assets/p (2).jpg'
  import p3 from '../assets/p (3).jpg'
  import p4 from '../assets/p (4).jpg'
  import p5 from '../assets/p (5).jpg'
  import p6 from '../assets/p (6).jpg'
  import p7 from '../assets/p (7).jpg'
  import p8 from '../assets/p (8).jpg'
  import p9 from '../assets/p (9).jpg'
  import p10 from '../assets/p (10).jpg'
  import algae from '../assets/algae.png'

  
  const route = useRoute();
  const router = useRouter();
  const currentProduct = ref({});
  
  // 模拟商品详细信息，这里假设商品列表中的商品有更详细的信息
  const productDetails = [
    {
        id: 1,
        image: p1,
        name: '大闸蟹',
        price: '45 / 斤',
        evaluation: '良好',
        tags: ['可溯源', '品质保证', '实时监控'],
        description: '螃蟹肉质鲜美，适合多种烹饪方式。',
        reviews: [
            {
                reviewer: '李**',
                purchaseQuantity: 3,
                content: '螃蟹很新鲜，大小也合适，下次还会购买。',
                image: '',
                unit: '斤'
            },
            {
                reviewer: '赵**',
                purchaseQuantity: 2,
                content: '买回去做了酸菜螃蟹，味道超棒，草鱼很嫩。',
                image: '',
                unit: '斤'
            },
            {
                reviewer: '孙**',
                purchaseQuantity: 4,
                content: '包装很用心，螃蟹到家还是活蹦乱跳的，好评！',
                image: '',
                unit: '斤'
            },
            {
                reviewer: '周**',
                purchaseQuantity: 1,
                content: '肉质紧实，刺相对较少，适合老人小孩吃。',
                image: '',
                unit: '斤'
            }
        ],
        reviewRate: 100
    },
    {
        id: 2,
        image: p2,
        name: '鲫鱼',
        price: '15 / 斤',
        evaluation: '优秀',
        tags: ['可溯源', '品质保证', '实时监控'],
        description: '鲫鱼营养丰富，适合炖汤。',
        reviews: [
            {
                reviewer: '王**',
                purchaseQuantity: 2,
                content: '鱼很肥，味道不错，推荐购买。',
                image: '',
                unit: '斤'
            },
            {
                reviewer: '刘**',
                purchaseQuantity: 3,
                content: '用鲫鱼炖的汤，奶白色的，特别鲜美，家人都爱喝。',
                image: '',
                unit: '斤'
            },
            {
                reviewer: '陈**',
                purchaseQuantity: 1,
                content: '鲫鱼很新鲜，处理得也干净，回家直接下锅就行。',
                image: '',
                unit: '斤'
            },
            {
                reviewer: '杨**',
                purchaseQuantity: 2,
                content: '价格实惠，品质却一点不含糊，会回购。',
                image: '',
                unit: '斤'
            }
        ],
        reviewRate: 100
    },
    {
        id: 3,
        image: p3,
        name: '鲶鱼',
        price: '18 / 斤',
        evaluation: '优秀',
        tags: ['可溯源', '品质保证', '实时监控'],
        description: '鲶鱼肉质鲜嫩，无小刺，适合老人和小孩。',
        reviews: [
            {
                reviewer: '吴**',
                purchaseQuantity: 2,
                content: '鲶鱼很新鲜，做出来的红烧鲶鱼味道太棒了。',
                image: '',
                unit: '斤'
            },
            {
                reviewer: '张**',
                purchaseQuantity: 1,
                content: '没有什么土腥味，肉质很嫩，孩子特别爱吃。',
                image: '',
                unit: '斤'
            },
            {
                reviewer: '胡**',
                purchaseQuantity: 3,
                content: '包装严实，运输过程中鱼没有受损，好评。',
                image: '',
                unit: '斤'
            },
            {
                reviewer: '林**',
                purchaseQuantity: 2,
                content: '价格合理，品质有保障，以后就认准这家了。',
                image: '',
                unit: '斤'
            }
        ],
        reviewRate: 100
    },
    {
        id: 4,
        image: p4,
        name: '黄鳝',
        price: '30 / 斤',
        evaluation: '良好',
        tags: ['可溯源', '品质保证', '实时监控'],
        description: '黄鳝营养丰富，具有滋补功效。',
        reviews: [
            {
                reviewer: '朱**',
                purchaseQuantity: 1,
                content: '黄鳝很鲜活，用来做了黄鳝粥，味道鲜美。',
                image: '',
                unit: '斤'
            },
            {
                reviewer: '徐**',
                purchaseQuantity: 2,
                content: '处理得很干净，省去了自己处理的麻烦，好评。',
                image: '',
                unit: '斤'
            },
            {
                reviewer: '何**',
                purchaseQuantity: 1,
                content: '肉质很嫩，口感很好，下次还会买。',
                image: '',
                unit: '斤'
            },
            {
                reviewer: '郭**',
                purchaseQuantity: 2,
                content: '黄鳝的品质不错，和描述的一样。',
                image: '',
                unit: '斤'
            }
        ],
        reviewRate: 100
    },
    {
        id: 5,
        image: p5,
        name: '中华草龟',
        price: '50 / 只',
        evaluation: '优秀',
        tags: ['可溯源', '品质保证', '实时监控'],
        description: '中华草龟是优质的食材，营养丰富。',
        reviews: [
            {
                reviewer: '马**',
                purchaseQuantity: 1,
                content: '草龟很健康，活力十足，煲汤味道鲜美。',
                image: '',
                unit: '只'
            },
            {
                reviewer: '罗**',
                purchaseQuantity: 2,
                content: '包装很专业，龟龟到手没有任何损伤。',
                image: '',
                unit: '只'
            },
            {
                reviewer: '梁**',
                purchaseQuantity: 1,
                content: '肉质很紧实，口感很好，值得购买。',
                image: '',
                unit: '只'
            },
            {
                reviewer: '宋**',
                purchaseQuantity: 1,
                content: '和卖家描述的一样，以后还会再来。',
                image: '',
                unit: '只'
            }
        ],
        reviewRate: 100
    },
    {
        id: 6,
        image: algae,
        name: '小球藻',
        price: '20 / 斤',
        evaluation: '优秀',
        tags: ['可溯源', '品质保证', '实时监控'],
        description: '小球藻肉质细嫩，营养丰富。',
        reviews: [
            {
                reviewer: '郑**',
                purchaseQuantity: 2,
                content: '小球藻很鲜活，用来做小球藻钻豆腐，味道超赞。',
                image: '',
                unit: '斤'
            },
            {
                reviewer: '谢**',
                purchaseQuantity: 1,
                content: '处理得很干净，没有泥沙味，好评。',
                image: '',
                unit: '斤'
            },
            {
                reviewer: '韩**',
                purchaseQuantity: 2,
                content: '小球藻大小均匀，品质不错。',
                image: '',
                unit: '斤'
            },
            {
                reviewer: '唐**',
                purchaseQuantity: 1,
                content: '价格实惠，会继续支持。',
                image: '',
                unit: '斤'
            }
        ],
        reviewRate: 100
    },
    {
        id: 7,
        image: p7,
        name: '福寿螺（食用级）',
        price: '8 / 斤',
        evaluation: '优秀',
        tags: ['可溯源', '品质保证', '实时监控'],
        description: '食用级福寿螺肉质鲜美，烹饪后口感好。',
        reviews: [
            {
                reviewer: '冯**',
                purchaseQuantity: 3,
                content: '福寿螺很新鲜，炒着吃味道很不错。',
                image: '',
                unit: '斤'
            },
            {
                reviewer: '于**',
                purchaseQuantity: 2,
                content: '处理得很干净，没有异味，值得购买。',
                image: '',
                unit: '斤'
            },
            {
                reviewer: '董**',
                purchaseQuantity: 1,
                content: '价格便宜，量也足，很划算。',
                image: '',
                unit: '斤'
            },
            {
                reviewer: '萧**',
                purchaseQuantity: 2,
                content: '品质有保障，以后还会来买。',
                image: '',
                unit: '斤'
            }
        ],
        reviewRate: 100
    },
    {
        id: 8,
        image: p8,
        name: '淡水小龙虾',
        price: '25 / 斤',
        evaluation: '优秀',
        tags: ['可溯源', '品质保证', '实时监控'],
        description: '小龙虾个头大，肉白紧实，价格实惠。',
        reviews: [
            {
                reviewer: '程**',
                purchaseQuantity: 5,
                content: '与描述一致，服务态度好，发货快，商品新鲜，认真负责。小龙虾个头大，肉白紧实，价格实惠...',
                image: p8,
                unit: '斤'
            },
            {
                reviewer: '曹**',
                purchaseQuantity: 3,
                content: '小龙虾很干净，做出来的麻辣小龙虾太好吃了。',
                image: '',
                unit: '斤'
            },
            {
                reviewer: '袁**',
                purchaseQuantity: 2,
                content: '个头均匀，虾肉饱满，非常满意。',
                image: '',
                unit: '斤'
            },
            {
                reviewer: '邓**',
                purchaseQuantity: 4,
                content: '性价比很高，以后吃小龙虾就选这家了。',
                image: '',
                unit: '斤'
            }
        ],
        reviewRate: 100
    },
    {
        id: 9,
        image: p9,
        name: '白鲢鱼',
        price: '8 / 斤',
        evaluation: '优秀',
        tags: ['可溯源', '品质保证', '实时监控'],
        description: '白鲢鱼肉质鲜嫩，适合多种做法。',
        reviews: [
            {
                reviewer: '许**',
                purchaseQuantity: 3,
                content: '白鲢鱼很新鲜，做的剁椒鱼头味道很棒。',
                image: '',
                unit: '斤'
            },
            {
                reviewer: '傅**',
                purchaseQuantity: 2,
                content: '价格实惠，鱼的品质也不错。',
                image: '',
                unit: '斤'
            },
            {
                reviewer: '沈**',
                purchaseQuantity: 1,
                content: '鱼肉很嫩，刺处理得也方便。',
                image: '',
                unit: '斤'
            },
            {
                reviewer: '曾**',
                purchaseQuantity: 2,
                content: '包装很好，鱼没有破损，好评。',
                image: '',
                unit: '斤'
            }
        ],
        reviewRate: 100
    },
    {
        id: 10,
        image: p10,
        name: '鳙鱼（胖头鱼）',
        price: '13 / 斤',
        evaluation: '良好',
        tags: ['可溯源', '品质保证', '实时监控'],
        description: '鳙鱼鱼头大，适合做鱼头汤。',
        reviews: [
            {
                reviewer: '彭**',
                purchaseQuantity: 2,
                content: '鳙鱼很新鲜，鱼头炖汤特别鲜美。',
                image: '',
                unit: '斤'
            },
            {
                reviewer: '吕**',
                purchaseQuantity: 1,
                content: '鱼头很大，肉也很多，很满意。',
                image: '',
                unit: '斤'
            },
            {
                reviewer: '苏**',
                purchaseQuantity: 3,
                content: '鱼的品质不错，和卖家描述相符。',
                image: '',
                unit: '斤'
            },
            {
                reviewer: '卢**',
                purchaseQuantity: 2,
                content: '价格合理，以后会经常购买。',
                image: '',
                unit: '斤'
            }
        ],
        reviewRate: 100
    }
];
  
onMounted(() => {
  const productId = route.params.id;
  if (productId !== null) {
    // 使用find方法根据id查找对应的商品
    const product = productDetails.find(item => item.id === Number(productId));
    if (product) {
      currentProduct.value = product;
    }
  }
});

  const gotosee = () => {
    router.push({name:'DataView2C'});
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

  const goToReviews = () =>{
    const productId = route.params.id;
    router.push({
      name:'Reviews',
      params: {
        productId : productId
      }
    },);
  }

  const cartItems = ref([])
  const showAdded = ref(false)
  const stockInfo = ref({
    remaining: 10, // 模拟库存
    lastUpdated: new Date()
  })

  // 加入采购车逻辑增强
  const addToCart = () => {
    // 获取当前商品id
    const productId = Number(route.params.id);
    
    // 从localStorage获取购物车数据
    let cart = JSON.parse(localStorage.getItem('cart')) || {};
    
    // 如果该商品已存在，数量+1，否则初始化为1
    if (cart[productId]) {
      cart[productId] += 1;
    } else {
      cart[productId] = 1;
    }
    
    // 保存回localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // 按钮动画反馈
    const btn = document.querySelector('.add-to-cart-button')
    btn.style.transform = 'scale(0.95)'
    setTimeout(() => {
      btn.style.transform = 'scale(1)'
    }, 100)
    // router.push('/cart')
    window.alert(`添加成功！`)
  }

  // 立即购买逻辑增强
    const buyNow = () => {

      // 获取当前商品id
    const productId = Number(route.params.id);
    
    // 从localStorage获取购物车数据
    let cart = JSON.parse(localStorage.getItem('cart')) || {};
    
    // 如果该商品已存在，数量+1，否则初始化为1
    if (cart[productId]) {
      cart[productId] += 1;
    } else {
      cart[productId] = 1;
    }
    
    // 保存回localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // 显示购买确认
    const confirmed = confirm(`确认购买 ${currentProduct.value.name}？`)
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
  .product-image-large img{
    width: 100%;
    border: 3px rgb(80,183,235) solid;
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
    background-color: rgb(215,255,225);
    height: 35px;
  }
  .product-evaluation svg{
    height: 20px;
    width: 20px;
  }
  .evaluation-circle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .evalutation-title{
    font-size: 18px;
    font-weight: 600;
    margin-right: 13px;
  }
  .product-evaluation div{
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
  .review-title-container{
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
  
  .review-image img{
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
    background-color: rgb(80,183,235);
    color: white;
    border-radius: 20px 0 0 20px;
  }
  
  .buy-now-button {
    background-color: rgb(50,161,218);
    color: white;
    border-radius:0 20px 20px 0;
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
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
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