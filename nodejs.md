## Creating a basic server

```
//this is a basic server
const http = require("http");
//this request runs everytime there's a request from the webpage
const server = http.createServer((req, res) => {
//req contains lots of info
//this code is running on the server, not in the browser
console.log("request made");
});

//to make it actively listen to methods,
//we'll invoke the listen method
server.listen(3000, () => {
console.log("listening on requests");
});
```

## responses

to get a response from the above server, i.e. for the browser to actually show something, we need to deal with the response, and we'll start by setting a content header.

//this is a basic server
const http = require("http");
const server = http.createServer((req, res) => {
console.log(req.url, req.method);

//set header content type
res.setHeader('Content-Type', 'text/plain');
//let's write sth on it
res.write("hello Murat");
//and indicate that we're finished with writing
res.end();
});

server.listen(3000, () => {
console.log("listening on requests");
});

## serving html pages

say we have an index.html file in the root folder of our app. We want to server it.

const http = require("http");
const fs = require("fs");
const server = http.createServer((req, res) => {
console.log(req.url, req.method);
//set header content type to html
res.setHeader("Content-Type", "text/html");
//let's read the file we want to display
//readFile method first takes the relative path of the file I want to display
//second parameter is a callback function
fs.readFile("./index.html", (err, data) => {
if (err) {
console.log(err);
res.end();

    } else {
      //let's write the data we get from the file to response
      res.write(data);
      //and end things
      res.end();
    }

});
});

server.listen(3000, () => {
console.log("listening on requests");
});

=> we can just finish it like this if we're sending only one thing into response:

else {

      res.end(data);
    }

## Routing

## also the solution to the first TOP project

const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
res.setHeader("Content-Type", "text/html");

let path = "./";
switch (req.url) {
case "/":
path += "index.html";
res.statusCode = 200;
break;
case "/about":
path += "about.html";
res.statusCode = 200;
break;
default:
path += "404.html";
res.statusCode = 404;
break;
}

fs.readFile(path, (err, data) => {
if (err) {
console.log(err);
} else {
res.end(data);
}
});
});

server.listen(3000, () => {
console.log("server is listening on requests");
});

## \***\*\*\*\*\*\*\***\_\***\*\*\*\*\*\*\***

# This part is disorganized

## file system

// call the file system
const fs = require("fs");
// reading files
// is an asynchronous code
// first parameters is relative path to a file
fs.readFile("./test.txt", (err, data) => {
if (err) {
console.log(err);
}
{
console.log(data.toString());
}
});

## writing files

// second parameter is the thing we wish to write to the first parameter
fs.writeFile("./test.txt", "hello Murat", () => {
console.log("file was written");
});

## directories

// create an "assets" folder
// check if assets folder exists
// cool, create the file if it does not exist
// delete it if it exists
if (!fs.existsSync("./assets")) {
fs.mkdir("./assets", (err) => {
if (err) {
console.log(err);
}
console.log("folder created");
});
} else {
fs.rmdir("./assets", (err) => {
if (err) {
console.log(err);
}
console.log("folder deleted");
});
}

## deleting files

// NOT directories, directly files
// if deleteme.txt exists
if (fs.existsSync("./deleteme.txt")) {
//delete it
//unlink is how we delete files
fs.unlink("./deleteme.txt", (err) => {
if (err) {
console.log(err);
}
console.log("file deleted");
});
}
