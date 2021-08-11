-Start with creating a package.json file with npm init -y
-install nodemon so that you won't have to restart your server all the time => npm install -D nodemon (means npm install --save-dev nodemon)

---

To create a server:
-add this to your package.json file after installing nodemon so that you woon't have to refresh the terminal all the time to see the changes=>
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

server.listen(PORT, () => console.log("server running on port" + PORT));
