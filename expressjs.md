## Starting with expressjs in Vanilla JS

-go to an empty directory and npm init -y
-npm install express --save

## Writing your first express app

-Check this code out:

```
// require() (import) the express module and create an Express application
const express = require("express");
const app = express();
const port = 3000;
// shows a route definition.
app.get("/", (req, res) => {
  res.send("hello brüder");
});
// starts up the server on a specified port ('3000') and prints a log comment to the console.
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
```

- in the terminal, write `node app` and go to localhost 3000 to see your app

# a way to create express project with ejs engine defined

---

express project_name --view=ejs

---

## to start the application

npm start works too...

## don't forget nodemon

### although I installed it globally

### so you don't really have to install it anymore

npm install --save-dev nodemon

to start it => nodemon start

## CRUD (create,read,update,delete)

The CRUD operations roughly correlate to the HTTP methods that you can employ in an express app. This definition can be somewhat flexible, but in general create correlates to POST (or app.post() in an express app), read correlates to GET (app.get()), update to PUT (app.put()) and delete to DELETE (app.delete())
