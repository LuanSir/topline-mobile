import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from '@/utils/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 初始化的时候从本地存储获取数据，防止刷新的时候丢失token
    user: auth.getUser()
  },
  mutations: {
    // 登陆成功，调用mutations更新容器中的user状态
    setUser (state, data) {
      state.user = data
      // 将获取到的数据放到本地存储
      auth.saveUser(state.user)
    }
  },
  actions: {

  }
})
