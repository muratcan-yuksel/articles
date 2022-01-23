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
