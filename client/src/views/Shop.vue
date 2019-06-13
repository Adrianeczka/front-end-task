<template>
  <div id="Shop">
    <v-app id="inspire">
     <v-container fluid grid-list-md>
      <v-data-iterator
        :items="products"
        :search="search"
        :custom-filter="customFilter"
        :rows-per-page-items="rowsPerPageItems"
        :pagination.sync="pagination"
        content-tag="v-layout"
        row
        wrap
      >

      <template v-slot:header>
          <v-toolbar
            class="mb-2"
            color="indigo darken-5"
            dark
            flat
          >
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            >
            </v-text-field>
<!--Cart-->
              <Cart/>
          </v-toolbar>
      </template>
      <template v-slot:item="props">
        <v-flex
          xs12
          sm6
          md4
          lg3
        >
          <v-card>
            <v-card-title data-toggle="modal" :data-target="'#exampleModalCenter' + props.item.id">
              <img :src="props.item.images.primary.large">
            </v-card-title>
<!--Modal-->
                  <div class="modal fade" :id="['exampleModalCenter' + props.item.id]" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLongTitle" dismiss>{{ props.item.brand.name }}</h5>
                          <button type="button" class="close" data-="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modadivl-body">
                          <img :src="props.item.images.primary.large">
                          <div class="id">Id: {{ props.item.id }}</div>
                          <div class="description"> Description: <p v-html="props.item.general.description"/></div>
                        </div>
                        <div class="modal-footer">
                          <input :id="props.item.id" class="form-control mr-sm-2" placeholder="quantity" @input="updateQuantity($event, props.item)" type="number" step="1" min="1">
                                  <button  class="btn btn-outline-dark" @click="addToCart(props.item)"><i class="material-icons">add_shopping_cart</i></button>
                        </div>
                      </div>
                    </div>
                  </div>
                <v-list>
                  <v-list-tile>
                    <v-list-tile-content class="name">name:</v-list-tile-content>
                    <v-list-tile-content class="productName" >{{ props.item.general.name }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>Id:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.id }}</v-list-tile-content>
                  </v-list-tile>
                <div class="addtocart">
                  <input :id="props.item.id" class="form-control mr-sm-2" placeholder="quantity" @input="updateQuantity($event, props.item)" type="number" step="1" min="1" >
                  <button class="btn btn-outline-dark" @click="addToCart(props.item)"><i class="material-icons">add_shopping_cart</i></button>
                </div>
                </v-list>
          </v-card>
        </v-flex>
      </template>
      </v-data-iterator>
    </v-container>
   </v-app>
  </div>
</template>

<script>
import Cart from '@/components/Cart.vue'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      name: 'Shop',
      rowsPerPageItems: [4, 8, 12],
      pagination: {
        rowsPerPage: 4
      },
      search: ''
    }
  },
  components: {
    Cart
  },
  beforeCreate () {
    this.$store.commit('initialiseStore')
  },
  mounted () {
    this.$store.dispatch('getProducts')
  },
  computed: {
    ...mapState([
      'products', 'cart'
    ])
  },
  methods: {
    updateQuantity (e, product) {
      this.$store.commit('updateQuantity', { quantity: e.target.value, product })
    },
    addToCart (product) {
      this.$store.commit('addToCart', product)
      document.getElementById(product.id).value = ''
    },
    customFilter (product, search, filter) {
      search = search.toString().toLowerCase()
      return product.filter(i => (Object.keys(i).some(j => this.nestedFilter(i[j], search, filter))))
    },
    nestedFilter (nestedObj, search, filter) {
      if (nestedObj === Object(nestedObj)) {
        for (let key in nestedObj) {
          if (filter(nestedObj[key], search)) {
            return true
          }
        }
        return false
      } else {
        return filter(nestedObj, search)
      }
    }
  }
}

</script>

      <style>
      input {
        color: white;
        width: 30%;
      }
      img {
        height: 100%;
        width: 100%;
        object-fit: contain;
      }
      .description, .id {
        padding: 15px;
        text-align: left;
      }
      .modal-footer, .addtocart {
         justify-content: center;
         display: flex;
      }
      button {
        height: 34px;
        width: 40px;
        padding-top: 4px;
        padding-left: 4px;
      }
      .name {
        padding-right: 20px;
      }
      .productName {
        margin-left: 40px;
      }
      </style>
