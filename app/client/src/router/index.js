import Vue from 'vue'
import VueRouter from 'vue-router'
import Position from '../components/Position.vue'
import Carte from '../components/Carte.vue'
import PosCate from '../components/PosCate.vue'
import Login from '../components/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'PosCate',
    component : PosCate 
  },{
    path: '/login',
    name: 'Login',
    component : Login 
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
