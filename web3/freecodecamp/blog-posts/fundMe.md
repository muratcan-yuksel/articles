These are my notes for Freecodecamp's we3/blockchain course Lesson 4: Remix FundMe. Again, all the credit goes to Patrick Collins and Freecodecamp's wonderful community. I'm just sharing my notes.

You can find my notes for the Lesson 3: Storage Factory here => https://dev.to/muratcanyuksel/creating-a-storage-factory-smart-contract-in-solidity-and-interacting-with-it-notes-from-freecodecamp-phh

You can find the original video tutorial here=> https://www.youtube.com/watch?v=gyMwXuJrbJQ&ab_channel=freeCodeCamp.org

You can find the source code to this tutorial in Patrick's GitHub => `https://github.com/PatrickAlphaC/fund-me-fcc`

In this lesson, we're going to work with two contracts primarily: `FundMe.sol` and `PriceConverter.sol`. The idea is to create a smart contract that can be sent money in the form of native blockchain token (whether it be ethereum, avalanche, polygon, phantom or whatever else), that which can hold them until the owner of the contract withdraws them. Also, we want to keep track of who sent how much money. While doing that, we want to work with US dollars, but there's a catch in here: Blockchains are deterministic systems, closed boxes if I understood correctly, and they cannot get real-time value of ETH in USD. So, we need to use a third party service to convert the USD to ETH: Oracles- Chainlink in our case. Down the road, we'll be covering liraries, some weird Solidity math, and some advanced concepts to make our contracts more professional and more gas efficient.

I know it sounds a lot, and probably it is, Patrick even suggests that some parts of this tutorial might be difficult to grasp, but we'll not dishearten ourselves, because we know that even if we don't get every single detail in this tutorial, we'll eventually understand them more and more as we continue writing smart contracts. So, buckle up and let's get started with our `FundMe.sol` contract!

## FundMe.sol smart contract

Now, we want this contract to do a couple of things. It should

- Get funds from users
- Withdraw funds
- Set a minimum funding value in USD

In this contract, we have two main functions: `fund` and `withdraw`. Along the way, we'll create helper functions that support these two functions.

Let's start with `fund` function. Now, we want people or entities to send some money to this function, but we also want to set requirement for the minimum amount of money sent. So, first of all, this function should be `public` so it can be interacted outside of this contract, and it also should be `payable` so that it can receive funds. Check the snippet out:

```solidity
    function fund() public payable{
        require(msg.value>1e18, "Didn't send enough!");
    }
```

Now, what is going on inside of this function? First off, we're using the `require` syntax which means that "execute what follows in this function only if the following conditions are met, if not, `revert` and give an error message" (which is `Didn't send enough!` in this case). The `msg.value` is the amount of money that was sent to this function. The `1e18` is the smallest amount of money that can be sent to this function.

` msg.value` is the amount of money sent by the person or entity who called the fund function. We want this `msg.value` to be greater than `1e18`, which means 1 ETH. It actually means `1*10**18` that is `1000000000000000000` wei and that is 1 ETH. No worries, we're going to deal with more manageable numbers soon.

If the amount paid is less than 1 ETH, it will "revert" the transaction and give an error message. But what that revert thing means? Well, it means that "undo any action before, and send remaining gas back". So it DOES spend some gas. For instance, if there's an action before the require statement, it will do that action, spend the necessary amount of gas for that action, and when it faces the require statement and if it couldn't pass the requirement, it will send what remains from the initial gas cost (probably estimated, or agreed IDK). So it will spend gas for any computation before the require statement and can't return them, but the cost of the ones after the require statement will be returned.

But we don't want to deal with these kind of things all the time. We would maybe like our users to send us some amount of ether in terms of usd? In order to do that, we're going to use oracles, or in our case, Chainlink's Price Feeds.

## Chainlink & Oracles

A blockchain oracle is any device that interacts with the off-chain world to provide external data or computation to smart contracts.

Now if you go to the following link => `https://docs.chain.link/docs/get-the-latest-price` you'll see an example smart contract that makes use of Chainlink's `AggregatorV3Interface` aggregator contract. We're going to use that contract.

