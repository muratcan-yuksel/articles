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

I can go further and install moment library, import it and use it in my middleware.

```js
...
...
const moment = require("moment");

const app = express();

//middleware
const logger = (req, res, next) => {
  console.log(
    `${req.protocol}://${req.get("host")}${
      req.originalUrl
    }: ${moment().format()} `
  );
  next();
};
//init middleware
app.use(logger);
...
...
```

will return `http://localhost:5000/api/members: 2022-12-05T03:49:05+03:00 `

### Playing with get requests

Now, I want to get a specific member, so I need to use the id in the url. I can do that by using `req.params.id` and then use it to filter the members array.

I also want to return an error message if the id does not exist.

```js
//get single member
app.get("/api/members/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});
```

on postman, I make a request to http://localhost:5000/api/members/3 (or any id instead of 3)

## Router

In order to use routing, I create this folder structure => `routes/api/members.js`

Inside of members.js, I put the following code =>

```js
const express = require("express");
const router = express.Router();
const members = require("../../Members");

//get all members
//router instead of app
//only slash is enough because we already have /api/members in index.js
router.get("/", (req, res) => {
  res.json(members);
});

//get single member
router.get("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

module.exports = router;
```

As you can see, the difference from the previous example is that I'm using router instead of app, and I'm using router.get instead of app.get.

Subsequent to this, I go back to my index.js file and without the need of importing the routing file, I just add the following snippet =>

```js
//use router
//first, the route we want to use, and the second is the path to the file
app.use("/api/members", require("./routes/api/members"));
```

### creating a member
