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

## "express-async-errors" package

I require the package `express-async-errors` in my app.js

```js
require("express-async-errors");
```

Then I go to controllers/products.js and add this

```js
const getAllProductsStatic = async (req, res) => {
  //added this
  throw new Error("testing async errors");
  res.status(200).json({ msg: "products testing route" });
};
```

when I send a get request to static, it gives me the error that's defined in middle/ware/error-handler.js. I'll skip this part as I didn't rly get it tbh.

## schemas

Go to models/product.js and add this

```js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "product name must be provided"],
  },
  price: {
    type: Number,
    required: [true, "product price must be provided"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    enum: {
      values: ["ikea", "liddy", "caressa", "marcos"],
      message: "{VALUE} is not supported",
    },
    // enum: ['ikea', 'liddy', 'caressa', 'marcos'],
  },
});

module.exports = mongoose.model("Product", productSchema);
```

## populate.js

Now, I have a products.json file with some data like these ones:

```json
  {
    "name": "accent chair",
    "price": 25,
    "company": "marcos",
    "rating": 4
  },
  {
    "name": "albany sectional",
    "price": 109,
    "company": "liddy",
    "rating": 5
  },
```

In order to populate them to the database, I create a `populate.js` file in the root.

```js
require("dotenv").config();
//we have one connection at app.js, but we need it here too
//since we want to connect to the database
const connectDB = require("./db/connect");
//we need to grab the model
const Product = require("./models/product");
//and the data
const jsonProducts = require("./products.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    //empty the database
    //this is optional ofc

    await Product.deleteMany();
    //insert the data
    await Product.create(jsonProducts);
    console.log("Success!!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
```

then I run this script via `node populate.js `

Then I go to my controllers/product.js and populate it with the following code

```js
const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ price: { $gt: 30 } })
    .sort("price")
    .select("name price");

  res.status(200).json({ products, nbHits: products.length });
};
const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  let result = Product.find(queryObject);
  // sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  // 23
  // 4 7 7 7 2

  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
```
