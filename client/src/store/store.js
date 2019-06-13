import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const state = {
  cart: [],
  products: []
}

const actions = {
  getAxios ({ commit }) {
    axios
      .get('http://localhost:3005/products')
      .then(response => response.data)
      .then(products => {
        commit('SET_AXIOS', products)
      })
  },
  setToCart (context, product) {
    context.commit('ADD_TO_CART', product)
  }

}

const mutations = {
  SET_AXIOS (state, products) {
    state.products = products
  },
  ADD_TO_CART (state, product) {
    state.cart.push(product)
  }
}

export default new Vuex.Store({
  state,
  strict: debug,
  actions,
  mutations
})
