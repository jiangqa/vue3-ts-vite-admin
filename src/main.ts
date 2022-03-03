import { createApp } from 'vue'
import router from './router'
import { createPinia } from 'pinia'
import App from './App.vue'
import ui from './ui'
import piniaPluginPersist from 'pinia-plugin-persist'
const app = createApp(App)
const store = createPinia().use(piniaPluginPersist)
app.use(store).use(router).use(ui).mount('#app')
