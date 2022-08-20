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

In order to interact with an outside contract, we need the contract ABI (application binary interface) and the address. And we need the address for `goerli` network because the others are discontinued now.

Now, let's chill a bit and write some code, things will be clear by the end of this section.

We need two public functions, `getPrice` and `getConversionRate`.

The ABI here is the aggregator contract `AggregatorV3Interface`, but we also need the `address`. To get the address that we'll make use of in our call, we'll go to the following link => `https://docs.chain.link/docs/ethereum-addresses/`, find the section for `Goerli Testnet` and copy the address related to `ETH/USD` because that's what we want to do: We want to convert between ether and usd. The address we're looking for is the following => ` 0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e`