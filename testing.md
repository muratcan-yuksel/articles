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
