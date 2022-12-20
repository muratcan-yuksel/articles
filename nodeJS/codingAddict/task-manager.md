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

## routes

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

## controllers

Now, I go and create another `tasks.js` file in the controllers folder.

```js
const getAllTasks = async (req, res) => {
  res.send("Get all tasks");
};

module.exports = {
  getAllTasks,
};
```

Then I go back to /routes/tasks.js and change the code there as follows=>

```js
const express = require("express");
const router = express.Router();

//controller
const { getAllTasks } = require("../controllers/tasks");

// DELETED
// router.route("/").get((req, res) => {
//   res.send("Task manage app");
// });

//ADDED
router.route("/").get(getAllTasks);

module.exports = router;
```

### adding the rest of the controller

/controllers/tasks.js

```js
const getAllTasks = async (req, res) => {
  res.send("Get all tasks");
};

const createTask = async (req, res) => {
  res.send("Create task");
};

const getTask = async (req, res) => {
  res.send("Get single task");
};

const updateTask = async (req, res) => {
  res.send("Update task");
};

const deleteTask = async (req, res) => {
  res.send("Delete task");
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
```

Now go back to /routes/tasks.js and add the rest of the routes

```js
const express = require("express");
const router = express.Router();

//controller
const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks");

router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;
```

Now it's time to test these via postman.

## Testing with Postman

### Setting global route in postman

I want to use `http://localhost:3000/api/v1` as the global in all my api requests in the collection I'm creating (Task-Manager). I click the `eye icon` on the top-right and define the name and the values as `http://localhost:3000/api/v1` there. In my case, I called the name as `URL`.

Now to go back to requests, I can use it as such => `{{URL}}/tasks`
will be equal to `http://localhost:3000/api/v1/tasks`

### Setting a post request

First I go back to controllers/tasks.js and change createTask as such

```js
//DELETED
// const createTask = async (req, res) => {
//   res.send("Create task");
// };

//ADDED
const createTask = async (req, res) => {
  res.json(req.body);
};
```

then I go back to postman, create a new "post" requet to `{{URL}}/tasks` and add a body with a json object as such =>

```json
{
  "name": "shakeAndBake",
  "completed": true
}
```

Then save it as "Get Task" in the collection.

### get single task

Now I go back to controllers/tasks.js and change getTask as such

```js
const getTask = async (req, res) => {
  res.json({ id: req.params.id });
};
```

In postman, if I send a get request to `{{URL}}/tasks/peter` I'll get

```json
{
  "id": "peter"
}
```

as response. If I send a request to `{{URL}}/tasks/1` I'll get

```json
{
  "id": "1"
}
```

and so on.

# Database setup

I install dotenv and mongoose.

I create a new folder called `db` and add `connect.js` file in it. I add the following code in it.

```js
const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
```

Then I create a `.env` file and add my connection string into it as a variable called `MONGO_URI`.

`MONGO_URI= mongodb+srv://murat:Mcan1992@cluster0.56hf1.mongodb.net/task-manager?retryWrites=true&`

# IMPORTANT NOTE ON A BUG I FOUND

MongoDB connect will have the string above with the ending of `w=majority`. Delete it. It gives an error if it's there. So you the version I posted above.

Then I go back to app.js and add the following code

```js
const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
//require connect.js
const connectDB = require("./db/connect");
//require dotenv
require("dotenv").config();

//middleware
app.use(express.json());

//routes
app.get("/hello", (req, res) => {
  res.send("Task manage app");
});

app.use("/api/v1/tasks", tasks);

const port = 3000;

//database connection
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    //took app.listen from bottom to here
    //so that it would wait for the database connection before starting the server
    app.listen(port, console.log(`Server started on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};
//call start function
start();
```

## Models

I create a `models` folder with `Task.js` file inside of it.
I populate it with the following code

```js
const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  //creating key/value pairs
  //name and completed are our keys
  name: {
    type: String,
    required: [true, "must provide name"],
    //this trims the spaces before and after the name
    trim: true,
    maxlength: [20, "name can not be more than 20 characters"],
  },
  completed: {
    type: Boolean,
    //we have the default set to false because we don't require this field
    default: false,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
```

As you can see, this is a key/value pair I've created. Quite straight forward.
Now that I've created and exported my schema, I need to go back to my controllers/tasks.js and import it.

```js
const Task = require("../models/Task");

const getAllTasks = async (req, res) => {
  try {
    //this .find({}) is a mongoose method
    //it gives all the docs bcs it is empty
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
...
  ...
```

To test this, I go back to postman and send a post request to `{{URL}}/tasks` with the following body

```json
{
  "name": "shakeAndBake",
  "completed": true
}
```

I should get the response.
