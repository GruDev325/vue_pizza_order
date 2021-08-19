  /*eslint-disable */
import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Orders from '../views/Orders.vue';

const routes = [
  {
    path: '/',
    name: 'orders',
    component: import('../views/Orders.vue'),
  },
  {
    path: '/home',
    name: 'home',
    component: import('../views/Home.vue'),
  },
  {
    path: '/home/:id',
    name: 'home_edit',
    component: import('../views/Home.vue'),
  },
  {
    path: '/order/:orderId',
    name: 'recipe',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import('../views/Recipe.vue'),
  },
 
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
