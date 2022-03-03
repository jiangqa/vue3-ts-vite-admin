<script setup lang="ts">
import useIndexStore from './store/index'
import { toRefs, watch } from 'vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
const loading = toRefs(useIndexStore()).loading
watch(loading, (v: number) => {
    v > 0 ? NProgress.start() : NProgress.done()
})
</script>

<template>
    <router-view></router-view>
</template>

<style>
#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #fff;
}
</style>
