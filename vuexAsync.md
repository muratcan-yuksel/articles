# Saving and using fetched data with vuex store

Imagine a situation where I fetch data from an external source, an API for instance, and I want to use that fetched data in various places in my VueJs application. I don't want to fetch the data over and over again in different places.

For that, I'm going to store that fetched data in Vuex store, and then access that stored data in another component. For the data, I'll be using the following source => https://jsonplaceholder.typicode.com/guide/ . It's a free fake API for heuristic purposes.

In this example, I'll be using Vue2 and axios. In order to start easily, we can use `vue create` command
on the terminal and manually select store from there so vue will create the store for us.

I'll use one App.vue and a component Comp.vue inside of components folder. I'll add the component Comp.Vue inside of App.vue file, import axios, and define a `users` data.

```
<template>
  <div>
    <h1>Vuex</h1>
    <Comp />
  </div>
</template>

<script>
//import axios
const axios = require("axios");
import Comp from "./components/Comp.vue";
export default {
  components: { Comp },
  data() {
    return {
      users: null,
    };
  },
};
</script>

<style></style>
```

For now, my Comp.vue file is empty. We can return a basic `<h3>Component</h3>` inside its template so that vue won't be giving any errors.
