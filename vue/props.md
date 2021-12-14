# Props in VueJS

## Structure

Let's say we have an App component and a Greet component. So, Greet is the child of App.

### Parent component

In the App component, after importing the Greet component as usual, we add some attributes on specific Greet instances like so :

```
<template>
  <div>
    <h1>Props</h1>
    <Greet name="Bruce" />
    <Greet name="Clark" />
    <Greet name="Diana" />
  </div>
</template>
```

### Child component

check this out:

```
<template>
  <div>
    <h2>Hello {{ name }}</h2>
  </div>
</template>

<script>
export default {
  name: "Greet",
  props: ["name"],
};
</script>

<style></style>

```

Basically, we create a props thingy that points to an array, and we add the attribute we defined on the parent component there. Then, we can bind the data as usual with mustache syntax
