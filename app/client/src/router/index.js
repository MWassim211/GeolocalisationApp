import Vue from 'vue'
import VueRouter from 'vue-router'
import Position from '../components/Position.vue'
import Carte from '../components/Carte.vue'
import PosCate from '../components/PosCate.vue'
import Login from '../components/Login.vue'
import Gamesettings from '../components/Gamesettings.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name : 'PosCate',
    component : PosCate
  },{
    path: '/login',
    name: 'login',
    component : Login 
  },{
    path: '/gamesettings',
    name: 'gamesettings',
    component : Gamesettings 
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },

  // otherwise redirect to home
 // { path: '*', redirect: '/' }
]

const router = new VueRouter({
  routes
})

export default router


router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
})