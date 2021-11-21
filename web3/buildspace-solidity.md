## first steps

-create a folder
-npm init -y
-npm install --save-dev hardhat
-npx hardhat
-(if not automatically installed)=> npm install --save-dev @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers

- npx hardhat compile
  -npx hardhat test

## writing contract

-Create a file named WavePortal.sol (whatever I mean) under the contracts directory.

```
// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    constructor() {
        console.log("Yo yo, I am a contract and I am smart");
    }
}
```

## build a script and run it

```
const main = async () => {
    // This will actually compile our contract and generate the necessary files we need to work with our contract under the artifacts directory.
    const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
   //hardhat creates a local Ethereum network and destroys it after the completion of the script
    const waveContract = await waveContractFactory.deploy();
    // We'll wait until our contract is officially deployed to our local blockchain
    await waveContract.deployed();
      console.log("Contract deployed to:", waveContract.address);
  };

  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };

  runMain();
```

- we'll run it with => npx hardhat run scripts/run.js

## storing data

nope nope nope

## writing a script to depoy locally

-napx hardhat node
