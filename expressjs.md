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
