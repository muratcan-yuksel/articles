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
