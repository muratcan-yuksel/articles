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
      name:"socials",
      title:"Socials",
      type:"array",
      of:[{type:"reference", to:{type:"social"}}]
  ],
};
```

Then I go to `schema.js` file, and change the `posts` import to `pageInfo` since I've changed its name. That means this `import post from './post' ` becomes this `import pageInfo from './pageInfo' `
