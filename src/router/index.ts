import { createRouter, createWebHistory } from 'vue-router';
import PageNotFound from '@/views/PageNotFound.vue';
import PassengerView from '@/views/PassengerView.vue';
import PassengerDetails from '@/views/PassengerDetails.vue';
import AirlineDetails from '@/views/AirlineDetails.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'passenger',
      component: PassengerView
    },
    {
      path: '/passenger/:id', // 添加乘客详细信息页的路由
      name: 'PassengerDetails',
      component: PassengerDetails
    },
    {
      path: '/passenger',
      name: 'Passenger',
      component: PassengerView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'PageNotFound',
      component: PageNotFound
    },
    {
      path: '/airline/:id', // 航空公司详细信息页路由
      name: 'AirlineDetails',
      component: AirlineDetails
    },
  ]
})

export default router;
