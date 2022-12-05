# Creating express server

```js
const express = require("express");

const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## Loading files

### static version =>

```js
const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 5000;

//set static folder
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

Now, if I created a public folder and put index.html and about.html inside of it, and went to http://localhost:5000/about.html, it would load the about.html file.

### getting json data

```js
const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 5000;

const members = [
  {
    id: 1,
    name: "John Doe",
  },
  {
    id: 2,
    name: "Bob Williams",
  },
  {
    id: 3,
    name: "Shannon Jackson",
  },
];

app.get("/api/members", (req, res) => {
  res.json(members);
});

//set static folder
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

To see this in action, I go to postman, and send a get request to the following url: http://localhost:5000/api/members

## Middleware

Now, conside the previous example, but instead of having the members inside the index.js, I've created a Members.js file and exported it to index.js.

I also open Postman and send a get request to http://localhost:5000/api/members

To create a middleware, I need to use req,res and next, always. And after my action (console log in this case), I need to call next() to move on to the next middleware.

and to init the middleware, I need to use app.use(middlewareName).

```js
const express = require("express");
const path = require("path");
const members = require("./Members");

const app = express();

//middleware
const logger = (req, res, next) => {
  console.log("hello middleware");
  next();
};
//init middleware
app.use(logger);

const PORT = process.env.PORT || 5000;

app.get("/api/members", (req, res) => {
  res.json(members);
});

//set static folder
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

Now, each time make a get request via postman, I'll get the `hello middleware` message in the console that's running my application.
