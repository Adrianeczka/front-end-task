import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default new Vuex.Store({
  state: {
    products: []
    // inCart: []
  },
  actions: {
    loadProducts (context) {
      axios
        .get('http://localhost:3005/products')
        .then((response) => {
          context.commit('SET_PRODUCTS', { products: response.data })
          return true;
        })
    }
  },
  mutations: {
    SET_PRODUCTS (state, { products }) {
      state.products = products
    }
  }
})
