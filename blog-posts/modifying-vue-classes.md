As it happens in the real world, I want to fetch data from somewhere and display it in the UI. But I want to do more than just to display it, I want to be able to manipulate it in the UI in this or that way. Say, I want to give each individual part displayed in the UI a different color on click, but again, as it happens, I don't have the necessary structure in the data itself. Like, say I've been given a set of names, and I was asked to arrange them as such that the user should be able to determine if one or some of them engages in an action: such as going to a party.

As I've said, the data itself doesn't have anything for me to discern who will do what, it's just a collection of names like the one I've created and put in my public folder so that I can fetch it from there. Check this out =>

```
{
  "items": [
    { "name": "Anakin", "surName": "Skywalker" },
    { "name": "Padmé", "surName": "Amidala" },
    { "name": "Obi-Wan", "surName": "Kenobi" }
  ]
}

```

Now, what I want to do is to display these in the UI, but in such a way that I will create a new array, and do whatever I want to do in that array so that the original array stays untouched, because the data might be coming from a database and I might have serious reasons to not to change it.

So let me start with the script part. Mark that I'll use the script setup syntax of Vue3:

```
<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import childComponent from "./components/childComponent.vue";

const data = ref();
const changedData = ref();

const getData = async () => {
  try {
    const res = await axios.get("../public/data/data.json");
    console.log(res.data);
    data.value = res.data.items;
    changedData.value = res.data.items.map((item) => ({
      ...item,
      isGoing: false,
    }));
    console.log(res.data.items);
    console.log(changedData.value);
  } catch (error) {
    console.log(error);
  }
};

const handleClick = (item) => {
  item.isGoing = !item.isGoing;
  console.log(item);
};

onMounted(() => {
  getData();
});
</script>

```

Now, what do I do here? First, I start by importing ref and onMounted from vue. Refs are a way to store reactive data in variables, and onMounted is a hook that let's you call a function when a component mounts the first time, i.e. like when the page loads, starts and all.

I have two reactive variables, `data`, and `changedData`. I'll save the data I've fetched in the `getData` async function in the `data` variable, and then add some new key/value pair to each and every object in it and save this new object in the `changedData` variable. In this way, I'll both have not disturbed the original data, and will have the desired type of data with which I can develop my application as I wish.

In `getData` async function I use try/catch syntax, as it is the best one I know and the simplest for my understanding. Look carefully to this snipped:

```
 changedData.value = res.data.items.map((item) => ({
      ...item,
      isGoing: false,
    }));


```

Note: In Vue, refs are called with `.value` suffix. You can read the official documentation about the different usecases of ref and reactive, they are pretty much the same, but have different accepted use cases as far as I'm concerned.

Anyway, in the above snipped, I use the Javascript `map` function which creates a shallow copy of the target, without changing the original, iterates over each element in it, and does something with it before saving the new, modified datased into the `changedData` variable.

What it does to it is, by using the Javascript spread operator, adding the `isGoing:false` key/value pair to each and every element in the array of objects that I've fetched.

Now I'll write the template.

## template

Look at this snippet:

```
<template>
  <div class="app">
    <div
      v-for="(item, key) in changedData"
      :key="key"
      class="card"
      @click="handleClick(item)"
      :class="[item.isGoing ? 'going' : 'notGoing']"
    >
      <div class="para">{{ item.name }} {{ item.surName }}</div>
    </div>
  </div>
</template>
```

I have a div with a class of `app` that functions as the container, then I have another div with which I iterate over the items in the `changedData` variable. I give the index of the element as key, add a class of card in each element, specify a `handleClick` function that takes the individual item as a parameter, and then use the syntax for specifying dynamic classes in VueJS. Then I just display the contents of the array of objects I have in the div with `para` class.

There are a couple of different ways of creating dynamic classes in VueJS, but I like this array syntax, as it allows me to write an if/else statement using the ternary operator. It basically says that "if item.isGoing is true, use the class `going` for this element, and in the case of item.isGoing is false, use the `notGoing` class for it. Here is the styles I've written:

```<style scoped>
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

Note: `scoped` here is a nice feature of Vue, which makes sure that the classnames you use in this component cannot interact with other components who use the same naming for those classes and use different styling, i.e. you can have a hundred components with the class of `.card` and every single one of them would only target the html in their respective components, so that you don't encounter unexpected breaks in your style.

This is pretty much it, actually. Now, with the code that's written, whenever I click one of the elements displayed on the UI, they'll change color as I've specified that the class `going` would have a background color of green, and the class `notGoing` would have a background color of yellow. And if I'd click on the element again, the color would change back to its original state. This logic is made sure by the following snipped:

```
const handleClick = (item) => {
  item.isGoing = !item.isGoing;
  console.log(item);
};

```

The `handleClick` function, by taking the individual item as a parameter, makes sure that with each click `item.isGoing` will change into its opposite.

-----ADD IMAGES HERE--------

Now, let's go for a more complicated use case. Let's say this time we have a relatively complex UI that it deserves its own component. We'd have lots of child components to which we pass data via props in real world scenarios.
