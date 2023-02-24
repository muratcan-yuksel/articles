# Lottery contract

Start with `yarn add --dev hardhat` and `yarn hardhat` and this time, we'll choose to create an empty config.js file.

Install dependencies => `yarn add --dev @nomiclabs/hardhat-ethers@npm:hardhat-deploy-ethers ethers @nomiclabs/hardhat-etherscan @nomiclabs/hardhat-waffle chai ethereum-waffle hardhat hardhat-contract-sizer hardhat-deploy hardhat-gas-reporter prettier prettier-plugin-solidity solhint solidity-coverage dotenv`

## Code so far

```javascript
//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

//enter the lottery (by paying some amount)
//pick a winner (randomly)
//winner to be selectet every X minutes => completely automated

//Chainlink Oracle=> Randomness, Automated execution(Chainlink Keepers)

error Raffle__NotEnoughETHEntered();

contract Raffle {
    //s_ means that's a storage variable
    // uint256 private  s_entranceFee;
    //state variables
    //i= means it's an immutable variable
    uint256 private immutable i_entranceFee;
    //it's payable bcs if one of them wins, we need to pay them as this is a lottery
    address payable[] private s_players;
    // events
    event RaffleEnter(address indexed player);

    constructor(uint256 entranceFee) {
        i_entranceFee = entranceFee;
    }

    function enterRaffle() public payable {
        //require msg.value >= i_entranceFee
        if (msg.value < i_entranceFee) {
            revert Raffle__NotEnoughETHEntered();
        }
        //typecasting msg.sender into payable
        s_players.push(payable(msg.sender));
        //Events
        //whenever we update a dynamic object, like an array or mapping, we always want to emit an event
        //naming convention: event name is the name of the function but REVERSED.
        //like this function's name is enterRaffle, so the event name is RaffleEnter
        emit RaffleEnter(msg.sender); //event is upstairs, under the state variables
    }



    function getEntraceFee() public view returns (uint256) {
        return i_entranceFee;
    }

    function getPlayer(uint256 index) public view returns (address) {
        return s_players[index];
    }
}

```

## Chainlink VRF for randomness

go to https://docs.chain.link/vrf/v2/subscription/examples/get-a-random-number

open subscription manager => https://vrf.chain.link/

connect wallet

create subscription (wait for transaction to be completed)

add funds (10 LINK is enough)

---

Wait
Install `yarn add --dev @chainlink/contracts`

## hardhat shorthand

`npm install --global hardhat-shorthand`

Now that it's installed, I can run `hh compile` instead of `yarn hardhat compile` and so on.

## chainlink keepers

helps us do automated tasks, like give money out when a certain condition is met etc.
