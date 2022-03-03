import { RouteRecordRaw } from 'vue-router'
import test from './pages/test'
export default [
    {
        path: '/',
        name: 'layout',
        component: () => import('@/views/layout/layout.vue'),
        children: [...test]
    }
] as Array<RouteRecordRaw>
