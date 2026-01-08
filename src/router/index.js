import { createRouter, createWebHistory } from 'vue-router'
import SearchView from '../views/SearchView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Search',
      component: SearchView,
    },
    {
      path: '/Favorite',
      name: 'Favorite',
      component: () => import('../views/FavoriteView.vue'),
    },
    {
      path: '/Want',
      name: 'Want',
      component: () => import('../views/WantView.vue'),
    },
    {
      path: '/Hotel',
      name: 'Hotel',
      component: () => import('../views/HotelView.vue'),
    },
  ],
})

export default router
