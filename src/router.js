import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import DeliveryList from './views/DeliveryList.vue'
import DeliveryEdit from './views/DeliveryEdit.vue'
import OrderList from './views/OrderList.vue'
import OrderEdit from './views/OrderEdit.vue'
import StockList from './views/StockList.vue'
import StockEdit from './views/StockEdit.vue'

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
      component: DeliveryList
    },
    {
      path: '/delivery-edit/:id',
      name: 'delivery-edit',
      component: DeliveryEdit
    },
    {
      path: '/order',
      name: 'order',
      component: OrderList
    },
    {
      path: '/order-edit/:id',
      name: 'order-edit',
      component: OrderEdit
    },
    {
      path: '/stock',
      name: 'stock',
      component: StockList
    },
    {
      path: '/stock-edit/:id',
      name: 'stock-edit',
      component: StockEdit
    },
  ]
});