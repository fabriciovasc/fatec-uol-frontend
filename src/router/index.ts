import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Registration from '@/views/Registration.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/sign-up'
  },
  {
    path: '/sign-up',
    name: 'Inscreva-se',
    component: Home
  },
  {
    path: '/registration',
    name: 'Cadastros',
    component: Registration
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
