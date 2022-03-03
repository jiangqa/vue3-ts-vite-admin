<script lang="ts" setup>
import useUserInfo from '@/use/userInfo.use'
// import { SwitchButton } from '@element-plus/icons-vue'
import { Message } from '@/utils/message'
import router from '@/router'
import logo from '@/assets/logo.png'
import { Storage } from '@/utils/storage'

const loginOut = () => {
    Message.messageConfirm('退出系统, 是否继续?', () => {
        Storage.clearStorage()
        router.push('/login')
        window.location.href = `${process.env.VUE_APP_SSO_URL}`
    })
}
const { getUser } = useUserInfo()
const user = getUser()
</script>
<template>
    <div class="line-center">
        <img :src="user.avatar || logo" alt="" />
        <div class="username">{{ user.userName || user.user_name }}</div>
        <el-tooltip content="退出">
            <el-icon class="top-user-icon" size="20" @click="loginOut"><switch-button /></el-icon>
        </el-tooltip>
    </div>
</template>
<style lang="less" scoped>
img {
    width: 24px;
    height: 24px;
    border-radius: 50% 50%;
}
.username {
    padding: 0 10px;
}
.top-user-icon {
    cursor: pointer;
}
</style>
