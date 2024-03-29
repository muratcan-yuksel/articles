tuto => https://www.youtube.com/watch?v=4mOkFXyxfsU&t=143s

## nextjs ecommerce with sanity

!! ### add how to add sanity here

--

## Starting the dev server

In your root, if you're using next js, you got and enter npm run dev, and then you cd into the folder that contains sanity (after you init iy) and run sanity start.

## package.json dependencies

Here are the dependencies the tuto uses, you can copy paste them in your package.json and run ` npm i --legacy-peer-deps` if you want to use the old packages, or more conveniently, you can search for the names of the packages in the npm registry and install them one by one.

```json
{
  "name": "ecommerce",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@babel/core": "^7.17.9",
    "@sanity/client": "^3.2.0",
    "@sanity/image-url": "^1.0.1",
    "@stripe/stripe-js": "^1.25.0",
    "canvas-confetti": "^1.5.1",
    "next": "12.1.0",
    "next-sanity-image": "^3.2.1",
    "react": "17.0.2",
    "react-dom": "17.0.2",
    "react-hot-toast": "^2.2.0",
    "react-icons": "^4.3.1",
    "stripe": "^8.209.0"
  },
  "devDependencies": {
    "@babel/preset-react": "^7.16.7",
    "eslint": "8.13.0",
    "eslint-config-next": "12.1.4"
  }
}
```

## schemas

After creating an empty sanity project, I go to schemas and create a `product.js` file with the following code in it =>

```javascript
export default {
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    {
      name: "image",
      title: "Image",
      type: "array",
      of: [{ type: "image" }],
      options: {
        hotspot: true,
      },
    },
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 90,
      },
    },
    { name: "price", title: "Price", type: "number" },
    { name: "details", title: "Details", type: "string" },
  ],
};
```

## adding schemas

After defining my schemas, I'll go to `schema.js` file and import them, also will ad them in the array of schemas.

```javascript
import createSchema from "part:@sanity/base/schema-creator";

import schemaTypes from "all:part:@sanity/base/schema-type";

import product from "./product";
import banner from "./banner";

export default createSchema({
  name: "default",

  types: schemaTypes.concat([product, banner]),
});
```

After doing that, if I open sanity studio on localhost 3333, I'll see the schemas I've added just now.

## some maybe unnecessary config

He does the following, though I doN't know if I need to do it, because I'm not getting the error he's getting. He creates a `.babelrc` file in root and populates it with =>

```json
{
  //preset-react bcs I did get an error when omitted
  "presets": ["next/babel", "@babel/preset-react"]
}
```

Then he goes to `.eslintrc.json` file in root (not in sanity folder!) and adds the following =>

```json
{
  "extends": [
    "next/babel",
    "next/core-web-vitals",
    "@babel/preset-env",
    "@babel/preset-react"
  ]
}
```

# Important note

For all of these to work, you need to import react in each component.

## Interesting export method

Now, we have our schemas, and our app is working with all the babelrc definitions and all, react preset etc, he creates a components folder in the root, and adds the components individually. BUT, while all the other components are in jsx extension, he creates an `index.js` file and populates it as such =>

```javascript
export { default as Footer } from "./Footer";
export { default as Layout } from "./Layout";
export { default as Navbar } from "./Navbar";
export { default as Product } from "./Product";
export { default as HeroBanner } from "./HeroBanner";
export { default as FooterBanner } from "./FooterBanner";
export { default as Cart } from "./Cart";
```

Now, we can import all of those components using this index.js file as a base.

Then, he goes back to the pages/index.js (this is the main index.js file) and populates it as such =>

```javascript
import React from "react";
import { Product, FooterBanner, HeroBanner } from "../components";

const Home = () => (
  <div>
    <HeroBanner />
    <div className="products-heading">
      <h2>Best Seller Products</h2>
      <p>speaker There are many variations passages</p>
    </div>

    <div className="products-container">
      {["Product 1, two, three"].map((product) => product)}
    </div>
    <FooterBanner />
  </div>
);

export default Home;
```

HOW COOL IS THAT?

## creating sanity client

Then, we need to create a sanity client so that we can connect to sanity backend.

First, we create a `lib` folder in root. And inside of it, a `client.js` file. In this file, we'll create a sanity client and export it.

We need to get some infor from our sanity project, so we go to sanity folder and run `sanity manage`.

In the dashboard, first we copy the project ID, then we click the `Datasets` button and see we have `production`, thus enter it. We can enter our apiVersion whatever we wish.

T get the token, we go to `API` and `tokens` and create a new token.We name it development, and give it `editor` i.e. read and write access.

Instead of pasting the token, we use .env files.

Then, we need to use image builder and so on.

This is what I have in client.js so far =>

```javascript
import SanityClient from "@sanity/client";
import ImageUrlBuilder from "next-sanity-image";
import createImageUrlBuilder from "@sanity/image-url";

export const client = SanityClient({
  projectId: "xay4pkrb",
  dataset: "production",
  useCdn: true,
  apiVersion: "2022-03-10",
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

const builder = createImageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
```

#### ON BUGS

LISTEN, in the tutorial it's different. He imports them like nemd imports, e.g. `import {SanityClient} from "@sanity/client"; ` => This doesn't work anymore. And he uses `ImageUrlBuilder` instead of `createImageUrlBuilder`. My version is the correct one.

