#EthersJs Simple Storage

These are my notes from the 5th lesson of Freecodecamp's web3/Blockchain development course. You can read the notes for the previous lesson here => // ADD LINK TO THE LESSON 4

In the video, Patrick starts with a Javascript refresher. This post does not contain notes to that section. Here you'll only find things directly related to blockchain development.

## Starting the project

First, in our project root folder that contains the `SimpleStorage.sol` file, we create a `deploy.js` file and populate it with the following code =>

```javascript
async function main() {}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

Since we want to compile our `SimpleStorage.sol` contract, we need to install the `solc-js` compiler. Here's the link to the `solc-js` repo => https://github.com/ethereum/solc-js

We install it with the following command => `yarn add solc@0.8.7-fixed`

Now, the reason we installed this very specific version is because our `SimpleStorage.sol` smart contract's compiler version was defined as such. That means that if you go the the `SimpleStorage` you'd see this line there => `pragma solidity 0.8.7; `

After the installation, if we run the following command => `yarn solcjs --bin --abi --include-path node_modules/ --base-path . -o . SimpleStorage.sol` it will create two files :`SimpleStorage_sol_SimpleStorage.abi` i.e. the ABI of our contract, and `SimpleStorage_sol_SimpleStorage.bin` i.e. the binary of our contract, i.e. really low level of this code.

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

In Remix IDE, we can either deploy our contract into `Javascript VM` or `Injected Web3`. We will learn how to do both, starting with `Javascript VM`, i.e. a fake blockchain. In the future, we'll be using `hardhat`, but for this course we'll use `ganache`.

We download ganache, run it, and click `quickstart`. Now, I did download ganache a long time ago, so I don't remember how I did it exactly for my manjaro linux OS. You'll figure it our yourself for your OS.

When we click `quickstart`, it'll run a fake blockchain on our computer, with fake eth in fake accounts just like the Remix IDE does.

In our code, one of the first things we want to do is to connect to a blockchain. If we'd open Remix, choose Injected, and there, click `add network` on our metamask wallet, and from there choose `networks` section on the left sidebar, we'd see info about those networks. Let's learn more about the `RPC URL`. RPC stands for Remote Procedure Call, and url stands for Uniform Resource Locator.This RPC URLstands for connection to a blockchain node that somebody is running. The URL inside the input field connects us to make API calls to interact with a blockchain node.

Now, in ganache, if we'd look at the top we'll see the `RPC SERVER`. Its content is our endpoint for the ganache node right now. We need this endpoint. We copy and save it somewhere for later use.

If we go to the JSON RPC Specification on this link => `https://playground.open-rpc.org/?schemaUrl=https://raw.githubusercontent.com/ethereum/execution-apis/assembled-spec/openrpc.json&uiSchema%5BappBar%5D%5Bui:splitView%5D=false&uiSchema%5BappBar%5D%5Bui:input%5D=false&uiSchema%5BappBar%5D%5Bui:examplesDropdown%5D=false`
we can see the different calls we can make to our node to get different info. But since making these API calls ourselves is tedious, we're going to use a wrapper to do such things. And here's where `ethers.js` comes into play.

## Intro to Ethers.js

Just here we need a detour. We have our deploy.js file, we want to connect to the local blockchain provided by ganache, and do to that we need to enter some sensitive information like our wallet private key, and sharing our wallet's private key is a HUUUUGE NO-NO. So, in order to never let anyone get a hold of our private key, we're going to use environment variables for now. At the end of the course, Patrick also shows different, even more secure ways to hide sensitive data from being stolen. But now, I'll show the part about env variables.

Install `dotenv` package by entering `yarn add dotenv` and adding it into our `deploy.js` file like so => `require("dotenv").config(); `

Now we'll create a `.env` file in our root. We need to populate it with the `RPC SERVER` endpoint we've saved somewhere previously and our wallet's pricate key. Now, since we're using ganache, we're provided with a list of fake wallet that we can use for testing. Now we'll copy the private key of the fake wallet we're going to use and save it like the `RPC SERVER` endpoint.

Now we can enter these data into our `.env` file like so =>

```
PRIVATE_KEY=0xbxxx1a0d7xxx2221efexxxb18ee8e3c2d08xxx70dxx
RPC_URL= http://xx.0.0.1:xx5x
```

NB! It is a good practice to add `0x` to your pricate key. EthersJs and Hardhat are smart enough to ignore that, bu still we added it.

Also, you'll see that even though I'm sharing the private key of a fake wallet provided to me by ganache, I still hide it somehow here. Yes, I guess we need to be THAT paranoid about sharing our private keys.

Now, in JS, we can access environment variables with `process.env.VARIABLE_NAME`.

Now we can get back to `ethersJS`.

Let's install ethers with `yarn add ethers`, and import it in our `deploy.js` like so => `const ethers = require("ethers");`.Let's install ethers with `yarn add ethers`, and import it in our `deploy.js` like so => `const ethers = require("ethers");`.

We add the following snippet into our `main` function in `deploy.js`=>

```javascript
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
```

The first line says that "we are going to connect to this URl right there". So, our script will connect to our local blockchain.

"These two lines alone gives us everything we need to interact with the smart contract. They give us a connection to the blockchain, and they give us a wallet with a private key so that we can sign different transactions"
