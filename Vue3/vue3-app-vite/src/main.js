import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import { message } from 'ant-design-vue'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

import mymessage from './composition/Message/index.js'


const app = createApp(App)
app.config.globalProperties.$mymessage = mymessage
app.use(ElementPlus)
app.mount('#app')
