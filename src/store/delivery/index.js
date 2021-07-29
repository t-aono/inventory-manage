const state = {
  deliveries: [
    {
      person: 'トム',
      product: 'PCモニター',
      amount: 2,
      date: '2021/07/30'
    },
    {
      person: 'ジョン',
      product: 'かき氷機',
      amount: 1,
      date: '2021/06/30'
    },
    {
      person: 'ジョージ',
      product: 'そうめん',
      amount: 3,
      date: '2021/08/10'
    },
    {
      person: 'トム',
      product: 'マウスパッド',
      amount: 5,
      date: '2021/08/20'
    },
  ]
};

const getters = {
  getDeliveries(state) {
    let values = [];
    state.deliveries.forEach(delivery => {
      values.push(delivery)
    });
    values = values.sort((a, b) => {
      const aDate = new Date(a.date.substr(0, 4), a.date.substr(5, 2), a.date.substr(8, 2));
      const bDate = new Date(b.date.substr(0, 4), b.date.substr(5, 2), b.date.substr(8, 2));
      return bDate.getTime() - aDate.getTime();
    });
    return values;
  }
};

const mutations = {
  addDelivery(state, addData) {
    state.deliveries.push(addData);
    this.$router.replace('/delivery');
  }
}

const actions = {
  addDelivery({ commit }, addData) {
    commit('addDelivery', addData);
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