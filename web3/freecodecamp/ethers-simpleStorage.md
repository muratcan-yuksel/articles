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

We install it with the following command => `yarn add solc@0.8.7-fixed` (it says so in the documentation). But in the tutorial he just writes `yarn add solc`
