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
NB! This should be installed into the root folder, not in the sanity folder as it has its own dependencies.

### sanity.ts

We need to create a sanity.ts file in the root folder. And add the following code to it.

```javascript
import { createClient } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";

export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  apiVersion: "2021-03-25",
  useCdn: process.env.NODE_ENV === "production",
};

// Set up a client for fetching data in the getProps page functions
export const sanityClient = createClient(config);

// helper function to get the images

export const urlFor = (source: any) =>
  createImageUrlBuilder(config).image(source);

```

## adding ENV variables

I create an `.env.local` file in the root folder and add the following code to it.

```javascript
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_BASE_URL=http://localhost:3000/
```

I'll get the ID from sanity itself. I log in to sanity.io, click on the project I'm working on, click `members` and copy/paste the `PROJECT ID` there

This part is done.

## creating queries

I go to `pages/api` and create a new `getSocials.ts` file.

I populate it as such for beginning =>

```javascript
// nextjs API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { groq } from "next-sanity";
import { sanityClient } from "../../sanity";
//will add these later on
// import { PageInfo, Social } from "../../typings";
```

Then I go to the `Social` section in my sanity dashboard. I add some data in it using the dashboard, then I click the `vision` button and enter the following groq query=>

`\*[_type == "social"] ` This will get everything related to social type.

Note that I have to do all these in the dashboard open at localhost 3333

Then I change the `getSocials.ts` file as such =>

```javascript
// nextjs API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { groq } from "next-sanity";
import { sanityClient } from "../../sanity";
// import { PageInfo, Social } from "../../typings";

const query = groq`
    *[_type == "social"] 
`;

type Data = {
  socials: Social[],
};
//set up nextjs endpoint

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const socials: Social[] = await sanityClient.fetch(query);
  res.status(200).json({ socials });
}
```

## typings.d.ts

I create a `tyings.d.ts` file in the root folder. And add the following code to it.

```javascript
interface SanityBody {
  _createdAt: string;
  _id: string;
  _rev: string;
  _updatedAt: string;
}

// image interface

interface Image {
  _type: "image";
  asset: {
    _ref: string,
    _type: "reference",
  };
}
//on sanity vision I check what Social has different from the ones above and add them
export interface Social extends SanityBody {
  _type: "social";
  title: string;
  url: string;
}

export interface PageInfo extends SanityBody {
  _type: "pageInfo";
  address: string;
  backgroundInformation: string;
  email: string;
  role: string;
  heroImage: Image;
  name: string;
  phoneNumber: string;
  profilePic: Image;
}

export interface Technology extends SanityBody {
  _type: "skill";
  image: Image;
  title: string;
}

export interface Skill extends SanityBody {
  _type: "skill";
  image: Image;
  title: string;
}

export interface Experience extends SanityBody {
  _type: "experience";
  company: string;
  companyImage: Image;
  dateStarted: date;
  dateEnded: date;
  isCurrentlyWorkingHere: boolean;
  jobTitle: string;
  points: string[];
  technologies: Technology[];
}

export interface Project extends SanityBody {
  title: string;
  _type: "project";
  image: Image;
  linkToBuild: string;
  summary: string;
  technologies: Technology[];
}
```

Then I directly go back to `getSocials.ts` file and import the Social type I've just created as such => `import { Social } from "../../typings"; `

## getSkills.ts

I create a `getSkills.ts` file in pages/api and copy the contenets of getSocials.ts, paste it and make some adjustments to it like so =>

```javascript
// nextjs API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { groq } from "next-sanity";
import { sanityClient } from "../../sanity";
import { Skill } from "../../typings";
// import { PageInfo, Social } from "../../typings";

const query = groq`
    *[_type == "skill"] 
`;

type Data = {
  skills: Skill[],
};
//set up nextjs endpoint

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const skills: Skill[] = await sanityClient.fetch(query);
  res.status(200).json({ skills });
}
```

I'll do the same for the other types of data I have in my sanity dashboard. Like, getProjects. Although getProjects is a bit different.

## getProjects.ts

I create the file with the name of the title.

Its query is a bit different because it has references to other types of data. So I have to do a bit of a different query. I go to the dashboard and click on the `vision` button. I enter the following query =>

```javascript
*[_type == "project"]{
  ...,
  //this means expand
  technologies[]->

}
```

Then, I populate the getProjects.ts as such =>

```javascript
// nextjs API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { groq } from "next-sanity";
import { sanityClient } from "../../sanity";
import { Project } from "../../typings";
// import { PageInfo, Social } from "../../typings";

const query = groq`
*[_type == "project"]{
    ...,
    //this means expand
    technologies[]->
    
  }
`;

type Data = {
  projects: Project[],
};
//set up nextjs endpoint

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const projects: Project[] = await sanityClient.fetch(query);
  res.status(200).json({ projects });
}
```

## adding utility functions

I create a new `utils` folder in the root and add `fetchSkills.ts` file in it with the following code =>

```javascript
import { Skill } from "../typings";

export const fetchSkills = async () => {
  const res = await fetch(`${process.env.BASE}/api/getSkills`);

  const data = await res.json();
  const skills: Skill[] = data.skills;

  console.log("fetching", skills);
  return skills;
};
```

I'll do the ame for all other types also. Like fetchSocial etc.
