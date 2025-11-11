import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createAppI18n } from './plugins/i18n'

const app = createApp(App)

app.use(router)
app.use(createAppI18n())

app.mount('#app')
