import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: ()=>import( '@/views/Home.vue')
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
    path: '/product/:id',
    component: () => import('@/views/ProductDetail.vue')
  }
]

const router = createRouter({
  history: createWebHistory('/sea/SeaProject/SeaProject/SeaShop/dist/'),
  routes
})

export default router