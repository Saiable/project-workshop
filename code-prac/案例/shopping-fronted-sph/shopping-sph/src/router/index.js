import Vue from 'vue'
import VueRouter from 'vue-router'

let originPush = VueRouter.prototype.push
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(
            this,
            location,
            () => {
            },
            () => {
            })
    }
}

let originReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(
            this,
            location,
            () => {
            },
            () => {
            })
    }
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '@/pages/Home/index.vue'),
    meta: {
      show: true
    }
  },
  {
    path: '/search/:keyword?',
    name: 'Search',
    component: () => import('@/pages/Search/index.vue'),
    meta: {
      show: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/pages/Register/index.vue'),
    meta: {
      show: false
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/Login/index.vue'),
    meta: {
      show: false
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
