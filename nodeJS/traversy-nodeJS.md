## Path module

const path = require("path");

// Base file name
console.log(path.basename(\_\_filename));

// Directory name
console.log(path.dirname(\_\_filename));

// File extension
console.log(path.extname(\_\_filename));

// Create path object
console.log(path.parse(**filename));
console.log(path.parse(**filename).base);

// Concatenate paths
console.log(path.join(\_\_dirname, "test", "hello.html"));

## OS module

const os = require("os");

// Platform
console.log(os.platform());
//returns Linux

// CPU Arch
console.log(os.arch());

// CPU Core Info
console.log(os.cpus());

// Free memory
console.log(os.freemem());

// Total memory
console.log(os.totalmem());

// Home dir
console.log(os.homedir());

// Uptime
//amount of time your system has been up in seconds
console.log(os.uptime());

## Url module

const url = require("url");

const myUrl = new URL(
"http://mywebsite.com:8000/hello.html?id=100&status=active"
);

//entire url object
console.log(myUrl);

// Serialized URL
console.log(myUrl.href);

// Host (root domain)
console.log(myUrl.host);

## HTTP module

```js
const http = require("http");

// Create server object
http
  .createServer((req, res) => {
    // Write response
    res.write("Hello World");
    res.end();
  })
  .listen(5000, () => console.log("Server running..."));
```

If you visit localhost 5000, you'll see "Hello World" in the browser. This is the most basic server you can see lol.

# Creating a server

I have a public folder and inside of it an index.html and an about.html file.

```js
const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
  switch (req.url) {
    case "/":
      fs.readFile(path.join(__dirname, "public", "index.html"), (err, data) => {
        if (err) throw err;
        res.end(data);
      });

      //   res.writeHead(200, { "Content-Type": "text/html" });
      //   res.end("<h1>Home Page</h1>");
      break;
    case "/about":
      fs.readFile(path.join(__dirname, "public", "about.html"), (err, data) => {
        if (err) throw err;
        res.end(data);
      });
  }
});

//this means that it'll first look for the .env variable
//and if that's not found, it'll run on 5000
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```
