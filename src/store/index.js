import Vue from 'vue'
import Vuex from 'vuex'
import delivery from './delivery'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    delivery
  }
})