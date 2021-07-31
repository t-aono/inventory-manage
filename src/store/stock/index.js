import router from "@/router";
import db from '@/firebase/firestore'

const state = {
  products: [
    /*{
      id: 1,
      product: 'テレビ',
      amount: 0
    },*/
  ]
};

const getters = {
  getProducts: (state) => {
    return state.products;
  },
  getDataById: (state) => (id) => {
    return state.products.find(data => data.id == id);
  },
};

const mutations = {
  createProduct(state, data) {
    state.products.push(data);
    router.push('/stock');
  },
  updateProduct(state, data) {
    const index = state.products.findIndex(obj => obj.id == data.id);
    state.products[index] = data;
    router.push('/stock');
  },
  deleteProduct(state, id) {
    const index = state.products.findIndex(de => de.id == id);
    state.products.splice(index, 1);
  }
}

const actions = {
  fetchData() {
    state.products = [];
    db.collection('stock').orderBy('product', 'asc').get().then(snapshot => {
      snapshot.forEach(doc => {
        state.products.push({ 
          id: doc.id, 
          product: doc.data().product, 
          amount: doc.data().amount 
        });
      });
    });
  },
  createProduct({ commit }, data) {
    db.collection('stock').add({
      product: data.product,
      amount: 0
    }).then(() => {
      commit('createProduct', data);
    });
  },
  updateProduct({ commit }, data) {
    db.collection('stock').doc(data.id).update({
      product: data.product
    }).then(() => {
      commit('updateProduct', data);
    });
  },
  deleteProduct({ commit }, { id }) {
    db.collection('stock').doc(id).delete().then(() => {
      commit('deleteProduct', id);
    });
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