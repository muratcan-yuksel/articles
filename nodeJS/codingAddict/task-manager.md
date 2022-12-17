# Task manager

We start by adding two new folders in the root for future reference : controllres and routes. Then, we go to our main app.js file and add the following code :

```js
const express = require("express");
const app = express();

//routes
app.get("/hello", (req, res) => {
  res.send("Task manage app");
});

const port = 3000;

app.listen(port, console.log(`Server started on port ${port}`));
```

Now that we have our most basic server, we create a `tasks.js` file in the routes folder.

```js
const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => {
  res.send("Task manage app");
});

module.exports = router;
```

Now that I've exported the router, I go back to my app.js file. First, I import the tasks as such => `const tasks = require("./routes/tasks");`

Then I add a middleware => `app.use(express.json());`

and use my route => `app.use("/api/v1/tasks", tasks);`

Now if I go to localhost:3000/api/v1/tasks, I should see my message.

Full version of the code in app.js so far =>

```js
const express = require("express");
const app = express();
const tasks = require("./routes/tasks");

//middleware
app.use(express.json());

//routes
app.get("/hello", (req, res) => {
  res.send("Task manage app");
});

app.use("/api/v1/tasks", tasks);

const port = 3000;

app.listen(port, console.log(`Server started on port ${port}`));
```
