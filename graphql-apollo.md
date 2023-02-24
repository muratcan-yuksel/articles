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

## creating query hooks

Say that I will use the same query in multiple components. I can create a custom hook to make the query and return the data.

To do that, I create a `hooks/useCharacters.jsx` file and write the following:

```js
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
    episodes {
      results {
        name
        characters {
          name
        }
      }
    }
  }
`;

export const useCharacters = () => {
  const { loading, error, data } = useQuery(GET_CHARACTERS);

  return {
    loading,
    error,
    data,
  };
};
```

ATTENTION! I'm not importing react, also I'm not exporting it as DEFAULT. I just export it as it is.

Then, in the component I want to use the hook, I import it and call it. I go back the my `cCharactersList.jsx` file

```js
import React from "react";
//import useQuery from '@apollo/client'
import { useCharacters } from "../hooks/useCharacters";

const CharactersList = () => {
  //my custom hook here
  const { loading, error, data } = useCharacters();

  console.log(loading, error, data);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error :(</p>;

  return <div>CharactersList</div>;
};

export default CharactersList;
```

This will return the same result.

## querying with variables

I create a new file `hooks/useCharacter.jsx` and write the following:

```js
import { gql, useQuery } from "@apollo/client";

//ID! is a type
const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      image
      episode {
        name
        episode
      }
    }
  }
`;

export const useCharacter = (id) => {
  const { data, loading, error } = useQuery(GET_CHARACTER, {
    variables: { id },
  });

  return {
    data,
    loading,
    error,
  };
};
```

Then I create a new page called `Character.jsx` and write the following:

```js
import React from "react";
import { useCharacter } from "../hooks/useCharacter";

const Character = () => {
  const { data, loading, error } = useCharacter("1");
  console.log(data, loading, error);
  {
    loading && <p>Loading...</p>;
  }
  {
    error && <p>Error</p>;
  }
  return <div>{data && <p>{data.character.name}</p>}</div>;
};

export default Character;
```

## lazy queries

We use these when we want to make a query only when a certain condition is met. For instance, when a user clicks on a button.

I won't write hooks for this.

I create a new file `pages/Search.jsx` and write the following:

```js
import React, { useState } from "react";
import { useQuery, gql, useLazyQuery } from "@apollo/client";

const GET_CHRARACTER_LOCATIONS = gql`
  query GetCharacterLocations($name: String!) {
    characters(filter: { name: $name }) {
      results {
        name
        location {
          name
        }
      }
    }
  }
`;

const Search = () => {
  const [name, setName] = useState("");
  //you see it is different from the useQuery hook
  const [getLocations, { loading, error, data, called }] = useLazyQuery(
    GET_CHRARACTER_LOCATIONS,
    {
      variables: { name },
    }
  );

  console.log(loading, error, data, called);

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={(e) => getLocations()}>Search</button>
    </div>
  );
};

export default Search;
```
