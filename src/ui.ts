import { App } from 'vue'
import Container from './components/layout/LayoutContainer.vue'
import Scroll from './components/layout/LayoutScroll.vue'
import './assets/less/layout.less'
import './assets/less/rewrite.less'
import * as icon from '@element-plus/icons-vue'
export default {
    install: (app: App) => {
        app.component('LayoutContainer', Container)
        app.component('LayoutScroll', Scroll)
        Object.keys(icon).forEach((key: string) => {
            app.component(key, icon[key as keyof typeof icon])
        })
    }
}
