# My own trial with Sanity

I'll be rebuilding my portfolio with Next JS without TS, so first off, I'll need to install some dependencies.

npm i next-sanity --save @sanity/client --save @sanity/image-url --save next-sanity-image framer-motion react-hook-form react-simple-typewriter @heroicons/react react-social-icons --save-dev tailwind-scrollbar

++++ tailwind css => https://tailwindcss.com/docs/guides/nextjs

This is my package.json =>

```json
{
  "name": "portfolio-nextjs",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@heroicons/react": "^2.0.13",
    "@sanity/client": "^3.4.1",
    "@sanity/image-url": "^1.0.1",
    "eslint": "8.28.0",
    "eslint-config-next": "13.0.5",
    "framer-motion": "^7.6.15",
    "next": "13.0.5",
    "next-sanity": "^3.1.2",
    "next-sanity-image": "^5.0.0",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "react-hook-form": "^7.39.7",
    "react-simple-typewriter": "^5.0.1",
    "react-social-icons": "^5.15.0",
    "tailwind-scrollbar": "^2.0.1"
  },
  "devDependencies": {
    "autoprefixer": "^10.4.13",
    "postcss": "^8.4.19",
    "tailwindcss": "^3.2.4"
  }
}
```

### Tailwind config

Since I'm using tailwind scrollbar, I need to add this to my tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("tailwind-scrollbar")],
};
```

## Sanity setup

I have a coupon to install (init) Sanity, I don't need to use it though.

```
npm install -g @sanity/cli
sanity init --coupon sonny2022
```

I name the folder `sanity` for ease of use.

### Schemas

In the sanity/schemas folder, I add my schemas. an example =>

```js
export default {
  name: "skill",
  title: "Skill",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      description: "Title of skill",
      type: "string",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
  ],
};
```

But that's not enough. I need to import my schemas in the `schema.js` file in the same folder. Here's an example =>

```js
// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

import pageInfo from "./pageInfo";
import experience from "./experience";
import skill from "./skill";
import project from "./project";
import social from "./social";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    pageInfo,
    experience,
    skill,
    project,
    social,
  ]),
});
```

Now, if I go to the sanity folder and hit `sanity start` I can see my studio. I can add my data there.

### Sanity client

In order to get the data from Sanity, I need to use its client. To do that, I'll create a `lib` folder with `client.js` in it in the root folder.

```js
import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: "8bxk914w",
  dataset: "production",
  apiVersion: "2022-12-05",
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
```

In order to access the project id and the API token, I go to the sanity folder and hit `sanity manage`. It'll open my project info. I copy the token there and add an .env file in the root. I suppose NextJS has dotenv by default because I don't remember installing it. I add the token there.

### Getting Sanity data

To get the data in NextJS, I need to use getServerSideProps hook. Here's an example =>

```js
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {
  About,
  BackgroundCircles,
  ContactMe,
  ExperienceCard,
  Header,
  Hero,
  Projects,
  Skill,
  Skills,
  WorkExperience,
} from "../components";
//sanity client from lib folder
import { client } from "../lib/client";

export default function Home({ experience }) {
  return (
    <div
      //  tailwind scrollbar definitions are here
      className="bg-[rgb(36,36,36)] text-white h-screen snap-y snap-mandatory overflow-y-scroll overflow-x-hidden z-0
    scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80"
    >
      <Head>
        <title>NextJS Portfolio</title>
      </Head>
      <Header />

      {/*Hero  */}
      <section id="hero" className="snap-center">
        <Hero />
      </section>
      {/*About */}
      <section id="about" className="snap-center">
        <About />
      </section>

      {console.log(experience)}
    </div>
  );
}

export const getServerSideProps = async () => {
  const query = '*[_type == "experience"]';
  const experience = await client.fetch(query);

  // const bannerQuery = '*[_type == "banner"]';
  // const bannerData = await client.fetch(bannerQuery);

  return {
    props: { experience },
  };
};
```

Now, I use the groq language to get the data I need. The type `experience` here is the name I gave to my experience schema. After returning the props, I pass the data in my component above as props. I console log it in this example, which means I can do whatever I wish to do with it.

An importing thing here is that I need to import the client from lib folder I've created like so => `import { client } from "../lib/client";`
