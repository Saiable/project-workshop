import { createRouter, createWebHashHistory } from 'vue-router';
import { showToast } from 'vant';
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
    component: () => import('@/views/Cart/index.vue'),
    meta: {
      isAuth: true
    }
  },
  {
    path: '/mine',
    name: 'mine',
    component: () => import('@/views/Mine/index.vue'),
    meta: {
      isAuth: true
    }
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('@/views/Order/index.vue'),
    meta: {
      isAuth: true
    }
  },
  {
    path: '/store',
    name: 'store',
    component: () => import('@/views/Store/index.vue')
  },
  {
    path: '/createOrder',
    name: 'createOrder',
    component: () => import('@/views/createOrder/index.vue'),
    meta: {
      isAuth: true
    }
  },
  {
    path: '/address',
    name: 'address',
    component: () => import('@/views/Address/index.vue'),
    meta: {
      isAuth: true
    }
  },
  {
    path: '/editaddress',
    name: 'editaddress',
    component: () => import('@/views/editAddress/index.vue'),
    meta: {
      isAuth: true
    }
  },
  {
    path: '/userinfoedit',
    name: 'userinfoedit',
    component: () => import('@/views/userInfoEdit/index.vue'),
    meta: {
      isAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/index.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register/index.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.isAuth) {
    if (localStorage.isLogin === 'login') {
      next()
    } else {
      next('/login')
      showToast('请登录')
    }
  } else {
    next()
  }
})
export default router
