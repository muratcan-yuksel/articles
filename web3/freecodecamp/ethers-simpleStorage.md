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

Okay, this part is kinda confusing. We're sending a raw transaction, that gives us extreme flexibility. I don't yet understand what it means to send a raw transaction, but let's get into action and find out!

We have this snippet inside our `main` function=>

```javascript
const tx = {
  //nonce: number we use once, or, number associated with a unique transaction
  nonce: 2,
  gasPrice: "20000000000",
  gasLimit: "100000000",
  to: null,
  value: 0,
  data: "0x608060405234801561001057600080fd5b50610771806100206000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c80632e64cec11461005c5780636057361d1461007a5780636f760f41146100965780638bab8dd5146100b25780639e7a13ad146100e2575b600080fd5b610064610113565b604051610071919061052a565b60405180910390f35b610094600480360381019061008f919061046d565b61011c565b005b6100b060048036038101906100ab9190610411565b610126565b005b6100cc60048036038101906100c791906103c8565b6101b6565b6040516100d9919061052a565b60405180910390f35b6100fc60048036038101906100f7919061046d565b6101e4565b60405161010a929190610545565b60405180910390f35b60008054905090565b8060008190555050565b6001604051806040016040528083815260200184815250908060018154018082558091505060019003906000526020600020906002020160009091909190915060008201518160000155602082015181600101908051906020019061018c9291906102a0565b505050806002836040516101a09190610513565b9081526020016040518091039020819055505050565b6002818051602081018201805184825260208301602085012081835280955050505050506000915090505481565b600181815481106101f457600080fd5b906000526020600020906002020160009150905080600001549080600101805461021d9061063e565b80601f01602080910402602001604051908101604052809291908181526020018280546102499061063e565b80156102965780601f1061026b57610100808354040283529160200191610296565b820191906000526020600020905b81548152906001019060200180831161027957829003601f168201915b5050505050905082565b8280546102ac9061063e565b90600052602060002090601f0160209004810192826102ce5760008555610315565b82601f106102e757805160ff1916838001178555610315565b82800160010185558215610315579182015b828111156103145782518255916020019190600101906102f9565b5b5090506103229190610326565b5090565b5b8082111561033f576000816000905550600101610327565b5090565b60006103566103518461059a565b610575565b90508281526020810184848401111561037257610371610704565b5b61037d8482856105fc565b509392505050565b600082601f83011261039a576103996106ff565b5b81356103aa848260208601610343565b91505092915050565b6000813590506103c281610724565b92915050565b6000602082840312156103de576103dd61070e565b5b600082013567ffffffffffffffff8111156103fc576103fb610709565b5b61040884828501610385565b91505092915050565b600080604083850312156104285761042761070e565b5b600083013567ffffffffffffffff81111561044657610445610709565b5b61045285828601610385565b9250506020610463858286016103b3565b9150509250929050565b6000602082840312156104835761048261070e565b5b6000610491848285016103b3565b91505092915050565b60006104a5826105cb565b6104af81856105d6565b93506104bf81856020860161060b565b6104c881610713565b840191505092915050565b60006104de826105cb565b6104e881856105e7565b93506104f881856020860161060b565b80840191505092915050565b61050d816105f2565b82525050565b600061051f82846104d3565b915081905092915050565b600060208201905061053f6000830184610504565b92915050565b600060408201905061055a6000830185610504565b818103602083015261056c818461049a565b90509392505050565b600061057f610590565b905061058b8282610670565b919050565b6000604051905090565b600067ffffffffffffffff8211156105b5576105b46106d0565b5b6105be82610713565b9050602081019050919050565b600081519050919050565b600082825260208201905092915050565b600081905092915050565b6000819050919050565b82818337600083830152505050565b60005b8381101561062957808201518184015260208101905061060e565b83811115610638576000848401525b50505050565b6000600282049050600182168061065657607f821691505b6020821081141561066a576106696106a1565b5b50919050565b61067982610713565b810181811067ffffffffffffffff82111715610698576106976106d0565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b61072d816105f2565b811461073857600080fd5b5056fea2646970667358221220f3ffbf63a58ae96ffec65e85070d16f291dfa1c4345e673c3634fa0f543b1a7164736f6c63430008070033",
  chainId: 5777,
};

const signedTxResponse= await.wallet.signTransaction(tx);
console.log(signedTxResponse);
```

Our nonce, or the number we use once, or the number associated with a unique transaction, will be the same one as the `TX COUNT` of the wallet we used in our Ganache chain. We can see it in ganache UI. I have done 2 transactions so far, so I'm giving 2 as nonce.

The `gasPrice`, we copy it from ganache's `gas price` section on the top and kinda left.

For `gasLmit` we use some big number.

For `data`, we first add `0x` and then copy-paste the whole binary object in our binary file.

Now, `chainId` is equivalent. In the tutorial, Patrick copies it from ganache's `NETWORK ID` section. His network id is `1337`. Mine is `5777`. He also says that some people have problems with this as their chain ID and network ID are different, and chain Id is actually `31337`, but it should be `1377` he says. Although, I'm going to paste mine (`5777`), and we'll see what happens.

Now we have to sign this transaction and send it to the blockchain.
