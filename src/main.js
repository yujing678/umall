// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 1.引入静态文件
import './assets/css/reset.css'

// 2.引入公共组件
import './components'

// 3.引入过滤器
import './filters'

// 4.引入vuex
import store from './store'

// 5.引入element-ui,官网复制
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
