import Vue from 'vue'
import Router from 'vue-router'
import Signin from './components/users/Signin.vue';
import Signup from './components/users/Signup.vue';
import Vacants from './components/vacants/Vacants.vue';
import Status from './views/Status.vue';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Vacants
    },
    {
      path: '/signin',
      name: 'signin',
      component:Signin
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path:'/statuses',
      component: Status,
      name: 'statuses'
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
