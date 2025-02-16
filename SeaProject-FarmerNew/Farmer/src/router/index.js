import { createRouter, createWebHistory } from 'vue-router';
import DetectionView from '../views/DetectionView.vue';
import ProductView from '../views/ProductView.vue';
import CommunityView from '../views/CommunityView.vue';
import ProfileView from '../views/ProfileView.vue';

const routes = [
  { path: '/', redirect: '/detection' },
  { path: '/detection', component: DetectionView },
  { path: '/product', component: ProductView },
  { path: '/community', component: CommunityView },
  { path: '/profile', component: ProfileView },
  { path: '/post/:id',  name: 'PostDetail',component: () => import('../views/PostDetail.vue'),}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;