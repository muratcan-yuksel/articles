# TRANSFORM

## translate

means move the element from one position to another in the webpage

- can take 2 parameters, the first one being the X axis, the second being the Y axis
  e.g. ` transform: translate(200px, 150px);`

## scale

makes the element bigger or smaller
` transform: scaleX(5);`

## rotate

X and Y axises are kinda confusing, maybe they're better with 3D. So, the basic 2D rotating we're looking for is found in the Z axis, like so :
` transform: rotateZ(80deg);`

# TRANSITIONS

- they transition the element form one state to another
- we generally do transitions using another, helper element. And we also generally add an hover effect to that helper div. Though it is not entirely necessary.
- to accomplish what we're doing in the case of a hover effect, we'd, say, have an element with a class of `el` and add the hover effect as such =>
  ```.el:hover{
    background:salmon,
    transform: rotate(350deg);
  }
  ```
- now, when we want to add transitions, it is important to note that WE DO NOT ADD TRANSITIONS ON THE HOVER ELEMENT, but the element itself, so `el` in our case. As such =>

`````
.el{
  transition: 1s;
}````
`````
