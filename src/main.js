// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import md5 from 'js-md5'//md5加密
import { post } from './utils/fetch.js' 
import '../src/assets/css/common.scss'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import common from './commonFunction/common.js' //引入公共方法
import comRequest from './commonFunction/comRequest.js' //引入公共方法
import cr_component from './components/common/index.js' //注册自定义的场景组件
import cm_component from './components/comModel/index.js' //注册自定义的场景组件

Vue.config.productionTip = false

Vue.prototype.bus = new Vue();
Vue.prototype.md5 = md5;
Vue.prototype.common = common;
Vue.prototype.comRequest = comRequest;
Vue.use(ElementUI)
Vue.use(cr_component)
Vue.use(cm_component)
Vue.prototype.post = post;



//路由验证
// router.beforeEach((to, from, next) => {
//   var userid = sessionStorage.getItem('userid');
//   if (!userid && to.path !== '/login') {
//     next({
//       path: '/login',
//       query: { redirect: to.fullPath }
//     })
//   } else if (userid && to.path === '/login') {
//     next();
//   } else {
//     next();
//   }
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
