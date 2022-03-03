import { createRouter, RouteRecordRaw, createWebHashHistory, RouteLocationNormalized } from 'vue-router'
import layout from './layout'
import useIndexStore from '../store'
import { fetchRouters } from '@/api'
import { MenuData } from '@/types'
import cloneDeep from 'lodash/cloneDeep'
import { Storage } from '@/utils/storage'
import { Message } from '@/utils/message'
const isTagLayout = (item: RouteRecordRaw) => {
    if (item.children) {
        item.children.forEach((child: RouteRecordRaw) => {
            isTagLayout(child)
        })
    } else {
        item.meta = { isTag: true, isValued: false }
    }
}
layout.forEach((item: RouteRecordRaw) => {
    isTagLayout(item)
})
const routes: Array<RouteRecordRaw> = [
    {
        name: 'login',
        path: '/login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/',
        component: () => import('@/views/layout/layout.vue'),
        children: [
            {
                path: '/',
                name: 'home',
                component: () => import('@/views/Home.vue')
            }
        ]
    },
    ...layout
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
router.beforeEach(async (to: RouteLocationNormalized, from, next) => {
    if (Storage.getItem('user')) {
        let menu = []
        if (!Storage.getItem('menu')) {
            const res = await fetchRouters()
            menu = res.data
            const searchPathArr: MenuData[] = []
            const routeMap: any = {}
            getRoutersLast(menu, searchPathArr)
            searchPathArr.forEach((item) => {
                routeMap[item.path] = item.name
            })
            Storage.setItem('routeMap', routeMap)
            Storage.setItem('activeMenu', searchPathArr)
            Storage.setItem('menu', menu)
        }
    } else {
        if (to.path !== '/login') next({ path: '/login' })
    }
    if (to.meta?.isTag) {
        const routeMap = Storage.getItem('routeMap')
        if (to.meta.isValued === false && !routeMap[to.path]) {
            await Message.longError('无权限，请联系管理员')
            return
        } else {
            to.meta.isValued = true
        }
        const store = useIndexStore()
        store.addRouterTag(to)
    }
    next()
})
const getRoutersLast = (menu: MenuData[], searchPathArr: MenuData[]) => {
    menu.forEach((item: MenuData) => {
        if (item.children && item.children.length > 0) {
            getRoutersLast(item.children, searchPathArr)
        } else {
            const newItem = cloneDeep(item)
            searchPathArr.push(newItem)
        }
    })
}
export default router
