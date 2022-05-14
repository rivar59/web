import AddComment from '../views/user/AddComment.vue';
import MyList from '../views/user/MyList.vue';

const userRoutes = [
  {
    path: '/add',
    name: 'AddComment',
    component: AddComment,
    meta: {
      requires_auth: true,
    },
  },
  {
    path: '/mine',
    name: 'MyList',
    component: MyList,
    meta: {
      requires_auth: true,
    },
  },
];

export default userRoutes;
