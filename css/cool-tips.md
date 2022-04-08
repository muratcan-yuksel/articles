# emmett in vscode trick
` section*8>(h1>{Nice Curves})+p>lorem`

means
-create 8 sections

- each section should have a child h1 with "Nice Curves" text inside of it
- h1 elements should have a sibling p tag, that has lorem dummy text inside of it
  Outcome =>

`````<section>
        <h1>Nice Curves</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut quisquam debitis eum molestiae corrupti expedita dolores aliquid iste necessitatibus, delectus exercitationem, sapiente mollitia explicabo ipsa, rem veniam voluptates non quod!</p>
    </section>````
`````
# you don't need vscode local host
just write `npx serve`