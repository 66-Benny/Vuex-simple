import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import Element from 'element-ui'
import _ from 'lodash'
import 'element-ui/lib/theme-chalk/index.css'
import VueFriendlyIframe from 'vue-friendly-iframe'

Vue.config.productionTip = false
Vue.use(Element, { size: 'small', zIndex: 3000 })
Vue.use(VueFriendlyIframe)
Vue.use(_)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})
