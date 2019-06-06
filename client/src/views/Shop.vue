<template>
  <div id="Shop">
       <v-app id="inspire">
    <v-container fluid grid-list-md>
      <v-data-iterator
        :items="brothers"
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
            <v-toolbar-title></v-toolbar-title>
            <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
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
              <v-card-title data-toggle="modal" :data-target="'#exampleModalCenter' + props.item.id" ><img :src="props.item.images.primary.large"/></v-card-title>
                 <!-- MODAL -->
                 <div class="modal fade" :id="['exampleModalCenter' + props.item.id]" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">{{ props.item.brand.name }}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modadivl-body">
        <img :src="props.item.images.primary.large"/>
        <div>Id: {{ props.item.id }}</div>
        <div class="description"> Description: <p v-html="props.item.general.description"/></div>
      </div>
      <div class="modal-footer">
        <input id="input" class="form-control mr-sm-2" placeholder="quantity"  type="number"/>
                <button id="button" class="btn btn-outline-dark"><i class="material-icons">add_shopping_cart</i></button>
      </div>
    </div>
  </div>
</div>
              <v-divider></v-divider>
              <v-list>
                <v-list-tile>
                  <v-list-tile-content>name:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ props.item.general.name }}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Id:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ props.item.id }}</v-list-tile-content>
                </v-list-tile>
                <div class="addtocart">
                <input id="input" class="form-control mr-sm-2" placeholder="quantity"  type="number"/>
                <button id="button" class="btn btn-outline-dark"><i class="material-icons">add_shopping_cart</i></button>
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
import axios from 'axios'
export default {
  data () {
    return {
      name: 'Shop',
      rowsPerPageItems: [4, 8, 12],
      pagination: {
        rowsPerPage: 4
      },
      search: '',
      brothers: []
    }
  },
  methods: {
    customFilter (items, search, filter) {
      search = search.toString().toLowerCase()
      return items.filter(i => (Object.keys(i).some(j => this.nestedFilter(i[j], search, filter))))
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
  },
  // components: {

  // },
  mounted () {
    axios
      .get('http://localhost:3005/products')
      .then(response => {
        this.brothers = response.data
      })
      .catch(error => {
        console.log(error)
      })
  }
}

</script>

      <style>
      input {
        color: white;
      }
      img {
        height: 100%;
        width: 100%;
        object-fit: contain;
      }
      .description {
        padding: 5px;
        text-align: left;
      }
      .modal-footer, .addtocart {
         justify-content: center;
         display: flex;
      }
      #input {
        width: 30%;
      }
      #button {
        height: 34px;
        width: 40px;
        padding-top: 4px;
        padding-left: 7px;
      }
      </style>
