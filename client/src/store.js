import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const myPlugin = store => {
  // called when the store is initialized
  // Subscribe to store updates
  store.subscribe((mutation, state) => {
    // Store the state object as a JSON string
    localStorage.setItem('store', JSON.stringify(state))
  })
}

const state = {
  cart: [],
  products: []
}

const actions = {
  getProducts ({ commit }) {
    axios
      .get('http://localhost:3005/products')
      .then(response => response.data)
      .then(products => {
        commit('getProducts', products)
      })
  }

}

const mutations = {
  getProducts (state, products) {
    state.products = products
  },
  addToCart (state, product) {
    if (state.cart.indexOf(product) !== -1 && state.product.quantity !== 0) {
      Vue.set(state.cart[state.cart.indexOf(product)], product)
    } else {
      state.cart.push(product)
    }
  },
  updateQuantity (state, params) {
    state.products[state.products.indexOf(params.product)].quantity = params.quantity
  },
  initialiseStore (state) {
    // Check if the ID exists
    if (localStorage.getItem('store')) {
      // Replace the state object with the stored item
      this.replaceState(
        Object.assign(state, JSON.parse(localStorage.getItem('store')))
      )
    }
  }
}

export default new Vuex.Store({
  state,
  strict: debug,
  actions,
  mutations,
  plugins: [myPlugin]
})
