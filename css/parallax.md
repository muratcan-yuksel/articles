# freecodecamp tutorial

### with just one line of CSS

link => https://www.youtube.com/watch?v=llv5kW4sz0U

with just one line of CSS, we can create a basic parallax effect. This is the line
` background-attachment: fixed;`

You put this style to the image you want to see the parallax effect and voila!

### with JS

as easy as this =>

```const parallax = document.getElementById("parallax");
window.addEventListener("scroll", function () {
  //value of how much the user has scrolled from the top
  let offset = window.pageYOffset;
  console.log(`Offet: ${offset}`);
  //we're gonna use this value for our image so that,
  //the window and the image will move at different speeds
  console.log(`offset * 0.7 ${offset * 0.7}`);

  parallax.style.backgroundPositionY = offset * 0.7 + "px";
});
```

# random CSS tip

to get rid of fixed navbar shadowing some elements on scroll, use this obscure line =>

`scroll-padding: 1rem 0 0 0;`

# designcourse tutorial

link => https://www.youtube.com/watch?v=Dxm6EwvQIl8
