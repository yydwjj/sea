import { createRouter, createWebHistory } from 'vue-router';
import DetectionView from '../views/DetectionView.vue';
import ProductView from '../views/Product/ProductView.vue';
import CommunityView from '../views/social/CommunityView.vue';
import ProfileView from '../views/Product/ProfileView.vue';
import PurchaseView from '../views/Product/PurchaseView.vue';
import ProductDetail from '../views/Product/PurchaseDetail.vue'; // 假设商品详情页组件路径，按需修改
import DataView2C from '../views/DataView2C.vue';
import Home from '../views/Home.vue';
import c1 from '../views/Product/c1.vue';
import c2 from '../views/Product/c2.vue';
import c3 from '../views/Product/c3.vue';
import c4 from '../views/Product/c4.vue';
import MyCustomers from '../views/settingsSonPage/MyCustomers.vue';
import CustomerOrders from '../views/settingsSonPage/CustomerOrders.vue';
import PendingPayment from '../views/settingsSonPage/PendingPayment.vue';
import PendingShipment from '../views/settingsSonPage/PendingShipment.vue';
import PendingReceipt from '../views/settingsSonPage/PendingReceipt.vue';
import PendingReview from '../views/settingsSonPage/PendingReview.vue';
import RefundService from '../views/settingsSonPage/RefundService.vue';
import MySettings from '../views/settingsSonPage/MySettings.vue';
import DeviceManage from '../views/settingsSonPage/DeviceManage.vue';
import DeviceSettings from '../views/settingsSonPage/DeviceSettings.vue';

const routes = [
  { path: '/', redirect: '/mysettings' },
  { path:'/mysettings',component: MySettings},
  { path: '/detection', component: DetectionView },
  { path: '/product', component: ProductView },
  { path: '/community', component: CommunityView },
  { path: '/profile', 
    component: ProfileView ,
    name: 'Profile'
  },
  { path: '/post/:id',  name: 'PostDetail', component: () => import('../views/social/PostDetail.vue') },
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
    component: () => import('../views/social/ChatView.vue') // 新建的聊天组件
  },
  { path:'/home',component: Home},
  {
    path: '/reviews/:productId',
    name: 'Reviews',
    component: () => import('../views/Product/ReviewPage.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/buy/CartView.vue')
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('../views/buy/CheckoutView.vue')
  },
  {
    path: '/order-result',
    name: 'OrderResult',
    component: () => import('../views/buy/OrderResult.vue')
  },
  {path: '/c1',component: c1},
  {path: '/c2',component: c2},
  {path: '/c3',component: c3},
  {path: '/c4',component: c4},
  {
    path: '/my-customers',
    name: 'MyCustomers',
    component: MyCustomers
  },
  {
    path: '/customer-orders',
    name: 'CustomerOrders',
    component: CustomerOrders
  },
  {
    path: '/pending-payment',
    name: 'PendingPayment',
    component: PendingPayment
  },
  {
    path: '/pending-shipment',
    name: 'PendingShipment',
    component: PendingShipment
  },
  {
    path: '/pending-receipt',
    name: 'PendingReceipt',
    component: PendingReceipt
  },
  {
    path: '/pending-review',
    name: 'PendingReview',
    component: PendingReview
  },
  {
    path: '/refund-service',
    name: 'RefundService',
    component: RefundService
  },
  {
    path: '/my-devices',
    name: 'MyDevices',
    component: DeviceManage
  },
  {
    path: '/settings/:id',
    name: 'DeviceSettings',
    component: DeviceSettings,
    props: true
  }
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