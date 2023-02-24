# Graphql

Start by installing `npm i graphql express-graphql`

Then we create an express server, and import the following

```js
//write an express server
const express = require("express");
const app = express();
const port = 3000;
const userData = require("./MOCK_DATA.json");
//graphql stuff
const graphql = require("graphql");
const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt } = graphql;
```

In graphQl, there are `queries` and `mutations`. Queries are used to get data, and mutations are used to change data. It's like queries are `GET` requests, and mutations are `POST`, `PATCH`, `DELETE` requests.

In order to startdefining our query and mutation, we need to define our `userType`. This is the type of data we are going to be querying and mutating.

```js
//types are like models in MVC
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLInt },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    email: { type: GraphQLString },
  }),
});
```

You should notice that the `fields` property is a function.

Now, this is the code so far

```js
//write an express server
const express = require("express");
const app = express();
const port = 3000;
const userData = require("./MOCK_DATA.json");
const graphql = require("graphql");
const { graphqlHTTP } = require("express-graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = graphql;

// const UserType = new GraphQLObjectType({
//   name: "User",
//   fields: {
//     id: { type: GraphQLString },
//     first_name: { type: GraphQLString },
//     last_name: { type: GraphQLString },
//     email: { type: GraphQLString },
//   },
// });
//types are like models in MVC
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLInt },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    email: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    //this is like, each one of them are rest api endpoints
    getAllUsers: {
      //GraphQLList because we're returning an array of users
      type: new graphql.GraphQLList(UserType),
      args: { id: { type: GraphQLInt } },
      resolve(parentValue, args) {
        //here is the part where we actually get the data from the database
        //imagine this part as the equivalent of this in a rest api
        // const getOrders = asyncWrapper(async (req, res) => {
        //     const orders = await Order.find();
        //     res.status(200).json({ success: true, data: orders });
        //   });
        return userData;
      },
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLInt } },
      resolve(parentValue, args) {
        return userData.find((user) => user.id === args.id);
      },
    },
  },
});
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserType,
      //if it was a real database we wouldn't need the id as it's created automatically by the db itself
      //but since we're using mock data, we'll need to create an id
      args: {
        // id: { type: GraphQLInt },
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        email: { type: GraphQLString },
      },
      resolve(parentValue, args) {
        //here we would create a new user in the database
        //using the databae's own methods
        const user = {
          //just because our  mock data is structured like that
          //I give the data as the lenght of the data plus 1
          id: userData.length + 1,
          first_name: args.first_name,
          last_name: args.last_name,
          email: args.email,
        };
        userData.push(user);
        return user;
      },
      deleteUser: {
        type: UserType,
        args: {
          id: { type: GraphQLInt },
        },
        resolve(parentValue, args) {
          const user = userData.find((user) => user.id === args.id);
          userData.splice(userData.indexOf(user), 1);
          return user;
        },
      },
    },
  },
});

const schema = new graphql.GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
```

## graphiql

Graphql comes with its in-built postman-like gui. When I go to localhost:3000graphql, I see the gui.

Now, if I want to get all users, as I've defined in my query, I have to write

```js
query {
  getAllUsers{first_name, email, last_name},

}
```

And if I want to create a user as I've defined in my `mutations`

```js
mutation{
  createUser(first_name:"Murat", last_name:"YY", email:"mmm@gmail.com"){
    first_name, last_name, email
  }
}
```

Or, again with `query`, if I wanted to get a user by id

```js
query {
user(id:5){
  first_name
}

}
```

# Apollo client + React

Install with `npm install @apollo/client graphql`

Then import `import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';` in your index.js
