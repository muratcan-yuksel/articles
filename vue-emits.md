## vue emits structure with script setup

### in the child component

1. whether it's required or not, import defineEmits form vue like so:
   `import { defineEmits } from "vue"; `

2. create an @click function or whatever that you can call to send data to the parent, like so for instance:

` <span @click="handleButton" class="title"> {{ title }} </span>`

3. define the function that'll be in the parent component. That function will be dealing with the data sent by the child, like so:

`const emit = defineEmits(["getTitle"]); `

4. link this above function with the triggering function yoU've created earlier (handleButton in our example)

`const handleButton = (params) => { emit("getTitle", params); };`

(note that params here is optional)

### parent component

5. in the parent component, link the emit function we've defined at point 3 to another function we'll create later. Like so:

````<ChildComponent
@getTitle="handleChildData(item.title)"
/>```

PS: That item.title is because of a v-for I've used in my own project. You can pass parameters to get the props you're sending to the child for instance.

What do I mean? In my project, I'm sending title as props to the child. I define the titles in the parent and loop over them for the child using a v-for directive like so:

````

      <LeftBoxes
        v-for="(item, key) in box"
        :key="key"
        :title="item.title"
        :para="item.para"
        @getTitle="handleChildData(item.title)"
      />
      ```

with the item.title passed as a parameter, I can get the title that's clicked with the handleButton function from point 2.

6. import defineEmits here too if you want to. I don't know if it's required with script setup

7. define handleChildData function from point 5. Like so:

```
const handleChildData = (value) => {
  console.log(value);
};
```

PS: Here, you have to pass value as a parameter. It is the value that's coming from the child. You can o whatever you want with that value now.

Congrats.
