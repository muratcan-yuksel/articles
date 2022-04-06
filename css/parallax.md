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

---

---

---

---

# designcourse tutorial

link => https://www.youtube.com/watch?v=Dxm6EwvQIl8
codepen => https://codepen.io/designcourse/pen/OrOZop

### quick tip

with the following, you can change the position of an element on scroll:

```
window.addEventListener("scroll", (e) => {
  const target = document.querySelector(".scroll");
  //   console.log(target.style);
  target.style.transform = "translate3d(0px, 50px, 0px";
});

```

## overview

It is quite complicated, so I'll just recount what we have as a code and will try to explain as we go further:

### HTML

we have a list of 3 items, who make up the word "parallax". We give them classes and sama data attributes. The interesting thing with data attributes, you give them as such => `data-rate="2"` for instance, and when you signify them in JS, you drop the `data-` part and just write the following word, `rate` in our case. Note that the naming of whatever comes after `data-` is up to you.

```
  <body>
    <section>
      <ul>
        <li class="scroll" data-rate="-2" data-direction="vertical">par</li>
        <li>al</li>
        <li class="scroll" data-rate="2" data-direction="vertical">lax</li>
      </ul>
      <span
        class="scroll"
        data-rateY="1"
        data-rateX="2"
        data-direction="horizontal"
      ></span>
      <span
        class="scroll"
        data-rateY="1"
        data-rateX="-2"
        data-direction="horizontal"
      ></span>
    </section>
    <!-- empty section for scroll -->
    <section></section>
    <script src="./app.js"></script>
  </body>
```

### JS

I don't think I understood is as much to explain it. So, I'll just paste the code, you can play with it and see what happens. It's not that difficult actually, just a syntax.

```
window.addEventListener("scroll", (e) => {
  const target = document.querySelectorAll(".scroll");
  let scrolled = window.pageYOffset;
  //   let rate = scrolled * 0.5;
  //   target.style.transform = "translate3d(0px, " + rate + "px, 0px)";
  let index = 0,
    length = target.length;

  for (index; index < length; index++) {
    //rate here is the data-rate we defined in the html
    //when using it in JS, we exclude "data-" part
    //so "data-rate" becomes just "rate"
    let position = window.pageYOffset * target[index].dataset.rate;

    if (target[index].dataset.direction === "vertical") {
      target[index].style.transform =
        "translate3d(0px, " + position + "px, 0px)";
    } else {
      var positionX = window.pageYOffset * target[index].dataset.ratex;
      var positionY = window.pageYOffset * target[index].dataset.ratey;

      target[index].style.transform =
        "translate3d(" + positionX + "px, " + positionY + "px, 0px)";
    }
  }
});

```

#### CSS is not really important. It's just for the span tag, we have a circle.

```
body {
  margin: 0;
  height: 100vh;
  font-size: 5em;
  font-family: "Montserrat";
  font-weight: bold;
}

section {
  height: 100%;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(3, auto);
  justify-content: center;
  align-items: middle;
  place-items: center;
  height: 100vh;
}

span {
  width: 110px;
  height: 110px;
  position: absolute;
  bottom: 0;
  left: 50%;
  background: black;
  border-radius: 50%;
}

```
