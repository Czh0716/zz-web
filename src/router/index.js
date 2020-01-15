import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/editor'
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
