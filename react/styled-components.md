## installation

`npm install --save styled-components`

## usage

- create a component, say, a button component with the name of `Button.styled.js`
- inside of it, import styled components
- DO NOT STRUCTURE IT AS A REACT COMPONENT. USE JS EXPORT SYNTAX

```import styled from 'styled-components


export const Button = styled.button`
// you see we use back-ticks
width:200px;
`
```

- go to where you'll use this button
- import it like `import {Button} from "./Components/Butotn.styled"

## accepting props

- I have this App.js component where I import a styled component button

```
import {Button} from "./Components/Button.styled";

function App(){
    return (
        <div className="App">
//you see, I'm giving props here. I'll use this props in styled components button
        <Button backgroundColor="red"> Click me </Button>
        <Button backgroundColor="blue"> Click me </Button>
         </div>
    )
}

```

=> Now, in my Button.styled.js component

```
import styled from "styled-components";

export const Button = styled.button`
    background-color: ${props => props.backgroundColor};
width:200px;
height:50px;
`
```

## adding animations, hover etc

```
import styled from "styled-components";

export const Button = styled.button`
    background-color: ${props => props.backgroundColor};
width:200px;
height:50px;
//like this =>
&:hover{
    background-color: yellow;
}
`
```

`
