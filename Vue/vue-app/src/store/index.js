import Vue from 'vue'
import Vuex from 'vuex'
import student from './student'
import learn from './learn'

Vue.use(Vuex); //向Vue实例上添加$store 获取$store.state.name为‘cxj’

export default new Vuex.Store({
  // 在生产模式时开启严格模式
  strict: process.env.NODE_ENV !== 'production',
  // 模块
  modules: {
    student,
    learn
  },
})




