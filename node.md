-Start with creating a package.json file with npm init -y
-install nodemon so that you won't have to restart your server all the time => npm install -D nodemon (means npm install --save-dev nodemon)

---

To create a server:
-add this to your package.json file after installing nodemon so that you won't have to refresh the terminal all the time to see the changes=>
"scripts": {
"start": "node app",
"dev": "nodemon app"
},

-Create a public folder in the root folder, and add whatever html or whatever you're gonna have in public there
-in your primary js file, whether it's app.js or index.js, the structure is very similar to this=>
const http = require("http");
const path = require("path");
const fs = require("fs");

//create a new server object
const server = http.createServer(function (req, res) {
//if it's the slash, i.e. homepage
if (req.url === "/") {
fs.readFile(
path.join(\_\_dirname, "public", "index.html"),
(err, content) => {
if (err) throw err;
//just add this, don't think too much
res.writeHead(200, { "Content-Type": "text/html" });
res.end(content);
}
);
}
});

const PORT = process.env.PORT || 5000;

## server.listen(PORT, () => console.log("server running on port" + PORT));

nope, the deal is here=>
const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
// if (req.url === '/') {
// fs.readFile(
// path.join(\_\_dirname, 'public', 'index.html'),
// (err, content) => {
// if (err) throw err;
// res.writeHead(200, { 'Content-Type': 'text/html' });
// res.end(content);
// }
// );
// }

// if (req.url === '/api/users') {
// const users = [
// { name: 'Bob Smith', age: 40 },
// { name: 'John Doe', age: 30 }
// ];
// res.writeHead(200, { 'Content-Type': 'application/json' });
// res.end(JSON.stringify(users));
// }

// Build file path
let filePath = path.join(
\_\_dirname,
"public",
req.url === "/" ? "index.html" : req.url
);

// Extension of file
let extname = path.extname(filePath);

// Initial content type
let contentType = "text/html";

// Check ext and set content type
switch (extname) {
case ".js":
contentType = "text/javascript";
break;
case ".css":
contentType = "text/css";
break;
case ".json":
contentType = "application/json";
break;
case ".png":
contentType = "image/png";
break;
case ".jpg":
contentType = "image/jpg";
break;
}

// Check if contentType is text/html but no .html file extension
if (contentType == "text/html" && extname == "") filePath += ".html";

// log the filePath
console.log(filePath);

// Read File
fs.readFile(filePath, (err, content) => {
if (err) {
if (err.code == "ENOENT") {
// Page not found
fs.readFile(
path.join(\_\_dirname, "public", "404.html"),
(err, content) => {
res.writeHead(404, { "Content-Type": "text/html" });
res.end(content, "utf8");
}
);
} else {
// Some server error
res.writeHead(500);
res.end(`Server Error: ${err.code}`);
}
} else {
// Success
res.writeHead(200, { "Content-Type": contentType });
res.end(content, "utf8");
}
});
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
///////////////////////////////////////
MORE IMPORTANT, MORE BASIC PARTS/EXPLANATIONS
///////////////////////////////////////////
The following reads an index.html file and displays it
const http = require("http");
const fs = require("fs");
http
.createServer((req, res) => {
fs.readFile("index.html", (err, data) => {
res.writeHead(200, { "Content-Type": "text/html" });
res.write(data);
return res.end();
});
})
.listen(8080);
////////CREATE FILES
THe following creates a new file called newFile1 and writes Hello content! in it
const fs = require("fs");
fs.appendFile("newFile1.txt", "Hello content!", (err) => {
if (err) throw err;
console.log("saved!");
});
