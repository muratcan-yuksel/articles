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
