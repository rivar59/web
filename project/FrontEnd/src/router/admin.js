import AdminView from '../views/admin/AdminView.vue';

const adminRoutes = [
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    meta: {
      requires_auth: true,
      isAdmin: true,
    },
  },
];

export default adminRoutes;
