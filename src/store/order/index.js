import router from "@/router";
import db from '@/firebase/firestore'
import firebase from 'firebase/app'

const state = {
  orders: []
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
    return state.orders.map(data => data.person);
  },
  getDataById: (state) => (id) => {
    return state.orders.find(orders => orders.id === id);
  }
};

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
  fetchData() {
    state.orders = [];
    db.collection('order').orderBy('date', 'desc').get().then(snapshot => {
      snapshot.forEach(doc => {
        state.orders.push({ 
          id: doc.id, 
          person: doc.data().person, 
          product: doc.data().product,
          amount: doc.data().amount,
          date: doc.data().date 
        });
      });
    });
  },
  createOrder({ commit }, data) {
    db.collection('stock').doc(data.stockId).update({
      amount: firebase.firestore.FieldValue.increment(data.amount)
    });
    db.collection('order').add({
      person: data.person,
      product: data.product,
      amount: data.amount,
      date: data.date
    }).then(() => {
      commit('createOrder', data);
    });
  },
  updateOrder({ commit }, data) {
    db.collection('stock').doc(data.stockId).update({
      amount: firebase.firestore.FieldValue.increment(data.amount - data.deleteAmount),
    });
    db.collection('order').doc(data.id).update({
      person: data.person,
      product: data.product,
      amount: data.amount,
      date: data.date
    }).then(() => {
      commit('updateOrder', data);
    });
  },
  deleteOrder({ commit }, data) {
    db.collection('stock').doc(data.stockId).update({
      amount: firebase.firestore.FieldValue.increment( - data.deleteAmount)
    });
    db.collection('order').doc(data.id).delete().then(() => {
      commit('deleteOrder', data.id);
    });
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