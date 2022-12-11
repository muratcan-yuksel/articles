# Local library project from MDN

Link => https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/skeleton_website

After installing the express generator globally, I run the following command to create an express project => `express express-locallibrary-tutorial --view=pug`

Then I cd into the directory and run `npm install`

Then I start the application by running `DEBUG=express-locallibrary-tutorial:* npm start`

All these instructions were given to me after I created the express project, on the terminal.

Now it's live on localhost:3000

I can also just start it via `npm start` btw.

I then install nodemon and use `nodemon devstart` instead.

Alternatively, I can add the following scripts in package.json and run `npm run devstart` instead.

```json
  "scripts": {
    "start": "node ./bin/www",
    "devstart": "nodemon ./bin/www",
    "serverstart": "DEBUG=express-locallibrary-tutorial:* npm run devstart"
  },
```
