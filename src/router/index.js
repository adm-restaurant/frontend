import { createRouter, createWebHistory } from 'vue-router';

import Login from "@/views/Login.vue";
import AuthVerifyRouter from "@/utils/AuthVerifyRouter";

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token');
      if(token) {
        next('/home');
      } else {
        next();
      }
    }
  },

  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    beforeEnter: AuthVerifyRouter
  },

  {
    path: '/pedidos',
    name: 'Pedidos',
    component: () => import(/* webpackChunkName: "pedidos" */ '../views/Pedidos.vue'),
    beforeEnter: AuthVerifyRouter
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router
