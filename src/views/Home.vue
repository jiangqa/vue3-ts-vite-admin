<script setup>
import upload from '@/components/upload/upload.vue'
import { ref } from 'vue'
const uploadRef = ref(null)
const handleUpload = () => {
    console.log(uploadRef.value.showDialog())
}
</script>
<template>
    <div>
        <el-button @click="handleUpload">上传文件</el-button>
        <upload ref="uploadRef" api="https://ssdsd"></upload>
    </div>
</template>
