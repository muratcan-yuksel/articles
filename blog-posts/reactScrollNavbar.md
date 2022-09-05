# Change navbar color on scroll in React

I have a simple application where I want to change the color of the navbar on mouse scroll. Like what Mailchimp is doing: When you scroll down, the navbar is following you but also changes its color from yellow to white => https://mailchimp.com/

To do that, I have `App.js`, `Navbar.js`, `app.css`, `navbar.css` files amongst many more, like some other component so that the application would have enough space to scroll down, but these are the ones I'll show the logic on.

In `Navbar.js`, I add the following snippet =>

```react
  const [color, setColor] = useState(true);

  const changeColor = () => {
    //scroll points go up as the page is scrolled down
    if (window.scrollY <= 0) {
      setColor(true);
      // console.log("true");
      // console.log(window.scrollY);
    } else {
      setColor(false);
      // console.log("false");
      // console.log(window.scrollY);
    }
  };
// every part of this function is necessary.
//It won't work if you emit the ", true" parameter
  window.addEventListener("scroll", changeColor, true);
```

and in my `navbar.css` I add the following classes =>

```
.navbarComp {
  background: #ffe01b ;
  transition: 0.3s;
}

.navbarScrolled {
  background-color: white ;
  color: white;
}
```

Then I go back to my `Navbar.js` component and add a ternary statement on these css classes like so =>

```react
      <div className={color ? "navbarComp" : "navbarScrolled"}></div>

```

I'm almost done. There is one more thing I should consider. In my application I had some layout problems I fixed by adding ` overflow-x: hidden;` css class to my whole App component. That was a mistake. When you give ` overflow-x: hidden;` to the whole App component, then the `window.scrollY` always stays at `0`. To fix that issue, I found that if you'd add a wrapper div inside the App component and hide the overflow there everything works well. I'm talking about doing this in `App.js`=>

```react
const App = () => {
  return (
    <div className="App">
      <div className="wrapper">
         ...
      </div>
    </div>
  );
};
```

and in my `app.css`

```
.App {
    //or whatever you give I guess
  height: 100vh;
  width: 100vw;
}
.wrapper {
  overflow-x: hidden;
}
```

That's all folks!
