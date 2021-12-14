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

Now, I'll fetch users data from the fake API using a mounted lifecycle hook and assign it into the component state `users`. Note that the hook starts with the `async` keyword as I use the `async/await` syntax:

```
  async mounted() {
    const config = {
      method: "get",
      url: "https://jsonplaceholder.typicode.com/users",
    };

    try {
      let res = await axios(config);

      console.log(res.data);
      //assign the data to the component state
      this.users = res.data;
    } catch (err) {
      console.log(err);
    }
  },
```

I know that the request be successful. Now let me go to the index.js inside the sotre folder created by vue itself and add the necessary functionality there:

```
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { data: null },
  mutations: {
    getData(state, newData) {
      state.data = newData;
    },
  },
  actions: {},
  modules: {},
});

```

Here I add a data property in the state and give it a value of null, then I add the mutation. Mutations are a way to modify the state in vuex. Inside mutations, I define a getData function that takes two parameters, `state` and `newData` which will be coming from the get request, and then assign this newData to the state by writing `state.data = newData;`

With this functionality, I'll be able to replace the state (which is null at the moment), with the data I got from the API. Let's go back to our App.vue file and add a simple line to that async mounted lifecycle hook:

```
  async mounted() {
    const config = {
      method: "get",
      url: "https://jsonplaceholder.typicode.com/users",
    };

    try {
      let res = await axios(config);

      console.log(res.data);
      this.users = res.data;
      //-----------------------------
      //We add the following line
      this.$store.commit("getData", this.users);
      //-----------------------------
    } catch (err) {
      console.log(err);
    }
  },
```

What that `this.$store.commit("getData", this.users);` line does is that it invokes the store, and replaces the data. Remember, our mutation was like this:

```
  mutations: {
    getData(state, newData) {
      state.data = newData;
    },
  },
```

With the line we added in the async mounted hook, we give the component state as the second parameter for the mutation, which was `newData`, and so, make the component state the global state. Cool. Now we have the data from the API globally.

To use it, I go to Comp.vue file and write it like this:

```
<template>
  <div>
    <h3>Component</h3>
    <div v-for="user in usersFromStore" :key="user.id">
      <p>{{ user.name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    usersFromStore() {
      return this.$store.state.data;
    },
  },
};
</script>
```

Here, with a computed property I return the global state and then render it on the page. If everything went according to the plan, now you we should see a list of names on the screen.

That's it. I hope I was clear enough and the example was at least a bit different from the increment/decrement count examples paramount on the net.

Have fun & keep coding!

Note: I'm quite new working with VueJs, so if you see an error, a bad practice, or have a better way of how to do things, feel free to share with us!
