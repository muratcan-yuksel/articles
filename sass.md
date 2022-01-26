# Starting a project

-in html link to the main css file that our scss files will be compiled to.
-then, in that css folder, create a sass file named main.scss
-notice that we're creating a sass file in there, not a css file
-to create the main.css file, just clikc on the watch sass button in your vscode (ofc you need the sass compiler extension for it)

## creating a sass variable

=> $varName : black;

## using a sass variable

body{
background: $varName;
}

## the following example...

targets the button element in the header element and adds a hover property into it:

```
header{
    background: lightblue;
    button{
        background: $varName;
        &: hover{
            background: red;
        }
    }
}
```

## sass components

create component files starting with and underscore
for instace, \_header.scss

and then import it in our main style.scss file like this:
@import "./header";

# mixins

are basically like JS functions. They allow us to group css commands into a single container.

let's create a mixin named flexCenter:

```
@mixin flexCenter($direction) {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: $direction;
}
```

### including mixins

header{
@include flexCenter(column); //or row, whatever you want.
}

# another lesson starts here

## variables

`$myColor: blue;`

## maps

are like JS objects

e.g.=>
$colors: (
primary: #005dff,
accent: #fff6bb,
);

- notice that the above are not curly brackets but regular brackets
- to use them, we first start with `map-get` followed by the name of the mapping (say, key) and the value we want to use .
  body {
  background-color: map-get($colors, primary);
  }
