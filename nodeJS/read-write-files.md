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