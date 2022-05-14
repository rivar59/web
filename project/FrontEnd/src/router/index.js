import { createRouter, createWebHistory } from 'vue-router';

import jwtDecode from '../utils/jwt';

import Home from '../views/Home.vue';

import authRoutes from './auth';
import adminRoutes from './admin';
import errorsRoutes from './errors';
import userRoutes from './user';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  ...errorsRoutes,
  ...userRoutes,
  ...authRoutes,
  ...adminRoutes,
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requires_auth)) {
    const jwt = localStorage.getItem('jwt');

    if (jwt === null) {
      next({
        name: 'Login',
        params: { nextUrl: to.fullPath },
      });
    } else {
      const user = jwtDecode(jwt).payload;

      if (to.matched.some((record) => record.meta.isAdmin)) {
        if (user.role === 'admin') {
          next();
        } else {
          next({ name: 'AccessDenied' });
        }
      } else {
        next();
      }
    }
  } else {
    next();
  }
});

export default router;