If we wanted to inspect this `AggregatorV3Interface` aggregator contract, we could go to the following link and check it out => `https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol` As you can see, it has some functions like `version`, `getRoundData`, `latestRoundData` and so on. The thing is, we can import this aggrgator contract in our smart contract and actually use those functions in our smart contract.

In order to interact with an outside contract, we need the contract ABI (application binary interface) and the address. And we need the address for `goerli` network because the others are deprecated now.

We need two public functions, `getPrice` and `getConversionRate`.

The ABI here is the aggregator contract `AggregatorV3Interface`, but we also need the `address`. To get the address that we'll make use of in our call, we'll go to the following link => `https://docs.chain.link/docs/ethereum-addresses/`, find the section for `Goerli Testnet` and copy the address related to `ETH/USD` because that's what we want to do: We want to convert between ether and usd. The address we're looking for is the following => ` 0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e`

Now, let's chill a bit and write some code, things will be clear by the end of this section.

```solidity
//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract FundMe{
    function fund() public payable{
        require(msg.value>1e18, "Didn't send enough!");
    }

    function getPrice () public{
        //the function that we take the price in terms of USD
        //ABI
        //Adress
        AggregatorV3Interface priceFeed= AggregatorV3Interface(0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e);
        (,int256 price,,,)= priceFeed.latestRoundData();
    }

    function getConversionRate () public{
        //
    }


   // function withdraw{}
}
```

As you can see, after the usual License identifier and indicating the Solidity compiler, we're importing something with the line `import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";`. That's our aggregator contract `AggregatorV3Interface`, now since we've imported it, we can use its functions inside our contract! And that's what we're doing in our `getPrice` function.

We are creating a variable named `priceFeed` with the type of `AggregatorV3Interface` we've just imported, and set it to the `AggregatorV3Interface` contract called with göerli ETH/USD address. But, what about the ` (,int256 price,,,)= priceFeed.latestRoundData();` part? It has too many commas, right? That's not a mistake.

Now, if we examine the snippet using AggregatorV3Interface in this page => `https://docs.chain.link/docs/get-the-latest-price/` we notice that their `priceFeed` variable returns the following when it calls `latestRoundData()` function:

```
     /*uint80 roundID*/,
            int price,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
```

But we do not need all of them. We don't need `roundID`, `startedAt`, `timeStamp` and `answeredInRound`, we only need `int price`. But if we omitted them, the Solidity compiler would give an error. It's like we're saying that okay okay we know, we realize and notice that you return those things too, but since we're not going to use them, we're going to pass them as blanks.

Nb! In the documentation, it's `int price`, we changed it to `int256 price` to make it flexible.

