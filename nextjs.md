## importing css files in nextjs

In nextjs you can't import a global css file into components. They must be modules, like `Home.module.css` and so on.

## public

anything you put in the public folder will be accessible in the browser

## our main file

is the `index.js` in the `pages` folder

## routing

You don't need to install a 3rd party library with nextjs for routing. You can just create a new file, say, `about.js` in the `pages` folder and it will be accessible at `localhost:3000/about`. So it automatically creates a route for each file in the `pages` folder.

## head

You import the head and you can pass some values into it to make them available for search engine crawlers, like so =>

```jsx
import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Webdev newz</title>
        <meta name="keywords" content="web development, programming" />
      </Head>
      <h1>welcome to next</h1>
    </div>
  );
}
```

## creating a layout

Say that I want to create a layout, a series of elements that are shown in each and every page of my application. To do that, first I go and create a new folder called `components` in the root folder, and create a `Layout.js` inside of that folder.

```jsx
import React from "react";
import styles from "../styles/Layout.module.css";

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>hello</h1>
        {children}
      </main>
    </div>
  );
};

export default Layout;
```

That Layout.module.css file was the Home.module.css file but I've changed its name. And this is how we use the styles from those modules.

Will explain this `children` prop in the next part.

Then, I go to the `_app.js` (underscore, yes) file in the `pages` folder, which is like this by default =>

```jsx
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
```

Now I change the contents as such s othat these whatever inside of this MyApp function will be wrapped to the layout component I've just created =>

```jsx
import "../styles/globals.css";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
```

Now, each and every page will use the styles from layout, and show that "hello" I've put there. Also, now you can see why we added the `children` prop to the layout component. It's because it will be used to wrap the contents of each page.

## creating routing links, i.e. navbar

Very easy. I create a new file in the `components` folder called `Nav.js` and popoulate it. Now, the only thing I need to do is to `import Link from "next/link"; ` and use it as such:

```jsx
import React from "react";
import Link from "next/link";
const Nav = () => {
  return (
    <div>
      <Link href="/"> Home </Link>
      <Link href="/about"> About </Link>
    </div>
  );
};

export default Nav;
```

Now, I go back to my `Layout.js` file and import the `Nav` component and use it as such:

```jsx
import React from "react";
import styles from "../styles/Layout.module.css";
import Nav from "./Nav";

const Layout = ({ children }) => {
  return (
    <>
      <Nav />
      <div className={styles.container}>
        <main className={styles.main}>
          <h1>hello</h1>
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
```

## styling in jsx

WOW, I didn't know that. Check this out!

```jsx
import Head from "next/head";

export default function Home() {
  const x = 5;
  return (
    <div>
      <Head>
        <title>Webdev newz</title>
        <meta name="keywords" content="web development, programming" />
      </Head>
      <h1 className="title">welcome to next</h1>
      {/*  this is how you style in jsx : curly braces, backticks*/}
      <style jsx>
        {`
          h1 {
            color: ${x > 3 ? "red" : "blue"};
          }
        `}
      </style>
    </div>
  );
}
```
