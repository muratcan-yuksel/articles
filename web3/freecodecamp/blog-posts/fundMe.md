These are my notes for Freecodecamp's we3/blockchain course Lesson 4: Remix FundMe. Again, all the credit goes to Patrick Collins and Freecodecamp's wonderful community.

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
    using PriceConverter for uint256;

    uint256 public minimumUsd= 50 * 1e18;
    address[] public funders;
    mapping(address => uint256) public addressToAmountFunded;

    function fund() public payable{
         require(msg.value.getConversionRate() >= minimumUsd, "Didn't send enough!");
        funders.push(msg.sender);
        addressToAmountFunded[msg.sender] = msg.value;

    }



   // function withdraw{}
}
```
