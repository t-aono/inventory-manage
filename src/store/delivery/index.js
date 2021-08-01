import router from "@/router";
import db from '@/firebase/firestore'
import firebase from 'firebase/app'

const state = {
  deliveries: []
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
    return state.deliveries.map(data => data.person);
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
  fetchData() {
    state.deliveries = [];
    db.collection('delivery').orderBy('date', 'desc').get().then(snapshot => {
      snapshot.forEach(doc => {
        state.deliveries.push({ 
          id: doc.id, 
          person: doc.data().person, 
          product: doc.data().product,
          amount: doc.data().amount,
          date: doc.data().date 
        });
      });
    });
  },
  createDelivery({ commit }, data) {
    db.collection('stock').doc(data.stockId).update({
      amount: firebase.firestore.FieldValue.increment( - data.amount)
    });
    db.collection('delivery').add({
      person: data.person,
      product: data.product,
      amount: data.amount,
      date: data.date
    }).then(() => {
      commit('createDelivery', data);
    });
  },
  updateDelivery({ commit }, data) {
    db.collection('stock').doc(data.stockId).update({
      amount: firebase.firestore.FieldValue.increment(data.addAmount - data.amount),
    });
    db.collection('delivery').doc(data.id).update({
      person: data.person,
      product: data.product,
      amount: data.amount,
      date: data.date
    }).then(() => {
      commit('updateDelivery', data);
    });
  },
  deleteDelivery({ commit }, data) {
    db.collection('stock').doc(data.stockId).update({
      amount: firebase.firestore.FieldValue.increment(data.addAmount)
    });
    db.collection('order').doc(data.id).delete().then(() => {
      commit('deleteDelivery', data.id);
    });
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