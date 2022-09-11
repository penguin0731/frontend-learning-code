import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/reset.css'
import store from './store/index'

Vue.config.productionTip = false;

// 全局守卫
// 守卫执行顺序为：全局守卫 => 路由独享守卫 => 组件守卫
router.beforeEach((to, from, next) => {
  // console.log('beforeEach');
  // if(['student', 'community', 'academic', 'download', 'personal'].includes(to.name)) {
  //   // 校验
  // }else {
  //   next();
  // }

  
  // const needLogin = to.matched.some(route => route.meta && route.meta.login);
  // if (needLogin) {
  //   // 校验
  //   const isLogin = document.cookie.includes('login=true');
  //   if(isLogin) {
  //     next();
  //     return;
  //   }

  //   const toLoginFlag = window.confirm('该页面需要登录才能访问，确认登录？');
  //   if(toLoginFlag) {
  //     next('/login');
  //   }
  //   return;
  // }
  next();
  
});

// // 当路由的内容都解析完毕后执行
// router.beforeResolve((to, from, next) => {
//   console.log('beforeResolve');
//   next();
// });

// // 在所有东西解析完毕最后才执行
// router.afterEach(() => {
//   console.log('afterEach');
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
