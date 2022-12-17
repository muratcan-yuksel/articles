# Mern app

tuto => https://www.youtube.com/watch?v=SBvmnHTQIPY

## dependencies

npm i express mongoose connect-mongo express-session express-handlebars dotenv method-override moment morgan passport passport-google-oauth20

npm i -D nodemon cross-env

## package.json

```json
{
  "name": "traversy-mern",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "start": "cross-env NODE_ENV=production nodemon app",
    "devstart": "cross-env NODE_ENV=development nodemon app"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "connect-mongo": "^4.6.0",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "express-handlebars": "^6.0.6",
    "express-session": "^1.17.3",
    "method-override": "^3.0.0",
    "moment": "^2.29.4",
    "mongoose": "^6.8.0",
    "morgan": "^1.10.0",
    "passport": "^0.6.0",
    "passport-google-oauth20": "^2.0.0"
  },
  "devDependencies": {
    "cross-env": "^7.0.3",
    "nodemon": "^2.0.20"
  }
}
```

## Starting the server

Our main file is `app.js` and this is the first code block =>

```js
const express = require("express");
const dotenv = require("dotenv");

//load config

dotenv.config({ path: "./config/config.env" });

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
```

Now, we need to create a folder called `config` and inside it, we create a file called `config.env` and we put our environment variables inside it.

```env
PORT=3000
MONGO_URI= mongodb+srv://test:test@cluster0.56hf1.mongodb.net/storybooks
```

In MONGO_URL environment variable, I use the connect option with mongodb compass, and storybooks is the name of the application I gave.

## connecting the database

I create a `db.js` in the `config` folder and add the following code =>

```js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //   useCreateIndex: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
```

then I need to go back to `app.js` and add the following code =>

```js
const connectDB = require("./config/db");
...
  ...
  dotenv.config({ path: "./config/config.env" });

connectDB();
```

now when I start the server it'll say mongoDB is connected.

## setting up morgan for log in

in app.js

```js
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");

//load config

dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();

//add morgan only on development mode
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
```

## setting up handlebars template engine

FAULTY

ABORTED TUTO
