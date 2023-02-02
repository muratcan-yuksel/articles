## To compile

tsc app.ts (for instance)

This would create an app.js file, which is the compiled version of app.ts.

## to watch

tsc app.ts -w
or -watch

## when we have more than one ts file to compile

tsc --init
will create a tsconfig.json
then, we can run `tsc` without pointing to a file bcs it'll compile all ts files in the folder
or we do `tsc -w` to watch for changes

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

## tuples

are arrays that are fixed lenght and type

```typescript
const person: {
  name: string;
  age: number;
  hobbies: string[];
  role: [number, string]; //tuple
} = {
  name: "murat",
  age: 31,
  hobbies: ["Sports", "Cooking"],
  role: [2, "author"],
};
//this means an array of strings
let favoriteActivities: string[];
//this is how I write tuples
// let tuplearray: [string, number];
//if I wanted to use a mixed array I would do this
// let favoriteActivities: any[];
console.log(person.name);
```

## enums

```typescript
enum Role {
  ADMIN,
  READ_ONLY,
  AUTHOR,
}

const person = {
  name: "murat",
  age: 31,
  hobbies: ["Sports", "Cooking"],
  role: Role.ADMIN,
};
```

## any type

can store any kind of value.

## Union types

I can use the pipe symbol to define multiple types for a variable

```typescript
function add(input1: number | string, input2: number | string) {
  return input1 + input2;
}
```

## Literal types

In TypeScript, a literal type is a type that can only have a specific set of values. These values are known at compile-time and can be a string, number, or boolean. For example, you can define a variable with a literal type of "red" or "green" and it can only be assigned those specific string values. This allows for more precise type checking and can help prevent errors in your code.

For example:

```typescript
let color: "red" | "green" | "blue" = "red";
color = "green"; // valid
color = "purple"; // error
```

Here, the variable color is of type "red" | "green" | "blue" which means it can only take the values of "red", "green" or "blue" any other value will give an error.

## Type aliases

I can create my own types like so:

```typescript
type StringOrNumber = string | number;
```

This creates a new type called StringOrNumber that represents either a string or a number. This can be useful when you have a variable that can be either of those types.

```typescript
let value: StringOrNumber = "hello";
value = 42; // valid
value = true; // error
```

Here, value is of type StringOrNumber which means it can take either a string or a number, but not a boolean.

Type aliases can also be used to create a type that represents an intersection of different types, using & operator.

```typescript
type HasName = { name: string };
type HasAge = { age: number };
type Person = HasName & HasAge;
```

Here, Person type is created as an intersection of HasName and HasAge type, so it must have all the properties of both types.

It's a powerful feature that allows you to create custom types that represent the shape of your data and makes your code more readable and maintainable.

## Function Return Types and Void

In TypeScript, a function return type is the type of the value that a function returns when it is called. The return type is specified after the parameter list, using a colon followed by the type.

For example, the following function has a return type of number:

function add(x: number, y: number): number {
return x + y;
}

This means that when the add function is called and the execution completes, it will return a value of type number.

When a function does not return any value, its return type is void. The void type is used to indicate that a function does not return a value. For example:

function printHello(): void {
console.log("Hello!");
}

Here, the function printHello is not returning any value, it's only performing a side effect.

You can also use undefined and null as a return types, they both indicate that function can return undefined or null

function maybeReturn(): undefined | null {
if(Math.random() > 0.5) {
return undefined;
}
return null;
}

It is important to specify the return type of a function, as it allows TypeScript to check for type compatibility and catch errors at compile-time. This can help prevent runtime errors and make your code more robust and maintainable.
