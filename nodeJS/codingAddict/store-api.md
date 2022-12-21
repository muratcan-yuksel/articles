# Store api (no frontend)

We start the most basic server with app.js as such

```js
require("dotenv").config();
const express = require("express");

const app = express();

const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

//middleware
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send('Store API <br> <a href="/api/v1/products">Products</a>');
});

//products route
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    //connectDB
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
```

## env variables

Then directly I create a .env file in the root and add this

````env
MONGO_URI=mongodb+srv://murat:Mcan1992@cluster0.56hf1.mongodb.net/store-api?retryWrites=true```

````

Remember, after `true` mongoDB has something else, I delete it. And store-api is the name I gave.

Then I restart the server

## db

Then I create `db/connect.js` and add this

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

then I go back to my app.js and add it at this specific place

```js
require("dotenv").config();
const express = require("express");

const app = express();

//added this
const connectDB = require("./db/connect");

const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

//middleware
app.use(express.json());
```

i.e. after the const app= express() and before the middleware

Then, still in the app.js, I go to my start function and add the connectdb with await like so =>

```js
const start = async () => {
  try {
    //connectDB
    //added this
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
```

then I add the following under routes

```js
//routes
app.get("/", (req, res) => {
  res.send('Store API <br> <a href="/api/v1/products">Products</a>');
});
//added this
app.use("/api/v1/products", require("./routes/products"));
```

But I don't have a products route yet, but before creating the route, I need the controller. I create a folder called `controllers` and inside it I create a file called `products.js` and add this

### controller

```js
const getAllProductsStatic = async (req, res) => {
  res.status(200).json({ msg: "products testing route" });
};

const getAllProducts = async (req, res) => {
  res.status(200).json({ msg: "products route" });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
```

### products route

Then I create a folder called `routes` and inside it I create a file called `products.js` and add this

```js
const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getAllProductsStatic,
} = require("../controllers/products");

router.route("/").get(getAllProducts);
router.route("/static").get(getAllProductsStatic);

module.exports = router;
```

Now I go back to my app.js and clean up things a bit. Remember I had `app.use("/api/v1/products", require("./routes/products"));`

Instead of requiring there, I'll create a variable and require it there. So I add this after my connectDB variable ` const productsRouter = require("./routes/products");` and change the above app.use as such => `app.use("/api/v1/products", productsRouter);`
