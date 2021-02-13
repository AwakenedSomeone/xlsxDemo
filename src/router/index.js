import Vue from 'vue'
import Router from 'vue-router'
import Test from '@/components/Test'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
	routes: [
		{ path: '/test', name: 'Test', component: Test},
		{ path: '/login', name: 'Login', component: Login },
		{ path: '/mind', name: 'mind', component: resolve => require(['@/views/mind.vue'], resolve) },
		{ path: '/', name: 'mind', component: resolve => require(['@/views/testXlsx.vue'], resolve) },
		{ path: '/testTree', name: 'mind', component: resolve => require(['@/views/testTree.vue'], resolve) }
	]
})
