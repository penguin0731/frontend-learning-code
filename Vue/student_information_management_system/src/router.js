import Vue from 'vue'
import Router from 'vue-router'
import addStu from './views/addStu'
import stuList from './views/stuList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/stuList',
      name: 'studentList',
      component: stuList
    },
    {
      path: '/addStu',
      name: 'addStudent',
      component: addStu
    },
    {
      path: '*',
      redirect: '/stuList'
    }
  ],

})
