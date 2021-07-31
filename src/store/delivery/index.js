import router from "@/router";

const state = {
  deliveries: [
    /*{
      id: 1,
      person: 'トム',
      product: 'PCモニター',
      amount: 2,
      date: '2021/07/30'
    },*/
  ]
};

const getters = {
  getDeliveries: (state) => {
    return state.deliveries.sort((a, b) => {
      const aDate = new Date(a.date.substr(0, 4), a.date.substr(5, 2), a.date.substr(8, 2));
      const bDate = new Date(b.date.substr(0, 4), b.date.substr(5, 2), b.date.substr(8, 2));
      return bDate.getTime() - aDate.getTime();
    });
  },
  getDeliveryPeople: (state) => {
    return state.deliveries.map(de => {
      return de.person;
    });
  },
  getDataById: (state) => (id) => {
    return state.deliveries.find(delivery => delivery.id === id);
  }
};

const mutations = {
  createDelivery(state, data) {
    state.deliveries.push(data);
    router.push('/delivery');
  },
  updateDelivery(state, data) {
    const index = state.deliveries.findIndex(de => de.id == data.id);
    state.deliveries[index] = data;
    router.push('/delivery');
  },
  deleteDelivery(state, id) {
    const index = state.deliveries.findIndex(de => de.id == id);
    state.deliveries.splice(index, 1);
  }
}

const actions = {
  createDelivery({ commit }, data) {
    commit('createDelivery', data);
  },
  updateDelivery({ commit }, data) {
    commit('updateDelivery', data);
  },
  deleteDelivery({ commit }, { id }) {
    commit('deleteDelivery', id);
  }
}

const delivery = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

export default delivery