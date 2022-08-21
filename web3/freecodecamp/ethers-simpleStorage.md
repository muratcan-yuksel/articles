# Ethers.js Simple Storage

## Installation & setup

## Tiny Javascript Refreher

This lesson starts with a Javascript refresher. I'll not be going over that stuff.

We start by creating a `deploy.js` file. Then, we populate it with the following code :

```javascript
async function main() {}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

<!-- Try to write this function with try/catch instead of promises -->

We want to compile our code. In order to compile our `SimpleStorage.sol` contract, we need to install the `solc-js` compiler. Here's the link to the `solc-js` repo => https://github.com/ethereum/solc-js

We install it with the following command => `yarn add solc@0.8.7-fixed` (it says so in the documentation).

Okay, the reason why the documentation says `yarn add solc@0.8.7-fixed` is because that the solidity compiler of our `SimpleStorage.sol` contract is `0.8.7`. That's why we install the fixed `solc` package.

Now, we can either compile our contract in our code, or separately. The `solc` documentation shows how to compile in code, but we're going to copile them separately.

So, we are going to use `solc` in the command line. You can find the relevant info in the `solc` docs. Although, we're not going to install `solc` globally in this tutorial.

Then, to compile our contract, we enter the following weird command into the terminal => `yarn solcjs --bin --abi --include-path node_modules/ --base-path . -o . SimpleStorage.sol`

This command will create two files : `SimpleStorage_sol_SimpleStorage.abi` i.e. the ABI of our contract, and `SimpleStorage_sol_SimpleStorage.bin` i.e. the binary of our contract, i.e. really low level of this code.

If we were using Remix IDE, we could've checked these info on the `Compilation Details` after compiling our contract.

But since writing all those lines are tedious, we're going to write our own scripts in `package.json` file like so:

```json
{
  "dependencies": {
    "solc": "0.8.7-fixed"
  },
  "scripts": {
    "compile": "yarn solcjs --bin --abi --include-path node_modules/ --base-path . -o . SimpleStorage.sol"
  }
}
```

Now, whenever we enter `yarn compile`, it'll run that tedious script for us.

## Ganache & Networks

In Remix IDE, we could either deploy our contract into `Javascript VM` or `Injected Web3`. We will learn how to do both, starting with `Javascript VM`, i.e. a fake blockchain. In the future, we'll be using `hardhat`, ut for this course, we'll use `ganache`.

We download ganache, run it, and click `quickstart`. Now, I did download ganache a long time ago, so I don't remember how I did it exactly for my manjaro linux OS. You'll figure it our yourself for your OS.

When we click `quickstart`, it'll run a fake blockchain on our computer, with fake eth in fake accounts just like the Remix IDE does.

In our code, one of the first things we want to do is to connect to a blockchain. If we'd open Remix, choose Injected, and there, click `add network` on our metamask wallet, and from there choose `networks` section on the left sidebar, we'd see info about those networks. Let's learn more about the `RPC URL`. RPC stands for Remote Procedure Call, and url stands for Uniform Resource Locator.This RPC URLstands for connection to a blockchain node that somebody is running. The URL inside the input field connects us to make API calls to interact with a blockchain node.

Now, in ganache, if we'd look at the top we'll see the `RPC SERVER`. Its content is our endpoint for the ganache node right now. We copy it and paste into our code to see if we can connect.

`delete this part`
Mine is => `HTTP://127.0.0.1:7545`
`delete this part`

If we go to the JSON RPC Specification on this link => `https://playground.open-rpc.org/?schemaUrl=https://raw.githubusercontent.com/ethereum/execution-apis/assembled-spec/openrpc.json&uiSchema%5BappBar%5D%5Bui:splitView%5D=false&uiSchema%5BappBar%5D%5Bui:input%5D=false&uiSchema%5BappBar%5D%5Bui:examplesDropdown%5D=false`
we can see the different calls we can make to our node to get different info. But since making these API calls ourselves is tedious, we're going to use a wrapper to do such things. And here's where `ethers.js` comes into play.

## Intro to Ethers.js

Let's install ethers with `yarn add ethers`, and import it in our `deploy.js` like so => `const ethers = require("ethers");`.

We add the following code into our `main` function => ` const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:7545");`

`//remember to delete/hide the http part`

NB! We just wrote `http` instead of `HTTP` because it looks nicer and for some other reason I can't recall now. Maybe, probably, it's better.

The code above says that "we are going to connect to this URl right there". So, our script will connect to our local blockchain.

Now, with the following code, we'll get a wallet. To get the wallet, we'll use one of the wallets ganache provides us with. We will copy the private key of the wallet, and pass it =>

` const wallet= new ethers.Wallet("a07551e67a63abcb564e83c38dba29b524540b097a3fde33c9b763c45d657f2a", provider);`

That first argument is the wallet's private key. Now, writing our wallet's private key is a HUUUGE NO-NO. Probably in the future he'll show us how to use env variables. But for now, since this is a fake wallet with fake money in it, we're okay.

"These two lines alone gives us everything we need to interact with the smart contract. They give us a connection to the blockchain, and they give us a wallet with a private key so that we can sign different transactions"
