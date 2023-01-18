## To compile

tsc app.ts (for instance)

This would create an app.js file, which is the compiled version of app.ts.

---

//good practice with unassigned variables
//bad if assigned bcs it's redundant
let number3: number;

## objects

When creating objects, it is the better practice to follow up with curly braces and add key/types to it.
like const person: {}...
we could've just written object in lieur of {} but it's better to be specific.

```typescript
const person: {
  name: string;
  age: number;
} = {
  name: "murat",
  age: 31,
};

console.log(person.name);
```

## arrays

```typescript
const person: {
  name: string;
  age: number;
  hobbies: string[];
} = {
  name: "murat",
  age: 31,
  hobbies: ["Sports", "Cooking"],
};
//this means an array of strings
let favoriteActivities: string[];
//if I wanted to use a mixed array I would do this
// let favoriteActivities: any[];
console.log(person.name);
```
