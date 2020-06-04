import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import store from './store'
Vue.prototype.$axios = axios
axios.defaults.baseURL = process.env.VUE_APP_BASE_API
/*axios.defaults.baseURL="http://www.yjchen.top:8080"*/
import qs from 'qs';
Vue.prototype.$qs = qs
import myhead from "./components/myhead";
import myfoot from "./components/myfoot";

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
