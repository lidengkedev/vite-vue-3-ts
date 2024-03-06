import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/layout-default.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/home',
      component: Layout,
      children: [
        { path: 'home', component: () => import('../views/home-page.vue') },
        { path: 'bill', component: () => import('../views/bill-page.vue') },
        { path: 'import', component: () => import('../views/bill-upload.vue') },
        { path: 'detail', component: () => import('../views/bill-detail.vue') }
      ]
    }
  ]
})

export default router
