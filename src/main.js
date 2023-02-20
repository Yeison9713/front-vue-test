import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import router from './js/router'
import store from './js/store'


createApp(App).use(router).use(store).mount('#app')
