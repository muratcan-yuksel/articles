## react props

### parent component

```const App = () => {


  return (
    <div>

      <Header title="hello" />

    </div>
  );
};
```

### child component

const Header = (props) => {

```return (
    <header>
      <h1 >{props.title} </h1>
    </header>
  );
};
```

## inline styling

` <h1 style={{ color: "blue" }}>Task Tracker </h1>`

## props destructuring

instead of giving props as a parameter, directly call the props given like so =>

```const Header = ({ title }) => {
  return (
    <header>
      <h1 >Task Tracker {title} </h1>
    </header>
  );
};
```

## can give ternary operators inside JSX

````const App = () => {
  const x = true;


  return (
    <div>
      {/* you can do ternary operators directly in JSX */}
      {/* <span>Hello {x ? "yes" : "no"}</span> */}

    </div>
  );
};```
````
