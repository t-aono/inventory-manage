import Vue from 'vue'
import Vuex from 'vuex'
import delivery from './delivery'
import order from './order'
import stock from './stock'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    delivery,
    order,
    stock
  }
})