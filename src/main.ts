import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { createAppI18n } from './plugins/i18n'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(createAppI18n())
app.use(pinia)

app.mount('#app')
