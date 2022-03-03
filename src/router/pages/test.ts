import { RouteRecordRaw } from 'vue-router'

export default [
    {
        path: '/order/splitorder',
        name: '123',
        component: () => import('@/views/123.vue')
    },
    {
        path: '/order/pendingorder',
        name: '1234',
        component: () => import('@/views/123.vue')
    }
] as Array<RouteRecordRaw>
