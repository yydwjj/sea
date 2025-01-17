import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MySupplyView from '../views/MySupplyView.vue'
import ProductDetail from '../views/ProductDetail.vue'
import Mypage from '../views/Mypage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/my-supply',
    name: 'my-supply',
    component: MySupplyView
  },
  {
    path: '/product',
    name: 'ProductDetail',
    component: ProductDetail
  },
  {
    path: '/profile',
    name: 'profile',
    component: Mypage
  },
  // 其他路由...
]

const router = createRouter({
  history: createWebHistory('sea/SeaProject-Farmer/SeaProject-Farmer/SeaShop/dist/'),
  routes
})

export default router