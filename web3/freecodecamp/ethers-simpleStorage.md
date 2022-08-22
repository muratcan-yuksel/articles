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

` const wallet= new ethers.Wallet("1804a5d0a50eac9f3ff2b8133074ec0e8184decc12f7416d84132896b024ae79", provider);`

That first argument is the wallet's private key. Now, writing our wallet's private key is a HUUUGE NO-NO. Probably in the future he'll show us how to use env variables. But for now, since this is a fake wallet with fake money in it, we're okay.

"These two lines alone gives us everything we need to interact with the smart contract. They give us a connection to the blockchain, and they give us a wallet with a private key so that we can sign different transactions"

In order to deploy our contract, we need the ABI and the binary compiled code of the contract. To do this, we're going to the node.js world and we're gonna use the `fs` library. So, In our `deploy.js` we add the following line => `const fs= require("fs-extra");` (you can also do `const fs= require("fs");`). Also, to be on the sure side, just add the library with `yarn add fs-extra`.

Now, inside our `main` function, we add the following lines =>

```javascript
const abi = fs.readFileSync("SimpleStorage_sol_SimpleStorage.abi", "utf-8");
const binary = fs.readFileSync("SimpleStorage_sol_SimpleStorage.bin", "utf-8");
```

Now since we have the contract ABI and binary, we can create a `contract factory`. In `ethersJS` a `contract factory` is an object that you can use to deploy contracts.

We also add the logic to deploy our contract.

So, still inside our `main` function, we add these lines =>

```javascript
const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
console.log("Deploying, please wait...");
const contract = await contractFactory.deploy();
console.log(contract);
```

Now, if we write `node deploy.js` on the terminal, what will happen?

We'll have deployed our contract in our local blockchain! In Ganache, we can see the address we used has a bit less ether, and if we go to the transactions section, we can see our transaction as if we were checking etherscan.

This is the latest version of our `main` function:

```javascript
async function main() {
  //my ganache RPC server => HTTP://127.0.0.1:7545
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:7545"
  );

  const wallet = new ethers.Wallet(
    "1804a5d0a50eac9f3ff2b8133074ec0e8184decc12f7416d84132896b024ae79",
    provider
  );

  const abi = fs.readFileSync("SimpleStorage_sol_SimpleStorage.abi", "utf-8");
  const binary = fs.readFileSync(
    "SimpleStorage_sol_SimpleStorage.bin",
    "utf-8"
  );
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, please wait...");
  const contract = await contractFactory.deploy(); //await keyword says STOP HERE, wait for the contract to be deployed
  console.log(contract);
}
```

`about await keyword`

If we didn't put the `await` there, when we console.logged our contract object, nothing would return. Because the await keyword makes the code stop at that point and makes it wait until the transaction is complete. It'll go to the next line only after the promise is resolved.

## Adding transaction overrides

```
VsCode tip! IF you click to the `deploy` keyword while pressing `ctrl`, it'll take you to the file where that function's been defined.
```

We can add arguments to our deploy function, such as gas price, gas limits etc.

Like, we can do this ` const contract = await contractFactory.deploy({gasPrice:10000000000});`

But we're not going to do such a thing rith now.

## Transaction receipts

We can wait for blocks, for whatever that means, Patrick says "maybe we want to wait one block to make sure it' attached to the chain"

I guess, we're specifying the number of confirmations we want to actually wait. Here, we're going to wait for 1 block of confirmation.

We can do this like so:

```javascript
const transactionReceipt = await contract.deployTransaction.wait(1);
console.log(transactionReceipt);
```

`Here we delete all those console.logs`

## sending a "raw" transaction in ethersjs

`NB! I got an error in this part, and it turns out we're not going to use this method since we're going to work with libraries such as ethersjs and hardhat. So, it is not important at this point in my opinion. I don't want it to slow me down. So, you can pass this step.`

Okay, this part is kinda confusing. We're sending a raw transaction, that gives us extreme flexibility. I don't yet understand what it means to send a raw transaction, but let's get into action and find out!

