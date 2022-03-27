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

## can give functions as props too

### parent

````const App = () => {
  const onClick = () => {
    console.log("clicked");
  };
  return (
    <div>
      <Button color="green" text="Hello" onClick={onClick} />
    </div>
  );
};```
````

### child

````const Button = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="btn"
    >
      {" "}
      {text}{" "}
    </button>
  );
};```
````

## mapping data

say we have an array of objects called tasks (minuscule)

```const Tasks = () => {
  return <div>
  {tasks.map(task=> ( <h3 key={task.id} > {task.text}  </h3>)  )}
      </div>;
};
```

## filter method example

this method shows all the tasks that does not match with the id
i.e. deletes the task with the id from the UI

````const deleteTask=id=>{
setState(state.filter(task=>task.id !== id))
}```
````
