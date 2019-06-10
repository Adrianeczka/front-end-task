<template>
<v-menu>
          <v-btn flat slot="activator" color="grey">
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
            </tr>
          </table>
        </v-menu>
</template>

<script>
export default {
  name: 'Cart'
}
</script>
