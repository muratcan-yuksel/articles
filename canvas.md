# HTML Canvas

First off, we need to define it in the HTML like so =>

```html
<body>
  <canvas id="canvas" width="600" height="600"></canvas>
  <script src="./app.js"></script>
</body>
```

We will work with in in JS file. So we need to get the DOM element like we do with any other element=>

`const canvas= document.getElementById('canvas'); `

MDN docs are quite helpful btw => https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API

To draw, we create a context like so =>
`const ctx = canvas.getContext("2d"); `
Now, we can call different methods and properties on that context =>

```javascript
ctx.fillStyle = "green";
//in order: x and y values, width and height
ctx.fillRect(10, 10, 150, 100);
```

We can define the witdh and height by directly interacting with the canvas, not the ctx object. Like so =>

`canvas.width = 200; `

## fillRect

As you can see from the comments above, `ctx.fillRect(10, 10, 150, 100); ` takes 4 parameters: the x and y axis of where the rectangle should be located, the width and the height of the rectangle. In order.

to style, we use `fillStyle`

## creating multiple rectangles

You can call the `ctx` object multiple times and it'll create a different rectangle in order. So, if we'd write this =>

```javascript
ctx.fillStyle = "green";
ctx.fillRect(20, 20, 150, 100);

ctx.fillStyle = "blue";
ctx.fillRect(50, 20, 150, 100);
```

It'll create 2 rectangles, one is green and the other is blue; and the blue one is coming on top of the green one.

## strokeRect()

Creates an outline of a rectangle, i.e. it's empty inside.

```javascript
ctx.lineWidth = 5;
ctx.strokeStyle = "green";
ctx.strokeRect(100, 200, 150, 100);
```

## clearRect

clears a part of the canvas. If I write `ctx.clearRect(20, 20, 100, 50); ` it'll work exactly like `fillRect` but instead of drawing a rectangle, it'll erase the coordinates given.

## fillText

creates a text. Takes 3 parameters: the text, x and y coordinates.

```javascript
ctx.fillStyle = "purple";
ctx.font = "30px Arial";
ctx.fillText("Hello world", 400, 50);
```

## strokeText

```javascript
ctx.lineWidth = 1;
ctx.strokeStyle = "orange";
ctx.strokeText("Hello world", 400, 100);
```

# Paths

Now, let's say we want to start by drawing a line.

We'll begin the path by calling `ctx.beginPath()`

Then move this path to 50 x and 50 y by calling `ctx.moveTo(50,50)`

Then, draw a line to 150 x axis and 50 y axis (y stays the same in this case) by `ctx.lineTo(150,50)`
and fill the stroke by `ctx.stroke()`

### creating a triangle by drawing lines

```javascript
ctx.beginPath();
ctx.moveTo(50, 50);
ctx.lineTo(150, 50);
//middle of the triangle is 100 in our case.
ctx.lineTo(100, 100);
ctx.lineTo(50, 50);
//or ctx.closePath();
// ctx.fillStyle = "purple";
// ctx.fill();
ctx.stroke();
```

\*Instead of stroke, the commented out lines can be used.

You can create multiple paths. I mean, you can begin with different places and draw from there.

### on lines

Here, each `ctx.lineTo` takes up from where it was left off. What does that mean? In the example above, since we start with `ctx.moveTo(50,50)`, the line `ctx.lineTo(150, 50); `will start drawing from 50x to 150x (total 100 pixels of line drawn then) and from 50y to 50y, which means it'll be on the same y axis, i.e. this will result in a horizontal line.

Then, if I wrote `ctx.lineTo(100, 100); ` this time it won't start from the beginning, but from 150x/50y. So, when it draws a line to 100x (from 150x), it'll go to the left. And since it draws from 50y to 100y, it'll go downwards.

## daring a rectangle with paths

We again start with `ctx.beginPath();`

But we dont need a `ctx.moveTo` as the thing we will use, `ctx.rect` takes 4 parameters and the first 2 is the x and y axis.

so we do this for instance `ctx.rect(300,50,150, 100)`

e.g.

```javascript
ctx.beginPath();
ctx.rect(300, 50, 150, 100);
ctx.fillStyle = "teal";
ctx.fill();
```

## arc (circles)

we start with `ctx.beginPath()` as usual.

But arc is a bit different, as it's a circle. Check this out from the documentation => `arc(x, y, radius, startAngle, endAngle, counterclockwise)`

The last one, `counterclockwise` is a boolean value. If it's true, it'll true it'll draw counterclockwise, if it's false it'll draw clockwise.

To draw a perfect circle =>

