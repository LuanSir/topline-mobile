import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      // name: 'home',
      path: '/',
      component: () => import('@/views/layout'),
      children: [
        { // 默认子路由
          name: 'home',
          path: '',
          component: () => import('@/views/home')
        }
      ]
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login')
    }
  ]
})