NOW we go back to the main index.js and import the client we've created as such => `import { client } from "../lib/client"; `

### NB!

Now, if were using React, we'd use useEffect hook to get and display the data. In NextJS, we need to use `getServerSideProps` function. We use this function whenever we're fetching data from an API or a CMS.

So, still in our index.js, we create the following async function =>

```javascript
export const getServerSideProps = async () => {
  //groq query
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
};
```

We add the code above just before we export the Home component. I'll paste the whole component in a minute.

IF we first go to the sanity studio and create a banner, now with the below code, we'll get the banner object logged on the console. This is index.js so far =>

```javascript
import React from "react";
import { Product, FooterBanner, HeroBanner } from "../components";
import { client } from "../lib/client";

const Home = ({ product, bannerData }) => (
  <div>
    <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
    {console.log(bannerData)}
    <div className="products-heading">
      <h2>Best Seller Products</h2>
      <p>speaker There are many variations passages</p>
    </div>

    <div className="products-container">
      {["Product 1, two, three"].map((product) => product)}
    </div>
    <FooterBanner />
  </div>
);

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
};

export default Home;
```

Now since I've passed the data as props, I can go back to components/HeroBanner.js and use the data as such =>

```javascript
import React from "react";
import Link from "next/link";

import { urlFor } from "../lib/client";

const HeroBanner = ({ heroBanner }) => {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{heroBanner.smallText}</p>
        <h3>{heroBanner.midText}</h3>
        <h1>{heroBanner.largeText1}</h1>
        <img
          src={urlFor(heroBanner.image)}
          alt="headphones"
          className="hero-banner-image"
        />

        <div>
          <Link href={`/product/${heroBanner.product}`}>
            <button type="button">{heroBanner.buttonText}</button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>{heroBanner.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
```

## Product.jsx

Now I'll do the same for Product.jsx

I change the relevant part in index.js as such =>

````javascript
    <div className="products-container">
      {products.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </div>
    ```
````

and go to Product.jsx file to populate it as such =>

```jsx
import React from "react";
import Link from "next/link";

import { urlFor } from "../lib/client";

const Product = ({ product: { image, name, slug, price } }) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <img
            src={urlFor(image && image[0])}
            width={250}
            height={250}
            className="product-image"
          />
          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
```

### NB ! hard reload

in order to see snaity changes, clearing cache and hard reload is necessary. It's done by `ctrl + shift + r`.

## Layout.jsx

Let's create the layout =>

```jsx
import React from "react";
import Head from "next/head";

import Navbar from "./Navbar";
import Footer from "./Footer";
// this children is coming from _app.js, the       <Component {...pageProps} />
//  part
const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>JS Mastery Store</title>
      </Head>
      <header>
        <Navbar />
      </header>
      {/* see, it's the one from _app.js */}
      <main className="main-container">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
```

## \_app.js

In order for this layout to work, we need to add it in our \_app.js file in pages folder.
We'll wrap the component into layout

```jsx
import React from "react";
import { Toaster } from "react-hot-toast";

import { Layout } from "../components";
import "../styles/globals.css";
import { StateContext } from "../context/StateContext";

function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  );
}

export default MyApp;
```

## Product details logic

We first go to pages folder and create a `product` folder. Inside of that folder, we create `[slug].js` file.It is in brackets because it's dynamic.

```jsx
import React from "react";

const ProductDetails = () => {
  return <div>ProductDetails</div>;
};

export default ProductDetails;
```

Now, if we click on a specific product, we'll have this page shown. WOW.

### getStaticPaths and getStaticProps

Now, in order to complete this task, we'll need these two functions. They are used to generate static pages at build time. They are used to fetch data for a specific page.

```jsx
export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  console.log(product);

  return {
    props: { products, product },
  };
};
```

This is the final version of the component which I've copied from his github.

```jsx
import React, { useState } from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";

import { client, urlFor } from "../../lib/client";
import { Product } from "../../components";
// import { useStateContext } from "../../context/StateContext";

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;
  const [index, setIndex] = useState(0);
  //   const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

  const handleBuyNow = () => {
    onAdd(product, qty);

    setShowCart(true);
  };

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              src={urlFor(image && image[index])}
              className="product-detail-image"
            />
          </div>
          {/* image carousel container */}
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item)}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              {/* <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span> */}
              {/* <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span> */}
            </p>
          </div>
          <div className="buttons">
            {/* <button
              type="button"
              className="add-to-cart"
              onClick={() => onAdd(product, qty)}
            >
              Add to Cart
            </button> */}
            <button type="button" className="buy-now" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  console.log(product);

  return {
    props: { products, product },
  };
};

export default ProductDetails;
```

Things to understand here are that these functions work the same as we've done in index.js file (the main one). We fetch the data, pass them as props in the ProductDetails component and use it there.

When yoU're building a similar thing, just try to copy as much as you can.

## Context

First, we create a context folder in the root and add a `StateContext.js` file inside of the context folder.

Then, to begin with, I populate it as such =>

```jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  //stands for quantity
  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
      }}
    >
      {children}
    </Context.Provider>
  );
};
```

Subsequently, I go back to pages/\_app.js and wrap the application with context as such =>

```jsx
import React from "react";
import { Toaster } from "react-hot-toast";
import { StateContext } from "../context/StateContext";

import { Layout } from "../components";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  );
}

export default MyApp;
```
