# Global state management in React.js with redux-toolkit

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
