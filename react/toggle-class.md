# toggling a class

```
import React, { useState } from "react";import "./styles.css";

export default function App() {
  const [isActive, setActive] = useState("false");
  const handleToggle = () => {
    setActive(!isActive);  };
  return (
    <div className={isActive ? "app" : null}>      <h1>Hello react</h1>
      <button onClick={handleToggle}>Toggle class</button>    </div>
  );
}
```

# Toggle between two classnames

```
import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const [isActive, setActive] = useState("false");

  const handleToggle = () => {
    setActive(!isActive);
  };
  return (
    <div className={isActive ? "app" : "container"}>      <h1>Hello react</h1>
      <button onClick={handleToggle}>Toggle class</button>
    </div>
  );
}
```

# Adding a classname to the existing class name

```
import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const [isActive, setActive] = useState("false");

  const handleToggle = () => {
    setActive(!isActive);
  };
  return (
      //here app is the class that'll stay the same either way
    <div className={`app ${isActive ? "danger" : ""}`}>      <h1>Hello react</h1>
      <button onClick={handleToggle}>Toggle class</button>
    </div>
  );
}
```
