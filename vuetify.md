## colors

In vuetify, you can add colors as classes :

````<p class="red white--text">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
    </p>```

Heres, color signifies background color, and for the color of the element itself, we use --text after the color indication.
````

## button colors

```
<template>
  <div>
    <v-btn class="pink white--text" depressed> Normal </v-btn>
    <v-btn color="pink">Click me</v-btn>
    <v-btn depressed class="pink white--text">
      <v-icon>email</v-icon>
    </v-btn>
  </div>
</template>
```

## visibility

    <v-btn class="hidden-md-and-down">Click me</v-btn>

means hide this button in medium and lower screens. Pretty cool.

- we have only, and-down, and-up conditions
