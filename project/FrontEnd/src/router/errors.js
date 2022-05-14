import NotFound from '../error-pages/NotFound.vue';
import AccessDenied from '../error-pages/AccessDenied.vue';

const errorsRoutes = [
  {
    path: '/:catchAll(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
  {
    path: '/403',
    name: 'AccessDenied',
    component: AccessDenied,
    meta: {
      guest: true,
    },
  },
];

export default errorsRoutes;
