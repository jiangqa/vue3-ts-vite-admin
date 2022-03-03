<script setup lang="ts">
// import { Fold, Expand } from '@element-plus/icons-vue'
import TopSearch from './top/top-search.vue'
import TopUser from './top/top-user.vue'
import LayoutMenuItem from './layout-menu-item.vue'
import LayoutNavbar from './layout-navbar.vue'
import TopFullScreen from './top/top-full-screen.vue'

import useConfig from '@/use/config.use'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const { title } = useConfig()
const isCollapse = ref(false)
const changeCollapse = () => {
    isCollapse.value = !isCollapse.value
}
const activeRoute = computed(() => {
    return useRoute().path
})
</script>
<template>
    <el-container class="content">
        <el-aside class="aside" style="background-color: rgb(48, 65, 86)">
            <el-scrollbar>
                <el-menu
                    router
                    class="layout-menu"
                    :default-active="activeRoute"
                    :collapse="isCollapse"
                    active-text-color="#ffd04b"
                    background-color="rgb(48, 65, 86)"
                    text-color="#fff"
                >
                    <h3>{{ isCollapse ? '' : title }}</h3>
                    <layout-menu-item />
                </el-menu>
            </el-scrollbar>
        </el-aside>
        <el-container class="content">
            <el-header>
                <div class="line-between">
                    <div class="line-center">
                        <el-icon class="top-icon" size="20" @click="changeCollapse">
                            <fold v-show="!isCollapse" />
                            <expand v-show="isCollapse" />
                        </el-icon>
                        <top-search />
                    </div>
                    <div class="line-center">
                        <top-full-screen />
                        <top-user class="top-user" />
                    </div>
                </div>
                <layout-navbar />
            </el-header>
            <el-main>
                <router-view class="router-view" />
            </el-main>
        </el-container>
    </el-container>
</template>
<style lang="less" scoped>
h3 {
    height: 60px;
    line-height: 60px;
    text-align: center;
    margin: 0;
    color: #fff;
    overflow: hidden;
}
.content {
    height: 100%;
}
.line-between {
    padding: 0 20px;
}
.line-center {
    height: 40px;
}
.top-icon {
    margin-right: 20px;
    cursor: pointer;
}
.aside {
    width: auto;
}
.main-view {
    background: #f5f5f5;
    padding: 20px;
    height: 100%;
}
.router-view {
    background: #fff;
    height: 100%;
}
.layout-menu:not(.el-menu--collapse) {
    width: 220px;
}
</style>
