import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'

Vue.use(Router);

export default new Router({
  mode: 'history',
  // 路径完全匹配的class
  linkExactActiveClass: 'active-exact',
  // 包含根路径的class
  linkActiveClass: 'active',
  // 路由配置
  routes: [
        // {
        //   path: '/',
        //   // 重定向
        //   redirect: '/home'
        // },
        {
          path: '/home',
          name: 'home',
          component: Home,
          // 路由独享守卫
          beforeEnter (to, from, next) {
            // console.log('beforeEnter');
            next();
          }
        }, 
        {
          path: '/learn',
          name: 'learn',
          // 懒加载
          component: () => import('_v/Learn')
        }, 
        {
          path: '/student',
          name: 'student',
          meta: {
            login: true
          },
          component: () => import('./views/Student')
        }, 
        {
          path: '/about',
          name: 'about',
          component: () => import('./views/About')          
        }, 
        {
          path: '/community',
          name: 'community',
          meta: {
            login: true
          },
          component: () => import('./views/Community'),
          // 重定向(进入社区后的默认选中项)
          redirect: '/community/academic',
          // 子路由
          children: [
                {
                  // path: '/community/academic'
                  // 等于
                  // 注意不能加/
                  path: 'academic',
                  name: 'academic',
                  component: () => import('./views/Academic')
                }, 
                {
                  path: 'download',
                  name: 'download',
                  component: () => import('./views/Download')
                }, 
                {
                  path: 'personal',
                  name: 'personal',
                  component: () => import('./views/Personal')
                }
            ]
        },
        {
          // 动态路由
          path: '/question/:id',
          name: 'question',
          component: () => import('./views/Question'),
          children: [

          ]
        },
        {
          path: '/login',
          name: 'login',
          component: () => import('./views/Login')
        },
        {
          path: '/NotFound',
          name: 'NotFound',
          component: () => import('./views/NotFound')
        },
        // 重定向的另一种方法
        {
          path: '*',
          redirect (to) {
            // console.log(to);
            if(to.path === '/') {
              return '/home';
            }else {
              return '/NotFound'
            }
          }
        }
    ]
})

























// import Vue from 'vue'
// import Router from 'vue-router'
// import Home from './views/Home.vue'

// Vue.use(Router)

// export default new Router({
//   mode: 'hash',
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       component: Home
//     },
//     {
//       path: '/about',
//       name: 'about',
//       // route level code-splitting
//       // this generates a separate chunk (about.[hash].js) for this route
//       // which is lazy-loaded when the route is visited.
//       component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
//     }
//   ]
// })
