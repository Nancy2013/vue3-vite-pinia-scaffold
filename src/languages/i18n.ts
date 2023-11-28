import { createI18n } from 'vue-i18n'
import messages from './langs'

// 语言选择，默认中文
const i18n = new createI18n({
    legacy: false, // 使用 Composition API 模式, 则需要将其设置为false
    globalInjection: true, // 全局生效$t
    locale: 'cn',
    messages
})

export default i18n