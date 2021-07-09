## React global state management with Context API (no Redux)

In my last project, I had to share state between many components. Most of them didn't share a commom parent, so passing state with props and a callback function was not an option, also it would be inconvenient to do so. Therefore I used React's Context API to create a global state and share it between any component I wished. In this tutorial, I'll show how to accomplish that.

Before starting, I must give credit to Dev Ed for this enlightening tutorial. I gained and used lots of knowledge from this video. Developers who prefer watching videos may stop reading and click the following link https://www.youtube.com/watch?v=35lXWvCuM8o&t=1790s it is the same concept with slightly different examples.

Note that the example I'll give here is quite basic and React Context API is suggested to be used for more complex instances.

### Creating components to work with
To start with, I create 4 components apart from App.js. These components are:
-DataOne.js
-DataTwo.js
-Display.js
-DataProvider.js

So there are two components with some data in them, and a component that displays the data sent by those two components. A provider component exists to ensure that the state can be shared smoothly. 

Let's start with the provider component.

### Provider component

Check the following snippet out:

```
import React, {useState, createContext} from 'react'

//note that we don't use export default here
//create context here, use context in others

//this DataContext will be shared by all the components 
export const DataContext= createContext([]);

//this is our provider
export const DataProvider=(props)=>{

    const [data, setData]= useState([])

    return(
        <div>
<DataContext.Provider value={[data,setData]}>

{props.children}

</DataContext.Provider >
            
        </div>
    )

}

```
What's going on here? I import useState and createContext hooks from React, as you see they're inbuilt. As I gave in the comments, I don't use "export default" here since there are more than one functions to be exported.

I invoke the createContext hook in DataContext costant. Note that you can give whatever name you wish in lieu of DataContext. I specify that the context is an array for my future use. This is the context that I will be calling in other components with the useContext hook. We'll look at that in a minute.

Next, I declare the provider in DataProvider. This function is the provider, which means that it will contain and provide the necessary data with other components. 