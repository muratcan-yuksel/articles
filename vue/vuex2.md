## state

is the state

## mutations

- are methods which change the data that's in the state
- one thing to note: we cn't trigger asynchronous code inside the mutations. So, if we're working with API's, we cannot use mutations
- when we talk about triggering mutations, we use `commit`ting.

## actions

- actions are also methods, but they can't change the data in the state. They can access the data in the state though.
- We can do async code in actions. So, if we wanted to do an API call and change the state, we'd make an async call to the API with actions, wait for the result, and then commit that result to the state using mutations.
- So, to make an async change to the state we first make the API (or async) call via actions, and use mutation commits to make the actual change.
- triggering actions are called `dispatch`ing

## modules
