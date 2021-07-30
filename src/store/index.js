import Vue from 'vue'
import Vuex from 'vuex'
import delivery from './delivery'
import order from './order'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    delivery,
    order
  }
})