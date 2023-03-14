import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '',
    redirect: '/home',
  },
  {
    path: '/home',
    component: () => import("@/views/home/index"),
  },
  {
    path: '/userinfo',
    component: () => import("@/views/userinfo/index")
  },
  {
    path: '/login',
    component: () => import("@/views/login/index")
  },
  {
    path: '/config',
    component: () => import("@/views/config/index")
  },
  {
    path: '/bookmark',
    component: () => import("@/views/bookmark/index")
  },
  {
    path: '/test',
    component: () => import("@/components/base/test")
  },
  {
    path: '/crx',
    component: () => import("@/components/base/crx/Notification")
  }
]

const router =  new Router({
  routes
  //mode: 'history'
})

 //const whiteList = ['/login', '/home']
 //let auth = localStorage.getItem('Authorization')
 //router.beforeEach((to, from, next) => {
 //  if (auth) {
 //    if (to.path === '/login') {
 //      next({ path: '/login' })
 //    } else {
 //      next()
 //    }
 //  } else {
 //    /* has no token */
 //    if (whiteList.indexOf(to.path) !== -1) {
 //      next()
 //    } else {
 //      next('login')
 //    }
 //  }
 //})
 //
 //router.afterEach((to, from) => {
 //
 //})

export default router
