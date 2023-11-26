import { createRouter, createWebHistory } from 'vue-router';

import Login from "@/views/Login.vue";

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
    meta: {
      requiresAuth: true
    },
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
    meta: {
      requiresAuth: true
    }
  },

  {
    path: '/pedidos',
    name: 'Pedidos',
    component: () => import(/* webpackChunkName: "pedidos" */ '../views/Pedidos.vue'),
    meta: {
      requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router
