import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '',
    redirect: '/home',
  },
  {
    path: '/home',
    component: () => import("@/views/home/HomeIndex"),
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
