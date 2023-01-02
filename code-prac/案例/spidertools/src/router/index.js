import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/JsonFormat'
    },
    {
        path: '/JsonFormat',
        name: 'JsonFormat',
        component: () => import('../views/JsonFormat.vue')
    },
    {
        path: '/HeaderFormat',
        name: 'HeaderFormat',
        component: () => import('../views/HeaderFormat.vue')
    },
    {
        path: '/CookieFormat',
        name: 'CookieFormat',
        component: () => import('../views/CookieFormat.vue')
    },
    {
        path: '/DictFormat',
        name: 'DictFormat',
        component: () => import('../views/DictFormat.vue')
    },
    {
        path: '/CurlFormat',
        name: 'CurlFormat',
        component: () => import('../views/CurlFormat.vue')
    },
    {
        path: '/UrlParamsParse',
        name: 'UrlParamsParse',
        component: () => import('../views/UrlParamsParse.vue')
    },
    {
        path: '/quoteUrl',
        name: 'quoteUrl',
        component: () => import('../views/quoteUrl.vue')
    },
    {
        path: '/unQuoteUrl',
        name: 'unQuoteUrl',
        component: () => import('../views/unQuoteUrl.vue')
    },
    {
        path: '/EncodeBase64',
        name: 'EncodeBase64',
        component: () => import('../views/EncodeBase64.vue')
    },
    {
        path: '/DecodeBase64',
        name: 'DecodeBase64',
        component: () => import('../views/DecodeBase64.vue')
    },
    {
        path: '/TenderMetaRender',
        name: 'TenderMetaRender',
        component: () => import('../views/TenderMetaRender.vue')
    }

]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
