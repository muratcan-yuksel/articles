## Code list items with "show more/less" functionality in React

I want to display a list of elements on my page, and I want each element to have a "show more/less" functionality to expand and shorten the text at will.

For this, I will use React. I will fetch some fake data from the following dummy API => https://jsonplaceholder.typicode.com/

I will use `axios` to do so.

I will have three pages in my structure: App.js, Texts.js, and Text.js.

You can find the repo here => https://github.com/muratcan-yuksel/reactShowHideBlogPost

I will fetch the data in App.js, then send it with props until it reaches the Text.js component.

To start wil, this is my App.js file =>

## App component

```react
import { React, useState, useEffect } from "react";
import axios from "axios";
import Texts from "./Texts";

const App = () => {
  const url = "https://jsonplaceholder.typicode.com/posts";
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const req = await axios.get(url);
      const res = await req.data;
      setData(res.slice(0, 5));
    } catch (error) {
      console.log(error);
    }
  };

  //useEffect runs once when the component is mounted
  useEffect(() => {
    getData();
  }, []);

  return (
    <main>
      <Texts props={data} />
      {/* <div>
        {data.map((e) => {
          return <div key={e.id}>{e.title}</div>;
        })}
      </div> */}
    </main>
  );
};

export default App;
```

I start with importing the hooks I'll use, axios, and the child component `Texts`.

I define the API endpoint I'll make a call to. You can check it following this link => https://jsonplaceholder.typicode.com/posts it returns a user Id, id, title, and body. I'll need the `body` for the text.

The useState hook is used to save the data in the state, and useEffect hook calls the getData function once at component mount.

`getData` is an asynchronous function that calls the API using axios library, with this line of code ` setData(res.slice(0, 5));` I limit the amount of array elements returned from the API to 5 for easy of use and set the state to it. It returns a lot of items, I don't need all of them. I always use the try/catch syntax with async/await when making API calls. That's the best one I know, and I find the syntax more readable.

In my return statement, I send the data I've saved to the state to the Texts component with the props name `props`.

Let's check the Texts component.

## Texts component

```react
import { React, useState } from "react";
import "./styles/texts.css";
import Text from "./Text";

const Texts = ({ props }) => {
  return (
    <div className="textComponent">
      <div>
        {props.map((mappedProps) => {
          return <Text key={mappedProps.id} {...mappedProps} />;
        })}
      </div>
    </div>
  );
};

export default Texts;
```

After importing the relevant dependencies, I start with destructuring the props by putting the `props` keyword into curly praces. Disregard the style cues, you can check the css file in the github repo.

I map the data I've got from the parent, and create a `Text` component with each mapped element. Skipping this step and trying to map and display the data in this component results with the show/hide logic to apply all the elements at the same time, i.e. when one show/hide button is clicked, all the others will be shown/hidden at the same time. We don't want that. We want each and every element to be shown/hidden separately.

I send the props in the following way `{...mappedProps}` to get individual key titles in the child component so that I can just import what's returned from the API like so =>

```react
const Text = ({ body, id }) => {
    ...)}
```

## Text component

```react
import { React, useState } from "react";
import "./styles/texts.css";

const Text = ({ body, id }) => {
  const [readMore, setReadMore] = useState(false);

  return (
    <div>
      <div className="text" key={id}>
        {readMore ? body : `${body.substring(0, 80)}...`}
        <button className="btn" onClick={() => setReadMore(!readMore)}>
          {readMore ? "show less" : "  read more"}
        </button>
      </div>
    </div>
  );
};

export default Text;
```

I start by importing the props with their key names given in the API like so => `const Text = ({ body, id }) => {`, this way leaves less room for confusion in my opinion. I know it's `body` I'm looking for. I give id to each individual div, and then with the line

```react
   {readMore ? body : `${body.substring(0, 80)}...`}
```

I tell the browser to first check if `readMore` state variable is true, if it is, display the whole test coming from `body`; if it's false, show only the first 80 characters of the text. Since `readMore` state variable is set to false at the beginning, when I open the page, I'll see the shortened text. I have three dots following the shortened text. Then I put a button which sets the `readMore` state variable to its opposite. Inside the button there's a text that shows "show less" if the `readMore` state variable is `true`, and "read more" if it's `false`. With this, I'll be able to click on the button to expand and shrink the text.

That's it.
