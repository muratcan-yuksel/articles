# Tours project

## conditionally displaying a component

To start with, we put a loading functionality. What we can do to make things smoother is to create a loagin component, like so for instance, a basci one =>

```react
import React from 'react';

const Loading = () => {
  return (
    <div className="loading">
      <h1>loading...</h1>
    </div>
  );
};

export default Loading;
```

and display it in another component conditionally like so =>

```react
import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Tours from "./Tours";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-tours-project";
function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);
  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }
  return <h2>Tours Project Setup</h2>;
}

export default App;
```

## making a fetch request to an url on the above code

```react
  const fetchTours = async () => {
    try {
      setLoading(true);
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setLoading(false);
      setTours(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
```

Now, with the `try/catch` syntax, we set the `setLoading` state to false after we get the data, and set the `setTours` state to the data we get from the API.

To invoke the call, we use the `useEffect` hook and call it only once (he says) =>

```react
      useEffect(() => {
    fetchTours();
}, []);
```

## passing props

On our real return statement, we pass the `tours` props with the `tours` state variable. Now, the first one is the `props` and the second one is the `state` variable. =>

```react
  return (
    <main>
      <Tours tours={tours} />
    </main>
  );
```

Then we go to the `Tours` component and destructure the `tours` props =>

```react
const Tours = ({tours}) => {
  return <h2>tours component</h2>;
};
```

## mapping arrays

```react
const Tours = ({ tours }) => {
  return (
    <section>
      <div>
        {tours.map((tour) => {
          return <Tour key={tour.id } {...tour}></Tour>;
        })}
      </div>
    </section>
  );
};
```

As you can see, we write our map starting with curly braces in JSX. the spread operatore her => `{...tour}` is there for us to get all the properties in the `tour` object that is a single object in the `tours` array that's been passed as a prop.

## show more/show less functionality on text

First, check this component out =>

```react
import React, { useState } from "react";

const Tour = ({ id, image, info, name, price, removeTour }) => {
  const [readMore, setReadMore] = useState(false);
  return (
    <article className="single-tour">
      <img src={image} alt={name} />
      <footer>
        <div className="tour-info">
          <h4>{name}</h4>
          <h4 className="tour-price">${price}</h4>
        </div>
        <p>
          {readMore ? info : `${info.substring(0, 200)}...`}
          <button onClick={() => setReadMore(!readMore)}>
            {readMore ? "show less" : "  read more"}
          </button>
        </p>
        <button className="delete-btn" onClick={() => removeTour(id)}>
          not interested
        </button>
      </footer>
    </article>
  );
};

export default Tour;
```

We want to display the `p` tag as such that it'll only show some amount of text so that it won't take too much space on the page, and will display its full content once the user clicks to the `show more` part (if the user decides to do so) and hide back once s/he clicks to `show less`.

Let's start with this line =>

```
{readMore ? info : `${info.substring(0, 200)}...`}
```

Now, the `info` variable is a props coming from the parent that contains the `info` part of the api, which contains the text. So that's that. We could've just wrote a long text ourselves and put it there too.

Anyways, it basically says that "if readMore state variable is true, show the whole text, if not, show only the first 200 characters of the text and add `...` at the end". And since we've set the state variable to `false` in the following line => ` const [readMore, setReadMore] = useState(false);` it'll show only the substring at first.

Then, we have the `button` tag that has an `onClick` event handler that changes the `readMore` state variable to the opposite of what it is. So, if it's true, it'll be false, and if it's false, it'll be true.

Inside of the `button` , we have the text we wish to display on the button. It's a ternary operator that says "if readMore is true, show `show less`, if not, show `read more`".
