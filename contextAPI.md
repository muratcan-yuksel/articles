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

Next, I declare the provider in DataProvider. This function is the provider, which means that it will contain and provide the necessary data with other components. It can be seen that I pass "props" inside brackets and use {props.children} in the return statement. I also declare a useState hook, and give it as the provider's value. What do all of these mean?

In order for the provider to provide data with a certain component, that component must be introduced to the provider. There are two ways I know of how to do that: Either you list all the components you wish to share state in between <DataContext.Provider> like so :

```
<DataContext.Provider value={[data,setData]}>

<Display.js/>
<DataOne.js/>
<DataTwo.js>

</DataContext.Provider >
            

```

or you use {props.children} in the case that you need lots of components to share state. I'll show how to enable this <DataProvider> in the next section. But before that, I want to stress that the value given to <DataProvider> is the data that will be shared accross components. If I gave "Hello, world!" as value, like so `<DataContext.Provider value="Hello, world!">` all the components I specify would share this single string. In my case, I want the data to be dynamic, so I use a useState hook.

### Wrapping components to share state with each other

Check out this snippet of App.js:

```
import React from "react"
import Display from "./Display"
import DataOne from "./DataOne"
import DataTwo from "./DataTwo"
import {DataProvider} from "./DataProvider"

function App() {
  return (
    <div>
      <DataProvider>    
        <DataOne />
        <DataTwo />
        <Display />
      </DataProvider>

    </div>
  );
}

export default App;

```

Here I just import the components I wish to share state between, plus {DataProvider} from the provider component. See that the import is in curly brackets because there are more than one function to be imported in that component, and I only need the DataProvider function here.

Then, I list all the components I want to share state between inside the <DataProvider> and I'm good to go. Now DataOne.js, DataTwo.js and Display.js will share data.

Now let's create the other two components that'll send the data.

### Send data between components

Check this snippet from DataOne.j out:

```
import React, {useState, useContext} from 'react'
import { DataContext } from './DataProvider'

// using curly brackets bcs we have more than one export

export default function DataOne() {

    const [state,setState]= useState("Data coming from DataOne.js")

    const [data,setData]= useContext(DataContext)

    const addDataOne = () =>{
        setData([...data, state])
    }

    return (
        <div>
            <button onClick={addDataOne}>Click to add data from DataOne</button>
            
        </div>
    )
}

```

So, I import useState and useContext hooks from React. Attention!=> in DataProvider.js I imported the hook "createContext", here I import "useContext" because I already created my context, now I will use it. Then I declare the state and give it a string of "Data coming from DataOne.js". 

The important part here is I declare a useContext hook in a similar manner to useState hook, and pass it the DataContext from the provider component. Note that DataContext in DataProvider.js was this one: 

```
export const DataContext= createContext([]);

```
In the following I create a button that will add the state into the context array with Javascript spread operator. Now, whenever I click into that button, the string "Data coming from DataOne.js" will be added to my context and will be available to any of the components the provider has access to.

Now I do the same for DataTwo.js, except I change names accordingly:

```
import React, {useState, useContext} from 'react'
import { DataContext } from './DataProvider'

// using curly brackets bcs we have more than one export

export default function DataTwo() {

    const [state,setState]= useState("Data coming from DataTwo.js")

    const [data,setData]= useContext(DataContext)

    const addDataTwo = () =>{
        setData([...data, state])
    }

    return (
        <div>
            <button onClick={addDataTwo}>Click to add data from DataTwo</button>
            
        </div>
    )
}
```
### Using the data

In the Display.js, I write the following code:

```
import React, {useState, useContext} from 'react'
import { DataContext } from './DataProvider'

export default function Display() {
    const [data,setData] = useContext(DataContext)
  

//here map is using regular brackects (), not curly brackets.
    const mappedData= data.map((item=>(
        <li>{item}</li>
      
    )))
    console.log(mappedData)

 
    return (
        <div>
            <ul>
     {mappedData}

         
            </ul>
        </div>
    )
}
```
I import {DataContext} in curly brackets from the provider, and {useState, useContext} hooks from React like I did in DataOne.js and DataTwo.js, declare the context with the useContext hook, then simply map the array into a list so that whenever I click on one of the buttons, their respective components will send their state to the global state stored in DataProvider.js, and in turn the provider will provide the data with all the components I specified. Therefore, with each click, a string item will be added to the array to be displayed on the page. Like so:

ADD IMG HERE

### Conclusion

Context API is an easy and no hassle was for developers who wish to share data between components without using a third party library like Redux.

I hope I was able to help someone out.

Happy coding!