Now, this part is confusing a bit. When returning the price, we first need to convert it from `int256` to `uint256` (a practice that's called `typecasting`). Now, for some reason, Solidity doesn't work well with decimals, so we need to convert them. Eth in terms of Wei has 18 decimals. But, the USD price returned has 8 decimals (in the tutorial it's `3000.00000000`). So, to convert them we write as such: ` return uint256(price * 1e10)`, `1e10` meaning `1**10`. This is the latest version of our `getPrice` function.

```solidity

    function getPrice () public view returns(uint256){
        //the function that we take the price in terms of USD
        //ABI
        //Adress
        AggregatorV3Interface priceFeed= AggregatorV3Interface(0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e);
        (,int256 price,,,)= priceFeed.latestRoundData();
        //ETH in terms of USD
        //3000.00000000
        return uint256(price * 1e10)
    }
```

Please be aware that things have changed since the tutorial was recorded. Now ETH worths less than that, but I'm not changing anything as this part was quite mind boggling in my opinion (not a CS major you see).

Now let's check the `getConversionRate` function.

### getConversionRate function

Check out this snippet:

```solidity

    function getConversionRate (uint256 ethAmount) public view returns (uint256){
        //this is the function that takes the ethAmount and returns the amount in terms of USD
        uint ethPrice= getPrice();
        uint256 ethAmountInUSD= (ethPrice * ethAmount) / 1e18;
        return ethAmountInUSD;
    }
```

This function takes some value in eth form, and spits it out in usd form.

`uint ethPrice` calls the previous `getPrice` function, and then we multiply it by the ethAmount. Then we divide it to `1e18` to get rid of the decimals so that it'll be converted to usd form. We return `ethAmountInUSD`.

Now, since we can convert from eth to usd, we can go all the way back to the top and our first function, `fund()` and change it accordingly so that it would be a function that really checks for the amount of usd sent:

```solidity

contract fundMe{
uint256 public minimumUsd= 50 * 1e18;
function fund() public payable{
require(getConversionRate(msg.value)>= minimumUsd, "Didn't send enough!");
}
//...
//...
}
```

Now, you realize that `minimumUsd` variable equals to `50 * 1e18`. The reason for it that, getConversionRate returns the number with 18 zeroes after the decimal point, so we upgrade the `minimumUsd` to `50 * 1e18`.

## Basic Solidity arrays & structs

Now we want to keep track of all the people who sent us money. To do that, we'll reate a dynamic array of addresses called `funders` like so => `address[] public funders;`

And in our `fund` function we'll push the `msg.sender`, i.e. the address of the person or entity who's calling the function, to the `funders` array of addresses like so=> `funders.push(msg.sender);`

Now, the latest version of our `fund` function is as follows:

```solidity
function fund() public payable{
    require(getConversionRate(msg.value)>= minimumUsd, "Didn't send enough!");
    funders.push(msg.sender);
}
```

To reiterate:
`msg.value` stands for how much ethereum or how much native blockchain currency is sent
`msg.sender` is the addresss of whoever calls the `fund` function

Now that we have our funders, we might want to check how much money they're sending by using `mapping`s.

First off, we create this: `mapping(address => uint256) public addressToAmountFunded;`. Then, we add ` addressToAmountFunded[msg.sender] = msg.value;` to our `fund` function to assign the amount of money sent to the address who sent it in our `addressToAmountFunded` mapping, so now our `fund` function alongside with the variables coming before it looks like this :

```solidity

    uint256 public minimumUsd= 50 * 1e18;
    address[] public funders;
    mapping(address => uint256) public addressToAmountFunded;

    function fund() public payable{
    require(getConversionRate(msg.value)>= minimumUsd, "Didn't send enough!");
    funders.push(msg.sender);
    addressToAmountFunded[msg.sender] = msg.value;

    }
```

Now, to the next part of the lesson.

## Libraries

So far we've created some cool stuff, but it seems like our `FundMe.sol` contract is gtting a bit cluttered. We did indeed say we'd have two main functions and some helpers around them. Those two function we had in mind were `fund()` and `withdraw()`. So maybe we'd like to move all the other helper functions to somewhere else that we can then import into our `FundMe.sol` smart contract and use as we wish. In order to do that, we'll create what's called a `library` in Solidity.

`Now, libraries are like contracts. But they enable us to give functions to uint256, like msg.value. So that we can call, say getConversionRate on msg.value for instance, like so => msg.value.getConversionRate();`

Also, libraries can't have state variables, can't send ether, and all the functions in the library are going to be `internal`.

To start, we create a new solidity file named `PriceConverter.sol`.

Now we cut the following functions from `FundMe.sol` and paste them into `PriceConverter.sol`: `getPrice`, `getVersion`, and `getConversionRate`. We're going to do the same for our `AggregatorV3Interface` import since we're not using it anymore in `FundMe.sol`. So we remove/add this => `import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";` Lastly, we'll make all the functions inside our library `internal`.

Now, as I've mentioned above, we're going to make this library's functions usable for `uint256`. In order to do that, we'll import this library into our contract, and then add `using PriceConverter for uint256;` inside our `FundMe` contract. Now, we can change the require statement from this ` require(getConversionRate(msg.value)>= minimumUsd, "Didn't send enough!");` to this => ` require(msg.value.getConversionRate() >= minimumUsd, "Didn't send enough!");`

How this works is, after creating our library, the functions which normally expect a variable passed into them (such as `function getConversionRate (uint256 ethAmount) internal view returns (uint256)` is expecting an `uint256 ethAmount`) when used in a smart contract (such as our `FundMe.sol`) will regard `msg.value` as their first variable. "So, `msg.value` will be considered as the first parameter for any of these library functions."

If we wanted to pass a 2nd variable to that function (`getConversionRate` in our case), like, if was like this => `function getConversionRate (uint256 ethAmount, uint256 somethingElse) internal view returns (uint256)` that `uint256 somethingElse` would be passed like a normal function call. Like so: `msg.value.getConversionRate(123);` where `123` is the 2nd parameter.

But we're not gonna do that.

Now, this is our `PriceConverter.sol` file so far:

```solidity
//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

library PriceConverter{
        function getPrice () internal view returns(uint256){
        //the function that we take the price in terms of USD
        //ABI
        //Adress
        AggregatorV3Interface priceFeed= AggregatorV3Interface(0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e);
        (,int256 price,,,)= priceFeed.latestRoundData();
        //ETH in terms of USD
        //3000.00000000
        return uint256(price * 1e10);
    }

    function getConversionRate (uint256 ethAmount) internal view returns (uint256){
        //this is the function that takes the ethAmount and returns the amount in terms of USD
        uint ethPrice= getPrice();
        uint256 ethAmountInUSD= (ethPrice * ethAmount) / 1e18;
        return ethAmountInUSD;
    }

    function getVersion() internal view returns (uint256){
        // an AggregatorV3Interface variable called priceFeed
        AggregatorV3Interface priceFeed= AggregatorV3Interface(0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e);
        return priceFeed.version();
    }
}
```

And this is our `FundMe.sol` file:

```solidity
//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "./PriceConverter.sol";
contract FundMe{
    //importing the PriceConverter library
    using PriceConverter for uint256;

    uint256 public minimumUsd= 50 * 1e18;
    address[] public funders;
    mapping(address => uint256) public addressToAmountFunded;

    function fund() public payable{
        //getConversionRate function became available for type uin256 (msg.value is type uint256)
         require(msg.value.getConversionRate() >= minimumUsd, "Didn't send enough!");
        funders.push(msg.sender);
        addressToAmountFunded[msg.sender] = msg.value;

    }



   // function withdraw{}
}
```

## SafeMath, Overflow Checking, and the "unchecked" keyword

This section is not directly related to the project at hand, but a handy piece of knowledge that Patrick presents to us so that we won't be surprised when we see such a thing.

Now, OpenZeppelin's SafeMath contract was paramount before the solidity version 0.8, and now it's almost nonexistent. So, in order to test it, we create a `SafeMathTester.sol` file and use any version BELOW 0.8.0.

Now, before solidity version 0.8.0, numbers were "unchecked". What does that mean? Consider the following code:

```solidity
//SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

contract SafeMathTester{
    uint8 public bigNumber = 255; // unchecked

    function add() public{
        bigNumber= bigNumber + 1;
    }
}
```

Now, first off, ` uint8 public bigNumber = 255;` because `256` is the biggest number an `uint8` variable can contain. So, if we deployed this contract using a compiler between 0.6 and 0.8, and tried to add `1` to it, it would overflow, i.e. revert back to `0` instead of `256` . SafeMath seems to be dealing with this unexpected problem. After 0.8.0, numbers are checked, so this problem doesn't occur. Although, we can use the `unchecked` keyword to make solidity follow the same behavior. Check this out:

```solidity
//SPDX-License-Identifier: MIT
// upgraded the compiler version
pragma solidity ^0.8.0;

contract SafeMathTester{
    uint8 public bigNumber = 255; // unchecked

    function add() public{
        //unchecked keyword makes the number go to 0 if it's bigger than 255 now
        unchecked{bigNumber= bigNumber + 1;}
    }
}
```

The two snippets above do the very same thing, in different compiler versions.

So what's the use of this `unchecked` keyword? Well, it turns out it is more gas efficient. So, if you sure that your math won't round and cause problems, you can use this technique to make your contract more gas efficient.

## Basic Solidity For Loop

Now we'll write the `withdraw` function. This function will loop through the `funders` array and set the amount of money sent by an individual number to 0 in `addressToAmountFunded` mapping. It is no different from the `for loop` in Javascript.

This is the `withdraw` function:

```solidity
    function withdraw() public{

        for (uint256 funderIndex= 0; funderIndex < funders.length; funderIndex++){
        //create a funder address variable that's equal to the current index in the funders array
            address funder= funders[funderIndex];
        //set the amount of money sent by the funder found in addressToAmountFunded mapping to 0
            addressToAmountFunded[funder]= 0;
        }
    }
```

Now we need to do 2 more things: Reset the `funders` array, and actually withdraw the funds.

### Resetting an array

We reset the `funders` array by writing this piece of code => ` funders= new address[](0);`

We reset the array `funders` in the `withdraw` function because we were keeping track of who sent us money, and now since we've withdrawn the money, we don't need to keep track of them. And to think about it, when after withdrawing, if someone else sends us funds, we'd like to keep track of them and distinguish them from the ones who sent us money before we've withdrew the funds.

Now, `withdraw` function with the above line added to it:

```solidity
    function withdraw() public{

        for (uint256 funderIndex= 0; funderIndex < funders.length; funderIndex++){
            address funder= funders[funderIndex];
            addressToAmountFunded[funder]= 0;
        }
        //reset the array
        funders= new address[](0);
        //actually withdraw the funds
    }
```

Our next step is to actually withdraw the funds, i.e. send all the money in this contract to an address. But, how to send money from a contract?

### Sending ETH from a contract

There are 3 different ways: `transfer`, `send`, and `call`.

For reference, this link is quite useful => `https://solidity-by-example.org/sending-ether/`

### transfer

We can write the following line => `payable(msg.sender).transfer(address(this).balance)

Normally `msg.sender` is of type `address`. What we're doing when we add `payable` in front of it here is we're `typecasting` like we did with ints and uints earlier. We are doing this because in Solidity native tokens can only be sent to `payable` addresses. With this little tweak, our address can be sent money.

`this` keyword here refers to the whole contract, i.e. `FundMe.sol`.

The thing with `transfer` method is that its gas cost is capped at `2300 gas`, if it requires more gas cost, then it reverts the function and throws an error.

### send

`send` method is also capped at 2300 gas limit, but instead of an error, it returns a boolean. So, we write it as follows to revert it in case of an error (because it gives a boolean, it wouldn't revert by itself)

```solidity

        bool sendSuccess= payable(msg.sender).send(address(this).balance);
        require(sendSuccess, "Couldn't send the funds");

```

### call

Call is one of the lower level commands in Solidity. It's really powerful. We can use it to virtually call any function in Ethereum- without even having to have the ABI.

Check this snippet out:

```solidity
(bool callSuccess, bytes memory dataReturned)= payable(msg.sender).call{value: address(this).balance}("");
```

Now, let's explain that. the parenthesis after `.balance` is empty. Normally, when we call a function, we put any function information or any information about the function we want to call in some other contract. We actually don't want to call a function, so we're going to leave this one blank. And to tell Solidity that we leave it blank, we write is as such `("")`.

The line `call.{value: address(this).balance}` works as such: You know there's this `Value` part in Remix IDE where we enter the amount we want to pay, it works like that. So it calls, or say, enters the amount of money in the address of `this` contract.

This call function actually returns 2 variables. And when a function returns two variables, we can show that by placing them into parenthesis on the left-hand side. The first variable that's returned is `bool callSuccess` and the second is `bytes dataReturned`. The second one is the data returned if we were calling a function. And `bytes` objects are arrays, that's why we wrote them in `memory` in the beginning like so `bytes memory dataReturned`.

But, since we're not calling any function with our `call` method, we do not need this second variable. We used this syntax before in `getPrice` function. We just delete the 2nd parameter but leave the comma intact to tell Solidity "yea we know there's a second variable but we don't need it". We also add a require statement. So we write it like this in the end:

```solidity
//notice that the comma is there
(bool callSuccess,)= payable(msg.sender).call{value: address(this).balance}("");
require(callSuccess, "Call failed");

```

For the most part, `call` is recommended. Most, I say.

Here's the last version of `withdraw` function :

```solidity
    function withdraw() public{

        for (uint256 funderIndex= 0; funderIndex < funders.length; funderIndex++){
            address funder= funders[funderIndex];
            addressToAmountFunded[funder]= 0;
        }
        //reset the array
        funders= new address[](0);
        //actually withdraw the funds
        (bool callSuccess,)= payable(msg.sender).call{value: address(this).balance}("");
        require(callSuccess, "Call failed");
    }
```

## Basic solidity constructor

There's a BIG problem with our contract right now. That is, with the latest `withdraw` function we wrote, ANYBODY can withdraw the funds. We do not want that. To make sure only the person who deployed the contract can withdraw the funds we're going to make use of `constructor`s.

So we want to make sure that whomever deploys this contract will be the owner of the contract, and only the owner can withdraw funds.

Constructors get called immediately with the contract being deployed.

Now, in order to make sure only the owner can call certain functions, such as the `withdraw` function, we'll create an `address` variable of `owner` and set it to `msg.sender` in our `constructor`. Check these out=>

```solidity
    address public owner;

    constructor(){
        owner= msg.sender;
    }
```

But, in order for these to work, we need require statements in our functions, or better, a modifier. Before writing the modifier, let's see how we'd write the require statement: ` require(msg.sender == owner, "You are not the owner!");`. This line goes inside the `withdraw` function, in the 1st line of that function. And Patrick here points out the difference between `=` and `==`. So, a single equal sign (`=`) means it is `setting` something to something. Whereas a double (`==`) means it is `checking` something against something.

Now let's write our `modifier` named `onlyOwner`=>

```solidity
    modifier onlyOwner{
        require(msg.sender == owner, "You are not the owner!");
        _;
    }
```

The `underscore` means that "execute the rest of the code in the function that this modifier was attached to ". Now we need to attach this modifier into the function(s) we need to have this modifier. In our case, it is the `withdraw` function and we do it like this:

```solidity
     function withdraw() public onlyOwner{
//...
//...
}
```

## advanced solidity: immutable & constant

In this section, we're going to make this contract a bit more professional. More gas efficient for instance. We'll start by 2 keywords: `constant` and `immutable`.

Now, our ` uint256 public minimumUsd= 50 * 1e18;` is fired once the contract is deployed, like the constructor, and never changes. We can make this variable more gas efficient by adding the `constant` keyword like so:

` uint256 public constant minimumUsd= 50 * 1e18;`

With `constant` keyword added, this `minimumUsd` variable does not take a storage spot, and is much easier to read.

Now, `constant` have a naming convention. Instead of writing the variable name with camelCase, we generally write them in pascal_case and with majuscule letters. So, `minimumUsd` becomes `MINIMUM_USD`

We can use the `immutable` keyword for variables we set for one time, but outside the same line they're declared, opposed to our `MINIMUM_USD` for instace, we set the `owner` and use it in the `constructor`, so it's sued in 2 lines. The declaration convention with them is they start with `i_`, like, for our `owner` variable, it becomes `i_owner` like so => `address public immutable i_owner`

## advanced solidity custom errors

As of 0.8.4 version of solidity ,we can write custom errors for our reverts. This saves us lots of gas too. To work with them, we first define our errors OUTSIDE of the contract like so =>

```solidity
//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "./PriceConverter.sol";

//realize that this error thingy is outside of the FundMe contract
error NotOwner();

contract FundMe{
    //...
```

And in our contract, wherever we wish to use instead of the `require` statement, say, we want to use it in one of the modifiers, we do it such=>

```solidity
    modifier onlyOwner{
        //comment this old way out
        // require(msg.sender == i_owner, "You are not the owner!");
        if(msg.sender != i_owner){ revert NotOwner(); }
        _;
    }
```

## advanced solidity receive & fallback

Okay, problem: What if people send money to our contract without calling the `fund` function? Yes, they can do that, and we won't be able to track who sent us what in that case. Solidity has 2 `special functions` for situations like that: `receive` and `fallback`.

This link is useful => `https://docs.soliditylang.org/en/latest/contracts.html?highlight=special#special-functions`

Now, say that we create a separate file called `FallbackExample.sol` and populate it with the following code:

```solidity
//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract FallbackExample{
    uint256 public result;

    receive() external payable{
        result= 1;
    }
}
```

NB! Notice that special functions such as the receive function do not have the "function" keyword in front of them. Similar examples are: fallback, constructor...

Now, in Remix IDE, to send this contract money, all we need to do is to deploy it (we don't need to use Injected for this one, we can just use Javascript EVM for it) and after deployment, at the bottom we'll see `Low level interactions` that has some `CALLDATA` input field and then a `Transact` button. We can define the amount of money we want to send like usual with the `Value` field above, and when we hit transact, as the `receive` function suggests, the value of `result` should turn into `1` from `0`.

What if we don't leave the `CALLDATA` section blank and add some data into it? Like say we entered `0x00` into the `CALLDATA` field. We'd get the following error `"Fallback" function is not defined` What happens here is that Solidity says "oh, since you're sending some data you're not looking for the `receive`, you're looking for some function, so let me find that function for you. Mmm, I don't see any function that matches to `0x00` so I'm gonna look for your `fallback` function." Of course, since we don't have it, we get the above error.

Now, let's add the `fallback` function like so:

```solidity
    fallback() external payable{
        result= 2;
    }
```

After adding the code above, if we'd done what we did above, i.e. send some transaction with data in it, so say, entering `0x00` into the `CALLDATA` field and hitting the `Transact` button, instead of getting an error, the transaction would pass successfully. What happens here, since our contract is being called without a VALID function, Solidity realizes that we're doing this, i.e. calling the contract without a valid function, a function that it cannot find mostly because it doesn't exist, it returns and fires the `fallback` function, which turns the `result` into `2`.

Here's a nice chart explaiing what to expect from Solidity in such cases:

```
    // Explainer from: https://solidity-by-example.org/fallback/
    // Ether is sent to contract
    //      is msg.data empty?
    //          /   \
    //         yes  no
    //         /     \
    //    receive()?  fallback()
    //     /   \
    //   yes   no
    //  /        \
    //receive()  fallback()
```

To finish it up, let's add those `receive()` and `fallback()` functions to our contract, so that if there's something wrong going on, these functions can in turn call the `fund` function so that our contract can function as we wished.

```solidity

    fallback() external payable {
        fund();
    }

    receive() external payable {
        fund();
    }
```

Now, if somebody accidentally sends us money without calling our `fund` function, they'll get routed to the `fund` function automatically.

This costs a bit more gas though.

## Latest version of our contracts

### FundMe.sol

```solidity
//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "./PriceConverter.sol";

//realize that this error thingy is outside of the FundMe contract
error NotOwner();

contract FundMe{

    using PriceConverter for uint256;

    uint256 public constant MINIMUM_USD= 50 * 1e18;

    address[] public funders;

    mapping(address => uint256) public addressToAmountFunded;

    address public immutable i_owner;

    constructor(){
        i_owner= msg.sender;
    }


    function fund() public payable{
         require(msg.value.getConversionRate() >= MINIMUM_USD, "Didn't send enough!");
        funders.push(msg.sender);
        addressToAmountFunded[msg.sender] = msg.value;

    }

    function withdraw() public onlyOwner{
        for (uint256 funderIndex=0; funderIndex < funders.length; funderIndex++){
            address funder = funders[funderIndex];
            addressToAmountFunded[funder] = 0;
        }
        //reset the array
        funders= new address[](0);
        //actually withdraw the funds
        (bool callSuccess,)= payable(msg.sender).call{value: address(this).balance}("");
        require(callSuccess, "Call failed");
    }

    modifier onlyOwner{
        // require(msg.sender == i_owner, "You are not the owner!");
        if(msg.sender != i_owner){ revert NotOwner(); }
        _;
    }


    fallback() external payable {
        fund();
    }

    receive() external payable {
        fund();
    }

}
```

### PriceConverter.sol

```solidity
//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

library PriceConverter{
        function getPrice () internal view returns(uint256){
        //the function that we take the price in terms of USD
        //ABI
        //Adress
        AggregatorV3Interface priceFeed= AggregatorV3Interface(0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e);
        (,int256 price,,,)= priceFeed.latestRoundData();
        //ETH in terms of USD
        //3000.00000000
        return uint256(price * 1e10);
    }

    function getConversionRate (uint256 ethAmount) internal view returns (uint256){
        //this is the function that takes the ethAmount and returns the amount in terms of USD
        uint ethPrice= getPrice();
        uint256 ethAmountInUSD= (ethPrice * ethAmount) / 1e18;
        return ethAmountInUSD;
    }

    function getVersion() internal view returns (uint256){
        // an AggregatorV3Interface variable called priceFeed
        AggregatorV3Interface priceFeed= AggregatorV3Interface(0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e);
        return priceFeed.version();
    }
}
```
