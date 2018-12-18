import Vue from 'vue'
import Router from 'vue-router'
import Signin from './components/users/Signin.vue';
import Signup from './components/users/Signup.vue';
import Vacants from './components/vacants/Vacants.vue';
import Status from './views/Status.vue';
import Contract from './views/Contracts.vue'
import AddVacant from './components/vacants/AddVacant.vue';
import Categories from './views/Categories.vue';
import VacantInformation from './components/vacants/VacantInformation.vue';
import Home from './views/Home.vue';
import FilteredVacants from './views/Filtered.vue';
import ProfileView from './views/Profile.vue';
import CheckIfIsAuthenticated from './middlewares/authenticated';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/vacants/filtered',
      name: 'fitered-vacants',
      component: FilteredVacants,
    },
    {
      path: '/vacants',
      name: 'vacants',
      component: Vacants
    },
    {
      path: '/add-vacant',
      name: 'addvacant',
      component: AddVacant
    },
    {
      path: '/vacant-details/:id',
      name: 'vacant-details',
      props: true,
      component: VacantInformation
    },
    {
      path: '/categories',
      name: 'categories',
      component: Categories
    },
    {
      path: '/signin',
      beforeEnter: CheckIfIsAuthenticated,
      name: 'signin',
      component:Signin
    },
    {
      path: '/signup',
      beforeEnter: CheckIfIsAuthenticated,
      name: 'signup',
      component: Signup
    },
    {
      path:'/statuses',
      component: Status,
      name: 'statuses'
    },
    {
      path:'/contracts',
      component: Contract,
      name: 'contracts'
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
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