```javascript
function drawCircle() {
  ctx.beginPath();
  ctx.arc(100, 300, 50, 0, Math.PI * 2);
  ctx.fillStyle = "coral";
  ctx.fill();
}
```

Note that if you wanted to make a half circle, you wouldn't multiply Math.PI with 2.

to draw a smiley face (from the docs)=>

```javascript
function draw() {
  const canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.arc(100, 300, 50, 0, Math.PI * 2, true); // Outer circle
    ctx.moveTo(110, 300);
    ctx.arc(100, 300, 35, 0, Math.PI, false); // Mouth (clockwise)
    ctx.moveTo(65, 65);
    ctx.arc(60, 65, 5, 0, Math.PI * 2, true); // Left eye
    ctx.moveTo(95, 65);
    ctx.arc(90, 65, 5, 0, Math.PI * 2, true); // Right eye
    ctx.stroke();
  }
}
```

Although, we can customize it, make it bigger for instance. And can use variables to do so.

```javascript
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const draw = () => {
  ctx.beginPath();
  ctx.arc(centerX, centerY, 200, 0, Math.PI * 2);
  //move to mouth
  ctx.moveTo(centerX + 100, centerY);
  //draw mouth
  ctx.arc(centerX, centerY, 100, 0, Math.PI, false);
  //move to left eye
  ctx.moveTo(centerX - 60, centerY - 80);
  //draw left eye
  ctx.arc(centerX - 80, centerY - 80, 20, 0, Math.PI * 2);
  //move to right eye
  ctx.moveTo(centerX + 100, centerY - 80);
  //draw right eye
  ctx.arc(centerX + 80, centerY - 80, 20, 0, Math.PI * 2);
  ctx.stroke();
};

draw();
```

## Animations

Now, we will build a circle that bounces in the canvas. To do that, we first define a `circle` object=>

```javascript
const circle = {
  x: 200,
  y: 200,
  size: 30,
  //increment in terms of the x axis
  dx: 5,
  //increment in terms of the y axis
  dy: 4,
};
```

Then, we write a function to draw a circle with the properties above =>

```javascript
function drawCircle() {
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
  ctx.fillStyle = "purple";
  ctx.fill();
}
```

Now the fun part. We will create an `animate` function, and this function will use a native method called `requestAnimationFrame` which takes a fallback function, that is the function it's been called in (the animate function). It might sound confusing from my wording, but it is not. It just calles the animate function that it's in like so => ` requestAnimationFrame(animate);` This method redraws the canvas over and over again, that's why we're calling it.

Now, I'll post the whole snippet of the animate function and explain what we're doing line by line =>

```javascript
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCircle();
  //change position
  circle.x += circle.dx;
  circle.y += circle.dy;
  //detect side walls
  if (circle.x + circle.size > canvas.width || circle.x - circle.size < 0) {
    //multiply the incerement by -1 to reverse the direction
    circle.dx *= -1;
  }
  //detect top and bottom walls
  if (circle.y + circle.size > canvas.height || circle.y - circle.size < 0) {
    circle.dy *= -1;
  }

  requestAnimationFrame(animate);
}
```

With the first line ` ctx.clearRect(0, 0, canvas.width, canvas.height);` we're clearing the canvas on each frame. If we didn't do that, our circle would just draw like a pencil.

Then we call the `drawCircle()` function to draw our circle.

To change position, ` circle.x += circle.dx;` and the following for y axis are doing this: at each frame, change the position of the circle such that it will be plus dx of itself (we've defined in our object).

Now, if we stopped here, the circle would just go outside of the canvas. To hinder that behavior, we write the functions for collision detection.

```javascript
if (circle.x + circle.size > canvas.width || circle.x - circle.size < 0) {
  //multiply the incerement by -1 to reverse the direction
  circle.dx *= -1;
}
```

and the following for the y axis are doing this: if the circle tries to go outside of the cnavas, i.e. collides with the borders, multiply the incerement by -1 to reverse the direction.

### tips

To make the canvas as big as the screen itself =>

```javascript
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
```

# Building a drawing app

```javascript
window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  //resizing
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  //variables
  let painting = false;

  function startPosition(e) {
    painting = true;
    draw(e);
  }
  function finishedPosition() {
    painting = false;
    ctx.beginPath();
  }
  function draw(e) {
    if (!painting) return;
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.strokeStyle = "blue";

    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
  }

  //event listeners
  canvas.addEventListener("mousedown", startPosition);
  canvas.addEventListener("mouseup", finishedPosition);
  canvas.addEventListener("mousemove", draw);
});
```
