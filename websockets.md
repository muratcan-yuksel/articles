## Using WebSocket with React

Example service => https://www.bitstamp.net/websocket/v2/

For my last project, I had to use Websocket to create a website that displays real-time trading data. I didn't know anything about websocket, and it took a couple of dreading hours to get to start with it. That's the only problem, actually, to start with it; the rest is pretty clear. This short article hopes to help others' save the time it took for me to understand the basics of it.

Most of the tutorials on the web mentions a "require" syntax. You know it. When you want to use a certain tool, component, or image in your component in JS or React, you'd do something like const something = require ("./folder/something"). Now, as I said, most of the tutorials I've found on the web starts with this very syntax, that pushes you to start working with websockets using the require syntax. This is unnecessary, and maybe even wrong at the present day. I'm not sure about whether it works in any way or not, but I'm certain that the way I use works perfectly as I write this article on 12/09/2021. So, without further ado, let's talk about how we can make use of this protocol.

This article supposes that you have a working knowledge of Vanilla JS and React.js, you know how to deal with json format, and asynchronous code.

I initiate my app with vite (with the following commande: npm init vite@latest and choose react from the menu), but you can use your own structure, or create-react-app. It doesn't matter really.

### What we'll build?

We're going to build a very simple, one page React.js application that takes continuous-data from bitstamp.net. It doesn't really matter which service you're using, as long as it's websockets, the rest is plain Javascript.

INSERT IMAGE OR GIF HERE

### Building the app

Let's start with connecting to bitstamp's websocket protocol.
