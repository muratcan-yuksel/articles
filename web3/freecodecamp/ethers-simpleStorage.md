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
