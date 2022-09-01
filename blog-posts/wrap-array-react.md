# Wrapping arrays in ReactJS

I want to display some sort of text, a reviews kind of a thing maybe, or just pictures I can see the `next` and the `previous` image by clicking the respective buttons. To do so, I'll need to know how to wrap around arrays. In this post, I'll be showing that.

You can find the source code here => https://github.com/muratcan-yuksel/react-wrap-array

To start with, I create a `data.js` file and put the following inside =>

```json
const data = [
  {
    id: 1,
    text: "1st Text",
  },
  {
    id: 2,
    text: "2nd Text",
  },
  {
    id: 3,
    text: "3rd Text",
  },
  {
    id: 4,
    text: "4th Text",
  },
  {
    id: 5,
    text: "5th Text",
  },
];
export default data;
```

In my application, I don't want to map through this data array of objects. No, I want to display only one of them each time. Check my `App.js` file=>

```react
import React, { useState } from "react";
import data from "./data";
import "./style.css";

const App = () => {
  const [index, setIndex] = useState(0);
  const { id, text } = data[index];

  const nextItem = () => {
    setIndex((index) => {
      let newIndex = index + 1;
      return wrapItems(newIndex);
    });
  };

  const previousItem = () => {
    setIndex((index) => {
      let newIndex = index - 1;
      return wrapItems(newIndex);
    });
  };

  const wrapItems = (itemIndex) => {
    if (itemIndex > data.length - 1) {
      return 0;
    } else if (itemIndex < 0) {
      return data.length - 1;
    } else {
      return itemIndex;
    }
  };

  return (
    <div id={id} className="container">
      <div className="title">{text} </div>
      <div className="buttons">
        <button onClick={previousItem} className="btn">
          Previous
        </button>
        <button onClick={nextItem} className="btn">
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
```

I start by importing the `useState` hook from React, the `data.js` file I've just created, and a `style.css` file you shouldn't be worried about. If you want to check it out, I've provided the source code above anyway.

I set my state to `0`, this will be the index of the element I want to display on the page from the `data` array. With ` const { id, text } = data[index];` I destructure the data coming so that whenever I want to use the `text` or `id` variables, they'll point to the item in the data array at the index of state. That means that if the state were to change, the `id` and the `text` would point to a different item in the data array from `data.js`.

Now, in my return statement I display the `₺ext`, and also have two buttons: One of them pointing to the previous item while the other one pointing to the next item. I also have some functions attached to them.

The function `nextItem` sets the state to `plus` one of whatever it is. Now, since I can't modify the state directly, I'll have to work around and write a function to manipulate `index`. The function `previousItem` is the same except that it sets the state to `minus` one of whatever it is at that moment. But you'll also notice that the returned `newIndex` is wrapped inside the `wrapItems'`function.

The reason `wrapItems` function exist is that if it weren't, whenever we reach to the last item in the data array, which is the 5th item because I only put 5 items in the array, which means the 4th index as indexes start at 0, the `nextItem` would continue to update the state to plus one, which would make the index 5, and our application would crash. It would crash because we don't have any item at the index 5 of our data array. Hell, we don't have the index 5 at all. The same would happen with the `previousItem` function obviously, the app would crash at index -1. `wrapItems` function fixes that problem.

Now, `wrapItems` function takes a number and does the following=>

- If the given number, which is the index coming from the state,
