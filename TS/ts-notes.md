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

## unions & type aliases

```ts
type PopularTag = string;
type MaybePopularTag = PopularTag | null;

const dragonsTag: MaybePopularTag = "dragon"; //or we can write null, but not a number or a boolean
```

## any void never unknown

### void

void is a set of `undefined` and `null`.
void is used when a function doesn't return anything. e.g.

```ts
const doSometthing = (): void => {
  console.log("hello world");
};
```

if we tried to `return 1;` for instance, we'd get an error. But we could've returned undefined or null without errors.

### any

```ts
const doSometthing = (): any => {
  console.log("hello world");
};
```

Basically useless. It's recommended to avoid using it.

`any is not a solution but start of bigger problems`

### never

weird, it is used when a function never returns anything.

### unknown

it's an alternative to type any.

```ts
let vAny: any = 10;
let vUnknown: unknown = 10;

let s1: string = vAny;
let s2: string = vUnknown; // Error
```

### type assertion

Converting one type to another. e.g.

```ts
let vAny: any = 10;
let vUnknown: unknown = 10;

let s1: string = vAny;
let s2: string = vUnknown as string; // Type assertion

let pageNumber: string = "1";
//we need to convert it to unknown first and then to number
let numericPageNumber: number = pageNumber as unknown as number;
```

## working with DOM

We even need to define the html elements like so =>

```ts
const someElement = document.querySelector(".foo") as HTMLInputElement;

console.log(someElement.value);
```

## adding a listener

```ts
const someElement = document.querySelector(".foo");

someElement.addEventListener("blur", (e) => {
  const target = e.target as HTMLInputElement;
  console.log("blurred", target.value);
});
```

## classes in typescript

it's the same with ES6, but with typing

### public, private and protected

Similar to SOlidity, we can define the visibility of the properties and methods of a class.

Everything is public by default.

```ts
class User {
  private firstName: string;
  private lastName: string;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  getFullname(): string {
    //we can return names as such because we know they are strngs
    return this.firstName + " " + this.lastName;
  }
}

const user = new User("John", "Doe");
//in user, I can only get user.getFullame, since names are private and thus
//not accessible outside of the function
console.log(user);
```

#### protected

protected is only accessible to the class and its children.

#### readonly

Cannot ever change it.

` readonly unchangeableName: string;`

## interfaces with classes

#### readonly

#### static

```ts
interface UserInterface {
  getFullname(): string;
}
//uses this "implements" keyword
class User implements UserInterface {
  protected firstName: string;
  private lastName: string;
  readonly unchangeableName: string;
  //can only be read from the class itself, not from the instances
  static readonly maxAge = 50;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.unchangeableName = firstName;
  }
  //would get an error if this function were to be omitted
  //because we're implementing the interface that has getFullname function
  getFullname(): string {
    //we can return names as such because we know they are strngs
    return this.firstName + " " + this.lastName;
  }
}

const user = new User("John", "Doe");
console.log(user);
```

## inheritance

we can extend the class User from above as such. We're overriding whatever we cant in this new Admin class that extends from User.

```ts
class Admin extends User {
  private editor: string;

  setEditor(editor: string): void {
    this.editor = editor;
  }

  getEditor(): string {
    return this.editor;
  }
}
```

## generics

```ts
//this T here is a convention, it's not a keyword
//it's just a convention to say that this is a generic type
//and we can call it whatever we want
const addId = <T>(obj: T) => {
  const id = Math.random().toString(16);
  return { ...obj, id };
};

const user = {
  name: "john",
};

const result = addId(user);
console.log(result);
```

## enums

```ts
enum Status {
  NotStarted, //equals to 0
  InProgress, //equals to 1
  Done, //equals to 2
}

let NotStartedStatus: Status = Status.NotStarted;

console.log(Status.InProgress); // 1
```
