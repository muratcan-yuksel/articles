## On svelte

Install with vite and choose svelte/javascript
`npm init vite repoName`

then run `npm install`, and then `npm run dev`

Now, using the export keyword in front of a variable means that that variable can be passed to a child as props, if you don't put the export, it's a private variable to that component.

```javascript
<script>export let name;</script>
```

## handling events

```js
<script>
	let count = 0;

	function incrementCount() {
		// event handler code goes here
			count += 1;
	}
</script>

<button on:click={incrementCount}>
	Clicked {count} {count === 1 ? 'time' : 'times'}
</button>
```

## reactive values

are defined with `$:` at the beginning. like so =>

```js
let count = 0;
$: doubled = count * 2;
```

## deploying to gh-pages

Install gh-pages with ` npm i gh-pages --save-dev`

go to `package.json` and add this to `scripts` => ` "deploy": "npx gh-pages -d dist"`

Then, in `vite.config.js` add this (the name of your repo) => ` base: "/svelte-emailJS-vite/",` so that it looks like this =>

```
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/svelte-emailJS-vite/",
  plugins: [svelte()],
});
```

Then, in order, type `npm run build` and `npm run deploy`

## emailjs command

`npm install @emailjs/browser --save `
