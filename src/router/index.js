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
  },

  {
    path: '/produtos',
    name: 'Products',
    component: () => import(/* webpackChunkName: "produtos" */ '../views/Product.vue'),
    beforeEnter: AuthVerifyRouter,
    meta: {
      role: 'ADMINISTRADOR'
    }
  },
  {
    path: '/usuario',
    name: 'Usuário',
    component: () => import(/* webpackChunkName: "usuario" */ '../views/Usuario.vue'),
    beforeEnter: AuthVerifyRouter
  },
  {
    path: '/userList',
    name: 'UserList',
    component: () => import(/* webpackChunkName: "userList" */ '../views/UserList.vue'),
    beforeEnter: AuthVerifyRouter
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router
