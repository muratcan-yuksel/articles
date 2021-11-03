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

Getters are used when we want to modify the state WITHOUT changing the actual state, and using that modified state in wherever we wish to. For that, let's first go back to our store and add getters there:

```
export default new Vuex.Store({
  state: {
   ... // some state code here
  },
  getters: {
    saleProducts: (state) => {
      var saleProducts = state.products.map((product) => {
        return {
          name: "**" + product.name + "**",
          price: product.price / 2,
        };
      });
      return saleProducts;
    },
  },

});
```

In the function above, we're mapping the state and dividing the price to half. Now, we need to actually use that getter in our components.

In the component, remember we had a v-for for product in products (which was the state). Now, since we're no longer suing the state but getters, we shall modify the code as follows:

````
 <ul>
      <li v-for="product in saleProducts" v-bind:key="product.id">
        <span class="name">{{ product.name }} </span>
        <span class="price">{{ product.price }} </span>
      </li>
    </ul>
    ```

````

And for this code to work, we're going to add saleProducts into our computed property:

```
<script>
export default {
  computed: {
    products() {
      return this.$store.state.products;
    },
    saleProducts() {
      return this.$store.getters.saleProducts;
    },
  },
};
</script>
```

That's all.

## Mutations

Are used to change the state directly. They allow us to find which function mutates the state, and this helps in debugging.

So, let's go to our store and add the following mutation, which will reduce state prices 1 when fired:

```
  mutations: {
    reducePrice: (state) => {
      state.products.forEach((product) => {
        product.price -= 1;
      });
    },
  },
```

Then, let's go to our component and add a button for the function like usual:

```<button @click="reducePrice">Reduce Price</button>

```

and for the function itself, we will define a METHOD, not a computed property:

```
  methods: {
    reducePrice: function () {
      this.$store.commit("reducePrice");
    },
  },
```

That's it!
