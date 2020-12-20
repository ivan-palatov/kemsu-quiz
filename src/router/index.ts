import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
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
    component: () => import(/* webpackChunkName: "auth" */ '../views/Auth.vue'),
  },
  {
    path: '/quiz/:id',
    name: 'Quiz',
    component: () => import(/* webpackChunkName: "quiz" */ '../views/Quiz.vue'),
  },
  {
    path: '/begin-quiz/:id',
    name: 'BeginQuiz',
    component: () =>
      import(/* webpackChunkName: "quiz" */ '../views/BeginQuiz.vue'),
  },
  {
    path: '/end-quiz',
    name: 'EndQuiz',
    component: () =>
      import(/* webpackChunkName: "quiz" */ '../views/EndQuiz.vue'),
  },
  {
    path: '/create-quiz',
    name: 'CreateQuiz',
    component: () =>
      import(/* webpackChunkName: "teacher" */ '../views/CreateQuiz.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
