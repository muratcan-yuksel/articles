First, we have this simple storage from the last lesson:

```
// I'm a comment!
// SPDX-License-Identifier: MIT

pragma solidity 0.8.8;
// pragma solidity ^0.8.0;
// pragma solidity >=0.8.0 <0.9.0;

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

In this lesson, we'll create a contract that creates new contracts. Yes, smart contracts can do that. "The ability for contracts to seamlessly interact with each other is known as `composability` ".

## Using a contract in another contract file

### copy pasting the contract into another contract

There are more than 1 way to do that. The first one is to manually copy-paste the contract inside another contract. To do this, you need to copy what comes after the pragma solidity... and paste it in the contract you wish to use the former.

Say that we've copy-pasted the contract into your new factory contract. Let's see what we can do with it:

// StorageFactory.sol
contract StorageFactory{
//create a variable named simpleStorage with the type of SimpleStorage contract that we've copy-pasted
SimpleStorage public simpleStorage;

    function createSimpleStorageCntract() public{
        //with this `new` keyword, Solidity knows "ah! we're gonna deploy a new SimpleStorage contract"
        simpleStorage= new SimpleStorage();
    }

}

### importing the contract into another contract

Instead of copy pasting, we can just import the smart contract we want. Like so:
//after the pragma solidity, efore the contract keyword

`import "./SimpleStorage.sol"; `

Full code :

```
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./SimpleStorage.sol";

contract StorageFactory{

        SimpleStorage public simpleStorage;


        function createSimpleStorageContract() public {
            simpleStorage= new SimpleStorage();
        }

}
```

### turning the above example into an array of deployed contracts

Right now our contracts redeploys and redefines the simpleStorage (minuscule) variable each time it's called. But, what if we wanted to save those contracts in an array?

```

//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./SimpleStorage.sol";

contract StorageFactory{
//create a public array with the type of SimpleStorage contract with the name of simpleStorageArray
        SimpleStorage[] public simpleStorageArray;


        function createSimpleStorageContract() public {

          SimpleStorage simpleStorage= new SimpleStorage();
          simpleStorageArray.push(simpleStorage);
        }


}
```

## Interacting with other contracts

So there's this function in our SimpleStorage.sol file(s) (I use plural as we're deploying as much as we want of them) and I want to interact with it in our StorageFactory.sol:

//Function in SimpleStorage.sol

```
function store(uint256 _favoriteNumber) public{
favoriteNumber = \_favoriteNumber;
}
```

Now, in the function I'll create in StorageFactory.sol, I'll pass the index of the contract as they're stored in an array we've created, and the number from simple storage (as the function above stores the favoriteNumber)
NB!: In order to interact with any contract, we're always going to need 2 things: The contract address and the contract abi (application binary interface)
Also, I just want to remind here that in Solidity, if we compare it to Javascript, the declaration we put in lieu of let or const is the type declaration. i.e. it declares of the type that the variable that succeeds it is of. e.g. `struct someStruct` means someStruct is a struct. To go further, `someStruct anotherVariable` means that `anotherVariable` is of type `someStruct`.

//Function for interacting (in storageFactory.sol)
//sfStore here stands for StorageFactoryStore

```
    function sfStore(uint256 _simpleStorageIndex, uint256 _simpleStorageNumber) public {
// a variable named simpleStorage (minuscule) of type SimpleStorage(majuscule)
SimpleStorage simpleStorage = simpleStorageArray[_simpleStorageIndex];
//now that we have the address, we can call the `store` functin from simpleStorage.sol
simpleStorage.store(_simpleStorageNumber);
    }

```

now, below that function, let's create a getter function to get the favorite number from the simpleStorage contract we deploy (we'll use the index to get the deployed contract as you can see)

```
    function sfGet(uint256 _simpleStorageIndex) public view returns (uint256) {
  SimpleStorage simpleStorage = simpleStorageArray[_simpleStorageIndex];
  return simpleStorage.retrieve();
    }
```

//WORKING FULL CODE SO FAR

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
SimpleStorage simpleStorage = simpleStorageArray[_simpleStorageIndex];
simpleStorage.store(_simpleStorageNumber);
    }

    function sfGet(uint256 _simpleStorageIndex) public view returns (uint256) {
  SimpleStorage simpleStorage = simpleStorageArray[_simpleStorageIndex];
  return simpleStorage.retrieve();
    }
}
```

REFACTORED CODE ON THEIR GITHUB => https://github.com/PatrickAlphaC/storage-factory-fcc/blob/main/StorageFactory.sol

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

## Inheritance

Now, say that we want to add 5 to everyone's favorite number for some reason. Instead of copy-pasting everything in SimpleStorage.sol file, we can create a new contract called ExtraStorage.sol and inherit SimpleStorage in it like so:

```

// SPDX-License-Identifier: MIT

pragma solidity 0.8.8;

import "./SimpleStorage.sol";

contract ExtraStorage is SimpleStorage {
    function store(uint256 _favoriteNumber) public override {
        favoriteNumber = _favoriteNumber + 5;
    }
}
```

NB! In order for `override` j-keyword to work, the function that we're going to override should be a `virtual` function. So, we go back to our SimpleStorage.sol contract, find the store function and change it as such:

````
    function store(uint256 _favoriteNumber) public virtual {
        favoriteNumber = _favoriteNumber;
    }

    ```
````
