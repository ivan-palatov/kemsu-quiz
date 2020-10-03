import '@/assets/tailwind.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFlag } from '@fortawesome/free-regular-svg-icons'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

library.add(faFlag, faUserCircle)

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(createPinia())
  .use(router)
  .mount('#app')
