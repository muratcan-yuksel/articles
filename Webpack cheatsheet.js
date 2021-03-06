--Webpack cheatsheet--

How to install webpack?

->in the terminal:
-npm init -y (-y to make it faster)
-create .gitignore and write node_modules into it
-> install webpacknpm install --save-dev  webpack webpack-cli

->go to package.json file 
-Colt first deleted what's inside the "scripts" property 
- inside of it writes : "start": "webpack"
-now with the above thing, when we call npm start in the terminal, it'll call webpack
-we'll configure it further, but that's the beginning

-Next, create an index.js in src folder 
(it created main.js)
-adds main.js to html
-includes dist into .gitignore too bcs he says he doesn't need to put into github, I didn't rly understand why. It's the end of the 2nd course.

- in each file we'll indicate which part of it will be exported
-also we need to take out what's dependent on what
-that means what we need in this particular file that exists in another file 
-so we'd export that thing from that other file
-and import it in the file we're gonna use that thing
-how to import?  import {foo} from "file"
-everything starts from index.js
-that means that it must contain something that will create the chain of reactions for webpack to look for

//Configuring webpack
-when we said in the package.json file:
"scripts": {
    "start": "webpack"
}
it automatically looks for the index.js file in the src folder
it is the default behavior. It'll also create the main.js file in the dist folder
-We can call the configuration file as we like
so let's call it webpack.config.js
-the syntx for these files looks like this:
//NOTE: if you don't want to change your folder path, file name etc. You don't need to do the following
//but that's the syntax, for understanding purposes
// CONFIG FILE STARTS HERE
const path = require("path");
module.exports = {
    //add an entry point
    entry:""./src/index.js //see, this is our entry point
    //an output which is an object
    output: {
        filename: "main.js" //we can change this too, like "hello.js" or anything is okay too
        //where to spit that code out?
        //for this to work, we'Ll write const path require ("path") at the beginning of the file, see the beginning
        path: path.resolve(__dirname, "dist") 
        //now, this dirname= directory name
        //and instead of "dist", we could've written "COOODEEEE" etc too
        //the above code means: we want to create a file named main js in a directory called dist. That's all


    }
}
//the last step is to tell webpack to use this configuration
for this, we go to the package.json file
remembert our 

"scripts": {
    "start": "webpack"
}  ??

we change it like this:

"scripts": {
    "start": "webpack --config webpack.config.js"
    //remember, webpack.config.js was the name WE gave it to the file
    //it could've been sth else too
}

Why did we learn it if it was already default behavior?
because we'll be adding many things in to this file
and now we got the idea on how it works ;)

Remember how you were getting a warning on the terminal saying it's now in development but in production mode?
well, we can change that too 
SO, let's go back to our webpack.config.js
//CONFIG FILE STARTS
const path= require("path")
module.exports= {
    //NEW THINGYY to change mode to development from production
    mode: "development",
    //with this development mode, the main.js is not minified. It looks like a normal code
    //if you want to get rid of those weird eval codes in the main.js, you can do the following
    //but it's reeaaally not necessary at all, just so you know I mean
    devtool: "none", //get rid of eval codes in main.js
    entry: "./src/index.js"
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist")
    },
    
}


//LESSON 5=> LOADERS
what if we wanted to bundle files other than javascript? like images, css, sass etc.?
now, loaders are what we're looking for. They handle files different from javascript
