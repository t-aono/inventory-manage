const state = {
  products: [
    {
      id: 1,
      product: 'テレビ',
      amount: 0
    },
    {
      id: 2,
      product: 'フライパン',
      amount: 0
    },
    {
      id: 3,
      product: 'ドライアー',
      amount: 0
    },
  ]
};

const getters = {
  getProducts: (state) => {
    return state.products.sort((a, b) => b - a);
  },
  getDataById: (state) => (id) => {
    return state.orders.find(products => products.id === id);
  }
};

import router from "../../router";
const mutations = {
  createProduct(state, data) {
    state.products.push(data);
    router.push('/stock');
  },
  updateProduct(state, data) {
    const index = state.deliveries.findIndex(de => de.id == data.id);
    state.deliveries[index] = data;
    router.push('/stock');
  },
  deleteProduct(state, id) {
    const index = state.products.findIndex(de => de.id == id);
    state.products.splice(index, 1);
  }
}

const actions = {
  createProduct({ commit }, data) {
    commit('createProduct', data);
  },
  updateProduct({ commit }, data) {
    commit('updateProduct', data);
  },
  deleteProduct({ commit }, { id }) {
    commit('deleteProduct', id);
  }
}

const products = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

export default products