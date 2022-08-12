# Creating a storage factory smart contract in Solidity and interacting with it (notes from Freecodecamp)

I'm following Freecodecamp's wonderful web3 course on Youtube (link here => https://www.youtube.com/watch?v=gyMwXuJrbJQ&ab_channel=freeCodeCamp.org), and to make sure that I remember what I've learnt, I like to take notes. Here, I'll post my notes from `Lesson 3: Remix Storage Factory`. I'll make my disorganized notes human readable so it will look like a tutorial.

Please note that all the credit goes to Patrick Collins and incredible Freecodecamp team/community, I am just delivering what I've seen in written format so that I won't have to rewatch the tutorial in the future. I hope you too can benefit from it.

As this is the 3rd lesson, there are some fundamentals missing here. It also takes the SimpleStorage smart contract introduced to us in Lesson 2 of the Freecodecamp course. You might want to check it out before reading this post, although I'll try to explain what's going on in the SimpleStorage contract. If I'm mistaken at some point, please please feel free to correct as it's been more than a week I've watched the Lesson 2, so I forgot some of the reasons why we're doing things as we do :)

We will use Remix IDE for this post, so make sure you go to `https://remix.ethereum.org/` and be ready for hacking!

Note: You can find the code for all the contracts here in Patrick's GitHub repo, here => https://github.com/PatrickAlphaC/storage-factory-fcc

## Simple storage smart contract

Let's start by looking at the SimpleStorage smart contract .

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract SimpleStorage {

    uint256 favoriteNumber;

    struct People {
        uint256 favoriteNumber;
        string name;
    }
    // uint256[] public anArray;
    //create an array of type People, which is a struct and name it people. It is also public.
    People[] public people;

    mapping(string => uint256) public nameToFavoriteNumber;

    function store(uint256 _favoriteNumber) public {
        favoriteNumber = _favoriteNumber;
    }

    function retrieve() public view returns (uint256){
        return favoriteNumber;
    }

    function addPerson(string memory _name, uint256 _favoriteNumber) public {
        people.push(People(_favoriteNumber, _name));
        nameToFavoriteNumber[_name] = _favoriteNumber;
    }
}
```

All Solidity smart contracts start with a SPDX-License-Identifier. This is a license that the smart contract is under. In this case, it is MIT. If I'm not mistaken, that means it's open source.

Then, we have to define the Solidity compiler version. ` ^0.8.0` means "anything above 0.8.0" is okay.

Then, we use the `contract` keyword to let the compiler know that we're creating a smart contract. Our contract is named `SimpleStorage`.

Since Solidity is a typed language, we need to define the type of the variable we're creating. I'm a Javascript developer normally, so my mind works in terms of JS. This is how I see it: Instead of saying `let favoriteNumber` or `const favoriteNumber`, we say `uint256 favoriteNumber`. If we were to define a string, we'd have to say `string favoriteNumber`.

Now we have our `favoriteNumber` variable ready, we're creating a struct of People. Structs are like objects in Javascript. They take key/value pairs. In this case, they're `uint256 favoriteNumber` and `string name`.

Then, we create a dymamic array named `people` with the type People struct. I don't know Typescript or any other typed language other than Solidity yet, so this part was (and still is) quite confusing for me. It's like, this `people` array can only take People structs as values. It cannot take a single string or an array of strings or uints or anything other than People structs. It can't take other type of structs also if I'm not mistaken; it can only and only take People structs as values and that's all.

Also, with this syntax `People[] public people`, we're telling the compiler that this is a `dynamic array` of People structs. That is to say, the length of the array is not defined-because you can do that in Solidity, i.e. you can have arrays with predefined length.

On more thing about the array, you'd notice the `public` keyword here. It means that this variable is public, i.e. it can be seen and called outside of the contract. If we'd say `private` instead of it, you couldn't access it from outside of the contract.

Then we have a mapping of type string to uint256. Mappings too confused me a lot in Solidity. They're like objects in JS, but instead of taking multiple values like structs, they take only one key/value pair and they work similar to arrays in Javascript. They come in quite handy though, especially when mapping addresses.

Our first function, `store` is a public function that takes a single parameter `_favoriteNumber` of type `uint256` and changes the `favoriteNumber` variable to the value of `_favoriteNumber` parameter. The underscore (`_`) is just a convention in Solidity, it's for parameters.

Then, we have a function `retrieve` that is public and view. This means that it can be seen and called from outside of the contract. It returns a `uint256` value and it DOES NOT cost gas. That's because it doesn't change the state of EVM (Ethereum Virtual Machine). Snce there's no change, there's no gas cost.

Then, we have a function `addPerson` that is public. It takes two parameters `_name` and `_favoriteNumber` of type `string` and `uint256`. Now, the first line inside this function, ` people.push(People(_favoriteNumber, _name));`, does the following: it takes the parameters and creates a People struct with them and pushes this new People struct into the people array.

The second line, ` nameToFavoriteNumber[_name] = _favoriteNumber;`, does the following: it takes the parameters and creates a key/value pair with them and puts this new key/value pair into the nameToFavoriteNumber mapping. You see, in the mapping ` mapping(string => uint256) public nameToFavoriteNumber;` we have a string and uint256, so the `_name` goes as the string, and `_favoriteNumber` goes as the uint256.

That's all for the SimpleStorage.sol contract. You can paste this contract to remix, deploy and play with it. You'll notice that so far we can only retrieve the favoriteNumber as we only created a getter function for that.

## StorageFactory smart contract

For this part, we'll create a new contract in Remix IDE, named `StorageFactory.sol`. The idea in this one is to create a new contract that can create other smart contracts. Yes, smart contracts can do that. "The ability for contractsto seamlessly interact with each other is known as `composability`. "

Let's check out the final version of StorageFactory smart contract:

```

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./SimpleStorage.sol";

