# Creating a storage factory smart contract in Solidity and interacting with it (notes from Freecodecamp)

I'm following Freecodecamp's wonderful web3 course on Youtube (link here => https://www.youtube.com/watch?v=gyMwXuJrbJQ&ab_channel=freeCodeCamp.org), and to make sure that I remember what I've learnt, I like to take notes. Here, I'll post my notes from `Lesson 3: Remix Storage Factory`. I'll make my disorganized notes human readable so it will look like a tutorial.

Please note that all the credit goes to Patrick Collins and incredible Freecodecamp team/community, I am just delivering what I've seen in written format so that I won't have to rewatch the tutorial in the future. I hope you too can benefit from it.

As this is the 3rd lesson, there are some fundamentals missing here. It also takes the SimpleStorage smart contract introduced to us in Lesson 2 of the Freecodecamp course. You might want to check it out before reading this post, although I'll try to explain what's going on in the SimpleStorage contract.

We will use Remix IDE for this post, so make sure you go to `https://remix.ethereum.org/` and be ready for hacking!

## Simple storage smart contract

Let's start by looking at the SimpleStorage smart contract.

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
