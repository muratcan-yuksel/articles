# Mini message board

I start by initializing my application with express generator with pug template view => `express mini-message-board --view=pug`

Then I cd into the directory and run `npm install`

<!-- Then I start the application by running `DEBUG=mini-message-board:* npm start` -->

No, I go to my package.json and modify it as such =>

```json
  "scripts": {
    "start": "node ./bin/www",
    "devstart": "nodemon ./bin/www",
    "serverstart": "DEBUG=mini-message-board:* npm run devstart"
  },
```

Then I run `npm run devstart` to start the application with nodemon.

## Creating the message board

Now, the idea is to create a message board where users can post messages. That's all.

I start by going to routes/index.js and add a messages array of objects there =>

```js
const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];
```

I add these messages to the index route with res.render function =>

```js
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Mini Message Board", messages });
});
```

Then I go to views/index.pug and add the following code =>

```pug
extends layout

block content
  h1= title
  p Welcome to #{title}
  each message in messages
    p #{message.user}
    p #{message.text}
    p #{message.added}

```

`each` statement should be inside the `block` statement, otherwise I'll get an error.

### Adding the form

Now that the messages are displayed on the page, I want to add a form so that users can add messages.

To do that, I go back to routes/index.js and add the following code =>

```js
router.get("/new", function (req, res) {
  res.render("form", { title: "Mini Messageboard" });
});
```

This creates a view called `/new` and renders views/form.pug I'll create next.

Then I go to views/form.pug and add the following code =>

```pug
form(method="POST" action="/new")
  h1 Add a New Message

  label(for="user") Name:
  input#user(type="text" name="user" placeholder="Enter your name")

  label(for="text") Message:
  input#text(type="text" name="text" placeholder="Enter your message")

  input(type="submit" value="Submit")
```

The only thing remaining is to add the post route to routes/index.js =>

```js
router.post("/new", function (req, res) {
  // Add the new message to the messages array
  messages.push({
    text: req.body.text,
    user: req.body.user,
    added: new Date(),
  });

  // Redirect the client back to the main page
  res.redirect("/");
});
```

#### Final version of index.js

```js
var express = require("express");
var router = express.Router();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Mini Messageboard", messages: messages });
});

// get form page

router.get("/new", function (req, res) {
  res.render("form", { title: "Mini Messageboard" });
});

router.post("/new", function (req, res) {
  // Add the new message to the messages array
  messages.push({
    text: req.body.text,
    user: req.body.user,
    added: new Date(),
  });

  // Redirect the client back to the main page
  res.redirect("/");
});

module.exports = router;
```

Crazy, isn't it?
