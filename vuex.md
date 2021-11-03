## Using the store

Let's say we used Vue CLI to create a store for us. This is our store for this example:

```
export default new Vuex.Store({
  state: { products: [
    { name: "Banana", price: 20 },
    { name: "Apple", price: 10 },
    { name: "Pear", price: 15 },
    { name: "Lemon", price: 5 },
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
      <li v-for="product in products" v-bind:key="product.name">
        <span class="name" :key="1">{{ product.name }} </span>
        <span class="price" :key="1">{{ product.price }} </span>
      </li>
    </ul>

```

NB! For key, I just gave this random thing. It's not a good practice. Use unique ID like React.
