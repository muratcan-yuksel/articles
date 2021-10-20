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
