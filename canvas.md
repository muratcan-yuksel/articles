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
