## functions

e.g.

```
function eatHamburgers(string memory _name, uint _amount) public {

}
```

- function variables start with an underscore by convention

## structs are like constructors in JS

struct Person {
uint age;
string name;
}

Person[] public people;

### create new person

// create a New Person:
Person satoshi = Person(172, "Satoshi");

// Add that person to the Array:
people.push(satoshi);

## private functions

when we define a function as private, outside contracts cannot access that function. Only others functions in my contract can access that private contract
it's convention to start private function names with an underscore (\_).

## function returns

string greeting = "What's up dog";

function sayHello() public returns (string memory) {
return greeting;
}

- In Solidity, the function declaration contains the type of the return value (in this case string).
