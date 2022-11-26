# Sanity IO

I learnt it from Sonny Sangha, and he has a coupon code for it. So the installation will be a bit different from the normal one I guess.

```
npm install -g @sanity/cli
sanity init --coupon sonny2022
```

Then we follow the insturctions. In the present time, I did choose to start with a "blog" template. Also, for the location, I wrote "sanity" instead of the recommended file path. Now, I have a sanity folder in my root.

I go to the sanity folder in vs code and start working with the `posts.js`.

First off, I change its name into `pageInfo.js` and populate it with the followin schemas=>

```javascript
export default {
  name: "pageInfo",
  title: "PageInfo",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "role",
      title: "Role",
      type: "string",
    },
    {
      name: "heroImage",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "backgroundInformation",
      title: "BackgroundInformation",
      type: "string",
    },
    {
      name: "profilePic",
      title: "ProfilePic",
      type: "image",
      options: {
        hotspot: true,
      },
    },

    {
      name: "phoneNumber",
      title: "PhoneNumber",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "address",
      title: "Address",
      type: "string",
    },
    {
      name: "socials",
      title: "Socials",
      type: "array",
      of: [{ type: "reference", to: { type: "social" } }],
    },
  ],
};
```

### schema.js

Then I go to `schema.js` file, and change the `posts` import to `pageInfo` since I've changed its name. That means this `import post from './post' ` becomes this `import pageInfo from './pageInfo' `
I also replace all the instances of posts to pageInfo.

I clean the `schema.js` a bit so it looks like this now =>

```javascript
// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

import pageInfo from "./pageInfo";

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
  ]),
});
```

### experience.js

I create a new file called experience.js and populate it with the schemas below.

```javascript
export default {
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    {
      name: "jobTitle",
      title: "JobTitle",
      type: "string",
    },
    {
      name: "companyImage",
      title: "Company Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "company",
      title: "Company",
      type: "text",
    },
    {
      name: "dateStarted",
      title: "Date Started",
      type: "date",
    },
    {
      name: "dateEnded",
      title: "Date Ended",
      type: "date",
    },

    {
      name: "isCurrentlyWorkingHere",
      title: "isCurrentlyWorkingHere",
      type: "boolean",
    },
    {
      name: "technologies",
      title: "Technologies",
      type: "array",
      of: [{ type: "reference", to: { type: "skill" } }],
    },
    {
      name: "points",
      title: "Points",
      type: "array",
      of: [{ type: "string" }],
    },
  ],
};
```

### project.js

```javascript
export default {
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      description: "Title of the project",
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
    {
      name: "summary",
      title: "Summary",
      type: "text",
    },

    {
      name: "technologies",
      title: "Technologies",
      type: "array",
      of: [{ type: "reference", to: { type: "skill" } }],
    },
    {
      name: "linkToBuild",
      title: "LinkToBuild",
      type: "url",
    },
  ],
};
```

I guess you got the idea by now.

### schema.js again

after creating all my schemas, I import them like I've imported the pageInfo before.

```javascript
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

# Deployment and using sanity

Now, either I can use sanity locally, or in deployment. I want to deploy it. First, I go to the sanity folder with `cd sanity`

Once inside, I run `sanity start`

Takes me to `localhost:3333`

Then there's `sanity deploy` to deploy.
deployed here => https://nextjs-portfolio-murat.sanity.studio/desk

## Pulling info to the front end

add `sanity/node_modules ` to `.gitignore`

Now, if I go to the `pages/api/hello.ts` I'll see a nodeJS backend ready made by nextJS. And if I visit `http://localhost:3000/api/hello` I'll see the following `{"name":"John Doe"}` bcs that's what is there in the hello.ts.

Now I'll add the required code to interact with sanity to here. But in order to do that, we need to connect to sanity. we'll use a package called `next-sanity` to do that. => https://www.npmjs.com/package/next-sanity

Install as such => `npm i next-sanity`
