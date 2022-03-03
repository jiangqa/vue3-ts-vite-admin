import { ElLoading } from 'element-plus'
import 'element-plus/theme-chalk/el-loading.css'
export default function loadingUse() {
    let loading: any
    const openLoading = () => {
        loading = ElLoading.service({ fullscreen: true })
    }
    const closeLoading = () => {
        loading && loading.close()
    }
    return { openLoading, closeLoading }
}
