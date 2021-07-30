const state = {
  orders: [
    /*{
      id: 1,
      person: 'トミー',
      product: 'PCモニター',
      amount: 2,
      date: '2021/07/30'
    },*/
  ]
};

const getters = {
  getOrders: (state) => {
    return state.orders.sort((a, b) => {
      const aDate = new Date(a.date.substr(0, 4), a.date.substr(5, 2), a.date.substr(8, 2));
      const bDate = new Date(b.date.substr(0, 4), b.date.substr(5, 2), b.date.substr(8, 2));
      return bDate.getTime() - aDate.getTime();
    });
  },
  getOrderPeople: (state) => {
    return state.orders.map(de => {
      return de.person;
    });
  },
  getDataById: (state) => (id) => {
    return state.orders.find(orders => orders.id === id);
  }
};

import router from "../../router";
const mutations = {
  createOrder(state, data) {
    state.orders.push(data);
    router.push('/order');
  },
  updateOrder(state, data) {
    const index = state.orders.findIndex(de => de.id == data.id);
    state.orders[index] = data;
    router.push('/order');
  },
  deleteOrder(state, id) {
    const index = state.orders.findIndex(de => de.id == id);
    state.orders.splice(index, 1);
  }
}

const actions = {
  createOrder({ commit }, data) {
    commit('createOrder', data);
  },
  updateOrder({ commit }, data) {
    commit('updateOrder', data);
  },
  deleteOrder({ commit }, { id }) {
    commit('deleteOrder', id);
  }
}

const orders = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

export default orders