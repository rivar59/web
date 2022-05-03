import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import BasketDisplay from '../components/BasketDisplay.vue';
import NotFound from '../components/NotFound.vue';
import BuyPage from '../components/BuyPage.vue';


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/buy',
    name: 'buy',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/Basket',
    name: 'BasketDisplay',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: BasketDisplay
  },
  {
    path: '/BuyPage',
    name: 'BuyPage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: BuyPage
  },
  {
    path: '/:catchAll(.*)*',
    name: 'NotFound',
    component: NotFound
  } 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
