

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'ant-design-vue/es/message/style/css'
import 'ant-design-vue/es/tabs/style/css'

// 导入语言包
import i18n from '@/languages/i18n'
import FcIcon from "@/components/icon";
import FcForm from "@/components/form";
import FcTable from "@/components/table/table.vue";


const app = createApp(App)

app.component("fc-icon", FcIcon);
app.component("fc-table", FcTable);
app.component("fc-form", FcForm);

app.use(createPinia())
app.use(router)
// 配置语言包
app.use(i18n);

app.mount('#app')
