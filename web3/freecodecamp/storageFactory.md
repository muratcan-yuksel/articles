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

In this lesson, we'll create a contract that an contract new contracts. Yes, smart contracts can do that. "The ability for contracts to seamlessly interact with each other is known as `composability` ".

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
          SimpleStorage  simpleStorage= new SimpleStorage();
          simpleStorageArray.push(simpleStorage);
        }


}
```
