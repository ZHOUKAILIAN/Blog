import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home/index.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/daily',
    name: 'daily',
    component: () => import('../views/Daily/index.vue')
  },
  {
    path: '/blog/:id?',
    name: 'blog',
    component: () => import('../views/Blog/index.vue')
  },
  {
    path: '/create',
    name: 'create',
    component: () => import('../views/Create/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
