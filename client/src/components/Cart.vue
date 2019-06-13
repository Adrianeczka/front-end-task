<template>
  <v-menu>
    <v-btn class="cart" flat slot="activator" color="grey">
      <span>
        Cart
      </span>
    </v-btn>
    <table>
      <tr>
        <th>BRAND</th>
        <th>NAME</th>
        <th>ID</th>
        <th>QUANTITY</th>
      </tr>
      <tr v-for="product in $store.state.cart " :key="product.id">
        <td>{{ product.brand.name }}</td>
        <td>{{ product.general.name }}</td>
        <td>{{ product.id }}</td>
        <td>{{ product.quantity ? product.quantity : 1 }}</td>
        <td><button class="btn btn-outline-danger" @click="removeFromCart(product.id)">X</button></td>
      </tr>
    </table>
  </v-menu>
</template>

<script>
export default {
  name: 'Cart',
  methods: {
    removeFromCart (productId) {
      this.$store.dispatch('removeFromCart', productId)
    }
  }
}
</script>

<style>
table, th, td {
  background-color: white;
  border: 1px solid grey;
  border-collapse: collapse;
}
th, td {
  text-align: center;
  padding: 10px;
  width: 36%;
}
.v-btn {
  border: grey 2px solid;
}
</style>
