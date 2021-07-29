import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Delivery from './views/Delivery.vue'
import EditDelivery from './views/EditDelivery.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/delivery',
      name: 'delivery',
      component: Delivery
    },
    {
      path: '/edit-delivery',
      name: 'edit-delivery',
      component: EditDelivery
    },
  ]
});