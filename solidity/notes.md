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

## Typecasting

Sometimes you need to convert between data types. Take the following example:

uint8 a = 5;
uint b = 6;
// throws an error because a _ b returns a uint, not uint8:
uint8 c = a _ b;
// we have to typecast b as a uint8 to make it work:
uint8 c = a \* uint8(b);

## mappings resemble objects in J I guess

Defining a mapping looks like this:

// For a financial app, storing a uint that holds the user's account balance:
mapping (address => uint) public accountBalance;
// Or could be used to store / lookup usernames based on userId
mapping (uint => string) userIdToName;
A mapping is essentially a key-value store for storing and looking up data. In the first example, the key is an address and the value is a uint, and in the second example the key is a uint and the value a string.

## msg.sender

In Solidity, there are certain global variables that are available to all functions. One of these is msg.sender, which refers to the address of the person (or smart contract) who called the current function.
