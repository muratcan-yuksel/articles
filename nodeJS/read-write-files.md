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

##### NB! NodeJS misses some JS APIs like "fetch"

## File system

Say I have the following structure:

-files
--lorem.txt
--starter.txt
-index.js

I want to read what's in starter.txt (which says, Hi, my name is Murat). I go to index.js and

```js
const fs = require("fs");

//path, then a callback function
fs.readFile("./files/starter.txt", (err, data) => {
  if (err) throw err;
  console.log(data.toString());
});
```

Now, there's another way to see the data as string.

```js
const fs = require("fs");
//path, encoding, callback
fs.readFile("./files/starter.txt", "utf8", (err, data) => {
  if (err) throw err;
  //see, no toString()
  console.log(data);
});
```

### exit on uncaught errors

```js
const fs = require("fs");
//there' no hello.txt file so it'll throw an error
fs.readFile("./files/hello.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log(data);
});

//exit on uncaught errors

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});
```

### NodeJS is async! e.g.

```js
const fs = require("fs");

fs.readFile("./files/starter.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log(data);
});
//check this out
console.log("Hello...");

//exit on uncaught errors

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});
```

The above code, when called with `node index` on the terminal, will return the following because of its asynchronous nature:

Hello...
Hi, my name is Murat

## using path instead of hard coding the file path

```js
const fs = require("fs");
const path = require("path");
//we can use path.join instead of hard coding the path
fs.readFile(
  path.join(__dirname, "files", "starter.txt"),
  "utf8",
  (err, data) => {
    if (err) throw err;
    console.log(data);
  }
);
```

## Writing files

```js
const fs = require("fs");
const path = require("path");

console.log("Hello...");

//instead of read, we use writeFile
fs.writeFile(
  //no need for encoding, it's by default
  //path, file to be created, text to be written, callback
  path.join(__dirname, "files", "reply.txt"),
  "Nice to meet you!",

  (err) => {
    if (err) throw err;
    console.log("write complete");
  }
);
```

If I run the above code, it'll create a reply.txt file in the files folder and write "Nice to meet you!" in it.

### appending to a file

```js
fs.appendFile(
  path.join(__dirname, "files", "test.txt"),
  "Testing text",

  (err) => {
    if (err) throw err;
    console.log("append complete");
  }
);
```

This will append and modify a file. It will also create the file if it does not exist. With the code above, we're creating a new `text.txt` file for instance.

### appending for real

Check the following snippet out =>

```js
fs.writeFile(
  path.join(__dirname, "files", "reply.txt"),
  "Nice to meet you!",

  (err) => {
    if (err) throw err;
    console.log("write complete");
    //appendFile is inside of the callback of writeFile
    fs.appendFile(
      //appending to reply.txt
      path.join(__dirname, "files", "reply.txt"),
      "/n/nYes, it is!",

      (err) => {
        if (err) throw err;
        console.log("append complete");
      }
    );
  }
);
```

## renaming a file

First off, I guess this is what they call a callback hell. Check this out =>

```js
fs.writeFile(
  path.join(__dirname, "files", "reply.txt"),
  "Nice to meet you!",

  (err) => {
    if (err) throw err;
    console.log("write complete");

    fs.appendFile(
      path.join(__dirname, "files", "reply.txt"),
      "/n/nYes, it is!",

      (err) => {
        if (err) throw err;
        console.log("append complete");
        //using rename instead of appendFile
        //file, new name, callback
        fs.rename(
          path.join(__dirname, "files", "reply.txt"),
          path.join(__dirname, "files", "newReply.txt"),
          //see, no new text whatsoever

          (err) => {
            if (err) throw err;
            console.log("rename complete");
          }
        );
      }
    );
  }
);
```

## async await with nodeJS => fsPromises

In order to avoid the callback hell, we can use the async await pattern. But to do that, we need to require not just fs, but fs.promises. Check this out =>

```js
const fsPromises = require("fs").promises;
const path = require("path");

const fileOps = async () => {
  try {
    //I don't need a callback anymore
    const data = await fsPromises.readFile(
      path.join(__dirname, "files", "starter.txt"),
      "utf8"
    );
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
//but I need to call the function
fileOps();
```

We can add more `await`s in the try block. Check this out =>

```js
const fileOps = async () => {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, "files", "starter.txt"),
      "utf8"
    );
    console.log(data);
    //writing the data from starter.txt to promiseWrite.txt
    await fsPromises.writeFile(
      path.join(__dirname, "files", "promiseWrite.txt"),
      data
    );
    //appending a new string to promiseWrite.txt
    await fsPromises.appendFile(
      path.join(__dirname, "files", "promiseWrite.txt"),
      "/n/nNice to meet you!"
    );

    //rename the above file
    await fsPromises.rename(
      path.join(__dirname, "files", "promiseWrite.txt"),
      path.join(__dirname, "files", "promiseCompleted.txt"),
      "/n/nNice to meet you!"
    );

    //create a new data file with the renamed promiseCompleted file
    const newData = await fsPromises.readFile(
      path.join(__dirname, "files", "promiseCompleted.txt"),
      "utf8"
    );
    //console log it
    console.log(newData);
  } catch (error) {
    console.error(error);
  }
};

fileOps();
```

## unlink

If I add an `unlink` after reading the file and before writing to it, it will create a promiseCompleted.txt file, but delete starter.txt file.

```js
const fsPromises = require("fs").promises;
const path = require("path");

const fileOps = async () => {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, "files", "starter.txt"),
      "utf8"
    );
    console.log(data);
    //adding unlink here
    await fsPromises.unlink(path.join(__dirname, "files", "starter.txt"));

    await fsPromises.writeFile(
      path.join(__dirname, "files", "promiseWrite.txt"),
      data
    );

    await fsPromises.appendFile(
      path.join(__dirname, "files", "promiseWrite.txt"),
      "/n/nNice to meet you!"
    );

    await fsPromises.rename(
      path.join(__dirname, "files", "promiseWrite.txt"),
      path.join(__dirname, "files", "promiseCompleted.txt"),
      "/n/nNice to meet you!"
    );

    const newData = await fsPromises.readFile(
      path.join(__dirname, "files", "promiseCompleted.txt"),
      "utf8"
    );

    console.log(newData);
  } catch (error) {
    console.error(error);
  }
};

fileOps();
//exit on uncaught errors

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});
```

## streams

We create a new file called `stream.js`. The idea with streams is I guess is for efficiency. Instead of getting all the data at once, it gets chunk by chunk. Check this out =>

```js
const fs = require("fs");

const rs = fs.createReadStream("./files/lorem.txt", { encoding: "utf-8" });

const ws = fs.createWriteStream("./files/lorem-copy.txt");

// rs.on("data", (chunk) => {
//   console.log("-----NEW CHUNK-----");
//   console.log(chunk);
//   ws.write("\nNEW CHUNK\n");
//   ws.write(chunk);
// });

//we can use this command instead of the above commented out one
rs.pipe(ws);
```

## creating a directory

I create a new `dir.js` file, add the following code to create a directory called `new` and run `node dir` =>

```js
const fs = require("fs");

fs.mkdir("./new", (err) => {
  if (err) throw err;
  console.log("directory created");
});
```

We can also put a check so that we won't create or overwrite a directory if it already exists. Like so =>

```js
const fs = require("fs");
//starts with an exclamation mark you see
if (!fs.existsSync("./new")) {
  fs.mkdir("./new", (err) => {
    if (err) throw err;
    console.log("directory created");
  });
}
```
