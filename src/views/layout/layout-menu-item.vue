<script lang="ts" setup>
import useIndexStore from '@/store'
import { isURL, validateNull } from '@/utils/validate'
import { onMounted, ref } from 'vue'
import { MenuData } from '@/types'
import { Storage } from '@/utils/storage'

const addPath = (ele: MenuData, first?: boolean) => {
    ele.source = 'Menu'
    const isChild = ele.children && ele.children.length !== 0
    if (!isChild) ele.children = []
    if (!isChild && first && !isURL(ele.path)) {
        ele.path = ele.path + '/index'
    } else {
        ele.children.forEach((child: MenuData) => {
            addPath(child)
        })
    }
}
const searchPathArr: MenuData[] = Storage.getItem('activeMenu')
const menu = ref<any>([])
onMounted(() => {
    const _menu = Storage.getItem('menu')
    _menu.forEach((item: MenuData) => {
        addPath(item)
    })
    menu.value = _menu
    const store = useIndexStore()
    store.lastRouter(searchPathArr)
})
</script>
<template>
    <template v-for="item in menu">
        <el-menu-item v-if="validateNull(item.children)" :key="item.path" :index="item.path">
            <el-icon>
                <component :is="item.source"></component>
            </el-icon>
            <template #title>{{ item.name }}</template>
        </el-menu-item>
        <el-sub-menu v-else-if="!validateNull(item.children)" :key="item.path" :index="item.path">
            <template #title>
                <el-icon>
                    <component :is="item.source"></component>
                </el-icon>
                <span>{{ item.name }}</span>
            </template>
            <template v-for="child in item.children">
                <el-menu-item v-if="validateNull(child.children)" :key="child.path" :index="child.path">
                    <el-icon>
                        <component :is="item.source"></component>
                    </el-icon>
                    <template #title>{{ child.name }}</template>
                </el-menu-item>
            </template>
        </el-sub-menu>
    </template>
</template>