We have this snippet inside our `main` function=>

```javascript
const tx = {
  //nonce: number we use once, or, number associated with a unique transaction
  nonce: 2,
  gasPrice: 20000000000,
  gasLimit: 100000000,
  to: null,
  value: 0,
  data: "0x608060405234801561001057600080fd5b50610771806100206000396000f3fe608060405234801.....it is longer than this...3b1a7164736f6c63430008070033",
  chainId: 5777,
};

const signedTxResponse = await wallet.signTransaction(tx);
console.log(signedTxResponse);
```

Our nonce, or the number we use once, or the number associated with a unique transaction, will be the same one as the `TX COUNT` of the wallet we used in our Ganache chain. We can see it in ganache UI. I have done 2 transactions so far, so I'm giving 2 as nonce.

The `gasPrice`, we copy it from ganache's `gas price` section on the top and kinda left.

For `gasLmit` we use some big number.

For `data`, we first add `0x` and then copy-paste the whole binary object in our binary file.

Now, `chainId` is equivalent. In the tutorial, Patrick copies it from ganache's `NETWORK ID` section. His network id is `1337`. Mine is `5777`. He also says that some people have problems with this as their chain ID and network ID are different, and chain Id is actually `31337`, but it should be `1377` he says. Although, I'm going to paste mine (`5777`), and we'll see what happens.

UPDATE!: `5777` DOES NOT WORK. The other two work. I'll use `1377` from now on.

Now we have to sign this transaction and send it to the blockchain.

WHen we call `node deploy.js` what we're doing is signing a transaction, not sending a transaction. So, let's send one.

`I'm getting an error here. It's around 7h20m` The error is `Error: chainId address mismatch ` And I can't fix it whatever I do. Maybe I'll post a question on the discussion.

In any case, if we wanted to get the right `nonce` we need, we'd specify a variable as such => ` const nonce = await wallet.getTransactionCount();`

`I abandon this part, as it seems not so important at this stage. `

## interacting with contracts in ethersJS

Since we've deployed our contract, we can intereact with it. Remember that in Remix IDE, we have buttons after deploying that let us call our functions, variables and so on, we're going to do that with ethers now.

We can start by calling the simples function in`SimpleStorage.sol` by writing this inside our `main` function => ` const currentFavoriteNumber = await contract.retrieve();`

Here, the `contract` object is what's returned from our `contractFactory` as long as ew `await` it. The code we've written for it was this => `const contract = await contractFactory.deploy();`

The `contract` object is going to come with all the functionality described in the abi.

Here's a trick: We can read what's returned from which function in our `SimpleStorage_sol_SimpleStorage.abi` file. But since it is not formatted, it is quite difficult to do so. What we can do about is, we can change the extension to `json`, like so => `SimpleStorage_sol_SimpleStorage.json`, format it, and change the extension back to `abi` and the formatting will stay prettified.

Anyways, now, if we add these lines into our code :

```javascript
const currentFavoriteNumber = await contract.retrieve();
console.log(currentFavoriteNumber);
```

and enter `node deploy.js` on the terminal, we'll get a response like this => `BigNumber { _hex: '0x00', _isBigNumber: true }` This BigNumber is a library that comes with ethers application that helps us work with numbers. The reason we use this library is that both solidity and javascript have problems working with big numbers, decimals etc. It would be better to turn them into strings and then work with them. So, instead of the above console.log statement, we write is as such => `console.log(currentFavoriteNumber.toString()); ` we'll get `0` as response since our favoriteNumber gets initialized as `0` if not specified otherwise in our `SimpleStorage.sol` contract.

Now, let's update this number by calling the `store` function in our smart contact like so => ` const transactionResponse = await contract.store("7");`
Note that we can pass the number as string like we've just done, or as a number without the quotation marks. But, it is advised to use the quotation marks and pass them as strings so JS won't get confused had we were to use a bigger number.
