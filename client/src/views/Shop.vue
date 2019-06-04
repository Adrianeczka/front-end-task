<template>
  <div class="container my-5">
    <div class="row">
      <div class="col-md-3" v-for="product in products" :key="product.id" >
         <div class="card" data-toggle="modal" data-target="#productModal">
           <img :src="product.images.primary.large" :alt="product.brand.name" class="card-img-top">
           <div class="card-body">
             <h4 class="card-title">{{ product.brand.name }}</h4>
             <div class="card-text">{{ product.id }}</div>
              <div class="tools">
               <input type="number" placeholder="quantity"/>
               <button class="btn btn-primary"><i class="material-icons">add_shopping_cart</i></button>
              </div>
           </div>
         </div>
      </div>
    </div>
    <Pagination/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Pagination from '@/components/Pagination.vue'
export default {
  name: 'Shop',
  components: {
    Pagination
  },
  mounted () {
      this.$store.dispatch('loadProducts')
    },
  computed: mapState(['products'])
}
</script>

<style>
.tools {
  display: block;
  flex-direction: row;
  justify-content: center;
  white-space: nowrap;
  align-items: baseline;
  margin-top: 10px;
}
input {
  width: 34%;
  height: 38px;
  border-radius: 5px;
  padding-bottom: 3px;
  padding-left: 5px;

}
.btn {
  width: 30%;
  margin-left: 5px;
}

.material-icons {
  padding-top: 2px;
}

</style>
