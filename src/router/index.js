import { createRouter, createWebHistory } from 'vue-router'

import Login from "@/views/Login.vue";

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },

  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },

  {
    path: '/pedidos',
    name: 'Pedidos',
  
    component: () => import(/* webpackChunkName: "pedidos" */ '../views/Pedidos.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
