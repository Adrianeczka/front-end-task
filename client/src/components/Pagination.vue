<template>
  <div id="Pagination">
       <v-app id="inspire">
    <v-container fluid grid-list-md>
      <v-data-iterator
        :items="brothers"
        :rows-per-page-items="rowsPerPageItems"
        :pagination.sync="pagination"
        content-tag="v-layout"
        row
        wrap
      >
        <template v-slot:item="props">
            <v-flex
          xs12
          sm6
          md4
          lg3
        >

            <v-card>
              <v-card-title><v-img :src="props.item.images.primary.large"/></v-card-title>
              <v-divider></v-divider>
              <v-list>
                <v-list-tile>
                  <v-list-tile-content>name:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ props.item.brand.name }}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Id:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ props.item.id }}</v-list-tile-content>
                </v-list-tile>
                <input placeholder="quantity"  type="number"/>
                <button class="btn btn-outline-dark"><i class="material-icons">add_shopping_cart</i></button>
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
      brothers: [],
      name: 'Pagination',
      rowsPerPageItems: [4, 8, 12],
      pagination: {
        rowsPerPage: 4
      }
    }
  },
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
      </style>
