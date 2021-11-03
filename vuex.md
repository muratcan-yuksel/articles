## Using the store

Let's say we used Vue CLI to create a store for us. This is our store for this example:

```
export default new Vuex.Store({
  state: {    products: [
      { name: "Banana", price: 20, id: 1 },
      { name: "Apple", price: 10, id: 2 },
      { name: "Pear", price: 15, id: 3 },
      { name: "Lemon", price: 5, id: 4 },
    ],},
  mutations: {},
  actions: {},
  modules: {},
});
```

### store is called via computed property

Now, I want to use the data that's stored in the Vuex store state. For that, we use computed properties like so:

```
<script>
export default {
  computed: {
    products() {
      return this.$store.state.products;
    },
  },
};
</script>
```

As you can see, we return the data from the store as follows :
return 'this.$store.state'
here, 'this' keyword refers to the current component like usual. and '$store' is a native method to Vuex.
Now, I can use the data.

### using the data, an example

Let's list the data we have:

```
<ul>
      <li v-for="product in products" v-bind:key="product.id">
        <span class="name" >{{ product.name }} </span>
        <span class="price" >{{ product.price }} </span>
      </li>
    </ul>

```

## Getters
