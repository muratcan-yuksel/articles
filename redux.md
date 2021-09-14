# Global state management in React.js with redux-toolkit (a practical guide)

In this article, I'll try to help others starting with global state management in React.js with Redux Toolkit. In redux.js.org it says "Redux Toolkit is our official, opinionated, batteries-included toolset for efficient Redux development. It is intended to be the standard way to write Redux logic, and we strongly recommend that you use it." so we'll be good using it.

Note: As far as I know, Redux Toolkit doesn't work with applications create with vite, I use create-react-app and I expect you have the same opportunities create-react-app provides.

We will build a very simple react application that'll store the data in our "store", and display it at whichever component we wish to. The application will comprise of three components. The folder structure will be as follows:

```
-src
--components (folder)
---FirstComp.js
---SecondComp.js
---ThirdComp.js
--features(folder)
---myStore.js
--App.js
--index.js
```

!!!!!!!!!INSERT IMAGE

## Buidling the store

I will try my best to refrain from the terminology, as I don't think I understand it well enough. The important thing is, whatever I'm going to show now works like a charm, and it is easy.

We'll start by installing the dependencies in our project folder as it's shown in [the official redux toolkit guide](https://redux-toolkit.js.org/tutorials/quick-start),

`npm install @reduxjs/toolkit react-redux`

If the packages are installed. It is time to build the store. For that, we'll need to modify our index.js and myStore.js in our features folder. Note that these names are totally random and up to you.

### myStore.js

In myStore.js in the features folder, let's write the following code:

```
import { createSlice } from "@reduxjs/toolkit";

export const initialStateValue = "";

export const theStore = createSlice({
  name: "theStore",
  initialState: { value: initialStateValue },
  reducers: {
    getData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { getData } = theStore.actions;

export default theStore.reducer;
```

What's happening here?

- We import createSlice from Redux Toolkit
- Create an initialStateValue variable (which we don't necessarily have to, as you can see, I use it to make the code cleaner)
- Create and export a slice named theStore (name can be anything you want)

Inside of our slice,

- We give it a name
- initiate a state and give it a value, which is pretty much like the state in useState hook
- Define reducers. Here, "getData" can be named anything you want. It takes two parameter: state and action. State is our initial state, and action (that takes a payload) is basically the data we'll get from our components.

- And we export things as shown.

As I mentioned, I don't think we need to know what every single thing is doing here to get started with Redux Toolkit. I don't even remember what each thing was doing, and cannot care less at this point.

Now, let's go to our index.js and make sure our app can use this store.

### index.js

In index.js, let's paste this code:

```
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
//add the following to use Redux
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import dataReducer from "./features/myStore";

const store = configureStore({
  reducer: {
    theStore: dataReducer,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

As you can see, the difference from a usual index.js file is that we imported the following:

```
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import dataReducer from "./features/myStore";
```

Configured our store with the dataReducer we've imported from myStore.js,

```
const store = configureStore({
  reducer: {
    theStore: dataReducer,
  },
});
```

(Note that this "dataReducer" could have been named anything. Its naming totally up to you.)

And lastly, wrapped our app with the store provider,

```
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
```

With these changes, our store should be ready, and we can start setting or getting data from it. Let's start working on our components then.

### Components: FirstComp.js

In our FirstComp.js, we paste the following lines:

```
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getData } from "../features/myStore";

const FirstComp = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.theStore.value);

  const sendData = () => {
    dispatch(getData("Hello from the first component"));
    // console.log("Hello from the first component");
    console.log("hey" + data);
  };

  // dispatch(getData(json.data));

  return (
    <div>
      <button onClick={sendData}>Send data</button>
    </div>
  );
};

export default FirstComp;
```

What's happening here is, as you can see, we're importing useSelector and useDispatch from react-redux, and our getData function from myStore.js. Inside the function, we create a dispatch variable. This dispatch variable is responsible of sending desired data to the store. And we create a data variable, which, by using useSelector, grabs the state from our store.

In the terms of useState hook what we've done is quite similar to the following: `const [state, setState]= useState("")` => Here, state being the data variable, setState working similar to the dispatch variable, and the data in our myStore.js being the value in useState hook.
