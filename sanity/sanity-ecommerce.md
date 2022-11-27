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
