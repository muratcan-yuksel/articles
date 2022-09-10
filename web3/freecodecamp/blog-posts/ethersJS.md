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
