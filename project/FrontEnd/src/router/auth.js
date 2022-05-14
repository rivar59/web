import Login from '../views/auth/Login.vue';
import Register from '../views/auth/Register.vue';

const authRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requires_guest: true,
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
];

export default authRoutes;
