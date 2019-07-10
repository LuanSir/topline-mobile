import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VeeValidate, { Validator } from 'vee-validate'
import zhCN from 'vee-validate/dist/locale/zh_CN'

// 引入vant框架
import Vant from 'vant'
import 'vant/lib/index.css'

// 引入rem适配文件
import 'amfe-flexible'

Vue.use(Vant)
Vue.use(VeeValidate, {
  // 配置改变的时候去触发校验，默认是input
  // 配置文档：https://baianat.github.io/vee-validate/guide/events.html#changing-default-events
  event: ''
})
Validator.localize('zh_CN', zhCN)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