contract StorageFactory {

    SimpleStorage[] public simpleStorageArray;

    function createSimpleStorageContract() public {
        SimpleStorage simpleStorage = new SimpleStorage();
        simpleStorageArray.push(simpleStorage);
    }

    function sfStore(uint256 _simpleStorageIndex, uint256 _simpleStorageNumber) public {
        // Address
        // ABI
        // SimpleStorage(address(simpleStorageArray[_simpleStorageIndex])).store(_simpleStorageNumber);
        simpleStorageArray[_simpleStorageIndex].store(_simpleStorageNumber);
    }

    function sfGet(uint256 _simpleStorageIndex) public view returns (uint256) {
        // return SimpleStorage(address(simpleStorageArray[_simpleStorageIndex])).retrieve();
        return simpleStorageArray[_simpleStorageIndex].retrieve();
    }
}
```

As you can see, after our `pragma solidity` line, we have this import statement => `import "./SimpleStorage.sol";`. Importing works like Javascript. We can either copy paste the code, or import it like this to make it much more manageable.

Now, with ` SimpleStorage[] public simpleStorageArray;` we create a public array named simpleStorage (minuscule) with the type of SimpleStorage (majuscule) contract that we've just imported. So, this array will contain only and only SimpleStorage contracts. Cool, right?

The public function `createSimpleStorageCntract` does two things: In the first line, it creates a variable called `simpleStorage` (minuscule) with the type of `SimpleStorage` (majuscule) contract. It does this with the `new` keyword. When Solidity sees the 'new' keyword here in this context, it says "aha! We're going to deploy a new SimpleStorage contract." In the second line, it pushes this new contract into the `simpleStorageArray` array.

The function `sfStore` ("sf" stands for "storageFactory") takes two uin256 parameters: the index of the contract just created and pushed into the array, and the favorite number that was in the `simpleStorage` contract.

Remember, the `store` function that stored the favorite number in `simpleStorage.sol` was as such:

```
function store(uint256 _favoriteNumber) public{
favoriteNumber = _favoriteNumber;
}
```
