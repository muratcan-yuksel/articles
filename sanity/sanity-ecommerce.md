tuto => https://www.youtube.com/watch?v=4mOkFXyxfsU&t=143s

## nextjs ecommerce with sanity

!! ### add how to add sanity here

--

## Starting the dev server

In your root, if you're using next js, you got and enter npm run dev, and then you cd into the folder that contains sanity (after you init iy) and run sanity start.

## package.json dependencies

Here are the dependencies the tuto uses, you can copy paste them in your package.json and run ` pm i --legacy-peer-deps` if you want to use the old packages, or more conveniently, you can search for the names of the packages in the npm registry and install them one by one.

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
