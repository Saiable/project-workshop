import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home/index.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('@/views/Cart/index.vue')
  },
  {
    path: '/mine',
    name: 'mine',
    component: () => import('@/views/Mine/index.vue')
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('@/views/Order/index.vue')
  },
  {
    path: '/store',
    name: 'store',
    component: () => import('@/views/Store/index.vue')
  },
  {
    path: '/createOrder',
    name: 'createOrder',
    component: () => import('@/views/createOrder/index.vue')
  },
  {
    path: '/address',
    name: 'address',
    component: () => import('@/views/Address/index.vue')
  },
  {
    path: '/editaddress',
    name: 'editaddress',
    component: () => import('@/views/editAddress/index.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
