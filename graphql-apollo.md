# Graphql Apollo + React

## connecting graphql to react

index.js

```js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
```

## querying

When I want to make a query on a component, I first need to import some packages from apollo client.

`import { gql, useQuery } from "@apollo/client";`

gql is used the create the type of query I want to make. useQuery is used to make the query.

For instance, if I want to get all the characters from the Rick and Morty API, and their id, name, image and created times, I would write the following:

```js
import React from "react";
//import useQuery from '@apollo/client'
import { gql, useQuery } from "@apollo/client";

const GET_CHARACTERS = gql`
  {
    characters {
      results {
        id
        name
        image
        created
      }
    }
  }
`;

const CharactersList = () => {
  const { loading, error, data } = useQuery(GET_CHARACTERS);

  return <div>CharactersList</div>;
};

export default CharactersList;
```

As you can see, I write the query schema outside of the component, and then I call it inside the component using the useQuery hook.
