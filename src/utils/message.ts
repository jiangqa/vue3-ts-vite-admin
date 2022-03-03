import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/theme-chalk/el-message-box.css'
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-button.css'
import 'element-plus/theme-chalk/el-overlay.css'
export class Message {
    static async showError(messageText: string, duration: number) {
        await ElMessage.error({
            message: messageText,
            duration: duration,
            showClose: duration === 0
        })
    }
    static async longError(message: string) {
        await this.showError(message, 0)
    }
    static async shortError(message: string) {
        await this.showError(message, 3000)
    }
    static messageConfirm(message: string, fn: any, fnCatch?: any) {
        ElMessageBox.confirm(message, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
        })
            .then(() => {
                fn()
            })
            .catch(() => {
                fnCatch && fnCatch()
            })
    }
}
