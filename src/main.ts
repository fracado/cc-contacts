import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { plugin, defaultConfig } from '@formkit/vue'
import config from '../formkit.config.ts'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCaretUp, faCaretDown, faSort } from '@fortawesome/free-solid-svg-icons'

library.add(faCaretUp, faCaretDown, faSort)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(plugin, defaultConfig(config))

app.component('FontAwesomeIcon', FontAwesomeIcon)
app.mount('#app')
