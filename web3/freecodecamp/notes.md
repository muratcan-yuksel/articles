## calldata, memory, storage

calldata and memory mean that the data will only exist temporarily
storage variables mean that the data will persist between calls

- it depends on whether you need the variable after a certain execution. e.g. you pass parameters to a function, you don't need those parameters to be saved after the execution, as you'd probably do something with them and save them in somewhere, like an array or struct or mapping or whatever

- you can define a variable as calldata if you're not going to modify it
- in solidity, behind the screens, a string is just an array of bytes
- and data location can only be specified for array, struct or mapping types
- and since strings are just arrays in the end, we use data allocation with 'em'
