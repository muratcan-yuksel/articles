# link

=> https://codepen.io/SiriusWagner/pen/XWVqdma

- when writing a transition, if we specify the property inside the transition selector, we'll only add transition effect to that property. e.g.

consider this:

```
.parent {
  background-color: hsla(200, 100%, 20%);
  height: 400px;
  width: 400px;
}
.child {
  background-color: red;
  height: 50%;
  width: 50%;
  /* we only want to animate the transform thingy */
  transition: 1s;
}
.parent:hover .child {
  background: green;
  opacity: 10%;
  transform: translateX(100%);
}

```

right now, the child (which is a rectangle inside of a parent rectangle) will change its color while transitioning. If we'd write it as such:
`transition: transform 1s;` the transition would only target the transform directive, and the child rectangle wouldn't change its bacgkround color.

## animations

check this out :

```
.parent:hover .child {
  background: green;
  opacity: 100%;
  /* animation first takes a custom made name */
  animation: sag-sol 1s ease-in forwards;
}
@keyframes sag-sol {
  100% {
    transform: translateX(100%) translateY(50%);
  }
}
```

as you can see, keyframes selects the name we've given to the animation.
