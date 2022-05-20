```import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Tours from "./Tours";

const url = "https://course-api.com/react-tours-project";
function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);
  //conditional part starts here
  if (loading){
      return(
          <main>
              <div className="loading">
                <h1>loading...</h1>
              </div>
          </main>
      )
  }
  //if `loading` is false, it'll return the usual return statement in this example. So, the thing below

  return <h2>Tours Project Setup</h2>;
}

export default App;
```

---

# When you want to render just a part inside the return statement

- create state=>
  `const [state, setState]= useState(true);`
- define what'll be rendered conditionally

```
let message;
if( state){
  message= <div> show me </div>
}else{
  message= <div> I'm hidden </div>
}
```

- render it in anywhere in the DOM

```
const myComponent = () => {
  return (
<div>  some things are going on here

<div> {message}</div>

</div>


  )}
```
