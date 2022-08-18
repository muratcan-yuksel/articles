# Lesson 4: Fund me

# Useful links

data.chain.link
docs.chain.link
https://github.com/smartcontractkit/chainlink

We'll work with 2 contracts here. `FundMe.sol` and `PriceConverter.sol`. `FundMe.sol` will allow users to send ethereum, avalance, polygon, phantom or whatever blockchain native token into this contract and then some owner of the contract can withdraw these tokens and do whatever they want to do with them.

We will learn about payable functions.

We will be able to see the list of the funders in an array (we will be able to look at them using their indexes). We wil also have a mapping showing the addresses of individual funders.

Only the deployer of the contract can withdraw. Once the funds are withdrawn, the funders array will be reset to zero.

We will use Chainlink's price feeds to exchange between usd to eth I guess. Also, Patrick says that some parts of this lesson might be difficult to grasp. Do not worry about it.

## FundMe.sol smart contract

We want this contract to do the following:

- Get funds from users
- Withdraw funds
- Set a minimum funding value in USD

We have 2 main functions: fund and withdraw. We will create other functions to help these two though.

Smart contracts can hold funds just like how wallets can.

Now, in our fund function, we want it to be able to set a minimum fund amount in USD. To get how much money someone is sending, we're using the global `msg.value` variable. It is the same as `value` part in remix IDE.

So this msg.value is the amount of money sent by the person or entity who called the fund function. If we wanted to set a minimum requirement, say, if you want to call this `fund` function, you need to pay AT LEAST 1 ETH. Then I'd write it like this using the `require` syntax: `require(msg.value > 1e18);`. Now, this `1e18` means `1*10**18` and that also means `1000000000000000000` (wei or gwei?) which means 1 ether.

What follows in require statement is the error message. It reverts the transaction. That means "undo any action before, and send remaining gas back". So it DOES spend some gas. For instance, if there's an action before the require statement, it will do that action, spend the necessary amount of gas for that action, and when it faces the require statement and if it couldn't pass the requirement, it will send what remains from the initial gas cost (probably estimated, or agreed IDK). So it will spend gas for any computation before the require statement and can't return them, but the cost of the ones after the require statement will be returned.

```solidity
    function fund() public payable{
        require(msg.value>1e18, "Didn't send enough!");
    }
```

## Chainlink & Oracles

In order to get the price of ethereum from the real world, so that we can convert it to the usd and so we take say 50 usd from the sender, we need to use oracles.

Blockchains are deterministic systems that are closed to the outside world.

"Blockchain Oracle: Any device that interacts with the off-chain world to provide external data or computation to smart contracts."

We're going to use Chainlink Data Feeds

To test, we copy the code in the following link `https://docs.chain.link/docs/get-the-latest-price/` and run it on Injected on Remix. Injected, not London or Belin EVM. We deploy, it's deployed after a brief delay like all smart conracts, so it is shown on deployed contracts after a while, and from there we can see the price of ETH to USD.

Since we cannot get a random number from the blockchain as it is deterministic, we're going to use Chainlink's verifiable randomness function.

`Around 3.56 he gives an example of how to use Chainlink in depth.` I didn't give too much attention to that part yet, as it seems that we're going to go over them later on.

## Interfaces & Price Feeds

We create two public functions: `getPrice` and `getConversionRate`.
We use Chainlink Data Feeds. We will integrage with the aggregator contract `AggregatorV3Interface`.

When we interact with this Chainlink price feed, we actually rea from one of those contracts, like `AggregatorV3Interface` that has a function like `getLatestPrice`. We're interested in the `int price` that function returns.

Since we're interacting with a contract outside of our contract, we'll need two things: `ABI` and `Address`.

### getting the address

To get the address, we go to `Ethereum Data Feeds` section under `Contract Addresses` section inside `Data Feeds` part of `docs.chain.link`. There, we'll find the `goerli` section and get the contract address associated with `ETH/USD`. The address there is `0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e`. We'll need this address.

### getting the ABI

Now, for that, we use interfaces. We go to the following link `https://github.com/smartcontractkit/chainlink/tree/develop/contracts/src/v0.8/interfaces` (I chose v.8 here) and there are different smart contracts there. We check the one named `AggregatorV3Interface` and its functions. It has some functions that seem to be returning something. To check the version for instance, we're going to use the `version` function.

Now, for those interfaces to work, we either need to coyp-paste them into our contracts so that we can interact with them, or do something else. And since copy-pasting is not a beckoning way, we'll do that something else.

Importing! We're going to import them directly from the GitHub repo. And the one we need to write is `import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";` (can be found on the following link => `https://docs.chain.link/docs/get-the-latest-price/`)

Now, here we just added a `getVersion` function to demonstrate how things work. Here's a woring version of the code:

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
    }

    function getConversionRate () public{
        //
    }

    function getVersion() public view returns (uint256){
        AggregatorV3Interface priceFeed= AggregatorV3Interface(0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e);
        return priceFeed.version();
    }

   // function withdraw{}
}
```

### NB: I guess, in order to use them locally we might need to use npm. Like the following: `yarn add @chainlink/contracts` BUT I'm not sure OK?

Now, to explain the code snippet above: We create an AggregatorV3Interface variable called priceFeed that's equal to `AggregatorV3Interface(0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e)`That address in the parenthesis is the one we got from the `Ethereum Data Feeds` section/goerli/ETH-USD.

## Floating point math in solidity

Now, our `getPrice` function needs some explaining:

```solidity
    function getPrice () public{
        //the function that we take the price in terms of USD
        //ABI
        //Adress
        AggregatorV3Interface priceFeed= AggregatorV3Interface(0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e);
        (,int256 price,,,)= priceFeed.latestRoundData();

    }
```

Firstly, do not sweat over why ` (,int256 price,,,)` is written like that. I guess it's because it returns other variables, so we want to pass them as empty, or something like that. The important thing is, you HAVE TO write it like this, otherwise it gives error on compilation.

Now, we already know ` AggregatorV3Interface priceFeed= AggregatorV3Interface(0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e);` is an AggregatorV3Interface variable named priceFeed that's equal to the AggregatorV3Interface contract called with göerli ETH/USD address. But, what about the ` (int price)= priceFeed.latestRoundData();` part?

Now, if we examine the snippet using AggregatorV3Interface in this page => `https://docs.chain.link/docs/get-the-latest-price/` we notice that their `priceFeed` variable returns the follwing when it calls `latestRoundData()` function:

```
     /*uint80 roundID*/,
            int price,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
```

Here, `price` is `int` because sometimes the values can be negative. And I guess we only need the price at the moment, that's why our `getPrice` function above takes only `int price`.

Nb! In the documentation, it's `int price`, we changed it to `int256 price` to make it flexible (whatever that means).

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

Let's look at the next function now.

### getConversionRate

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

`Around 4.18 he goes through the math of the situation above. `

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
