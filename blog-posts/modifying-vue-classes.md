I want to loop through some sort of data and display it. The data can be given by you, coming from a database, or from a local file. Here, I'll create a separate `data.json` file in a data folder inside of public directory just to show how we can fetch data using axios. The logic doesn't change though.

After displaying the data, I want to click any one of them, and do something with that chosen one, like changing its class.

For this project, I'll use `script setup` syntax in Vue3.

To start with, I think I need my data to play with. I have a very basic JSON file like so =>

```
{
  "items": [
    { "name": "Anakin", "surName": "Skywalker" },
    { "name": "Padmé", "surName": "Amidala" },
    { "name": "Obi-Wan", "surName": "Kenobi" }
  ]
}

```

I'll use axios to fetch this piece of data. Of course, I'll need to install axios by entering this command in the root of my project via the terminal => `npm install axios` if I use npm, and `yarn add axios` if I use yarn.

Now, check out the snippet below.

```
<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const data = ref();

const getData = async () => {
  try {
    const res = await axios.get("../public/data/data.json");
    data.value = res.data.items;
    console.log(res.data.items);
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  getData();
});
</script>


```

Nothing fancy here. First, I import `ref` and `onMounted` from `vue`. Then, I define a `data` variable and an asynchronous `getData` function to fetch my local data. Then, I use `onMounted` to call the function. If you don't know VueJs much, refs are just a way to store data in a variable reactively, and onMounted hook is a way to call a function when the component is mounted.

Now I have my data, and I can use it in my template.

```
<template>
  <div class="app">
    <div
      v-for="(item, key) in changedData"
      :key="key"
      class="card"
    >
      <div class="para">{{ item.name }} {{ item.surName }}</div>
    </div>
  </div>
</template>

```

If you'd just copy paste the code so far, you'll see the data displayed on the page as such:

--------------ADD IMAGE HERE-------------------

Also, if you'd like to really follow along, here's my complete CSS including all the classes I use and will use in forecoming steps.

```
<style scoped>
.app {
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  padding-top: 5rem;
}
.card {
  margin-bottom: 1rem;
  /* border: 5px solid green; */
  text-align: center;
  width: 250px;
  height: 50px;
  border-radius: 16px;
}
.para {
  font-weight: 700;
}
.going {
  border: 5px solid green;
  text-decoration: none;
  background-color: rgb(56, 219, 56);
}
.notGoing {
  background-color: #ffe01b;
}
</style>

```
