After installing the cli with `npm install -g @angular/cli` we can create a new angular app via `ng new my-app`

To run the dev server => `ng serve`

In your component html file, you can write JS inside mustache brackets =>

```js
//app.component.html
<h1>Hello world</h1>
<h1>{{ title.toUpperCase() }}</h1>
{{ 1 + 5 }}

```

styles.css file contains all the global styles.

## creating a new component

is done via the CLI => `ng generate component compnents/header` which means "generate a header component in a folder called components (so, generate the components folder too)"

## Importing components

After creating the component, if we check the `header.component.ts` file we'll see following in the Component part => ` selector: 'app-header',`. We'll use this selector in our `app.component.html` file. No need to import. Just write it like this inside the app.component.html => `<app-header> </app-header> `
