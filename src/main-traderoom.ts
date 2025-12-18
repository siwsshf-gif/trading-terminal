import './assets/css/traderoom.css'
import { createApp } from 'vue'
import TraderoomApp from './TraderoomApp.vue'

const app = createApp(TraderoomApp)

// vm = instancia del componente raíz
const vm = app.mount('#app')

// Exponer la instancia real del componente
// @ts-ignore
window.app = vm
