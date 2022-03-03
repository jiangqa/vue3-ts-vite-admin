<script lang="ts" setup>
import { useRouter } from 'vue-router'
import useIndexStore from '@/store'
import { computed, ref } from 'vue'

const router = useRouter()
const store = useIndexStore()
const lastRouter = computed(() => store.getLastRouter)
const value = ref('')
const querySearch = (queryString: string, cb: (arg: any) => void) => {
    cb(
        lastRouter.value.filter((item) => {
            return item.name.toLowerCase().indexOf(queryString.toLowerCase()) > -1
        })
    )
}
const handleSelect = (item: any) => {
    router.push(item.path)
}
</script>
<template>
    <el-autocomplete
        v-model="value"
        class="top-search"
        popper-class="my-autocomplete"
        :fetch-suggestions="querySearch"
        value-key="name"
        placeholder="搜索菜单"
        @select="handleSelect"
    >
        <template #default="{ item }">
            <div class="name">{{ item.name }}</div>
            <div class="addr">{{ item.path }}</div>
        </template>
    </el-autocomplete>
</template>
<style scoped lang="less">
.name {
    line-height: 20px !important;
    padding-top: 4px;
}

.addr {
    line-height: 20px !important;
    padding-top: 5px;
    width: 100%;
    font-size: 12px;
    color: #b4b4b4;
}
</style>
