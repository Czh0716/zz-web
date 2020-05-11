import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: () => import('@/views/login')
    },
    {
        path: '/admin',
        component: () => import('@/views/admin'),
        children: [
            {
                path: 'product',
                component: () => import('@/views/admin/product')
            }
        ]
    },
    {
        path: '/editor',
        component: () => import('@/views/editor')
    }
]

const router = new VueRouter({
    routes
})

export default router
