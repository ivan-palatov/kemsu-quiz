import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Auth from '../views/Auth.vue'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    // component: () =>
    //   import(/* webpackChunkName: "auth" */ '../views/Auth.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
