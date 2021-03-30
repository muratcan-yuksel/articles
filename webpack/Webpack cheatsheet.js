--Webpack cheatsheet--

How to install webpack?

->in the terminal:
-npm init -y (-y to make it faster)
-create .gitignore and write node_modules into it
-> install webpack npm install --save-dev  webpack webpack-cli

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
//He creates a main.css file in the src folder to show how we handle CSS files
in the main.css file
body{
    background:purple;
}
-in order for webpack to process that we need to use 2 loaders:
style loader and css loader
for instance, in order to use the css loader (there are instructions), we go to our webpack.config.js
and add a rules object under the module
like rules: [
    {
        //this is a regex that's saying "if a file ends with .css..."
        test: /\.css$/,
        //if that's the case, use the following two loaders
        //there's an order in here
        //we have to use them in order
        //the thing is: they're in reverse order
        //so here the css loader comes first, and style loader comes later
        //again, it's reversed
        use: ['style-loader', 'css-loader'],
    }
]
- we install these loaders via the terminal like this:
npm install --save-dev style-loader css-loader
//now we need to make sure that webpack knows about that main.css file
so we're gonna to to the index.js file and import the main.css file there
like this:
import "./main.css";
import { toNamespacedPath } from "node:path"
import { Template, webpack } from "webpack"
import { time } from "node:console"
//then we say npm start on terminal
with just css loader, we wouldn't see the effects of the css, i.e. the webpage wouldn't be styled
for that, we also need the style loader
these loaders take the file, the css file in our case, and parse it into the js file. So it's js at the end
later, we'll see how to spit out css files too. But later.

//NOW WE'RE GONNA INCORPORATE SASS
he starts by installing bootstrap locally:
npm install --save-dev bootstrap
-he changes the main.css file like this:
-deletes what's inside of it first
-and changes the name into main.scss

in the main.scss file he imports bootstrap:
@import "~bootstrapt/scss/bootstrap";

now we need a sass-loader
-in the terminal: npm install sass-loader node-sass webpack --save-dev
NOW let's update the config file
we go to the webpack.config.js
it should look like this:

module: {
    rules: [
        {
            test: /\.scss$/,
            use:[
                "style-loader", //3. injects styles into DOM
                "css-loader", // 2. turns css into common js
                "sass-loader" //1. turns sass into css
            ]
        }
    ]
}
now goes back to index.js file to update the main.css into main.scss
and runs npm start
--------------------------------------------------------------------
PART 2
----------------------------------------------------------------------------
CACHE BUSTING AND PLUGINS
don't think about that too much
just go to your webpack.config.js file and
change the filename in the output object into"main.[contenthash].js (dunno if "h" is upper or lowercase)
now when you npm start
it'll create a main.askfjasfj92832.js file in the dist folder (next to main.js file)
whenever I change the code, I'll get a new main.js file with those different names

how are we gonna include those files?
our index.html include only main.js??
we don't need to do that, webpack will create a html file and include it for us
BUt
for that, we need to learn about plug-ins
//PLUGINS
we need htmlwebpackplugin to create those html files
start by installing it:
npm install --save-dev html-webpack-plugin
in our config file, we add the following:
var HtmlWebpackPlugin = require ('html-webpack-plugin');
and under the module.exports, we open a plugins array as such:
plugins: [new HtmlWebpackPlugin()], //don't forget your comma if it's not the last one
if we do npm start, it'll create a new index.html file in the dist folder
but this index.html file won't have any template in it
to solve this problem, he creates a template.html in src folder
copies his original index.html file 
BUT deletes the bootstrap and script to main.js tags in there
goes back to config file and changes the plugin as follows:
plugins: [new HtmlWebpackPlugin({
    template: "./src/template.html"
})],
//SPLITTING DEV AND PRODUCTION
we'll have 3 config files:
1 for dev
1 for production
1 shared between the two
he creates webpeck.dev.js and webpack.prod.js files
copies the webpack.config file. The idea is to delete things selectively
In production: changes mode to "production",
deletes the entry point
-renames the webpack.config into webpack.common
in webpack common, deletes mode and output property
IN webpack.dev.js filename is main.js and entry is deleted
in production it's main.[contenthash].js
deletes plugins from dev and prod
in dev and prod, he deletest the module and rules
he install a package called webpack merge
npm install --save-dev webpack-merge
this allows us to merge webpack config together easily
in webpack.dev he adds the following:
const common = require ("./wepack.common");
then imports merge package as follows:
const merge = require ("webpack-merge");
then changes the module.exports as follows:
//this common thingy means merge whatever is in common with whatever we have in this object
module.exports = merge (common, {
    mode:"development",
    output: {
        filename:"main.js",
        path: path.resolve(__dirname, "dist")
    }
});
he does the same merge thing with webpack.prod

now he goes to package.json 
in the scripts object, he changes the "start"
it was originally like this:
"scripts": {
    "start": "webpack --config webpack.config.js"
}, //TURNS INTO:
"scripts": {
    "start": "webpack --config webpack.dev.js"
    "build": "webpack --config webpack.prod.js"
},
he tries it with npm start
then to call webpack with our production file, he runs:
npm run build

Now he wants to setup a webpack dev server so that when he's in development he wouldn't have to do npm start all the time
he writes this: npm install --save-dev webpack-dev-server
then he goes to package.json file and changes the scripts as follows:
"scripts": {
    "start": "webpack-dev-server --config webpack.dev.js --open"
    "build": "webpack --config webpack.prod.js"
},
//THIS PART IS IMPORTANT
//Html-loader, File-loader, & Clean-webpack
moves the assets folder into src
we need 2 loaders: html loader & file loader
npm install --save-dev html-loader
goes to webpack.common.js and adds the following rules, Ok I'm gonna write the whole module:
module : {
    rules : [
        {
            test: /\.scss$/,
            use: [
                "style-loader", //3. injects styles into DOM
                "css-loader", // 2. turns css into common js
                "sass-loader" //1. turns sass into css
            ]
        },
        //HE ADDS THIS PART
        {
            test: /\.html$/,
            use: ["html-loader"]
        }
    ]
}

now we need the file loader
npm install --save-dev file-loader
now change the above module part as follows:
module : {
    rules : [
        {
            test: /\.scss$/,
            use: [
                "style-loader", //3. injects styles into DOM
                "css-loader", // 2. turns css into common js
                "sass-loader" //1. turns sass into css
            ]
        },
       
        {
            test: /\.html$/,
            use: ["html-loader"]
        },
         //HE ADDS THIS PART
         test:/\.(svg|png|jpg|gif)$/,
         use: {
             loader: "file-loader",
             options: {
                 name: "[name].[hash].[ext]",
                 outputPath:"imgs"
             }
         }
    ]
}

now he talks about clean webpack plugin
stopped at vide 8, minute 8. got really bored. 
