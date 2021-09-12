## Using websockets with React

Example service => https://www.bitstamp.net/websocket/v2/

For my last project, I had to use Websocket to create a website that displays real-time trading data. I didn't know anything about websocket, and it took a couple of dreading hours to get to start with it. That's the only problem, actually, to start with it; the rest is pretty clear. This short article hopes to help others' save the time it took for me to understand the basics of it.

Most of the tutorials on the web mentions a "require" syntax. You know it. When you want to use a certain tool, component, or image in your component in JS or React, you'd do something like const something = require ("./folder/something"). Now, as I said, most of the tutorials I've found on the web starts with this very syntax, that pushes you to start working with websockets using the require syntax. This is unnecessary, and maybe even wrong at the present day. I'm not sure about whether it works in any way or not, but I'm certain that the way I use works perfectly as I write this article on 12/09/2021. So, without further ado, let's talk about how we can make use of this protocol.

This article supposes that you have a working knowledge of Vanilla JS and React.js, you know how to deal with json format, and asynchronous code.

I initiate my app with vite (with the following commande: npm init vite@latest and choose react from the menu), but you can use your own structure, or create-react-app. It doesn't matter really.

For a more in-depth introduction, visit [javascript.info](https://javascript.info/websocket)

### What we'll build?

We're going to build a very simple, one page React.js application that takes continuous-data from bitstamp.net and displays it on the page. The data will be changing all the time.

It doesn't really matter which service you're using, as long as it's websockets, the rest is plain Javascript.

### Building the app

Let's start with connecting to bitstamp's websocket protocol by writing the following code `const ws = new WebSocket("wss://ws.bitstamp.net");` Now, using this ws constant, we can subscribe to any channel that's defined on bitstamp's website and get contniuous-data from there. You can find any information regarding the channels, properties and all from [here](https://www.bitstamp.net/websocket/v2/)

Now, let's subscribe to a channel. I'll subscribe to oder_book_v2 channel and specify that I want to see btc/usd exchange rates. This call is defined in bitstamp's guide. You can change the channel and the currencies as you wish. Here's is the call:

```
 const apiCall = {
    event: "bts:subscribe",
    data: { channel: "order_book_btcusd" },
  };
```

The next step is to send this call to the server on open =>

```
  ws.onopen = (event) => {
    ws.send(JSON.stringify(apiCall));
  };
```

Now we want to do something with each data. So, whenever we receive a message from the server, we'll do something. Let's write an async code with try/catch

ws.onmessage = function (event) {
const json = JSON.parse(event.data);
console.log(`[message] Data received from server: ${json}`);
try {
if ((json.event = "data")) {

        console.log(json.data);
      }
    } catch (err) {
      // whatever you wish to do with the err
    }

};

If we opened the console, we'd see large amount of data coming from the server. That's it, actually. We got the data, it's coming in a stream, and we can do whatever we want to do with it. It's that easy.

I want to display the data in a particular manner though. Let me paste the code and I'll explain immediately after:

```
import React, { useState } from "react";

function  App() {
  //give an initial state so that the data won't be undefined at start
  const [bids, setBids] = useState([0]);

  const ws = new WebSocket("wss://ws.bitstamp.net");

  const apiCall = {
    event: "bts:subscribe",
    data: { channel: "order_book_btcusd" },
  };

  ws.onopen = (event) => {
    ws.send(JSON.stringify(apiCall));
  };

  ws.onmessage = function (event) {
    const json = JSON.parse(event.data);
    try {
      if ((json.event = "data")) {
        setBids(json.data.bids.slice(0, 5));
      }
    } catch (err) {
      console.log(err);
    }
  };
  //map the first 5 bids
  const firstBids = bids.map((item) => {
    return (
      <div>
        <p> {item}</p>
      </div>
    );
  });

  return <div>{firstBids}</div>;
}

export default  App;
```

So, what's going on here? As you can see, it's a very basic React.js App component. I use useState hook so I import it also with react.

I define the state and give it an initial value.

I proceed as indicated before- except, I set the state to json.data.bids (bids being a property of the live order channel and indicated on bitstamp's page) and restrict the amount of data I'll receive to 5, for the sake of convenience.

I map the data I receive, saved in state (as you know, React asks for a key for each item. I usually use uniqid for that, you can check it out yourself.)

I return the mapped data and voilà! If you did the same, you should see exactly 5 rows of constantly-changing data on the screen.

I hope this article helps someone.

All the best and keep coding!
