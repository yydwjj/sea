import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import MerchantList from '../views/MerchantList.vue'
import RecipeList from '../views/RecipeList.vue'
import MerchantDetail from '../views/MerchantDetail.vue'
const routes = [
  {
    path: '/',
    redirect: '/home',
    component:() => import('@/views/Home.vue')
  },
  {
    path: '/home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/community',
    component: () => import('@/views/Community.vue')
  },
  {
    path: '/cart',
    component: () => import('@/views/Cart.vue')
  },
  {
    path: '/profile',
    component: () => import('@/views/Profile.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/merchant',
    name: 'MerchantList',
    component: MerchantList
  },
  {
    path: '/recipe',
    name: 'RecipeList',
    component: RecipeList
  },
  {
    path: '/merchant/detail',
    name: 'MerchantDetail',
    component: MerchantDetail
  }
  
]

const router = createRouter({
  history: createWebHistory('/sea/SeaProject-Customer/SeaProject-Customer/SeaShop/dist/'),
  routes
})

export default router