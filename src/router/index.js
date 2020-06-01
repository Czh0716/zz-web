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
        path: '/admin/:id',
        component: () => import('@/views/admin'),
        children: [
            {
                path: '/',
                component: () => import('@/views/admin/product')
            }
        ]
    },
    {
        path: '/editor/:id',
        component: () => import('@/views/editor')
    },
    {
        path: '/running/:id',
        component: () => import('@/views/running')
    }
]

const router = new VueRouter({
    routes
})

export default router
