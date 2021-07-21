Npm init
npm --save-dev jest
export the code you wish to test
import it in the test file
change in package.json => "test": "jest"
example test=>
it('works', () =>{
expect(1).toBe(1)
})
--- tow auto-test=>
go to package.josn
in "scripts", create "watch": "jest --watch \*.js"
and on the terminal, you write npm run watch

----another example=>
it ('Quantity', ()=>
expect(orderTotal({
items:[{"name": "dragon candy", price: 2, quantity:3}]
})).toBe(6))

---

Running from command line#
You can run Jest directly from the CLI (if it's globally available in your PATH, e.g. by yarn global add jest or npm install jest --global) with a variety of useful options.

Here's how to run Jest on files matching my-test, using config.json as a configuration file and display a native OS notification after the run:

jest my-test --notify --config=config.json
If you'd like to learn more about running jest through the command line, take a look at the Jest CLI Options page.
