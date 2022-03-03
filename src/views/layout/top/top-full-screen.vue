<script lang="ts" setup>
import { ref, Ref } from 'vue'

const fullscreenEnable = (): boolean => {
    let el: any = document.documentElement
    return el.isFullScreen || el.mozIsFullScreen || el.webkitIsFullScreen
}
const exitFullScreen = () => {
    let el: any = document.documentElement
    if (el.requestFullScreen) {
        el.exitFullScreen()
    } else if (el.webkitRequestFullScreen) {
        el.webkitCancelFullScreen()
    } else if (el.mozRequestFullScreen) {
        el.mozCancelFullScreen()
    }
}
const reqFullScreen = () => {
    let el: any = document.documentElement
    if (el.requestFullScreen) {
        el.requestFullScreen()
    } else if (el.webkitRequestFullScreen) {
        el.webkitRequestFullScreen()
    } else if (el.mozRequestFullScreen) {
        el.mozRequestFullScreen()
    }
}
const isFullScreen: Ref<boolean> = ref(fullscreenEnable())
const handleScreen = () => {
    if (fullscreenEnable()) {
        isFullScreen.value = false
        exitFullScreen()
    } else {
        isFullScreen.value = true
        reqFullScreen()
    }
}
</script>
<template>
    <el-tooltip :content="isFullScreen ? '退出全屏' : '全屏'">
        <el-icon class="fullScreen" @click="handleScreen"><full-screen /></el-icon>
    </el-tooltip>
</template>
<style scoped lang="less">
.fullScreen {
    margin: 0 15px;
    cursor: pointer;
}
</style>
