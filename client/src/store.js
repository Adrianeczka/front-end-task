import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const setCookies = store => {
  store.subscribe((mutation, state) => {
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
  },
  removeFromCart (context, productId) {
    context.commit('removeFromCart', productId)
  }

}

const mutations = {
  getProducts (state, products) {
    state.products = products
  },
  addToCart (state, product) {
    if (state.cart.indexOf(product) !== -1) {
      Vue.set(state.cart[state.cart.indexOf(product)], product)
    } else {
      state.cart.push(product)
    }
  },
  updateQuantity (state, params) {
    state.products[state.products.indexOf(params.product)].quantity = params.quantity
  },
  removeFromCart (state, productId) {
    var remove = state.cart.findIndex(product => product.id === productId)
    state.cart.splice(remove, 1)
  },
  initialiseStore (state) {
    if (localStorage.getItem('store')) {
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
  plugins: [setCookies]
})
