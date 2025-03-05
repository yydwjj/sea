import { createRouter, createWebHistory } from 'vue-router';
import DetectionView from '../views/DetectionView.vue';
import ProductView from '../views/ProductView.vue';
import CommunityView from '../views/CommunityView.vue';
import ProfileView from '../views/ProfileView.vue';
import PurchaseView from '../views/PurchaseView.vue';
import ProductDetail from '../views/PurchaseDetail.vue'; // 假设商品详情页组件路径，按需修改
import DataView2C from '../views/DataView2C.vue';
import Home from '../views/Home.vue';
import c1 from '../views/c1.vue';
import c2 from '../views/c2.vue';
import c3 from '../views/c3.vue';
import c4 from '../views/c4.vue';

const routes = [
  { path: '/', redirect: '/detection' },
  { path: '/detection', component: DetectionView },
  { path: '/product', component: ProductView },
  { path: '/community', component: CommunityView },
  { path: '/profile', component: ProfileView },
  { path: '/post/:id',  name: 'PostDetail', component: () => import('../views/PostDetail.vue') },
  { path: '/purchase', component: PurchaseView },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetail,
    props: true // 开启 props 传参，便于在组件中直接接收参数
  },
  {
    path:'/dataview2c',name:'DataView2C',component:DataView2C
  },
  {
    path: '/chat',
    name: 'Chat',
    component: () => import('../views/ChatView.vue') // 新建的聊天组件
  },
  { path:'/home',component: Home},
  {
    path: '/reviews/:productId',
    name: 'Reviews',
    component: () => import('../views/ReviewPage.vue')
  },
  // router/index.js
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/CartView.vue')
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('../views/CheckoutView.vue')
  },
  {
    path: '/order-result',
    name: 'OrderResult',
    component: () => import('../views/OrderResult.vue')
  },
  {path: '/c1',component: c1},
  {path: '/c2',component: c2},
  {path: '/c3',component: c3},
  {path: '/c4',component: c4},
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to,from,next) => {
  if(to.path === '/') {
    if (userStore.isFamer) {
      return next('/detection');
    } else if (userStore.isCustomer) {
      return next('/home');
    } else if (userStore.isWholesalers) {
      return next('/purchase');
    }
    // 默认重定向（如果没有匹配的用户类型）
    return next('/home');
  }
  next();
});

export default router;