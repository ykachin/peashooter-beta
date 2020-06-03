import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const moduleResource = {
  state: {
    // 用户id
    userId: 1
  },

}

export default new Vuex.Store({
  state: {
    // 模拟用户数据
    userId: 2,
    UserName: 'HHQ',
    points: window.sessionStorage.getItem("points"),

    // 资源信息
    resources : {
      'all': {page: 0, list: []},
      'music': {page: 0, list: []},
      'movie': {page:0, list: []},
      'read': {page:0, list:[]}
    },

    resourcesZhIndex : {
      '所有': {page: 0, list: []},
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    resource: moduleResource
  }
})
