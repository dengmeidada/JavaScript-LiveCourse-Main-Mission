import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入全域 css
import '@/assets/css/app.scss'
import axios from 'axios'
import VueAxios from 'vue-axios'
// 引入filter (默認職是index.js)
import * as filters from './filters/'
// 引入 bootstrap
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// vue-fontawesome
/* 使用資料來源:https://medium.com/%E6%BC%AB%E7%AF%89%E8%98%AD%E6%A0%BC/%E5%A6%82%E4%BD%95%E5%9C%A8-vue-%E8%A3%A1%E9%9D%A2%E4%BD%BF%E7%94%A8-font-awesome-c0d8f66c1e3b
 https://hsiangfeng.github.io/vue/20190726/2706745772/ */
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// 驗證套件
import { ValidationObserver, ValidationProvider, extend, localize } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import TW from 'vee-validate/dist/locale/zh_TW.json'
// 註冊語言vee-validate繁體中文

// Add a rule，此範例中添加了一個名為'secret'的規則，若 value 值不為 'example'，就會回饋 message 裡的文字。
import { required, email, alpha, length, max } from 'vee-validate/dist/rules'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueAxios, axios)

// vue-fontawesome
library.add(fab, far, fas)
Vue.component('font-awesome-icon', FontAwesomeIcon) // 使用kebab-case

// 驗證套件
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule])
})
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)// 註冊ValidationProvider(vee-validate驗證套件)
// 註冊語言vee-validate繁體中文
localize('zh_TW', TW)

// 規定email格式vee-validate
extend('email', email)
extend('alpha', alpha)
extend('length', length)
extend('max', max)
extend('required', { // 這邊可以改寫我們，告知使用者是必填欄位的提示文字
  ...required,
  message: '此欄位為必填欄位'
})
extend(' alpha_num', {
  ...alpha,
  message: '此欄位請填英、數字'
})

Vue.config.productionTip = false

// 將所有引入filter 方法 註冊全域filter
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
