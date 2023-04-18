import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  {
    path: '',
    redirect: '/home',
  },
  {
    path: '/home',
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/login',
    component: () => import("@/views/login/index.vue")
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
