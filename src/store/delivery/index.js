const state = {
  deliveries: [
    {
      id: 1,
      person: 'トム',
      product: 'PCモニター',
      amount: 2,
      date: '2021/07/30'
    },
    {
      id: 2,
      person: 'ジョン',
      product: 'かき氷機',
      amount: 1,
      date: '2021/06/30'
    },
    {
      id: 3,
      person: 'ジョージ',
      product: 'そうめん',
      amount: 3,
      date: '2021/08/10'
    },
    {
      id: 4,
      person: 'トム',
      product: 'マウスパッド',
      amount: 5,
      date: '2021/08/20'
    },
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

import router from "../../router";
const mutations = {
  createDelivery(state, data) {
    state.deliveries.push(data);
    router.push('/delivery');
  },
  updateDelivery(state, data) {
    state.deliveries = state.deliveries.map(de => {
      if (de.id === Number(data.id)) return data;
      else return de;
    });
    router.push('/delivery');
  },
  deleteDelivery(state, id) {
    const index = state.deliveries.findIndex(de => de.id == id)
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