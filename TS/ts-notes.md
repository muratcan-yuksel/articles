We need to transpile ts code each and every time as they cannot be read by the browser. To transpile them, run the `tsc` command followed by the file name you want to transpile. e.g.

`tsc app.ts`

This will create a `app.js` JAvasciprt file from the TS file. You will lik ths JS file to your index.html.

It transpiles the code to ECMASCRIPT 3, an old but super safe version of JS.

## Watching TS file changes

Transpiling each time we change the code is tideous. So there's the watch mode. e.g.

`tsc app.ts -w`

## ts.config.json

We'll create a basic ts config file. Inside of `tsconfig.json` we enter the following snippet:

```json
{
  "compilerOptions": {
    "rootDir": "./src",
    //will spit the compiled js files here
    "outDir": "./dist"
  }
}
```

Now, if we run `tsc -w` only, without the file name, it will transpile all the files in the `src` folder and spit them out in the `dist` folder.

## type definitions

we define types as such => `let hello:string = "world"; `

If we didn't define, TS would understand that it was a type of string too, and wouldn't let me reassing the value to say, a boolean or a number.

## functions

e.g.

```ts
//the second "string" is the return type
const getFullName = (name: string, surname: string): string => {
  return name + " " + surname;
};

console.log(getFullName("John", "Smith"));
```

## interfaces

### creating objects

Now, this code will throw an error:

```ts
const user: { name: string; age: number } = {
  name: "moster",
  age: 18,
};

const user2: { name: string; age: number } = {
  name: "jack",
};
```

because we specify that the object should have a name and an age. But we didn't specify the age for the second object.

But we also don't want to specify the type of the object each time we create it. So we can create an interface:

```ts
interface UserInterface {
  name: string;
  age: number;
}
```

and so, we can write the above user objects as such:

```ts
const user: UserInterface = {
  name: "moster",
  age: 18,
};

const user2: UserInterface = {
  name: "jack",
};
```

which would again throw an error because we didn't specify the age on the second object.

### making non-mandatory interface properties

Consider the same example but like this=>

```ts
interface UserInterface {
  name: string;
  //this is the non-mandatory property bcs of the interrogation mark
  age?: number;
}

const user: UserInterface = {
  name: "moster",
  age: 18,
};

const user2: UserInterface = {
  name: "jack",
};
```

Now this code won't throw an error as age is not mandatory.

## functions in interfaces

```ts
interface UserInterface {
  name: string;
  age?: number;
  getMessage(): string;
}

const user: UserInterface = {
  name: "moster",
  age: 18,
  getMessage() {
    return "hello " + this.name + this.age;
  },
};

const user2: UserInterface = {
  name: "jack",
  getMessage() {
    return "hello " + this.name;
  },
};

//console.log(user.age);
```

## types and unions

we can specify that a variable can be of a certain type or another type. e.g.

```ts
//equals to the default value
let pageName: string | number = "1";
```

So pageName can accept either a string or a number.
Like, we can use this unions with error messages, as we don't know if we'll get one or not at the start. Like so =>

```ts
//equals to the default value
let errorMessage: string | null = null;
```

## type aliases

Consider the following example:

```ts
type PopularTag = string;
const popularTags: PopularTag[] = ["dragon", "coffee"];
```

What's happening here is, similar to Solidity, after creating a type of PopularTag that's a string, we specify that popularTags consists of an array of PopularTag, which is a string. The reason we're doing this is to make our code more readable & understandable.
