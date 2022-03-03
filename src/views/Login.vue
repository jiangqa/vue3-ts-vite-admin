<script setup lang="ts">
import useLogin from '@/use/login.use'
import { onBeforeRouteLeave, useRoute } from 'vue-router'
import useUserInfo from '@/use/userInfo.use'
import { onMounted } from 'vue'
import { Storage } from '@/utils/storage'
onBeforeRouteLeave(async (to, form, next) => {
    const { getUser, fetchUser } = useUserInfo()
    if (!getUser()) {
        await fetchUser()
    }
    next()
})
const { username, password, onSubmit } = useLogin()
onMounted(() => {
    const route = useRoute()
    if (route.query.access_token) {
        Storage.setItem('token', route.query.access_token)
        Storage.setItem('systemId', route.query.systemId)
    }
})
</script>
<template>
    <div class="box-center">
        <el-form ref="formRef" class="form" label-width="120px">
            <el-form-item label="username">
                <el-input v-model="username" clearable></el-input>
            </el-form-item>
            <el-form-item label="password">
                <el-input v-model="password" type="password" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">login</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<style lang="less" scoped>
.form {
    width: 400px;
}
</style>
