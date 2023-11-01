import {
  createRouter,
  createWebHashHistory
} from 'vue-router'

const routes = [{
    path: '',
    redirect: '/home',
  },
  {
    path: '/home',
    redirect: '/SourceFile',
    component: () => import("@/views/Home/index.vue"),
    children: [{
        path: '/SourceFile',
        component: () => import('@/views/Home/components/SourceFile.vue')
      },
      {
        path: '/TagTask',
        component: () => import('@/views/Home/components/TagTask.vue')
      },
      {
        path: '/BackUp',
        component: () => import('@/views/Home/components/BackUp.vue')
      },
      {
        path: '/UpdateLog',
        component: () => import('@/views/Home/components/UpdateLog.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router