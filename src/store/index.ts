import { defineStore } from 'pinia'
import { MenuData } from '@/types'
import { RouteLocationNormalized } from 'vue-router'
import { Ref } from 'vue'
export interface IndexState {
    loading: number
    theme: string
    lastRouters: MenuData[]
    routerTags: RouteLocationNormalized[]
}

const useIndexStore = defineStore('index', {
    state: (): IndexState => {
        return {
            loading: 0,
            theme: 'rgb(48, 65, 86)',
            lastRouters: [],
            routerTags: []
        }
    },
    actions: {
        addLoading() {
            this.loading++
        },
        subLoading() {
            if (this.loading <= 0) {
                this.loading = 0
                return
            }
            this.loading--
        },
        lastRouter(val: MenuData[]) {
            this.lastRouters = val
        },
        addRouterTag(val: RouteLocationNormalized) {
            const arr = this.routerTags.filter((item) => {
                return item.path === val.path
            })
            arr.length === 0 && this.routerTags.push(val)
        },
        deleteRouterTag(val: RouteLocationNormalized) {
            const index = this.routerTags.indexOf(val)
            this.routerTags.splice(index, 1)
        },
        closeOthersTags(val: RouteLocationNormalized) {
            this.routerTags = [val]
        },
        closeAllTags() {
            this.routerTags = []
        }
    },
    getters: {
        getLastRouter(state) {
            return state.lastRouters.map((item) => {
                return {
                    path: item.path,
                    name: item.name
                }
            })
        }
    },
    persist: {
        enabled: true,
        strategies: [
            {
                storage: sessionStorage,
                paths: ['routerTags']
            }
        ]
    }
})
export default useIndexStore
