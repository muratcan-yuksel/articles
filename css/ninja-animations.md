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

### targeting a single property to transition

If I wanted the above example to change its background color, but not rotate 360 degrees, I'd have to specify the background property in the transition directive. In that sense, the transition would target only the background. Or, I can chain-target elements as I wish =>

`````
.el{
  transition: background 1s, transform 0.3s;
}````
`````

#### transition parameters

- 1st one is the transition time
- 2nd one is the delay
  e.g. ` transition: background 1s, transform 0.3s 1s;` => transform would start after a 1 second delay
- 3rd one is timing function. Like `linear` or `ease-in`

# Keyframes

- To work with keyframes, we have an element `el` and we define a keyframe with a unique name. We're going to target that name in our `el` element like so =>

````.el{
  animation-name: moves; => this is the name I've given to my keyframe
  animation-duration: 3s;
}```

- In the keyframe, I'll need to define 2 codeblocks: from and to
@keyframes moves{
from { transform: translateX(0)}
to {transform: translateX(500px)}
}
````

## Animation fill mode

tells the CSS what to do with the animated element outside of the animation window, that is to say what to do with that element before and after it animates? I mean, outside of the animation scope. It can take 4 values

- none
- forwards
- backwards
- both

e.g. `animation-fill-mode:forwards;` in the element `el`

## repeating animations

` animation-iteration-count: infinite;`

for example, to have an infinite passing element, that moves in one direction and then after it goes above the scope of the X axis, starts from the beginning, we'd do something like this :

````
    .circle {
        height: 150px;
        width: 150px;
        background: white;
        border-radius: 50%;
        animation-name: moves;
        animation-duration: 3s;
        animation-fill-mode: both;
        animation-iteration-count: infinite;
      }
      @keyframes moves {
        from {
          transform: translateX(-20vw);
        }
        to {
          transform: translateX(100vw);
        }
      }
      ```
````

You see, we have a negative value to `from` in keyframes, so that it actually jumps back to the outer-left of the window, so that we can't see that clunky going bakc movement.

## animation direction

pretty self explanatory

e.g. ` animation-direction: reverse;`

This is the cool one => ` animation-direction: alternate;`

with the one above, it goes forth and back.

## animation timing functions

like ease-in, cubic-bezier and such

## ANIMATION SHORTHAND

e.g. `animation: moves 8s linear infinite reverse;`

## chaining animations

- now, first of all, remember that in keyframes section, we've mentioned that we need a `from...to` pair of directives. Actually, we can add as much as we want by using percentages.

  Like so =>

````@keyframes jump {
        /* starting point is as the same as the element's starting point */
        0% {
          top: 10rem;
        }
        50% {
          top: 5rem;
        }
        100% {
          top: 10rem;
        }
      }```
````

- and to chain 2 animations, we just add a comma after the 1st one and add the 2nd one directly afterwards. Like so =>
  ` animation: moves 5s both infinite alternate, jump 0.3s 1.2s 1 ease;`
