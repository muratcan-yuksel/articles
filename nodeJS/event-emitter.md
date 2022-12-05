# emittin events and responding to them

I start by initing a npm project, installing date-nfs, nodemon, and uuid. Also I create a `logEvents.js` file and populate it as such =>

```js
//npm modules
const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
//common core modules
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  console.log(logItem);
  try {
    //if logs does not exist, create a logs directory
    if (!fs.existsSync(path.join(__dirname, "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "logs"));
    }
    //testing
    await fsPromises.appendFile(
      path.join(__dirname, "logs", "eventLog.txt"),
      logItem
    );
  } catch (error) {
    console.log(error);
  }
};
//export it
module.exports = logEvents;
```

Now, I also create an `index.js` file and populate it as such =>

```js
const logEvents = require("./logEvents");

//working with events core module
const events = require("events");

class MyEmitter extends events {}

//initialize object
const myEmitter = new MyEmitter();

//add listener for the log event
myEmitter.on("log", (msg) => {
  logEvents(msg);
});

//emit the log event
// setTimeout(() => {
//Emit event
myEmitter.emit("log", "This is a log message");
// }, 2000n);
```

whenever I run `nodemon index` , I'll get a message like this on the console => `20221203        22:20:13        5e168c83-4ba9-4367-bcb0-4d1192f13700    This is a log message`

Also, a `logs` folder with `eventLog.txt` file in it will be created having the same message as above on each save.
