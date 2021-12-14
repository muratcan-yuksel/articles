## check the code

```<template>
  <div>
    <h1>Composition</h1>
  </div>
</template>

<script>
const axios = require("axios");
// So what's happening here? First, you're importing ref. This allows your data to be reactive. In other words, you can use this data in your template, and if it changes, the template value will change as well.
import { ref } from "vue";
export default {
  name: "Generator",
  setup() {
    const generator_base = "http://localhost:3000";
    const skillList = ref([]);

    async function getSkillList() {
      const config = {
        method: "get",
        url: generator_base,
      };
      try {
        let res = await axios(`${config}/skills`);
        skillList.value = await res.json();
      } catch (err) {
        console.log(err);
      }
      getSkillList();
    }
  },
};
</script>

<style></style>
```

## what's happening?

So what's happening here? First, you're importing ref. This allows your data to be reactive. In other words, you can use this data in your template, and if it changes, the template value will change as well.

Inside the setup function, you'll see that skillList is declared as an empty array wrapped in ref(). This returns a reactive ref object with just one property: value. The .value property points to the inner value of the ref object, which in this case, is the empty array.

Next, in the getSkillList function, you're making a request to the /skills endpoint of the Application Generator API. skillList is set to the response that comes back. You should notice here the use of the .value property mentioned above. This is how you access and set the value of a ref.

Finally, you need to return any data you want to expose to the template. So far, that's just skillList.
