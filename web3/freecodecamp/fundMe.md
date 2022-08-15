# Lesson 4: Fund me

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
