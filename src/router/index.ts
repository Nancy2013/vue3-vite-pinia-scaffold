import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Login from '@/views/sys/login/login.vue'
import Layout from '@/views/main/layout/index.vue'
import passportManage from './passportManage'
import mobileRoute from './mobile'
console.log('mobileRoute', mobileRoute)

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/layout',
            name: 'layout',
            component: Layout,
            children: [
                ...passportManage,
            ]
        },
        ...mobileRoute
    ]
})

export default router
