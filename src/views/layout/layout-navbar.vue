<script lang="ts" setup>
import { useRoute } from 'vue-router'
import useIndexStore from '@/store/index'
// import { Close, ArrowDownBold } from '@element-plus/icons-vue'
import { computed, ref } from 'vue'
import router from '@/router'
import { Storage } from '@/utils/storage'

const isActive = (tag: any) => {
    return tag.path === route.path
}
const route = useRoute()
const store = useIndexStore()
const hoverPath = ref('')
const home = ref({
    path: '/',
    title: '首页'
})
const routeMap = ref(Storage.getItem('routeMap'))
const routerTags = computed(() => store.routerTags)
const onCloseClick = (tag: any) => {
    store.deleteRouterTag(tag)
    if (routerTags.value.length === 0) {
        router.push('/')
    } else {
        router.push(routerTags.value[routerTags.value.length - 1].path)
    }
}
const mouseenter = (fullPath: string) => {
    hoverPath.value = fullPath
}
const closeOthersTags = () => {
    if (route.path !== '/') {
        store.closeOthersTags(route)
    }
}
const closeAllTags = () => {
    store.closeAllTags()
}
const clearCacheTags = () => {
    Storage.clearStorage()
}
</script>
<template>
    <div class="tags-view-container">
        <div class="tags-view-line line-center">
            <el-scrollbar class="tags-view-wrapper flex-1">
                <div class="line-center">
                    <router-link
                        class="tags-view-item line-center"
                        active-class="active"
                        :style="{
                            color: isActive(home) ? store.theme : '',
                            borderBottomColor: isActive(home) ? store.theme : ''
                        }"
                        :to="{ path: home.path }"
                    >
                        {{ home.title }}
                    </router-link>
                    <router-link
                        v-for="tag in store.routerTags"
                        :key="tag.path"
                        class="tags-view-item line-center"
                        active-class="active"
                        :style="{
                            color: isActive(tag) ? store.theme : '',
                            borderBottomColor: isActive(tag) ? store.theme : ''
                        }"
                        :to="{ path: tag.path }"
                        @mouseenter="mouseenter(tag.path)"
                    >
                        {{ routeMap[tag.path] }}
                        <el-icon
                            class="tags-view-icon"
                            style="margin-left: 3px"
                            size="14"
                            @click.prevent.stop="onCloseClick(tag)"
                            ><close
                        /></el-icon>
                    </router-link>
                </div>
            </el-scrollbar>
            <el-dropdown>
                <el-button type="primary" size="small">
                    更多 <el-icon><arrow-down-bold /></el-icon>
                </el-button>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="closeOthersTags">关闭其他</el-dropdown-item>
                        <el-dropdown-item @click="closeAllTags">关闭所有</el-dropdown-item>
                        <el-dropdown-item @click="clearCacheTags">清除缓存</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>
<style scoped lang="less">
.tags-view-container {
    height: 35px;
    width: 100%;
    padding-right: 20px;
    background: #fff;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);

    .tags-view-wrapper {
        display: flex;
        width: 100%;
        .tags-view-item {
            margin: 0 8px;
            text-decoration: none;
            height: 33px;
            font-size: 13px;
            line-height: 33px;
            padding-left: 15px;
            padding-right: 5px;
            color: #ccc;
            border-top: 2px solid #fff;
            border-bottom: 2px solid #fff;
            transition: all 0.3s ease-in-out;
            &:first-child {
                padding: 0 15px;
            }
            .tags-view-icon {
                transition: all 0.3s ease-in-out;
                border-radius: 7px 7px;

                &:hover {
                    background: #ccc;
                    color: #fff;
                }
            }
        }
    }
}
</style>
