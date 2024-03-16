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
        { path: 'bill-manage', component: () => import('../views/bill/bill-manage.vue') },
        { path: 'bill-import', component: () => import('../views/bill/bill-upload.vue') },
        { path: 'bill-detail', component: () => import('../views/bill/bill-detail.vue') },
        { path: 'bill-trend', component: () => import('../views/bill/bill-trend.vue') }
      ]
    }
  ]
})

export default router
