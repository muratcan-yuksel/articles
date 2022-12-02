# Read and write files

Like the `window` object, there's also a `global` object. You can even `console.log(global)` to see what it is. It's a big object, but it's not very useful. The only thing you'll ever need to use from it is `global.process`, which is an object that contains information about, and control over, the current Node.js process. You can use `process` to get information about the computer it's running on and about the user.

## commonJS modules instead of ES6 modules

In the browser, we use ES6 modules to import and export code. In Node.js, we use a different system called commonJS modules. The syntax is a little different, but the idea is the same. You can export a function or a variable from a file, and then import it into another file.

e.g.

```js
const os = require("os");

console.log(os.type());

console.log(os.version());

console.log(os.homedir());
```

### values that we halways have access to

console.log(\_\_dirname); => gives us the path to the current directory

console.log(\_\_filename); => gives us the path to the current file

#### path

```js
const path = require("path");

console.log(path.dirname(__filename));

console.log(path.basename(__filename));

console.log(path.extname(__filename)); // extension name

console.log(path.parse(__filename)); //returns an object

//returns this object =>

{
  root: '/',
  dir: '/home/sirius/coding/practice/nodeJS/1-lesson',
  base: 'server.js',
  ext: '.js',
  name: 'server'
}

```

## Importing a module

Let's say we create a `math.js` file in the same root and populated it as such =>

```js
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

module.exports = {
  add,
  subtract,
  multiply,
  divide,
};
```

Now I can go back to my `server.js` file and import the `math.js` file and use it as such =>

```js
const math = require("./math");

console.log(math.add(2, 3)); //will return 5
```

### destructuring modules

Instead of importing the whole `math`, I can destructure it and import only the functions I need as such =>

```js
const { add } = require("./math");

console.log(add(2, 3)); //still returns 5
```

### another way of exporting modules

Instead of defining constants, we can export functions as such =>

```js
//math.js
exports.add = (a, b) => a + b;
exports.subtract = (a, b) => a - b;
exports.multiply = (a, b) => a * b;
exports.divide = (a, b) => a / b;
//see, no module.exports going on here
```
